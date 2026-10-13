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
            order: 0,
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
            order: 0,
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
            order: 0,
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
            order: 0,
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
            order: 0,
            children: [
              {
                title: 'API Guide',
                order: 0,
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
                order: 0,
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
            order: 0,
            children: [
              {
                title: 'API Guide',
                order: 0,
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
                order: 0,
                children: [
                  expect.objectContaining({
                    nav: {
                      path: 'API/API Integration',
                    },
                  }),
                  {
                    title: 'Merchants',
                    order: 0,
                    children: [
                      expect.objectContaining({
                        nav: {
                          path: 'API/API Integration/Merchants',
                        },
                      }),
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
                { depth: 2, id: 'restrictions', text: 'Restrictions' },
                { depth: 2, id: 'pre-auth-flow', text: 'Pre Auth Flow' },
              ]
            },
          ],
        })
      ).toEqual({
        items: [
          {
            title: 'Reference',
            order: 0,
            children: [
              {
                title: 'Merchant Integrations',
                order: 0,
                children: [
                  expect.objectContaining({
                    nav: {
                      path: 'Reference/Merchant Integrations',
                    },
                    headings: [
                      { depth: 2, id: 'restrictions', text: 'Restrictions' },
                      { depth: 2, id: 'pre-auth-flow', text: 'Pre Auth Flow' },
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
            order: 0,
            href: 'https://www.example.com',
            icon: 'api-icon',
            children: [],
          },
        ],
      });
    });

    test('Nav group ordering', () => {
      expect(
        Navigation.create({
          nav: [
            {
              title: 'API',
              children: [
                {
                  title: 'Guides',
                  order: 3
                },
                {
                  title: 'Integrations',
                  order: 2
                },
              ],
            },
          ],
          content: [
            {
              data: {
                title: 'API 1',
                nav: {
                  path: 'API',
                  order: 1
                },
              },
            },
            {
              data: {
                title: 'Guide 2',
                nav: {
                  path: 'API/Guides',
                  order: 2
                },
              },
            },
            {
              data: {
                title: 'Guide 1',
                nav: {
                  path: 'API/Guides',
                  order: 1
                },
              },
            },
            {
              data: {
                title: 'Integration 1',
                nav: {
                  path: 'API/Integrations',
                  order: 1,
                },
              },
            },
          ],
        })
      ).toEqual({
        items: [
          {
            title: 'API',
            order: 0,
            children: [
              expect.objectContaining({
                title: 'API 1',
                nav: {
                  path: 'API',
                  order: 1,
                },
              }),
              {
                title: 'Integrations',
                order: 2,
                children: [
                  expect.objectContaining({
                    title: 'Integration 1',
                    nav: {
                      order: 1,
                      path: 'API/Integrations',
                    },
                  }),
                ],
              },
              {
                title: 'Guides',
                order: 3,
                children: [
                  expect.objectContaining({
                    title: 'Guide 1',
                    nav: {
                      order: 1,
                      path: 'API/Guides',
                    },
                  }),
                  expect.objectContaining({
                    title: 'Guide 2',
                    nav: {
                      order: 2,
                      path: 'API/Guides',
                    },
                  }),
                ],
              },
            ],
          },
        ],
      });
    });
  });
});
