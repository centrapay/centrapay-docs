export default {
  method: 'PUT',
  path: '/api/merchants/5ee0c486308f590260d9a07f/configs/5ee168e8597be5002af7baed',
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
};
