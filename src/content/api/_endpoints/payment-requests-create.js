export default {
  method: 'POST',
  path: '/api/payment-requests',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      configId: 'mc_5efbe2fb96c08357bb2b9242',
      expirySeconds: '120',
      value: {
        amount: '10000',
        currency: 'NZD'
      },
      lineItems: [
        {
          name: 'Hard Hat',
          sku: 'GH1234',
          qty: '1',
          price: '4000',
          tax: '15',
          discount: '400'
        },
        {
          name: 'Tool Belt',
          sku: 'GH1234',
          qty: '1',
          price: '6000',
          tax: '15',
          discount: '600'
        }
      ],
      connectionId: 'cn_9asd9k19',
    },
  },
  response: {
    id: 'VYowvZmuw3hbp1va9xqWx7',
    shortCode: 'CP-X4V-6N',
    url: 'https://app.centrapay.com/pay/VYowvZmuw3hbp1va9xqWx7',
    merchantId: '5efbe17d96c083633e2b9241',
    merchantName: 'NZD Test Merchant',
    configId: 'mc_5efbe2fb96c08357bb2b9242',
    value: {
      amount: '9000',
      currency: 'NZD'
    },
    paymentOptions: [
      {
        assetType: 'centrapay.nzd.test',
        amount: '9000'
      },
      {
        assetType: 'cca.coke.test',
        amount: '9000'
      },
      {
        assetType: 'farmlands.nzd.test',
        amount: '9000'
      },
      {
        assetType: 'quartz.nzd.test',
        amount: '9000'
      },
      {
        assetType: 'uplinkapi.test',
        amount: '9000'
      },
      {
        assetType: 'epay.test',
        amount: '9000',
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
    remainingAmount: '9000',
    lineItems: [
      {
        name: 'Hard Hat',
        sku: 'GH1234',
        qty: '1',
        price: '4000',
        tax: '15',
        discount: '400'
      },
      {
        name: 'Tool Belt',
        sku: 'GH1234',
        qty: '1',
        price: '6000',
        tax: '15',
        discount: '600'
      }
    ],
    connectionId: 'cn_9asd9k19',
    connectionStatus: 'active',
  }
};
