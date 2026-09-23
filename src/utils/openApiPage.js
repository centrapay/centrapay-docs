import Slugger from 'github-slugger';

// Source of truth for the spec-driven Payment Requests page, shared by the
// Astro page, navigation and search indexing so headings, anchors and section
// order stay in step. Anchors are slugged in document order with a single
// Slugger to match the Markdoc rendering the deleted mdoc page produced.
export const PAYMENT_REQUESTS_HREF = '/api/payment-requests';
export const PAYMENT_REQUESTS_ID = 'payment-requests';
export const PAYMENT_REQUESTS_PATH = ['Payment Requests', 'Payment Requests'];

// Orders endpoint summaries following index.yaml paths, which is the order
// the endpoints appear on the page.
export function orderEndpoints(indexData, files) {
  const byFile = Object.fromEntries(files.map(file => [file.name, file.operations]));
  return Object.values(indexData.paths).map(pathItem => {
    const file = pathItem.$ref.split('/').pop().replace(/\.yaml$/, '');
    const operation = byFile[file].find(op => op?.operationId);
    return { operationId: operation.operationId, summary: operation.summary };
  });
}

export function getPaymentRequestsSections({ models, extras, endpoints }) {
  const slugger = new Slugger();
  const anchor = title => slugger.slug(title).replace(/-$/, '');
  return [
    ...models.map(model => ({
      kind: 'model',
      name: model.name,
      title: model.title,
      anchor: anchor(model.title),
      depth: 2,
    })),
    ...extras.map(extra => ({
      kind: 'extra',
      title: extra.title,
      anchor: anchor(extra.title),
      depth: extra.depth,
      body: extra.body,
    })),
    ...endpoints.map(endpoint => ({
      kind: 'endpoint',
      operationId: endpoint.operationId,
      title: endpoint.summary,
      anchor: anchor(endpoint.summary),
      depth: 2,
    })),
  ];
}

export function firstParagraph(text) {
  return (text ?? '').split(/\n\s*\n/)[0].trim();
}
