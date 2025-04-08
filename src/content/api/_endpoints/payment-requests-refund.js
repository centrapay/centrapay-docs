export default {
  method: 'POST',
  path: '/api/payment-requests/MhocUmpxxmgdHjr7DgKoKw/refund',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      value: {
        amount: '3600',
        currency: 'NZD'
      },
      externalRef: 'e8df06e2-13a5-48b4-b670-3fd6d815fe0a',
      lineItems: [
        {
          name: 'Hard Hat',
          sku: 'GH1234',
          qty: '1',
          price: '4000',
          tax: '15',
          discount: '400'
        }
      ]
    },
  },
  response: {
    type: 'refund',
    value: {
      currency: 'NZD',
      amount: '3600'
    },
    assetType: 'centrapay.nzd.main',
    paymentRequestId: 'MhocUmpxxmgdHjr7DgKoKw',
    shortCode: 'CP-C7F-ZS5-015',
    merchantName: 'Centrapay Café',
    merchantId: '5ee0c486308f590260d9a07f',
    merchantAccountId: 'C4QnjXvj8At6SMsEN4LRi9',
    merchantConfigId: 'mc_5ee168e8597be5002af7b454',
    createdAt: '2021-06-12T01:17:00.000Z',
    createdBy: 'crn::user:0af834c8-1110-11ec-9072-3e22fb52e878',
    paymentRequestCreatedBy: 'crn::user:0af834c8-1110-11ec-9072-3e22fb52e878',
    activityNumber: '3',
    invoiceRef: 'sy8CRmo3sp3ArOpnfmb423',
    lineItems: [
      {
        name: 'Hard Hat',
        sku: 'GH1234',
        qty: '1',
        price: '4000',
        tax: '15',
        discount: '400'
      }
    ]
  }
};
