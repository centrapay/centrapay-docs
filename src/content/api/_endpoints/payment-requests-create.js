export default {
  method: 'POST',
  path: '/api/payment-requests',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      configId: '5ee168e8597be5002af7b454',
      value: {
        amount: '10000',
        currency: 'NZD'
      }
    },
  },
};
