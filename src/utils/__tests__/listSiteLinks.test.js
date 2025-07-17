import { listSiteLinks } from '../listSiteLinks.js';

describe('listSiteLinks', () => {
  it('should return the set of possible site links', () => {
    expect(listSiteLinks('src/utils/__tests__/examples/happy')).toMatchSnapshot();
  });
});
