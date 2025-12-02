export default {
  method: 'GET',
  path: '/api/payment-links/1234/summary',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    }
  },
  response: {
    id: '1234',
    paymentRequestId: '12d22ece51eb0338',
  }
};
