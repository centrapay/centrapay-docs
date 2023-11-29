export default {
  method: 'POST',
  path: '/api/collections',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      name: 'Bread',
      accountId: 'T3y6hogYA4d612BExypWYH',
      tokenExpiresAfter: {
        period: 'month',
        duration: '1'
      },
      maxValue: {
        currency: 'NZD',
        amount: '400'
      },
      type: 'product',
      mediaUploadId: '12345'
    },
  },
};
