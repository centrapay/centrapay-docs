import fs from 'fs';
import { load as loadYaml } from 'js-yaml';
import { describe, expect, it } from 'vitest';
import {
  getPageSections,
  indexOperations,
  firstParagraph,
  createMarkdownRenderer,
} from '../openApiPage';

const DIR = 'src/content/api/openapi';

function loadDir(dir) {
  return Object.fromEntries(fs
    .readdirSync(`${DIR}/${dir}`)
    .filter(file => file.endsWith('.yaml'))
    .sort()
    .map(file => [file.replace(/\.yaml$/, ''), loadYaml(fs.readFileSync(`${DIR}/${dir}/${file}`, 'utf8'))]));
}

function loadSpec() {
  const index = loadYaml(fs.readFileSync(`${DIR}/index.yaml`, 'utf8'));
  const endpoints = loadDir('endpoints');
  const endpointFiles = Object.entries(endpoints)
    .map(([name, pathItem]) => ({ name, operations: Object.values(pathItem) }));
  return {
    index,
    endpoints,
    operations: indexOperations(endpointFiles),
    models: loadDir('models'),
    pages: loadDir('pages'),
  };
}

// Every `#anchor` other pages link to must keep rendering, otherwise
// cross-links like /api/payment-requests#pay-a-payment-request break.
const EXPECTED_ANCHORS = [
  'payment-request-model',
  'payment-option-model',
  'accepted-collections',
  'payment-condition-model',
  'line-item-model',
  'product-classification',
  'paid-by-model',
  'asset-totals',
  'payment-activity-model',
  'strategy-model',
  'payment-activity-types',
  'cancellation-reasons',
  'create-a-payment-request',
  'get-a-payment-request',
  'get-a-payment-request-by-short-code',
  'get-a-payment-request-linked-to-a-patron-code',
  'get-a-payment-request-by-connection-id',
  'list-payment-requests-by-external-reference',
  'get-payment-request-summary',
  'pay-a-payment-request',
  'refund-a-payment-request',
  'void-a-payment-request',
  'release-pre-auth-funds',
  'confirm-pre-auth-payment-request',
  'list-payment-activities-for-a-merchant',
  'list-payment-activities-for-a-payment-request',
  'accept-a-payment-condition',
  'decline-a-payment-condition',
];

describe('payment requests spec page', () => {
  it('orders endpoints following the page sections', () => {
    const { pages, models, operations } = loadSpec();
    const sections = getPageSections(pages['payment-requests'], { models, operations });
    expect(sections.filter(section => section.kind === 'endpoint').map(section => section.operationId)).toEqual([
      'createPaymentRequest',
      'getPaymentRequest',
      'getPaymentRequestByShortCode',
      'getPaymentRequestByPatronCode',
      'getPaymentRequestByConnectionId',
      'listPaymentRequestsByExternalRef',
      'getPaymentRequestSummary',
      'payPaymentRequest',
      'refundPaymentRequest',
      'voidPaymentRequest',
      'releasePaymentRequest',
      'confirmPaymentRequest',
      'listPaymentActivities',
      'listPaymentRequestActivities',
      'acceptPaymentCondition',
      'declinePaymentCondition',
    ]);
  });

  it('keeps every historical section anchor stable', () => {
    const { pages, models, operations } = loadSpec();
    const sections = getPageSections(pages['payment-requests'], { models, operations });
    expect(sections.map(section => section.anchor)).toEqual(EXPECTED_ANCHORS);
  });

  it('takes the first paragraph of prose', () => {
    expect(firstParagraph('First.\n\nSecond.')).toEqual('First.');
    expect(firstParagraph(undefined)).toEqual('');
  });
});

describe('spec integrity', () => {
  it('resolves every section on every page', () => {
    const { pages, models, operations } = loadSpec();
    for (const page of Object.values(pages)) {
      expect(() => getPageSections(page, { models, operations })).not.toThrow();
    }
  });

  it('renders every operation on exactly one page', () => {
    const { pages, operations } = loadSpec();
    const rendered = Object.values(pages)
      .flatMap(page => page.sections.filter(section => section.endpoint && !section.example).map(section => section.endpoint));
    expect([...rendered].sort()).toEqual(Object.keys(operations).sort());
  });

  it('gives every operation a unique operationId', () => {
    const { endpoints } = loadSpec();
    const ids = Object.values(endpoints).flatMap(pathItem => Object.values(pathItem).map(op => op.operationId));
    expect(new Set(ids).size).toEqual(ids.length);
  });

  it('registers every endpoint file in index.yaml under its own x-path', () => {
    const { index, endpoints } = loadSpec();
    const registered = Object.fromEntries(Object.entries(index.paths)
      .map(([path, item]) => [item.$ref.replace(/^\.\/endpoints\/(.*)\.yaml$/, '$1'), path]));
    expect(Object.keys(registered).sort()).toEqual(Object.keys(endpoints).sort());
    for (const [name, pathItem] of Object.entries(endpoints)) {
      for (const operation of Object.values(pathItem)) {
        expect(operation['x-path'], `${name} ${operation.operationId}`).toEqual(registered[name]);
      }
    }
  });

  it('only renders pages that do not also exist as mdoc', () => {
    const { pages } = loadSpec();
    for (const id of Object.keys(pages)) {
      expect(fs.existsSync(`src/content/api/${id}.mdoc`), id).toBe(false);
    }
  });
});

describe('markdown rendering', () => {
  it('gives headings their precomputed anchors in order', () => {
    const [segment] = createMarkdownRenderer(['errors', 'errors-1'])('### Errors\n\n### Errors');
    expect(segment.html).toContain('<h3 id="errors">Errors</h3>');
    expect(segment.html).toContain('<h3 id="errors-1">Errors</h3>');
  });

  it('splits code fences out with their language and title', () => {
    const segments = createMarkdownRenderer()('Before.\n\n```bash title="Barcode Breakdown"\n9 9 9\n```\n\nAfter.');
    expect(segments.map(segment => segment.kind)).toEqual(['html', 'code', 'html']);
    expect(segments[1]).toEqual({ kind: 'code', code: '9 9 9', lang: 'bash', title: 'Barcode Breakdown' });
  });
});

describe('page sections', () => {
  const operations = {
    createThing: {
      operationId: 'createThing',
      summary: 'Create a Thing',
      description: 'Creates a thing.',
      'x-experimental': true,
      requestBody: { content: { 'application/json': { examples: {
        default: { value: {} },
        bulk: { summary: 'Bulk Example', description: 'Creates many.', value: {} },
      } } } },
    },
  };

  it('renders a named example as its own section without the operation badges', () => {
    const page = { sections: [{ endpoint: 'createThing' }, { endpoint: 'createThing', example: 'bulk', depth: 3 }] };
    const [main, example] = getPageSections(page, { models: {}, operations });
    expect(main).toMatchObject({ title: 'Create a Thing', badges: ['experimental'], anchor: 'create-a-thing' });
    expect(example).toMatchObject({
      title: 'Bulk Example',
      description: 'Creates many.',
      exampleName: 'bulk',
      badges: [],
      anchor: 'bulk-example',
      depth: 3,
    });
  });

  it('draws a rule above sections unless they opt out', () => {
    const page = { sections: [{ endpoint: 'createThing', rule: false }, { title: 'Notes' }] };
    expect(getPageSections(page, { models: {}, operations }).map(section => section.rule)).toEqual([false, true]);
  });
});
