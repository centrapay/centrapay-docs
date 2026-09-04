import { describe, expect, it } from 'vitest';
import {
  buildPageEntries,
  expandIdentifiers,
  hrefForFilepath,
  navPath,
  normalizeWhitespace,
} from '../flexsearch';

const frontMatter = {
  title: 'Tokens',
  description: 'Token models and related endpoints',
  nav: { path: 'Assets', order: 5 },
};

function build(content, overrides = {}) {
  return buildPageEntries({
    href: '/api/tokens',
    path: ['Assets', 'Tokens'],
    frontMatter: { ...frontMatter, ...overrides },
    content,
  });
}

describe('normalizeWhitespace', () => {
  it('collapses runs of whitespace and trims', () => {
    expect(normalizeWhitespace('  a\n\n b  ')).toEqual('a b');
  });

  it('tolerates missing values', () => {
    expect(normalizeWhitespace(undefined)).toEqual('');
  });
});

describe('expandIdentifiers', () => {
  it('splits screaming snake case', () => {
    expect(expandIdentifiers('REMAINING_AMOUNT_EXCEEDED')).toContain('remaining amount exceeded');
  });

  it('splits camel case', () => {
    expect(expandIdentifiers('tokenExpiresAfter')).toContain('token expires after');
  });

  it('ignores single words', () => {
    expect(expandIdentifiers('refund')).toEqual([]);
  });
});

describe('hrefForFilepath', () => {
  it('strips the content root and extension', () => {
    expect(hrefForFilepath('src/content/api/tokens.mdoc')).toEqual('/api/tokens');
  });

  it('serves merchant services under guides', () => {
    expect(hrefForFilepath('src/content/merchant-services/shopify-setup.mdoc'))
      .toEqual('/guides/shopify-setup');
  });
});

describe('buildPageEntries', () => {
  it('indexes the page itself using its frontmatter', () => {
    const [page] = build('Some intro prose.');
    expect(page).toMatchObject({
      href: '/api/tokens',
      title: 'Tokens',
      description: 'Token models and related endpoints',
      path: ['Assets', 'Tokens'],
    });
  });

  it('anchors sections with the slug Markdoc renders', () => {
    const entries = build('## Need help?\n\n## What you\'ll find here');
    expect(entries.map(e => e.href)).toEqual([
      '/api/tokens',
      '/api/tokens#need-help',
      '/api/tokens#what-youll-find-here',
    ]);
  });

  it('excludes badge tags from the title and the anchor', () => {
    const [, section] = build('## Create Token {% badge type="experimental" /%}');
    expect(section.title).toEqual('Create Token');
    expect(section.href).toEqual('/api/tokens#create-token');
  });

  it('disambiguates repeated headings the way the slugger does', () => {
    const entries = build('## Errors\n\n## Errors');
    expect(entries.map(e => e.href)).toEqual([
      '/api/tokens',
      '/api/tokens#errors',
      '/api/tokens#errors-1',
    ]);
  });

  it('indexes property names', () => {
    const [, section] = build([
      '## Token Collection Model',
      '{% properties %}',
      '{% property name="tokenExpiresAfter" type="object" %}',
      'The active duration of all Tokens.',
      '{% /property %}',
      '{% /properties %}',
    ].join('\n'));
    expect(section.content).toContain('tokenExpiresAfter');
    expect(section.content).toContain('The active duration of all Tokens.');
  });

  it('indexes error codes', () => {
    const [, section] = build([
      '## Pay a Payment Request',
      '{% properties heading="Errors" %}',
      '{% error code="403" message="REMAINING_AMOUNT_EXCEEDED" %}',
      'The payment amount exceeds the remaining amount.',
      '{% /error %}',
      '{% /properties %}',
    ].join('\n'));
    expect(section.content).toContain('REMAINING_AMOUNT_EXCEEDED');
    expect(section.content).toContain('remaining amount exceeded');
  });

  it('starts a section for a heading nested inside an endpoint tag', () => {
    const [, section] = build([
      '{% endpoint path="/api/tokens/{tokenId}/refund" filename="tokens-refund" %}',
      '## Refund a Token',
      'Initiates a refund.',
      '{% /endpoint %}',
    ].join('\n'));
    expect(section).toMatchObject({
      href: '/api/tokens#refund-a-token',
      title: 'Refund a Token',
      description: 'Initiates a refund.',
    });
    // The endpoint path belongs to the section its heading opens.
    expect(section.content).toContain('/api/tokens/{tokenId}/refund');
  });

  // The site tokenizes with `ignoreIndentation`, so content indented inside a
  // tag belongs to that tag rather than being treated as a nested block.
  it('reads indented content inside a tag as ordinary section content', () => {
    const [, section] = build([
      '{% endpoint path="/api/payment-requests/{id}/void" filename="void" %}',
      '  ## Void a Payment Request',
      '',
      '  Voiding a payment request will cancel the request.',
      '',
      '  {% properties heading="Errors" %}',
      '    {% error code="403" message="VOID_WINDOW_EXCEEDED" %}',
      '      The void window is closed.',
      '    {% /error %}',
      '  {% /properties %}',
      '{% /endpoint %}',
    ].join('\n'));
    expect(section.description).toEqual('Voiding a payment request will cancel the request.');
    expect(section.content).toContain('VOID_WINDOW_EXCEEDED');
  });

  it('takes the description from prose rather than a property body', () => {
    const [, section] = build([
      '## Token Model',
      '{% properties %}',
      '{% property name="id" type="string" %}',
      'The unique identifier.',
      '{% /property %}',
      '{% /properties %}',
    ].join('\n'));
    expect(section.description).toEqual('');
    expect(section.content).toContain('The unique identifier.');
  });

  it('never leaks Markdoc tag syntax into titles or descriptions', () => {
    const entries = build([
      '## Create Token {% badge type="experimental" /%}',
      '{% properties %}',
      '{% property name="name" type="string" %}',
      'A name.',
      '{% /property %}',
      '{% /properties %}',
    ].join('\n'));
    for (const entry of entries) {
      expect(entry.title).not.toContain('{%');
      expect(entry.description).not.toContain('{%');
    }
  });
});

describe('navPath', () => {
  it('builds a breadcrumb from the nav path and title', () => {
    expect(navPath({ title: 'Tokens', nav: { path: 'Assets' } }))
      .toEqual(['Assets', 'Tokens']);
  });

  it('prefers the nav title when one is given', () => {
    expect(navPath({ title: 'Tokens', nav: { path: 'Assets', title: 'Digital Tokens' } }))
      .toEqual(['Assets', 'Digital Tokens']);
  });

  it('drops segments that only exist to hide a page from the nav', () => {
    expect(navPath({ title: 'Ticketek Ticket Batch', nav: { path: 'Exclude' } }))
      .toEqual(['Ticketek Ticket Batch']);
  });
});

describe('deprecation', () => {
  it('flags a section whose heading carries a deprecated badge', () => {
    const [page, section] = build('## List Merchants {% badge type="deprecated" /%}');
    expect(section).toMatchObject({ title: 'List Merchants', deprecated: true });
    expect(page.deprecated).toBeUndefined();
  });

  it('leaves other badges alone', () => {
    const [, section] = build('## Create Token {% badge type="experimental" /%}');
    expect(section.deprecated).toBeUndefined();
  });
});
