/* eslint-disable complexity */
const { listSiteLinks } = require('../utils/listSiteLinks');

test('the build should not break any links', () => {
  const uniqueLinks = listSiteLinks('_site');
  const sortedLinks = Array.from(uniqueLinks).sort();
  expect(sortedLinks).toMatchSnapshot();
});

