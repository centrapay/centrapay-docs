import fs from 'fs/promises';
import { basename } from 'path';
import glob from 'glob';
import Slugger from 'github-slugger';
import grayMatter from 'gray-matter';
import { load as loadYaml } from 'js-yaml';
import Markdoc from '@markdoc/markdoc';
import {
  getPageSections,
  indexOperations,
  firstParagraph,
  pageHref,
  routeHref,
  splitPageRoutes,
  stripMarkdown,
  pageNavPath,
  OPENAPI_DIR,
} from '../utils/openApiPage.js';

// Mirrors the tokenizer `@astrojs/markdoc` builds for this site: `allowComments`
// is always on, and `allowIndentation` follows `ignoreIndentation` in
// astro.config.js. Without it, content indented inside a tag is mis-nested and
// sections lose their descriptions. Keep in step with the Markdoc integration.
const tokenizer = new Markdoc.Tokenizer({ allowComments: true, allowIndentation: true });

// Tags whose children document a single field or failure case rather than the
// surrounding narrative. A paragraph nested inside one of these is never
// promoted to a section description.
const DETAIL_TAGS = new Set(['property', 'error']);

// Characters of prose kept per section. Keywords are never truncated, so a long
// endpoint section still has every property name and error code searchable.
const MAX_PROSE_LENGTH = 1500;

// What each node contributes to its section's searchable text. `keywords` holds
// identifiers people search for verbatim — property names, error codes,
// endpoint paths — and `prose` holds the surrounding narrative.
const CONTRIBUTORS = {
  'node:text': { bucket: 'prose', read: a => a.content },
  'node:fence': { bucket: 'prose', read: a => a.content },
  'node:image': { bucket: 'prose', read: a => a.alt },
  'node:code': { bucket: 'keywords', read: a => a.content },
  'tag:property': { bucket: 'keywords', read: a => a.name },
  'tag:error': { bucket: 'keywords', read: a => a.message },
  'tag:openApiEndpoint': { bucket: 'keywords', read: a => a.operationId },
  'tag:properties': { bucket: 'prose', read: a => a.heading },
  'tag:imageGrid': { bucket: 'prose', read: a => a.caption },
  'tag:farmlandsSolutionCard': {
    bucket: 'prose',
    read: a => [a.title, a.description].filter(Boolean).join(' '),
  },
};

// `nav.path` segments that only exist to keep a page out of the navigation.
// They are not real categories, so they are not shown as search breadcrumbs.
const HIDDEN_NAV_SEGMENTS = new Set(['Exclude']);

// How each leaf node contributes to a heading or paragraph flattened to text.
// Deliberately excludes `fence`, which never appears inline.
const HEADING_TEXT = {
  text: a => a.content ?? '',
  code: a => a.content ?? '',
  softbreak: () => ' ',
  hardbreak: () => ' ',
};

export function normalizeWhitespace(str) {
  return (str ?? '').replace(/\s+/g, ' ').trim();
}

/**
 * Splits identifiers into their constituent words so natural language queries
 * match them, e.g. `REMAINING_AMOUNT_EXCEEDED` also matches "remaining amount
 * exceeded" and `tokenExpiresAfter` matches "token expires after".
 */
export function expandIdentifiers(text) {
  const expansions = new Set();
  for (const token of text.match(/[A-Za-z][A-Za-z0-9_]*/g) ?? []) {
    const words = token
      .replace(/_/g, ' ')
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
    if (words.includes(' ')) {
      expansions.add(words.toLowerCase());
    }
  }
  return [...expansions];
}

/**
 * Reproduces the heading text that `@astrojs/markdoc` slugs against: it walks
 * into tag children but ignores tag attributes, so a trailing `{% badge %}`
 * contributes nothing. This is what keeps generated anchors in step with the
 * ids actually rendered into the page.
 */
export function headingText(node) {
  const leaf = HEADING_TEXT[node.type];
  if (leaf) {
    return leaf(node.attributes ?? {});
  }
  return (node.children ?? []).map(headingText).join('');
}

