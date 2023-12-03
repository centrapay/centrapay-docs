export default {
  method: 'POST',
  path: '/payments/api/transactions.refund',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
    queryString: {
      transactionId: '7d2b1d52-b609-4ccd-b4cc-c4a9af881bd9',
      amount: '100',
    },
  },
  response: {
    createdAt: '2019-12-10T22:30:51.500Z',
    currencyExchange: {
      asset: 'BTC',
      rate: 0.000081
    },
    merchant: {
      categoryCode: '7372',
      id: 'b0792018-6efc-4bca-a148-83bc57ff75b9',
      location: 'NZ',
      name: 'Centrapay'
    },
    payment: {
      amount: 350,
      asset: 'NZD',
      message: 'Payment processed'
    },
    reference: '252e5e22-4b99-4108-90a8-228312c455a7',
    settlementDate: '2019-12-10',
    status: 'Success',
    type: 'txRefund',
    version: 1
  }
};
