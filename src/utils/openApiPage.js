import Slugger from 'github-slugger';
import { Marked, marked } from 'marked';
import {
  getErrors,
  getParameterProperties,
  propertyRows,
  requestSchema,
  responseModel,
} from './OpenApiResolver.js';

// Source of truth for spec-driven API pages, shared by the Astro page,
// navigation and search indexing so headings, anchors and section order stay
// in step. Each page is described by a file in src/content/api/openapi/pages
// whose `sections` list holds the routes and prose blocks in page order.
//
// A page only documents routes: the spec's refs pull everything together,
// and models render inline as click-to-reveal toggles hanging off the
// property, parameter or response that references them. Every model a
// page's routes reveal is anchored on its first occurrence per page, in
// document order, keeping the anchor the page's old model section had -
// so links like /api/payment-requests#line-item-model keep resolving.
//
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
function sectionMarkdown(resolved) {
  if (resolved.kind === 'endpoint') {
    return [resolved.description];
  }
  return [resolved.body];
}

function markdownHeadings(text) {
  return marked.lexer(text ?? '').filter(token => token.type === 'heading');
}

function resolveSection(section, { operations }) {
  if (section.endpoint) {
    return endpointSection(section, operations);
  }
  return extraSection(section);
}

// The full route documentation for an operation: parameter and payload rows,
// the response (a reveal when it is (a list of) a model, otherwise rows) and
// the error list.
function endpointDetails(operation, models) {
  return {
    properties: [
      ...getParameterProperties(operation.parameters, models),
      ...propertyRows(requestSchema(operation), models),
    ],
    response: responseModel(operation, models),
    errors: getErrors(operation.responses, Object.values(models['responses'] ?? {})),
  };
}

function resolvePageSection(section, ctx) {
  const resolved = {
    ...resolveSection(section, { operations: ctx.operations }),
    rule: section.rule ?? true,
  };
  resolved.anchor = ctx.anchor(resolved.title);
  resolved.subheadingAnchors = sectionMarkdown(resolved)
    .flatMap(markdownHeadings)
    .map(heading => ctx.anchor(heading.text));
  if (resolved.kind === 'endpoint' && !resolved.exampleName) {
    Object.assign(resolved, endpointDetails(ctx.operations[resolved.operationId], ctx.models));
    anchorSectionContent(resolved, ctx);
  }
  return resolved;
}

// Anchors the section's first reveal of each page-registered model (including
// the response block, which counts as its model's reveal) and the first
// occurrence of each reference table.
function anchorSectionContent(section, ctx) {
  section.properties.forEach(row => anchorRow(row, ctx));
  if (section.response) {
    anchorReveal(section.response, ctx);
  }
}

function anchorRow(row, ctx) {
  if (row.reveal) {
    anchorReveal(row.reveal, ctx);
  }
  if (row.table) {
    anchorReference(row.table, ctx);
  }
  if (row.values) {
    anchorReference(row.values, ctx);
  }
}

// Gives the first reveal of each model the anchor the page's old model
// section had, so historical links keep resolving. Markdown headings inside
// a model's intro and outro keep anchors too.
function assignAnchor(reveal, ctx) {
  reveal.anchor = ctx.anchor(reveal.title);
  reveal.introAnchors = markdownHeadings(reveal.intro).map(heading => ctx.anchor(heading.text));
  reveal.outroAnchors = markdownHeadings(reveal.outro).map(heading => ctx.anchor(heading.text));
}

// The spec's refs pull everything together: every model a page's routes
// reveal is anchored on its first occurrence per page, in document order.
// Only the first occurrence carries the anchor, keeping ids unique.
function anchorReveal(reveal, ctx) {
  if (reveal.model && !ctx.anchored.has(reveal.model)) {
    ctx.anchored.add(reveal.model);
    assignAnchor(reveal, ctx);
  }
  reveal.rows?.forEach(row => anchorRow(row, ctx));
  reveal.variants?.forEach(variant => anchorReveal(variant, ctx));
}

// A reference table or value list anchors its first occurrence per page,
// keeping the anchor the page's old table section had.
function anchorReference(reference, ctx) {
  if (ctx.anchored.has(reference.title)) {
    return;
  }
  ctx.anchored.add(reference.title);
  reference.anchor = ctx.anchor(reference.title);
  reference.headingAnchors = markdownHeadings(reference.intro ?? reference.body)
    .map(heading => ctx.anchor(heading.text));
}

export function getPageSections(page, { models, operations }) {
  const slugger = new Slugger();
  const anchor = text => slugger.slug(text).replace(/-$/, '');
  const ctx = {
    operations,
    models,
    anchored: new Set(),
    anchor,
  };
  return page.sections.map(section => resolvePageSection(section, ctx));
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
