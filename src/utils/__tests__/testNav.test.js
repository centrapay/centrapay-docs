import TestNav from '../testNav';

describe('Navigation', () => {
  describe('create', () => {
    test('returns TestNav object', () => {
      expect(TestNav.create({})).toEqual({
        menu: {
          children: []
        },
        pathToActiveNav: undefined,
      });
    });

    test('menu is empty when content is empty', () => {
      expect(TestNav.create({ content: [] })).toEqual({
        menu: {
          children: []
        },
        pathToActiveNav: undefined,
      });
    });

    test('Children is populated with single title nav entry', () => {
      expect(TestNav.create({
        nav: [
          {
            title: 'API',
          }
        ],
        content: []
      })).toEqual({
        menu: {
          children: [
            {
              title: 'API',
              children: []
            }
          ]
        },
        pathToActiveNav: undefined,
      });
    });

    test('Content is child of nav', () => {
      expect(TestNav.create({
        nav: [
          {
            title: 'API',
          }
        ],
        content: [
          {
            data: {
              nav: {
                path: 'API'
              }
            }
          }
        ],
      })).toEqual({
        menu: {
          children: [
            {
              title: 'API',
              children: [
                {
                  data: {
                    nav: {
                      path: 'API'
                    }
                  }
                }
              ],
            }
          ]
        },
        pathToActiveNav: undefined,
      });
    });

    test('Content is children of different nav', () => {
      expect(TestNav.create({
        nav: [
          {
            title: 'API',
          },
          {
            title: 'Reference',
          }
        ],
        content: [
          {
            data: {
              title: 'content 1',
              nav: {
                path: 'API'
              }
            }
          },
          {
            data: {
              title: 'content 2',
              nav: {
                path: 'Reference'
              }
            }
          },
          {
            data: {
              title: 'content 3',
              nav: {
                path: 'Reference'
              }
            }
          },
        ],
      })).toEqual({
        menu: {
          children: [
            {
              title: 'API',
              children: [
                {
                  data: {
                    title: 'content 1',
                    nav: {
                      path: 'API'
                    }
                  }
                }
              ],
            },
            {
              title: 'Reference',
              children: [
                {
                  data: {
                    title: 'content 2',
                    nav: {
                      path: 'Reference'
                    }
                  }
                },
                {
                  data: {
                    title: 'content 3',
                    nav: {
                      path: 'Reference'
                    }
                  }
                }
              ],
            },
          ]
        },
        pathToActiveNav: undefined,
      });
    });
  });
});
