export default {
  method: 'PUT',
  path: '/api/merchants/5ee0c486308f590260d9a07f/configs/mc_5ee168e8597be5002af7baed',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      paymentOptions: [
        {
          type: 'bitcoin.main'
        },
        {
          type: 'centrapay.nzd.test',
          walletId: '1234c486308f3f0a23f0f92b'
        },
        {
          type: 'farmlands.nzd.main',
          farmlandsMerchantNumber: 'DbgY2SyD5M85zkePJjsQEf'
        }
      ]
    },
  },
  response: {
    id: 'mc_5ee168e8597be5002af7baed',
    merchantId: '5ee0c486308f590260d9a07f',
    createdAt: '2021-09-12T01:17:46.499Z',
    updatedAt: '2021-12-12T01:17:46.499Z',
    createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    updatedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    paymentOptions: [
      {
        type: 'bitcoin.main'
      },
      {
        type: 'centrapay.nzd.test',
        walletId: '1234c486308f3f0a23f0f92b'
      },
      {
        type: 'farmlands.nzd.main',
        farmlandsMerchantNumber: 'DbgY2SyD5M85zkePJjsQEf'
      }
    ]
  }
};
