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
  response: {
    id: 'hg2RfYTQ635tPBZEPJdCre',
    assetId: 'Te2uDM7xhDLWGVJU3nzwnh',
    bankAccountId: 'FRhAzzWpTKb5U7pZygQjjY',
    accountId: 'aBc932S9182qwCDqwer',
    type: 'withdrawal',
    amount: '10000',
    status: 'created',
    createdAt: '2020-05-01T12:30:00.000Z',
    updatedAt: '2020-05-01T12:30:00.000Z'
  }
};
