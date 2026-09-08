import flexsearch from 'flexsearch/dist/flexsearch.bundle.min.js';

// Relative importance of a match in each indexed field. A title hit should
// always outrank an incidental mention in body content.
const FIELD_WEIGHTS = {
  title: 10,
  pathText: 5,
  description: 3,
  content: 1,
};

// Candidates pulled from each field before scoring, and results shown.
const CANDIDATES_PER_FIELD = 25;
const MAX_RESULTS = 12;

// Results matching every term of the query always rank above the looser
// `suggest` pass, which exists only so that a typo or an extra word returns
// something rather than nothing.
const STRICT_MATCH_BONUS = 1000;

// Deprecated and legacy entries stay searchable but are pushed below live
// documentation. The multiplier is small enough that a deprecated endpoint
// loses to its current equivalent, yet large enough that an exact match still
// beats an unrelated fuzzy one.
const DEPRECATED_PENALTY = 0.35;

// ...unless the query itself asks for them, in which case they rank normally.
const DEPRECATED_INTENT = /\b(legacy|deprecated|old|v1)\b/i;

// Extra score for a query that lines up with the start of a title, which is
// almost always what someone typing a page or endpoint name is after.
const TITLE_EXACT_BOOST = 100;
const TITLE_PREFIX_BOOST = 40;
const TITLE_SUBSTRING_BOOST = 20;

// Characters of context kept around a content match. Weighted toward the
// suffix because the result list truncates each line from the left, so a
// short prefix keeps the matched text from being pushed off screen.
const SNIPPET_PREFIX_RADIUS = 20;
const SNIPPET_SUFFIX_RADIUS = 100;

export function createSearchIndex(data) {
  const index = new flexsearch.Document({
    document: {
      id: 'id',
      index: [
        { field: 'title', tokenize: 'forward', resolution: 9 },
        { field: 'pathText', tokenize: 'forward', resolution: 5 },
        { field: 'description', tokenize: 'forward', resolution: 3 },
        { field: 'content', tokenize: 'forward', resolution: 1, minlength: 2 },
      ],
    },
  });
  const entries = new Map();

  for (const [id, entry] of Object.entries(data)) {
    const record = { ...entry, id, pathText: entry.path.join(' ') };
    entries.set(id, record);
    index.add(record);
  }

  return { index, entries };
}

function titleBoost(title, needle) {
  const normalized = title.toLowerCase();
  if (normalized === needle) {
    return TITLE_EXACT_BOOST;
  }
  if (normalized.startsWith(needle)) {
    return TITLE_PREFIX_BOOST;
  }
  return normalized.includes(needle) ? TITLE_SUBSTRING_BOOST : 0;
}

/**
 * Folds one FlexSearch pass into the running tallies. Each field contributes its
 * weight decayed by the result's rank within that field, so an entry matching
 * in several fields outranks one that matches only in the weakest.
 */
function addMatches(tallies, matches, isStrict) {
  for (const { field, result } of matches) {
    const weight = FIELD_WEIGHTS[field] ?? 1;
    result.forEach((id, rank) => {
      const tally = tallies.get(id) ?? { strict: false, relevance: 0 };
      tally.strict = tally.strict || isStrict;
      tally.relevance += weight / (rank + 1);
      tallies.set(id, tally);
    });
  }
}

// FlexSearch's own tokenizer splits on any non-alphanumeric character (so an
// identifier like COLLECTION_IDS_INVALID is really three words to it), so
// this has to match that splitting to reason about the same terms it does.
function queryTerms(query) {
  return query.split(/[^A-Za-z0-9]+/).filter(Boolean);
}

/**
 * FlexSearch's `suggest` mode will match a document that contains just ONE
 * of several query terms, which is how an unrelated page sharing one common
 * word (e.g. "ids") floods the results for a specific multi-word query.
 * Searching each term on its own and requiring a document to cover most of
 * them keeps typo/partial-word tolerance while dropping that noise.
 */
function collectTermTallies(index, terms) {
  const options = { limit: CANDIDATES_PER_FIELD, suggest: true };
  const tallies = new Map();
  const coverage = new Map();
  terms.forEach((term, termIndex) => {
    for (const { field, result } of index.search(term, options)) {
      const weight = FIELD_WEIGHTS[field] ?? 1;
      result.forEach((id, rank) => {
        const tally = tallies.get(id) ?? { relevance: 0 };
        tally.relevance += weight / (rank + 1);
        tallies.set(id, tally);
        const seen = coverage.get(id) ?? new Set();
        seen.add(termIndex);
        coverage.set(id, seen);
      });
    }
  });
  const required = Math.max(1, terms.length - 1);
  for (const id of tallies.keys()) {
    if (coverage.get(id).size < required) {
      tallies.delete(id);
    }
  }
  return tallies;
}

function collectTallies(index, query) {
  const tallies = new Map();
  addMatches(tallies, index.search(query, { limit: CANDIDATES_PER_FIELD }), true);
  for (const [id, { relevance }] of collectTermTallies(index, queryTerms(query))) {
    if (!tallies.has(id)) {
      tallies.set(id, { strict: false, relevance });
    }
  }
  return tallies;
}

function demotion(entry, wantsDeprecated) {
  return entry.deprecated && !wantsDeprecated ? DEPRECATED_PENALTY : 1;
}

