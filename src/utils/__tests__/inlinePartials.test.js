import inlinePartials from '../inlinePartials';

describe('inlinePartials', () => {
  const pagePath = './src/content/guides/payment-terminals.mdoc';

  it('replaces a partial tag with the partial content', async () => {
    const body = 'Intro\n\n{% partial file="../../partials/sales-channel-prerequisites.mdoc" /%}\n\nOutro';
    const result = await inlinePartials(body, pagePath);
    expect(result).not.toContain('{% partial');
    expect(result).toContain('Before you start, you need:');
    expect(result.startsWith('Intro\n\n')).toBe(true);
    expect(result.endsWith('\n\nOutro')).toBe(true);
  });

  it('returns the body unchanged when there are no partials', async () => {
    const body = '## Heading\n\nSome text with {% badge %} tags.';
    expect(await inlinePartials(body, pagePath)).toEqual(body);
  });
});
