export default {
  method: 'GET',
  path: '/api/topups',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: [
    {
      id: '5thg2RPBZEfYTPJdQ63Cre',
      assetId: 'Te2uDM7xhDLWGVJU3nzwnh',
      bankAccountId: 'FRhAzzWpTKb5U7pZygQjjY',
      accountId: 'aBc932S9182qwCDqwer',
      type: 'topup',
      amount: '10000',
      status: 'created',
      createdAt: '2020-05-01T12:30:00.000Z',
      updatedAt: '2020-05-01T12:30:00.000Z'
    },
    {
      id: 'hg2RfYTQ635tPBZEPJdCre',
      assetId: 'Te2uDM7xhDLWGVJU3nzwnh',
      bankAccountId: 'FRhAzzWpTKb5U7pZygQjjY',
      accountId: 'aBc932S9182qwCDqwer',
      type: 'topup',
      amount: '10000',
      status: 'created',
      createdAt: '2020-05-01T12:30:00.000Z',
      updatedAt: '2020-05-01T12:30:00.000Z'
    }
  ]
};
