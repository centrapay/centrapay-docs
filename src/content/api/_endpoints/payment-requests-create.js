export default {
  method: 'POST',
  path: '/api/payment-requests',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      configId: '5efbe2fb96c08357bb2b9242',
      expirySeconds: '120',
      value: {
        amount: '1',
        currency: 'NZD'
      }
    },
  },
  response: {
    id: 'VYowvZmuw3hbp1va9xqWx7',
    shortCode: 'CP-X4V-6N',
    url: 'https://app.centrapay.com/pay/VYowvZmuw3hbp1va9xqWx7',
    merchantId: '5efbe17d96c083633e2b9241',
    merchantName: 'NZD Test Merchant',
    configId: '5efbe2fb96c08357bb2b9242',
    value: {
      amount: '1',
      currency: 'NZD'
    },
    paymentOptions: [
      {
        assetType: 'centrapay.nzd.test',
        amount: '1'
      },
      {
        assetType: 'cca.coke.test',
        amount: '1'
      },
      {
        assetType: 'farmlands.nzd.test',
        amount: '1'
      },
      {
        assetType: 'quartz.nzd.test',
        amount: '1'
      },
      {
        assetType: 'uplinkapi.test',
        amount: '1'
      },
      {
        assetType: 'epay.nzd.test',
        amount: '1',
        productCodes: [
          '23403'
        ]
      }
    ],
    status: 'new',
    createdAt: '2023-10-23T22:56:46.145Z',
    updatedAt: '2023-10-23T22:56:46.145Z',
    expiresAt: '2023-10-23T22:58:46.145Z',
    liveness: 'test',
    expirySeconds: 120,
    merchantConditions: [],
    createdByAccountId: 'BtCjTpNwFcbuJQUP1c4qXp',
    createdByAccountName: 'Smoke Test Merchant Prod',
    taxNumber: {
      value: '123-456-789',
      type: 'nz-gst'
    },
    remainingAmount: '1'
  }
};