/**
 * Whether the query matched every term outranks how well it matched, so the
 * demotion is applied to the relevance component only. A deprecated page keeps
 * its place among full matches — it just sits at the bottom of them, rather
 * than falling behind pages that merely mention the words in passing.
 */
function finalScore({ entry, tally, needle, wantsDeprecated }) {
  const relevance = tally.relevance + titleBoost(entry.title, needle);
  return (tally.strict ? STRICT_MATCH_BONUS : 0)
    + relevance * demotion(entry, wantsDeprecated);
}

/**
 * Locates the query, or failing that one of its words, in a content field.
 * Returns the character offset and length of whichever matched, or null if
 * none of it appears in the content at all.
 */
function findMatch(haystack, needle) {
  const atNeedle = haystack.indexOf(needle);
  if (atNeedle !== -1) {
    return { index: atNeedle, length: needle.length };
  }
  for (const term of needle.split(/\s+/).filter(Boolean)) {
    const atTerm = haystack.indexOf(term);
    if (atTerm !== -1) {
      return { index: atTerm, length: term.length };
    }
  }
  return null;
}

/**
 * Pulls the text around a query match out of one text field. Returned in
 * parts, rather than one string, so the caller can highlight the match
 * without resorting to `v-html`.
 */
function snippetFromText(text, needle) {
  if (!text) {
    return null;
  }
  const match = findMatch(text.toLowerCase(), needle.toLowerCase());
  if (!match) {
    return null;
  }
  const start = Math.max(0, match.index - SNIPPET_PREFIX_RADIUS);
  const end = Math.min(text.length, match.index + match.length + SNIPPET_SUFFIX_RADIUS);
  return {
    prefix: (start > 0 ? '…' : '') + text.slice(start, match.index),
    match: text.slice(match.index, match.index + match.length),
    suffix: text.slice(match.index + match.length, end) + (end < text.length ? '…' : ''),
  };
}

/**
 * Finds the single keyword (a property name, error code, endpoint path...)
 * that the query matched. Keywords are discrete identifiers rather than a
 * sentence, so unlike a prose snippet, showing the neighbours a comma-joined
 * list happens to put next to it would only add noise — the identifier
 * itself is the whole answer to "why did this match".
 */
function matchedKeyword(keywordsText, needle) {
  if (!keywordsText) {
    return null;
  }
  const lowerNeedle = needle.toLowerCase();
  const terms = [lowerNeedle, ...lowerNeedle.split(/\s+/).filter(Boolean)];
  return keywordsText
    .split(', ')
    .find(keyword => terms.some(term => keyword.toLowerCase().includes(term))) ?? null;
}

/**
 * Shows why a result whose title and description don't mention the query
 * still matched. Tries the section's prose first, since it reads as a
 * sentence; falls back to its keyword list (property names, error codes)
 * only when the match isn't in the prose at all. The two are never mixed
 * into one snippet — a keyword run-on and the unrelated sentence that
 * happens to follow it in the index would read as nonsense together.
 */
export function extractSnippet(entry, needle) {
  const prose = snippetFromText(entry.prose, needle);
  if (prose) {
    return prose;
  }
  const keyword = matchedKeyword(entry.keywords, needle);
  return keyword ? { prefix: '', match: keyword, suffix: '' } : null;
}

/**
 * FlexSearch's own tokenizer can score an entry as a match purely because
 * every query term appears *somewhere* in its (often large) combined content
 * field, with no two terms anywhere near each other. A result like that has
 * no way to show the user why it's there — no snippet, and no visible field
 * mentions the query either — which is as good a sign as any that it's a
 * coincidental bag-of-words hit rather than a real match.
 */
function isVisiblyRelevant(entry, needle, terms, snippet) {
  if (snippet) {
    return true;
  }
  const visibleText = [entry.title, entry.description, entry.pathText]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  if (visibleText.includes(needle)) {
    return true;
  }
  // Same "most terms, not just one" bar as collectTermTallies — otherwise a
  // page whose breadcrumb or description happens to share a single generic
  // word with the query (e.g. sitting under a category called "Object IDs")
  // passes as visibly relevant when it plainly isn't.
  const matched = terms.filter(term => visibleText.includes(term.toLowerCase()));
  return matched.length >= Math.max(1, terms.length - 1);
}

export function searchSite({ index, entries }, query) {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }
  const needle = trimmed.toLowerCase();
  const terms = queryTerms(trimmed);
  const wantsDeprecated = DEPRECATED_INTENT.test(trimmed);
  return [...collectTallies(index, trimmed)]
    .map(([id, tally]) => ({ entry: entries.get(id), tally }))
    .filter(({ entry }) => entry)
    .map(({ entry, tally }) => ({ entry, tally, snippet: extractSnippet(entry, needle) }))
    .filter(({ entry, snippet }) => isVisiblyRelevant(entry, needle, terms, snippet))
    .map(({ entry, tally, snippet }) => ({
      entry,
      snippet,
      score: finalScore({ entry, tally, needle, wantsDeprecated }),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_RESULTS)
    .map(({ entry, snippet }) => (snippet ? { ...entry, snippet } : entry));
}

let indexPromise;

/**
 * Fetches and builds the index once per page load. The command palette is
 * unmounted while closed, so without this the whole index would be refetched
 * and rebuilt every time it opens.
 */
export function loadSearchIndex() {
  if (!indexPromise) {
    indexPromise = fetch('/index-data.json')
      .then(response => response.json())
      .then(createSearchIndex);
  }
  return indexPromise;
}
