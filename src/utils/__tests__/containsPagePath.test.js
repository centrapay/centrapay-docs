import containsPagePath from '../containsPagePath';

describe('containsPagePath', () => {
  const path = '/api/test';
  it('first child contains page path', () => {
    const navigationItem = {
      title: 'parent',
      children: [
        {
          title: 'first-child',
          path: '/api/test'
        },
      ]
    };
    expect(containsPagePath({ navigationItem, path })).toEqual(true);
  });
  it('second child contains page path', () => {
    const navigationItem = {
      title: 'parent',
      children: [
        {
          title: 'first-child',
          path: '/invalid-path',
          children: [
            {
              title: 'second-child',
              path: '/api/test'
            }
          ]
        },
      ]
    };
    expect(containsPagePath({ navigationItem, path })).toEqual(true);
  });
  it('child does not contain page path', () => {
    const navigationItem = {
      title: 'parent',
      children: [
        {
          title: 'first-child',
          path: '/invalid-path',
        },
      ]
    };
    expect(containsPagePath({ navigationItem, path })).toEqual(false);
  });
});
