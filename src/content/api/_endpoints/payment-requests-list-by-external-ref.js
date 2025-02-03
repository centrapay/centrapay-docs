export default {
  method: 'GET',
  path: '/api/payment-requests/external-ref/e8df06e2-13a5-48b4-b670-3fd6d815fe0a',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
    queryString: {
      merchantAccountId: '1mdj7bj95gjo92r0ux6wfy69gj3h77',
    },
  },
  response: {
    items: [{
      id: 'MhocUmpxxmgdHjr7DgKoKw',
      url: 'https://app.centrapay.com/pay/MhocUmpxxmgdHjr7DgKoKw',
      merchantName: 'Centrapay Café',
      value: {
        currency: 'NZD',
        amount: '8991'
      },
      createdAt: '2021-06-08T04:04:27.426Z',
      expiresAt: '2021-06-08T04:06:27.426Z',
      paymentOptions: [
        {
          amount: '8991',
          assetType: 'centrapay.nzd.test'
        },
        {
          amount: '6190',
          assetType: 'centrapay.token.test',
          acceptedCollections: [
            {
              id: 'QWNB6jurnBczmvXDVfRuMK',
              lineItems: [
                {
                  name: 'Coffee Grounds',
                  sku: 'GH1234',
                  qty: '1',
                  price: '4195',
                  tax: '15.00'
                }
              ]
            }
          ]
        }
      ],
      status: 'new',
      liveness: 'test'
    }],
    pageKey: '12312312',
  }
};
