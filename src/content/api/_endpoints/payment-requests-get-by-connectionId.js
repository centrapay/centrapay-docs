export default {
  method: 'GET',
  path: '/api/connections/cn_9asd9k19/latest-payment-request',
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
    value: {
      currency: 'NZD',
      amount: '100'
    },
    paymentOptions: [
      {
        amount: '100',
        assetType: 'centrapay.nzd.test'
      }
    ],
    merchantConditions: [

    ],
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
