export default {
  method: 'POST',
  path: '/api/collections/NFhUgPQEYbk2EbTXAYArTX/redemption-conditions',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      merchantId: '36EALpZ89XpShxM2Ee9sXT',
      allowedProducts: [
        {
          sku: '100001',
          name: 'White Bread',
          maxValue: {
            currency: 'NZD',
            amount: '400'
          }
        },
        {
          sku: '100002',
          name: 'Sourdough Bread',
          maxValue: {
            currency: 'NZD',
            amount: '800'
          }
        }
      ]
    },
  },
};
