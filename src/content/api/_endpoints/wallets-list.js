export default {
  method: 'GET',
  path: '/api/merchants/MhocUmpxxmgdHjr7DgKoKw/supported-wallets',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
  },
  response: [
    {
      id: '1234',
      name: 'payap',
      accountId: 'abc123',
      connectUrl: 'https://app.payap.com/join',
      payUrl: 'https://app.payap.com/pay',
      assetTypes: [
        { id: 'quartz.nzd' },
        { id: 'centrapay.token', 'collectionId': '98h1d312' },
      ],
    }
  ]
};
