export default {
  method: 'GET',
  path: 'https://your.endpoint/get',
  request: {
    headers: {
      Authorization: '${jwt}',
    },
    queryString: {
      transactionId: 'UttDGTHjr7DgKoKwWpTKb',
    },
  },
  response: {
    currency: 'NZD',
    amount: '1000',
    authorization: 'WRhAxxWpTKb5U7pXyxQjjY',
    merchantName: 'Centrapay Cafe',
    merchantId: 'MhocUmpxxmgdHjr7DgKoKw',
    transactionId: 'UttDGTHjr7DgKoKwWpTKb',
    type: 'payment',
    status: 'successful',
    refundable: true,
    refundBefore: '2023-06-09T00:52:22.468Z'
  }
};
