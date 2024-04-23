export default {
  method: 'GET',
  path: '/api/accounts/Te2uDM7xhDLWGVJU3nzwnh/assets',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    items: [
      {
        id: 'WRhAxxWpTKb5U7pXyxQjjY',
        accountId: 'Te2uDM7xhDLWGVJU3nzwnh',
        category: 'money',
        type: 'centrapay.nzd.main',
        liveness: 'main',
        description: 'NZD',
        createdAt: '2021-01-01T00:00:00.000Z',
        status: 'active',
        currency: 'NZD',
        balance: '2000'
      },
      {
        id: 'Aj7rtHmd7rDeWoJgw9MPHe',
        accountId: 'Te2uDM7xhDLWGVJU3nzwnh',
        type: 'cca.coke.main',
        description: 'Coke™ Token',
        category: 'token',
        value: [
          {
            currency: 'NZD',
            amount: '400'
          }
        ],
        expiresAt: '2020-12-31T00:00:00.000Z',
        createdAt: '2020-05-01T12:30:00.000Z'
      }
    ]
  }
};
