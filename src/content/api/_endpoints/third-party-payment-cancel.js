export default {
  method: 'POST',
  baseUrl: 'https://your.endpoint',
  path: '/cancel',
  request: {
    headers: {
      'Authorization': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      transactionId: 'UttDGTHjr7DgKoKwWpTKb',
      failureReason: 'PAYMENT_REQUEST_EXPIRED'
    },
  },
};
