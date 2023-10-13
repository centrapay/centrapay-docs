import Navigation from '../Navigation';

describe('Navigation', () => {
  describe('create', () => {
    test('returns Navigation object', () => {
      expect(Navigation.create({})).toEqual({
        items: [],
      });
    });

    test('menu is empty when content is empty', () => {
      expect(Navigation.create({ content: [] })).toEqual({
        items: [],
      });
    });

    test('Children is populated with single title nav entry', () => {
      expect(
        Navigation.create({
          nav: [
            {
              title: 'API',
            },
          ],
          content: [],
        })
      ).toEqual({
        items: [
          {
            title: 'API',
            children: [],
          },
        ],
      });
    });

    test('Content is child of nav', () => {
      expect(
        Navigation.create({
          nav: [
            {
              title: 'API',
            },
          ],
          content: [
            {
              data: {
                nav: {
                  path: 'API',
                },
              },
            },
          ],
        })
      ).toEqual({
        items: [
          {
            title: 'API',
            children: [
              expect.objectContaining({
                nav: {
                  path: 'API',
                },
              }),
            ],
          },
        ],
      });
    });

    test('Content is children of different nav', () => {
      expect(
        Navigation.create({
          nav: [
            {
              title: 'API',
            },
            {
              title: 'Reference',
            },
          ],
          content: [
            {
              data: {
                title: 'content 1',
                nav: {
                  path: 'API',
                },
              },
            },
            {
              data: {
                title: 'content 2',
                nav: {
                  path: 'Reference',
                },
              },
            },
            {
              data: {
                title: 'content 3',
                nav: {
                  path: 'Reference',
                },
              },
            },
          ],
        })
      ).toEqual({
        items: [
          {
            title: 'API',
            children: [
              expect.objectContaining({
                title: 'content 1',
                nav: {
                  path: 'API',
                },
              }),
            ],
          },
          {
            title: 'Reference',
            children: [
              expect.objectContaining({
                title: 'content 2',
                nav: {
                  path: 'Reference',
                },
              }),
              expect.objectContaining({
                title: 'content 3',
                nav: {
                  path: 'Reference',
                },
              }),
            ],
          },
        ],
      });
    });

    test('Nav has child navs', () => {
      expect(
        Navigation.create({
          nav: [
            {
              title: 'API',
              children: [
                {
                  title: 'API Guide',
                },
                {
                  title: 'API Integration',
                },
              ],
            },
          ],
          content: [
            {
              data: {
                nav: {
                  path: 'API/API Guide',
                },
              },
            },
            {
              data: {
                nav: {
                  path: 'API/API Integration',
                },
              },
            },
          ],
        })
      ).toEqual({
        items: [
          {
            title: 'API',
            children: [
              {
                title: 'API Guide',
                children: [
                  expect.objectContaining({
                    nav: {
                      path: 'API/API Guide',
                    },
                  }),
                ],
              },
              {
                title: 'API Integration',
                children: [
                  expect.objectContaining({
                    nav: {
                      path: 'API/API Integration',
                    },
                  }),
                ],
              },
            ],
          },
        ],
      });
    });

    test('A page can be a sibling of a nav group', () => {
      expect(
        Navigation.create({
          nav: [
            {
              title: 'API',
              children: [
                {
                  title: 'API Guide',
                },
                {
                  title: 'API Integration',
                  children: [
                    {
                      title: 'Merchants',
                    },
                  ],
                },
              ],
            },
          ],
          content: [
            {
              data: {
                nav: {
                  path: 'API/API Guide',
                },
              },
            },
            {
              data: {
                nav: {
                  path: 'API/API Integration',
                },
              },
            },
            {
              data: {
                nav: {
                  path: 'API/API Integration/Merchants',
                },
              },
            },
          ],
        })
      ).toEqual({
        items: [
          {
            title: 'API',
            children: [
              {
                title: 'API Guide',
                children: [
                  expect.objectContaining({
                    nav: {
                      path: 'API/API Guide',
                    },
                  }),
                ],
              },
              {
                title: 'API Integration',
                children: [
                  expect.objectContaining({
                    nav: {
                      path: 'API/API Integration',
                    },
                  }),
                  {
                    title: 'Merchants',
                    children: [
                      {
                        nav: {
                          path: 'API/API Integration/Merchants',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
    });

    test('Headings are rendered', () => {
      expect(
        Navigation.create({
          nav: [
            {
              title: 'Reference',
              children: [
                {
                  title: 'Merchant Integrations',
                },
              ]
            },
          ],
          content: [
            {
              data: {
                nav: {
                  path: 'Reference/Merchant Integrations',
                },
              },
              headings: [
                { depth: 2, slug: 'restrictions', text: 'Restrictions' },
                { depth: 2, slug: 'pre-auth-flow', text: 'Pre Auth Flow' },
              ]
            },
          ],
        })
      ).toEqual({
        items: [
          {
            title: 'Reference',
            children: [
              {
                title: 'Merchant Integrations',
                children: [
                  expect.objectContaining({
                    nav: {
                      path: 'Reference/Merchant Integrations',
                    },
                    headings: [
                      { depth: 2, slug: 'restrictions', text: 'Restrictions' },
                      { depth: 2, slug: 'pre-auth-flow', text: 'Pre Auth Flow' },
                    ]
                  }),
                ],
              },
            ]
          }
        ],
      });
    });

    test('Nav group properties', () => {
      expect(
        Navigation.create({
          nav: [
            {
              title: 'API',
              href: 'https://www.example.com',
              icon: 'api-icon',
            },
          ],
        })
      ).toEqual({
        items: [
          {
            title: 'API',
            href: 'https://www.example.com',
            icon: 'api-icon',
            children: [],
          },
        ],
      });
    });
  });
});
