export default {
  method: 'GET',
  path: '/api/payment-requests/MhocUmpxxmgdHjr7DgKoKw',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    id: 'MhocUmpxxmgdHjr7DgKoKw',
    shortCode: 'CP-C7F-ZS5',
    url: 'https://app.centrapay.com/pay/MhocUmpxxmgdHjr7DgKoKw',
    patronCodeId: 'V17FByEP9gm1shSG6a1Zzx',
    barcode: '9990001234567895',
    merchantId: '26d3Cp3rJmbMHnuNJmks2N',
    merchantName: 'Centrapay Café',
    configId: '5efbe2fb96c08357bb2b9242',
    purchaseOrderRef: 'oF6kj1QlH5gK0y9rjRHFh2',
    invoiceRef: 'sy8CRmo3sp3ArOpnfmb423',
    value: {
      currency: 'NZD',
      amount: '8991'
    },
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
    merchantConditions: [
      {
        id: '1',
        name: 'photo-id-check',
        message: 'Please check ID',
        status: 'awaiting-merchant'
      }
    ],
    paidBy: {
      assetTotals: [
        {
          type: 'centrapay.nzd.test',
          description: 'Centrapay NZD Test',
          settlementDate: '2026-02-11T00:31:31.661Z',
          total: {
            amount: '1000',
            currency: 'NZD'
          },
          payerAccountId: 'Bn8Wawd21Y2yoGb2KuSdK2'
        }
      ]
    },
    status: 'new',
    createdAt: '2021-06-08T04:04:27.426Z',
    updatedAt: '2021-06-08T04:04:27.426Z',
    expiresAt: '2021-06-08T04:06:27.426Z',
    liveness: 'test',
    expirySeconds: 120,
    connectionId: 'cn_9asd9k19',
    connectionStatus: 'active',
  }
};
