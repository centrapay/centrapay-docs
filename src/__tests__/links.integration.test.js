const { listSiteLinks } = require('../utils/listSiteLinks');

test('the build should not break any links', () => {
  const uniqueLinks = listSiteLinks('dist');
  const sortedLinks = Array.from(uniqueLinks).sort();
  expect(sortedLinks).toMatchSnapshot();
});

