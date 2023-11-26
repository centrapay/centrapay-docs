export default {
  method: 'POST',
  baseUrl: 'https://your.endpoint',
  path: '/pay',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      currency: 'NZD',
      amount: '1000',
      authorization: 'WRhAxxWpTKb5U7pXyxQjjY',
      merchantName: 'Centrapay Cafe',
      merchantId: 'MhocUmpxxmgdHjr7DgKoKw',
      idempotencyKey: 'VMXMkUttDGTVz4ESv5ND56',
      transactionId: 'UttDGTHjr7DgKoKwWpTKb'
    },
  },
};
