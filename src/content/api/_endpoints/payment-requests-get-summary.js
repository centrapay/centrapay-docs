export default {
  method: 'GET',
  path: '/api/payment-requests/MhocUmpxxmgdHjr7DgKoKw/summary',
  response: {
    id: 'MhocUmpxxmgdHjr7DgKoKw',
    url: 'https://app.centrapay.com/pay/MhocUmpxxmgdHjr7DgKoKw',
    merchantId: '26d3Cp3rJmbMHnuNJmks2N',
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
    partialAllowed: true,
    basketAmount: '8991',
    remainingAmount: '8991',
    status: 'new',
    lineItems: [
      {
        name: 'Coffee Grounds',
        sku: 'GH1234',
        qty: '1',
        price: '4195',
        tax: '15.00'
      },
      {
        name: 'Centrapay Cafe Mug',
        sku: 'SB456',
        qty: '25',
        price: '1995',
        tax: '15.00',
        discount: '199'
      }
    ],
    liveness: 'test'
  }
};
