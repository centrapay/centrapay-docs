export default {
  method: 'GET',
  path: '/merchants/1234/payment-links',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
  },
  response: {
    items: [
      {
        id: 'pl_WRhAxxWpTKb5U7pXyxQjjY',
        status: 'created',
        name: 'Front Checkout',
        merchantId: 'b040b262ddb80ea8',
        paymentRequestId: '12d22ece51eb0338',
        test: true,
        createdAt: '2021-08-25T00:02:49.488Z',
        createdBy: 'crn:1234abc:api-key:MyAPIKey',
        updatedAt: '2021-08-25T00:02:49.488Z',
        updatedBy: 'crn:1234abc:api-key:MyAPIKey',
      }
    ],
    nextPageKey: 'eyJjcmVhdGVkQXQiOiIyMDIxLTA4LTI1VDAwOjAyOjQ5LjQ4OFoifQ=='
  }
};
