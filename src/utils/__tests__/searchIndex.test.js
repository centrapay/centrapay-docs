import { describe, expect, it } from 'vitest';
import { createSearchIndex, searchSite } from '../searchIndex';

const data = {
  0: {
    href: '/api/payment-requests',
    path: ['Payments', 'Payment Requests'],
    title: 'Payment Requests',
    description: 'Payment Request models and related endpoints',
  },
  1: {
    href: '/api/payment-requests#pay-a-payment-request',
    path: ['Payments', 'Payment Requests'],
    title: 'Pay a Payment Request',
    description: 'This endpoint allows you to pay a Payment Request.',
    content: 'assetId REMAINING_AMOUNT_EXCEEDED remaining amount exceeded',
  },
  2: {
    href: '/guides/partial-payment-extension#remaining-amounts',
    path: ['Guides', 'Partial Payments'],
    title: 'Handling Remaining Amounts',
    description: 'How to display the remaining amount to a cashier.',
    content: 'remaining amount partial payment',
  },
  3: {
    href: '/api/merchants#list-merchants-for-account',
    path: ['Merchants', 'Merchants'],
    title: 'List Merchants for Account',
    description: 'Lists the Merchants belonging to an Account.',
  },
  // Superseded by the entry above, and says so — as deprecated sections tend to.
  4: {
    href: '/api/merchants#list-merchants',
    path: ['Merchants', 'Merchants'],
    title: 'List Merchants',
    description: 'Deprecated. Use List Merchants for Account instead.',
    deprecated: true,
  },
  // Deprecated with nothing live covering the same ground.
  5: {
    href: '/api/bank-accounts#verify-bank-authority',
    path: ['Bank Accounts', 'Bank Accounts'],
    title: 'Verify Bank Authority',
    description: 'Verifies a Bank Authority.',
    deprecated: true,
  },
};

const index = createSearchIndex(data);
const titlesFor = query => searchSite(index, query).map(entry => entry.title);

describe('searchSite', () => {
  it('returns nothing for an empty query', () => {
    expect(searchSite(index, '   ')).toEqual([]);
  });

  it('finds an error code that only appears in body content', () => {
    expect(titlesFor('REMAINING_AMOUNT_EXCEEDED')[0]).toEqual('Pay a Payment Request');
  });

  it('finds that error code from its natural language form', () => {
    expect(titlesFor('remaining amount exceeded')[0]).toEqual('Pay a Payment Request');
  });

  it('ranks a full content match above a partial title match', () => {
    const titles = titlesFor('remaining amount exceeded');
    expect(titles.indexOf('Pay a Payment Request'))
      .toBeLessThan(titles.indexOf('Handling Remaining Amounts'));
  });

  it('ranks an exact title match first', () => {
    expect(titlesFor('Payment Requests')[0]).toEqual('Payment Requests');
  });

  it('matches on a word from the description', () => {
    expect(titlesFor('cashier')).toContain('Handling Remaining Amounts');
  });

  it('returns entries in full so results can be rendered', () => {
    expect(searchSite(index, 'Payment Requests')[0]).toMatchObject({
      href: '/api/payment-requests',
      path: ['Payments', 'Payment Requests'],
    });
  });
});

describe('deprecated results', () => {
  // "List Merchants" is the exact title, so it outscores "List Merchants for
  // Account" on match quality alone. The demotion is what reverses that.
  it('ranks a live page above its deprecated equivalent', () => {
    const [first] = searchSite(index, 'list merchants');
    expect(first.href).toEqual('/api/merchants#list-merchants-for-account');
    expect(first.deprecated).toBeUndefined();
  });

  it('still returns the deprecated equivalent', () => {
    expect(searchSite(index, 'list merchants').map(entry => entry.href))
      .toContain('/api/merchants#list-merchants');
  });

  it('keeps a deprecated page first when nothing live covers the topic', () => {
    expect(searchSite(index, 'verify bank authority')[0].href)
      .toEqual('/api/bank-accounts#verify-bank-authority');
  });

  it('does not demote when the query asks for deprecated docs', () => {
    expect(searchSite(index, 'deprecated list merchants')[0].href)
      .toEqual('/api/merchants#list-merchants');
  });
});
