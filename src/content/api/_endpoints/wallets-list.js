export default {
  method: 'GET',
  path: '/api/wallet-assets',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: [
    {
      id: 'WRhAxxWpTKb5U7pXyxQjjY',
      accountId: 'Te2uDM7xhDLWGVJU3nzwnh',
      ledgerId: 'centrapay.nzd.main',
      currency: 'NZD',
      balance: '2000',
      availableBalance: '6000'
    },
    {
      id: 'NQ1yeromwnWPD2hY41L2yS',
      accountId: 'Te2uDM7xhDLWGVJU3nzwnh',
      ledgerId: 'centrapay.nzd.test',
      currency: 'NZD',
      balance: '20',
      availableBalance: '6000'
    }
  ]
};
