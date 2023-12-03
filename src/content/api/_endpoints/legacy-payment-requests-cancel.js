export default {
  method: 'POST',
  path: '/payments/api/requests.cancel',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
    queryString: {
      requestId: 'a95b3b0d-1278-4613-8772-20d146065a2e',
    },
  },
  response: {
    merchantName: 'Coffee Shop',
    status: 'cancelled',
    denomination: {
      amount: 350,
      asset: 'NZD'
    },
    createdAt: '2019-12-10T22:30:51.500Z',
    updatedAt: '2019-12-10T22:31:04.983Z',
    externalReference: '03.01.09.chancellor',
    requestId: 'a95b3b0d-1278-4613-8772-20d146065a2e',
    merchantId: 'b0792018-6efc-4bca-a148-83bc57ff75b9',
    description: 'Coffee'
  }
};
