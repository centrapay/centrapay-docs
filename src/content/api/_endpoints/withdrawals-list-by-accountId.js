export default {
  method: 'GET',
  path: '/api/accounts/aBc932S9182qwCDqwer/withdrawals',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    items: [
      {
        id: '5thg2RPBZEfYTPJdQ63Cre',
        assetId: 'Te2uDM7xhDLWGVJU3nzwnh',
        bankAccountId: 'FRhAzzWpTKb5U7pZygQjjY',
        accountId: 'aBc932S9182qwCDqwer',
        type: 'withdrawal',
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
        type: 'withdrawal',
        amount: '10000',
        status: 'done',
        createdAt: '2020-05-01T12:30:00.000Z',
        updatedAt: '2020-05-01T12:30:00.000Z'
      }
    ]
  }
};
