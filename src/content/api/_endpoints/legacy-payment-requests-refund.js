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
};
