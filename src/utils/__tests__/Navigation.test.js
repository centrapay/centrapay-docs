import Navigation from '../Navigation';

describe('Navigation', () => {
  describe('create', () => {
    it('should create the navigation menu when passed an array of content pages', () => {
      const content = [
        {
          collection: 'guides',
          slug: 'farmlands-pos-integration',
          data: {
            title: 'POS Integration Guide',
            nav: {
              path: 'Connections/Farmlands',
              order: 1
            },
          },
        },
        {
          collection: 'guides',
          slug: 'point-of-sale',
          data: {
            title: 'Point of Sale',
            nav: {
              path: 'Reference/Merchant Integrations',
              title: 'overridden title',
              order: 2
            },
          },
        },
        {
          collection: 'guides',
          slug: 'line-items',
          data: {
            title: 'Line Items',
            nav: {
              path: 'Reference/Merchant Integrations',
              order: 1
            },
          },
        },
      ];
      const navigation = Navigation.create({ baseUrl: 'https://www.baseurl', content });
      expect(navigation.menu).toEqual({
        children: [
          {
            title: 'Reference',
            to: '/reference/',
            icon: 'Receipt',
            children: [
              {
                title: 'Merchant Integrations',
                to: '/guides/line-items/',
                children: [
                  {
                    title: 'Line Items',
                    to: '/guides/line-items/',
                    children: [],
                  },
                  {
                    title: 'overridden title',
                    to: '/guides/point-of-sale/',
                    children: [],
                  },
                ]
              }
            ]
          },
          {
            title: 'Connections',
            to: '/connections/',
            icon: 'Connections',
            children: [
              {
                title: 'Farmlands',
                to: '/connections/farmlands/',
                children: [
                  {
                    title: 'POS Integration Guide',
                    to: '/guides/farmlands-pos-integration/',
                    children: [],
                  }
                ]
              }
            ]
          },
          {
            title: 'API',
            to: 'https://www.baseurl/api',
            icon: 'Settings',
            children: [],
          }
        ]});
    });
  });
});
