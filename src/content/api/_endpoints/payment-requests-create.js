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
};