/**
 * Collects the `{% badge %}` types attached to a heading. The badge is stripped
 * from the title and the anchor, so this is the only place its meaning — most
 * importantly `deprecated` — survives into the index.
 */
export function headingBadges(node) {
  if (node.type === 'tag' && node.tag === 'badge') {
    return [node.attributes?.type].filter(Boolean);
  }
  return (node.children ?? []).flatMap(headingBadges);
}

function contributionKey(node) {
  return node.type === 'tag' ? `tag:${node.tag}` : `node:${node.type}`;
}

function isDetailTag(node) {
  return node.type === 'tag' && DETAIL_TAGS.has(node.tag);
}

function createSection({ title, href, path, deprecated }) {
  return { title, href, path, deprecated, description: '', keywords: [], prose: [] };
}

function entryFlags({ deprecated, field }) {
  return {
    ...(deprecated ? { deprecated: true } : {}),
    ...(field ? { field: true } : {}),
  };
}

function finalizeSection({ title, href, path, description, deprecated, keywords, prose, field = false }) {
  const identifiers = normalizeWhitespace([...new Set(keywords)].join(', '));
  const narrative = normalizeWhitespace(prose.join(' ')).slice(0, MAX_PROSE_LENGTH);
  const content = normalizeWhitespace(
    [identifiers, narrative, ...expandIdentifiers(`${title} ${identifiers}`)].join(' ')
  );
  return {
    href,
    path,
    title,
    description,
    ...(content ? { content } : {}),
    // Kept apart from `content` (which flattens everything for search) so a
    // result's snippet can be built from readable prose, or from the
    // keyword list, without the two bleeding into each other mid-sentence.
    ...(narrative ? { prose: narrative } : {}),
    ...(identifiers ? { keywords: identifiers } : {}),
    ...entryFlags({ deprecated, field }),
  };
}

/**
 * Builds one search entry for the page plus one per heading. Headings are
 * flattened in document order, so a heading nested inside an `{% endpoint %}`
 * tag still starts a section covering everything up to the next heading.
 */
export function buildPageEntries({ href, path, frontMatter, content }) {
  const slugger = new Slugger();
  const sections = [];
  let current = createSection({
    title: normalizeWhitespace(frontMatter.title),
    href,
    path,
    deprecated: false,
  });
  let pendingEndpointPath = null;

  function startSection(node) {
    sections.push(current);
    // Markdoc slugs the raw heading text and then trims a trailing dash, which
    // is what a trailing `{% badge %}` leaves behind.
    const slug = slugger.slug(headingText(node)).replace(/-$/, '');
    current = createSection({
      title: normalizeWhitespace(headingText(node)),
      href: `${href}#${slug}`,
      path,
      deprecated: headingBadges(node).includes('deprecated'),
    });
    if (pendingEndpointPath) {
      current.keywords.push(pendingEndpointPath);
      pendingEndpointPath = null;
    }
  }

  // Endpoint tags wrap their heading, so the path is seen before the section it
  // documents begins.
  function recordEndpoint(node) {
    if (node.type === 'tag' && node.tag === 'endpoint') {
      pendingEndpointPath = node.attributes?.path ?? null;
    }
  }

  function contribute(node) {
    const contributor = CONTRIBUTORS[contributionKey(node)];
    if (!contributor) {
      return;
    }
    const text = contributor.read(node.attributes ?? {});
    if (text) {
      current[contributor.bucket].push(text);
    }
  }

  function isSectionDescription(node, inDetailTag) {
    return node.type === 'paragraph' && !current.description && !inDetailTag;
  }

  // Returns false when the node's children should not be visited.
  function visit(node, inDetailTag) {
    if (node.type === 'heading') {
      startSection(node);
      return false;
    }
    if (isSectionDescription(node, inDetailTag)) {
      current.description = normalizeWhitespace(headingText(node));
      return false;
    }
    recordEndpoint(node);
    contribute(node);
    return true;
  }

  function walk(node, inDetailTag) {
    if (!visit(node, inDetailTag)) {
      return;
    }
    const nested = inDetailTag || isDetailTag(node);
    for (const child of node.children ?? []) {
      walk(child, nested);
    }
  }

  walk(Markdoc.parse(tokenizer.tokenize(content)), false);
  sections.push(current);

  // The page entry keeps its frontmatter description, since that is the summary
  // already shown in navigation and cards.
  const [page, ...rest] = sections;
  page.description = normalizeWhitespace(frontMatter.description);
  return [page, ...rest].map(finalizeSection);
}

