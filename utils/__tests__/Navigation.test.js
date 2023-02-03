import Navigation from '../Navigation';

describe('Navigation', () => {
  describe('create', () => {
    it('should create the navigation menu when passed an array of content pages', () => {
      const content = [
        {
          _path: '/guides/farmlands-pos-integration',
          title: 'POS Integration Guide',
          nav: {
            path: 'Connections/Farmlands',
            order: 1
          },
        },
        {
          _path: '/guides/point-of-sale',
          title: 'Point of Sale',
          nav: {
            path: 'Reference/Merchant Integrations',
            title: 'overridden title',
            order: 2
          },
        },
        {
          _path: '/guides/line-items',
          title: 'Line Items',
          nav: {
            path: 'Reference/Merchant Integrations',
            order: 1
          },
        },
      ];
      Navigation.create({ baseUrl: 'https://www.baseurl', content });
      const menu = Navigation.getMenu();
      expect(menu).toEqual({
        children: [
          {
            title: 'Reference',
            to: '/reference',
            icon: 'receipt',
            children: [
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
            icon: 'connections',
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
            icon: 'settings',
            children: [],
          }
        ]});
    });
  });

  describe('getCurrentNavPath', () => {
    it('should return nav path when the current route has no trailing slash', () => {
      Navigation.create({ baseUrl: 'https://www.baseurl', content: [] });
      const result = Navigation.getCurrentNavPath('Connections/Farmlands');
      expect(result).toEqual('Connections/Farmlands');
    });

    it('should strip trailing slash from nav path when the current route has a trailing slash', () => {
      Navigation.create({ baseUrl: 'https://www.baseurl', content: [] });
      const result = Navigation.getCurrentNavPath('Connections/Farmlands/');
      expect(result).toEqual('Connections/Farmlands');
    });

    it('should map current route to nav path when the current route must be mapped', () => {
      Navigation.create({
        baseUrl: 'https://www.baseurl',
        content: [
          {
            _path: '/guides/farmlands-pos-integration',
            title: 'Farmlands POS Integration',
            nav: {
              path: 'Connections/Farmlands',
              order: 1
            },
          },
        ]
      });
      const result = Navigation.getCurrentNavPath('/guides/farmlands-pos-integration');
      expect(result).toEqual('/connections/farmlands/farmlands-pos-integration');
    });
  });
});
