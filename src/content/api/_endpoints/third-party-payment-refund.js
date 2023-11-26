export default {
  method: 'POST',
  baseUrl: 'https://your.endpoint',
  path: '/refund',
  request: {
    headers: {
      'Authorization': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      currency: 'NZD',
      amount: '1000',
      paymentTransactionId: 'HFCD73hsbJHBDd9gs3t',
      idempotencyKey: 'dDHF8743fVzdsg84f6'
    },
  },
};
