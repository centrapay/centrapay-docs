import fs from 'fs';
import { load as loadYaml } from 'js-yaml';
import { describe, expect, it } from 'vitest';
import {
  orderEndpoints,
  getPaymentRequestsSections,
  firstParagraph,
} from '../openApiPage';

function loadSpec() {
  const index = loadYaml(fs.readFileSync('src/content/api/openapi/index.yaml', 'utf8'));
  const endpointFiles = fs
    .readdirSync('src/content/api/openapi/endpoints')
    .filter(file => file.endsWith('.yaml'))
    .sort()
    .map(file => ({
      name: file.replace(/\.yaml$/, ''),
      operations: Object.values(loadYaml(
        fs.readFileSync(`src/content/api/openapi/endpoints/${file}`, 'utf8')
      )),
    }));
  const models = {};
  for (const file of fs.readdirSync('src/content/api/openapi/models')) {
    if (file.endsWith('.yaml')) {
      models[file.replace(/\.yaml$/, '')] = loadYaml(
        fs.readFileSync(`src/content/api/openapi/models/${file}`, 'utf8')
      );
    }
  }
  return { index, endpointFiles, models };
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
  it('orders endpoints following index.yaml paths', () => {
    const { index, endpointFiles } = loadSpec();
    const ordered = orderEndpoints(index, endpointFiles);
    expect(ordered.map(endpoint => endpoint.operationId)).toEqual([
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
    const { index, endpointFiles, models } = loadSpec();
    const page = index.info['x-page'];
    const sections = getPaymentRequestsSections({
      models: page.models.map(name => ({ name, title: models[name]['x-title'] })),
      extras: page.extras,
      endpoints: orderEndpoints(index, endpointFiles),
    });
    expect(sections.map(section => section.anchor)).toEqual(EXPECTED_ANCHORS);
  });

  it('takes the first paragraph of prose', () => {
    expect(firstParagraph('First.\n\nSecond.')).toEqual('First.');
    expect(firstParagraph(undefined)).toEqual('');
  });
});
