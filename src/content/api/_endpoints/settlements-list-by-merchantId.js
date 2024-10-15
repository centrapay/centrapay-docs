export default {
  method: 'GET',
  path: '/api/merchants/5ee0c486308f590260d9a07f/settlements',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    items: [
      {
        id: '89028sh9308f590260d9a07f',
        status: 'confirmed',
        assetType: 'centrapay.nzd.main',
        currency: 'NZD',
        createdAt: '2021-11-12T01:17:46.499Z',
        createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
        settledAt: '2021-11-13T11:59:59.999Z',
        settledBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
        settlementAmount: '2500',
        settlementBankAccountId: '67e0c486308f590260d9a139',
        type: 'centrapay',
        test: false
      },
      {
        id: '9ds2cs89028sh90260d9f91h',
        status: 'awaiting-confirmation',
        assetType: 'centrapay.nzd.main',
        currency: 'NZD',
        createdAt: '2021-11-13T01:17:46.499Z',
        createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
        settlementAmount: '2200',
        settlementBankAccountId: '67e0c486308f590260d9a139',
        type: 'centrapay',
        test: false
      }
    ]
  }
};
