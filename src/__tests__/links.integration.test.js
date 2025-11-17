import { listSiteLinks } from '../utils/listSiteLinks.js';

test('the build should not break any links', () => {
  const uniqueLinks = listSiteLinks('dist');
  const sortedLinks = Array.from(uniqueLinks).sort();
  expect(sortedLinks).toMatchSnapshot();
}, {timeout: 10000 });
