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
        accountId: 'Jaim1Cu1Q55uooxSens6yk',
        status: 'created',
        merchantId: 'b040b262ddb80ea8',
        name: 'Front Checkout',
        paymentRequestId: '12d22ece51eb0338',
        test: true,
        createdAt: '2021-08-25T00:02:49.488Z',
        createdBy: 'crn::user:b657195e-dc2f-11ea-8566-e7710d592c99',
        updatedAt: '2021-08-25T00:02:49.488Z',
        updatedBy: 'crn::user:b657195e-dc2f-11ea-8566-e7710d592c99',
      }
    ],
    nextPageKey: 'eyJjcmVhdGVkQXQiOiIyMDIxLTA4LTI1VDAwOjAyOjQ5LjQ4OFoifQ=='
  }
};
