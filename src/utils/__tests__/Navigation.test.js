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
          slug: 'payment-flows',
          data: {
            title: 'Payment Flows',
            nav: {
              path: 'Reference/Centrapay Experiences',
              title: 'Payment Flows',
              order: 1
            },
          },
        },
        {
          collection: 'guides',
          slug: 'creating-test-money',
          data: {
            title: 'Creating Test Money',
            nav: {
              path: 'Reference/Digital Assets',
              title: 'Creating Test Money',
              order: 1
            },
          },
        },
        {
          collection: 'guides',
          slug: 'example-oidc-consumer',
          data: {
            title: 'Example OIDC Consumer',
            nav: {
              path: 'Reference/App Integrations',
              title: 'Example OIDC Consumer',
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
            to: '/reference',
            icon: 'Receipt',
            children: [
              {
                title: 'Centrapay Experiences',
                to: '/guides/payment-flows',
                children: [
                  {
                    title: 'Payment Flows',
                    to: '/guides/payment-flows',
                    children: [],
                  },
                ]
              },
              {
                title: 'Digital Assets',
                to: '/guides/creating-test-money',
                children: [
                  {
                    title: 'Creating Test Money',
                    to: '/guides/creating-test-money',
                    children: [],
                  },
                ]
              },
              {
                title: 'App Integrations',
                to: '/guides/example-oidc-consumer',
                children: [
                  {
                    title: 'Example OIDC Consumer',
                    to: '/guides/example-oidc-consumer',
                    children: [],
                  },
                ]
              },
              {
                title: 'Merchant Integrations',
                to: '/guides/line-items',
                children: [
                  {
                    title: 'Line Items',
                    to: '/guides/line-items',
                    children: [],
                  },
                  {
                    title: 'overridden title',
                    to: '/guides/point-of-sale',
                    children: [],
                  },
                ]
              }
            ]
          },
          {
            title: 'Connections',
            to: '/connections',
            icon: 'Connections',
            children: [
              {
                title: 'Farmlands',
                to: '/connections/farmlands',
                children: [
                  {
                    title: 'POS Integration Guide',
                    to: '/guides/farmlands-pos-integration',
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