export function hrefForFilepath(filepath) {
  return filepath
    .replace(/^src\/content/, '')
    .replace(/\.mdoc$/, '')
    .replace(/^\/merchant-services\//, '/guides/');
}

export function navPath(frontMatter) {
  return [
    ...frontMatter.nav.path.split('/').filter(segment => !HIDDEN_NAV_SEGMENTS.has(segment)),
    frontMatter.nav.title ?? frontMatter.title,
  ];
}

function isExcluded(frontMatter, includeDrafts) {
  return Boolean(frontMatter.draft) && !includeDrafts;
}

function errorMessages(operation) {
  return Object.entries(operation.responses ?? {})
    .filter(([code]) => !/^2\d\d$/.test(code))
    .flatMap(([, response]) => Object.keys(response?.content?.['application/json']?.examples ?? {}));
}

// Field names and prose from every reveal a section's rows and response hang
// off, so a model's fields and its reference tables stay searchable under the
// routes that document them now that pages have no model sections of their
// own.
function revealProse(reveal) {
  return [reveal.intro, reveal.outro].filter(Boolean).map(stripMarkdown);
}

function revealRow(row, buckets) {
  buckets.names.push(row.name);
  if (row.description) {
    buckets.prose.push(row.description.replace(/<[^>]+>/g, ''));
  }
  if (row.reveal) {
    revealContent(row.reveal, buckets);
  }
  if (row.table) {
    buckets.names.push(row.table.title);
    buckets.prose.push(stripMarkdown(row.table.body));
  }
  if (row.values) {
    buckets.names.push(...[row.values.title, ...row.values.entries.map(entry => entry.name)].filter(Boolean));
    buckets.prose.push(...row.values.entries.map(entry => stripMarkdown(entry.description)));
    if (row.values.intro) {
      buckets.prose.push(stripMarkdown(row.values.intro));
    }
  }
}

function revealContent(reveal, buckets) {
  if (reveal.title) {
    buckets.names.push(reveal.title);
  }
  buckets.prose.push(...revealProse(reveal));
  (reveal.rows ?? []).forEach(row => revealRow(row, buckets));
  (reveal.variants ?? []).forEach(variant => revealContent(variant, buckets));
}

function revealRows(rows, buckets) {
  for (const row of rows ?? []) {
    revealRow(row, buckets);
  }
}

function sectionReveals(section) {
  const buckets = { names: [], prose: [] };
  revealRows(section.properties, buckets);
  if (section.response) {
    revealContent(section.response, buckets);
  }
  return buckets;
}

function endpointKeywords(section, operation) {
  const { names } = sectionReveals(section);
  return [
    operation.operationId,
    operation['x-path'],
    ...(operation.parameters ?? []).map(param => param.name),
    ...(section.properties ?? []).map(property => property.name),
    ...names,
    ...errorMessages(operation),
  ];
}

function extraDetails(section) {
  return { ...section, description: '', keywords: [], prose: [stripMarkdown(section.body)] };
}

function endpointDetails(section, operations) {
  const operation = operations[section.operationId];
  const { prose } = sectionReveals(section);
  return {
    ...section,
    description: firstParagraph(stripMarkdown(section.description ?? '')),
    keywords: endpointKeywords(section, operation),
    prose: [stripMarkdown(section.description ?? ''), ...prose],
  };
}

function sectionDetails(section, { operations }) {
  if (section.kind === 'extra') {
    return extraDetails(section);
  }
  return endpointDetails(section, operations);
}

function sectionFields(section) {
  return [
    ...(section.pathParams ?? []),
    ...(section.queryParams ?? []),
    ...(section.body ?? []),
    ...(section.response?.rows ?? []),
  ].filter(row => row.fieldAnchor);
}

const stripHtml = html => normalizeWhitespace((html ?? '').replace(/<[^>]+>/g, ''));

function fieldEntry({ row, href, path, deprecated }) {
  return finalizeSection({
    title: row.name,
    href: `${href}#${row.fieldAnchor}`,
    path,
    description: stripHtml(row.description),
    deprecated: deprecated || row.isDeprecated,
    keywords: [row.name],
    prose: [],
    field: true,
  });
}

// Search entries for a spec-driven API page, shaped like the entries
// buildPageEntries produces for mdoc pages.
export function buildOpenApiEntries({ id, page, endpointFiles, models }) {
  const href = pageHref(id);
  const path = pageNavPath(page);
  const operations = indexOperations(endpointFiles);
  const { prose, routes } = splitPageRoutes(getPageSections(page, { models, operations }));
  return [
    finalizeSection({
      title: page.title,
      href,
      path,
      description: page.description,
      deprecated: false,
      keywords: [],
      prose: [stripMarkdown(page.intro)],
    }),
    ...prose.flatMap(section => sectionEntries(section, `${href}#${section.anchor}`)),
    ...routes.flatMap(route => {
      const routePage = routeHref(id, route.slug);
      return route.sections.flatMap(section => sectionEntries(
        section,
        section === route.section ? routePage : `${routePage}#${section.anchor}`,
        routePage,
      ));
    }),
  ];

  function sectionEntries(section, sectionHref, fieldPage) {
    const details = sectionDetails(section, { models, operations });
    const deprecated = details.badges.includes('deprecated');
    return [
      finalizeSection({
        title: details.title,
        href: sectionHref,
        path,
        description: details.description,
        deprecated,
        keywords: details.keywords,
        prose: details.prose,
      }),
      ...sectionFields(details).map(row => fieldEntry({ row, href: fieldPage, path: [...path, details.title], deprecated })),
    ];
  }
}

async function loadYamlFile(filepath) {
  return loadYaml(await fs.readFile(filepath, 'utf8'));
}

async function loadYamlDir(dir) {
  const files = {};
  for (const filepath of glob.sync(`${OPENAPI_DIR}/${dir}/*.yaml`).sort()) {
    files[basename(filepath, '.yaml')] = await loadYamlFile(filepath);
  }
  return files;
}

export async function createOpenApiIndexEntries() {
  const endpointFiles = Object.entries(await loadYamlDir('endpoints'))
    .map(([name, pathItem]) => ({ name, operations: Object.values(pathItem) }));
  const models = await loadYamlDir('models');
  const pages = await loadYamlDir('pages');
  return Object.entries(pages).flatMap(([id, page]) => buildOpenApiEntries({
    id,
    page,
    endpointFiles,
    models,
  }));
}

export async function createFlexsearchIndexData({ includeDrafts = true } = {}) {
  const entries = [];
  for (const filepath of glob.sync('src/content/**/*.mdoc').sort()) {
    const { data: frontMatter, content } = grayMatter(await fs.readFile(filepath));
    if (isExcluded(frontMatter, includeDrafts)) {
      continue;
    }
    entries.push(...buildPageEntries({
      href: hrefForFilepath(filepath),
      path: navPath(frontMatter),
      frontMatter,
      content,
    }));
  }
  entries.push(...await createOpenApiIndexEntries());
  const indexData = Object.fromEntries(entries.map((entry, id) => [id, entry]));
  await fs.writeFile('public/index-data.json', JSON.stringify(indexData));
  return indexData;
}

export default function flexsearchPlugin() {
  let mode;
  return {
    name: 'flexsearch',
    configResolved: (config) => {
      mode = config.mode;
    },
    options: async () => {
      await createFlexsearchIndexData({ includeDrafts: mode !== 'prod' });
    },
  };
};
