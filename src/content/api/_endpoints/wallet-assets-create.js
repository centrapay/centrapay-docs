export default {
  method: 'POST',
  path: '/api/wallet-assets',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      accountId: 'Te2uDM7xhDLWGVJU3nzwnh',
      ledgerId: 'centrapay.nzd.main',
      settlement: 'true'
    },
  },
  response: {
    id: 'WRhAxxWpTKb5U7pXyxQjjY',
    accountId: 'Te2uDM7xhDLWGVJU3nzwnh',
    category: 'money',
    type: 'centrapay.nzd.main',
    liveness: 'main',
    description: 'NZD',
    createdAt: '2021-01-01T00:00:00.000Z',
    status: 'active',
    currency: 'NZD',
    balance: '0',
    availableBalance: '6000',
    settlement: true
  }
};
