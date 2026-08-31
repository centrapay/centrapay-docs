export default {
  method: 'POST',
  path: 'https://your.endpoint/refund',
  request: {
    headers: {
      Authorization: '${jwt}',
      'Content-Type': 'application/json',
    },
    payload: {
      currency: 'NZD',
      amount: '1000',
      paymentTransactionId: 'HFCD73hsbJHBDd9gs3t',
      idempotencyKey: 'dDHF8743fVzdsg84f6',
      transactionId: 'dDHF8743fVzdsg84f6'
    },
  },
  response: {
    currency: 'NZD',
    amount: '1000',
    authorization: 'WRhAxxWpTKb5U7pXyxQjjY',
    merchantName: 'Centrapay Cafe',
    merchantId: 'MhocUmpxxmgdHjr7DgKoKw',
    transactionId: 'HFCD73hsbJHBDd9gs3t',
    type: 'refund',
    status: 'successful'
  }
};
