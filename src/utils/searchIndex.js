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

function collectTallies(index, query) {
  const tallies = new Map();
  const options = { limit: CANDIDATES_PER_FIELD };
  addMatches(tallies, index.search(query, options), true);
  addMatches(tallies, index.search(query, { ...options, suggest: true }), false);
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

export function searchSite({ index, entries }, query) {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }
  const needle = trimmed.toLowerCase();
  const wantsDeprecated = DEPRECATED_INTENT.test(trimmed);
  return [...collectTallies(index, trimmed)]
    .map(([id, tally]) => ({ entry: entries.get(id), tally }))
    .filter(({ entry }) => entry)
    .map(({ entry, tally }) => ({
      entry,
      score: finalScore({ entry, tally, needle, wantsDeprecated }),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_RESULTS)
    .map(({ entry }) => entry);
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
