export default {
  method: 'POST',
  path: 'https://your.endpoint/pay',
  request: {
    headers: {
      Authorization: '${jwt}',
      'Content-Type': 'application/json',
    },
    payload: {
      currency: 'NZD',
      amount: '1000',
      authorization: 'WRhAxxWpTKb5U7pXyxQjjY',
      merchantName: 'Centrapay Cafe',
      merchantId: 'MhocUmpxxmgdHjr7DgKoKw',
      merchantCategoryCode: '2481',
      merchantLocation: {
        lat: '-36.8483579',
        lng: '174.7725834',
        city: 'Auckland',
        postCode: '1010',
        country: 'NZ',
        street: '17 South Street'
      },
      paymentRequestId: 'LTsofbYSldsp35psd',
      idempotencyKey: 'UttDGTHjr7DgKoKwWpTKb',
      transactionId: 'UttDGTHjr7DgKoKwWpTKb'
    },
  },
  response: {
    currency: 'NZD',
    amount: '1000',
    authorization: 'WRhAxxWpTKb5U7pXyxQjjY',
    merchantName: 'Centrapay Cafe',
    merchantId: 'MhocUmpxxmgdHjr7DgKoKw',
    merchantCategoryCode: '2481',
    merchantLocation: {
      lat: '-36.8483579',
      lng: '174.7725834',
      city: 'Auckland',
      postCode: '1010',
      country: 'NZ',
      street: '17 South Street'
    },
    paymentRequestId: 'LTsofbYSldsp35psd',
    transactionId: 'UttDGTHjr7DgKoKwWpTKb',
    type: 'payment',
    status: 'successful',
    refundable: true,
    refundBefore: '2023-06-09T00:52:22.468Z'
  }
};
