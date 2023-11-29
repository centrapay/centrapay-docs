export default {
  method: 'POST',
  path: '/api/withdrawals',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      amount: '10000',
      assetId: 'Te2uDM7xhDLWGVJU3nzwnh',
      bankAccountId: 'FRhAzzWpTKb5U7pZygQjjY'
    },
  },
};
