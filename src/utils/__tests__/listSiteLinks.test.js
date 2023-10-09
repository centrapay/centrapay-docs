const { listSiteLinks } = require('../listSiteLinks');

describe('listSiteLinks', () => {
  it('should return a unique set of links and anchor tags', () => {
    expect(listSiteLinks('src/utils/__tests__/examples/duplicate-paths')).toMatchSnapshot();
  });

  it('should not include any external links', () => {
    expect(listSiteLinks('src/utils/__tests__/examples/external-links')).toMatchSnapshot();
  });

  it('should not include anchor tags that do not go anywhere', () => {
    expect(listSiteLinks('src/utils/__tests__/examples/empty-anchor')).toMatchSnapshot();
  });
});
