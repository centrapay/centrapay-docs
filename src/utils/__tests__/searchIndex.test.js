import { describe, expect, it } from 'vitest';
import { createSearchIndex, extractSnippet, searchSite } from '../searchIndex';

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
    content: 'assetId, REMAINING_AMOUNT_EXCEEDED The payment amount exceeds the remaining amount available. remaining amount exceeded',
    keywords: 'assetId, REMAINING_AMOUNT_EXCEEDED',
    prose: 'The payment amount exceeds the remaining amount available.',
  },
  2: {
    href: '/guides/partial-payment-extension#remaining-amounts',
    path: ['Guides', 'Partial Payments'],
    title: 'Handling Remaining Amounts',
    description: 'How to display the remaining amount to a cashier.',
    content: 'remaining amount partial payment',
    prose: 'remaining amount partial payment',
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
  // Its content happens to contain every word of the query below, scattered
  // across unrelated sentences — a coincidence FlexSearch's own AND search
  // treats as a match, with nothing in the entry to show why.
  6: {
    href: '/api/asset-programs#unrelated-topic',
    path: ['Assets', 'Unrelated Topic'],
    title: 'Unrelated Topic',
    description: 'Something else entirely.',
    content: 'Our collection of features. Some ids are shown here. Nothing here is invalid.',
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

  it('drops a scattered bag-of-words match with no visible reason to have matched', () => {
    expect(titlesFor('COLLECTION_IDS_INVALID')).not.toContain('Unrelated Topic');
  });

  it('keeps a match whose description covers most of the query terms even without a snippet', () => {
    // "Handling Remaining Amounts" covers "remaining" and "amount" in its
    // description but not "exceeded" — enough to be worth showing.
    expect(titlesFor('remaining amount exceeded')).toContain('Handling Remaining Amounts');
  });

  it('returns entries in full so results can be rendered', () => {
    expect(searchSite(index, 'Payment Requests')[0]).toMatchObject({
      href: '/api/payment-requests',
      path: ['Payments', 'Payment Requests'],
    });
  });

  it('attaches a snippet showing where a body-only match was found', () => {
    const [result] = searchSite(index, 'REMAINING_AMOUNT_EXCEEDED');
    expect(result.title).toEqual('Pay a Payment Request');
    expect(result.snippet.match.toLowerCase()).toEqual('remaining_amount_exceeded');
  });

  it('does not attach a snippet when the entry has no indexed content', () => {
    expect(searchSite(index, 'Payment Requests')[0].snippet).toBeUndefined();
  });
});

describe('extractSnippet', () => {
  it('returns null when the entry has no prose or keywords to search', () => {
    expect(extractSnippet({}, 'anything')).toBeNull();
  });

  it('returns null when the query appears in neither field', () => {
    expect(extractSnippet({ prose: 'remaining amount partial payment' }, 'refund')).toBeNull();
  });

  it('prefers a match in prose, since it reads as a sentence', () => {
    const entry = {
      keywords: 'REMAINING_AMOUNT_EXCEEDED',
      prose: 'The remaining amount was exceeded by the refund.',
    };
    const snippet = extractSnippet(entry, 'remaining');
    expect(snippet.suffix).toContain('amount was exceeded');
  });

  it('falls back to keywords when the match is only there', () => {
    const entry = {
      keywords: 'assetId, REMAINING_AMOUNT_EXCEEDED',
      prose: 'The payment amount exceeds the remaining amount available.',
    };
    const snippet = extractSnippet(entry, 'REMAINING_AMOUNT_EXCEEDED');
    expect(snippet).toEqual({ prefix: '', match: 'REMAINING_AMOUNT_EXCEEDED', suffix: '' });
  });

  // A keyword-only match must show just the matched identifier — not its
  // neighbours in the comma-joined list, and not the unrelated prose that
  // happens to sit next to it in the index.
  it('shows only the matched identifier, not neighbouring keywords or prose', () => {
    const entry = {
      keywords: 'MEDIA_UPLOAD_INVALID, COLLECTION_IDS_INVALID',
      prose: 'The display name of the Asset Program.',
    };
    const snippet = extractSnippet(entry, 'COLLECTION_IDS_INVALID');
    expect(snippet).toEqual({ prefix: '', match: 'COLLECTION_IDS_INVALID', suffix: '' });
  });

  it('finds the exact phrase over a partial word match', () => {
    const snippet = extractSnippet(
      { prose: 'assetId REMAINING_AMOUNT_EXCEEDED remaining amount exceeded' },
      'remaining amount exceeded'
    );
    expect(snippet.match).toEqual('remaining amount exceeded');
  });

  it('falls back to a single word when the full phrase is not present', () => {
    const snippet = extractSnippet({ prose: 'remaining amount partial payment' }, 'remaining amount exceeded');
    expect(snippet.match).toEqual('remaining');
  });

  it('marks a truncated prefix and suffix with an ellipsis', () => {
    const prose = `${'x'.repeat(40)} needle ${'y'.repeat(200)}`;
    const snippet = extractSnippet({ prose }, 'needle');
    expect(snippet.prefix.startsWith('…')).toBe(true);
    expect(snippet.suffix.endsWith('…')).toBe(true);
  });

  it('omits the ellipsis when the match is at the very start of the content', () => {
    const snippet = extractSnippet({ prose: 'needle right at the start' }, 'needle');
    expect(snippet.prefix).toEqual('');
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
