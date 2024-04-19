export default {
  method: 'GET',
  path: '/api/merchants/5ee0c486308f590260d9a07f/configs',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: [
    {
      id: 'mc_5ee168e8597be5002af7b454',
      merchantId: '5ee0c486308f590260d9a07f',
      createdAt: '2021-09-12T01:17:46.499Z',
      updatedAt: '2021-09-12T01:17:46.499Z',
      createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
      updatedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
      paymentOptions: [
        {
          type: 'farmlands.nzd.main',
          farmlandsMerchantNumber: 'DbgY2SyD5M85zkePJjsQEf'
        }
      ]
    },
    {
      id: 'mc_5ee168e8597be5002af7baed',
      merchantId: '5ee0c486308f590260d9a07f',
      createdAt: '2021-11-12T01:17:46.499Z',
      updatedAt: '2021-11-12T01:17:46.499Z',
      createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
      updatedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
      paymentOptions: [
        {
          type: 'test'
        }
      ]
    }
  ]
};
