export default {
  method: 'GET',
  path: '/api/merchants/search',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
    queryString: {
      origin: '123.42,32.22',
      distance: '100',
      asset: 'epay.nzd.main,37873',
      pageKey: '10',
      paginationLimit: '10',
    }
  },
  response: {
    totalItems: 100,
    items: [
      {
        id: 'M001',
        name: 'Store 1',
        acceptedAssets: [
          {
            assetType: 'centrapay.nzd.main'
          },
          {
            assetType: 'epay.nzd.main',
            products: [
              {
                id: '37873'
              },
              {
                id: '38183'
              }
            ]
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
        }
      }
    ],
    nextPageKey: '20'
  }
};
