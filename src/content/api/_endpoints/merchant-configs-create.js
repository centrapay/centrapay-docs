export default {
  method: 'POST',
  path: '/api/merchants/5ee0c486308f590260d9a07f/configs',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      paymentOptions: [
        {
          type: 'centrapay.nzd.main',
          walletId: '1234c486308f3f0a23f0f92b'
        },
        {
          type: 'epay.nzd.main',
          terminalId: '11000021'
        },
        {
          type: 'farmlands.nzd.main',
          farmlandsMerchantNumber: 'DbgY2SyD5M85zkePJjsQEf'
        }
      ]
    },
  },
};
