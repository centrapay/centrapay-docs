import Slugger from 'github-slugger';
import { Marked, marked } from 'marked';

// Source of truth for spec-driven API pages, shared by the Astro page,
// navigation and search indexing so headings, anchors and section order stay
// in step. Each page is described by a file in src/content/api/openapi/pages
// whose `sections` list interleaves models, prose and endpoints in page order.
// Anchors are slugged in document order with a single Slugger to match the
// Markdoc rendering the deleted mdoc pages produced.

export const OPENAPI_DIR = 'src/content/api/openapi';

export function pageHref(id) {
  return `/api/${id}`;
}

export function pageNavPath(page) {
  return [...page.nav.path.split('/'), page.nav.title ?? page.title];
}

// Maps operationId to its operation across every endpoint file.
export function indexOperations(endpointFiles) {
  return Object.fromEntries(
    endpointFiles.flatMap(file => file.operations
      .filter(operation => operation?.operationId)
      .map(operation => [operation.operationId, operation]))
  );
}

// Operations use OpenAPI's own `deprecated` flag; models use `x-deprecated` to
// match how properties are flagged.
const BADGE_FLAGS = [
  ['experimental', ['x-experimental']],
  ['deprecated', ['deprecated', 'x-deprecated']],
];

function badgesFor(data) {
  return BADGE_FLAGS
    .filter(([, keys]) => keys.some(key => data[key]))
    .map(([badge]) => badge);
}

function modelSection(section, models) {
  const model = models[section.model];
  if (!model) {
    throw new Error(`No model found for name: ${section.model}`);
  }
  return {
    kind: 'model',
    name: section.model,
    title: model['x-title'] ?? section.model,
    depth: section.depth ?? 2,
    badges: badgesFor(model),
  };
}

// A named request example (eg an alternative payload) shown as its own
// section, titled and described by the example object.
export function requestExample(operation, name) {
  const example = Object.values(operation.requestBody?.content ?? {})[0]?.examples?.[name];
  if (!example) {
    throw new Error(`No request example "${name}" for operationId: ${operation.operationId}`);
  }
  return example;
}

function endpointSection(section, operations) {
  const operation = operations[section.endpoint];
  if (!operation) {
    throw new Error(`No operation found for operationId: ${section.endpoint}`);
  }
  const shown = section.example
    ? { ...requestExample(operation, section.example), badges: [] }
    : { ...operation, badges: badgesFor(operation) };
  return {
    kind: 'endpoint',
    operationId: section.endpoint,
    exampleName: section.example,
    title: shown.summary,
    description: shown.description,
    depth: section.depth ?? 2,
    badges: shown.badges,
  };
}

function extraSection(section) {
  return {
    kind: 'extra',
    title: section.title,
    depth: section.depth ?? 2,
    body: section.body ?? '',
    badges: section.badges ?? [],
  };
}

// Markdown bodies rendered under a section's heading, in page order. Headings
// inside them were part of the mdoc page too, so they share its anchor slugger.
function sectionMarkdown(resolved, models) {
  if (resolved.kind === 'model') {
    return [models[resolved.name]['x-intro'], models[resolved.name]['x-outro']];
  }
  if (resolved.kind === 'endpoint') {
    return [resolved.description];
  }
  return [resolved.body];
}

function markdownHeadings(text) {
  return marked.lexer(text ?? '').filter(token => token.type === 'heading');
}

function resolveSection(section, { models, operations }) {
  if (section.model) {
    return modelSection(section, models);
  }
  if (section.endpoint) {
    return endpointSection(section, operations);
  }
  return extraSection(section);
}

export function getPageSections(page, { models, operations }) {
  const slugger = new Slugger();
  const anchor = text => slugger.slug(text).replace(/-$/, '');
  return page.sections.map(section => {
    const resolved = resolveSection(section, { models, operations });
    const sectionAnchor = anchor(resolved.title);
    const subheadingAnchors = sectionMarkdown(resolved, models)
      .flatMap(markdownHeadings)
      .map(heading => anchor(heading.text));
    return { ...resolved, rule: section.rule ?? true, anchor: sectionAnchor, subheadingAnchors };
  });
}

// Splits a fence info string like `bash title="Barcode Breakdown"`.
function fenceInfo(info = '') {
  const [lang, ...rest] = info.trim().split(/\s+/);
  const title = /title="([^"]*)"/.exec(rest.join(' '))?.[1];
  return { lang: lang || undefined, title };
}

// Renders markdown into segments: HTML, plus code fences left for the page to
// render with the site's code component. Each heading gets the next
// precomputed anchor so ids match getPageSections; share one renderer across a
// section's bodies.
export function createMarkdownRenderer(anchors = []) {
  const queue = [...anchors];
  const renderer = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const id = queue.shift();
        const idAttr = id ? ` id="${id}"` : '';
        return `<h${depth}${idAttr}>${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
    },
  });
  return text => {
    const tokens = renderer.lexer(text ?? '');
    const segments = [];
    let pending = [];
    const flush = () => {
      if (pending.length > 0) {
        pending.links = tokens.links;
        segments.push({ kind: 'html', html: renderer.parser(pending) });
        pending = [];
      }
    };
    for (const token of tokens) {
      if (token.type === 'code') {
        flush();
        segments.push({ kind: 'code', code: token.text, ...fenceInfo(token.lang) });
      } else {
        pending.push(token);
      }
    }
    flush();
    return segments;
  };
}

// Headings shown in the navigation, matching the depth-2 headings the mdoc
// pages exposed.
export function navHeadings(sections) {
  return sections
    .filter(section => section.depth === 2)
    .map(section => ({ depth: 2, slug: section.anchor, text: section.title }));
}

export function firstParagraph(text) {
  return (text ?? '').split(/\n\s*\n/)[0].trim();
}
