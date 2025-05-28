export default {
  method: 'GET',
  path: '/api/merchants/search',
  request: {
    queryString: {
      origin: '123.42,32.22',
      distance: '100',
      asset: 'epay.main,37873',
      pageKey: '10',
      paginationLimit: '10',
      categoryCode: '1740',
    }
  },
  response: {
    totalItems: 100,
    items: [
      {
        id: 'M001',
        accountId: 'Jaim1Cu1Q55uooxSens6yk',
        name: 'Store 1',
        acceptedAssets: [
          {
            assetType: 'centrapay.nzd.main'
          },
          {
            assetType: 'epay.main',
          },
          {
            assetType: 'centrapay.token.main',
            products: [
              {
                id: 'Xv990BzkgfoDS7bBls50pd'
              }
            ]
          }
        ],
        location: {
          lat: '123.45',
          lng: '32.21',
          city: 'Auckland',
          country: 'NZ',
          postCode: '1234',
          state: 'Auckland',
          street: '2 Street Street',
          suburb: 'Place'
        },
        categoryCode: '1740',
      }
    ],
    nextPageKey: '20'
  }
};
