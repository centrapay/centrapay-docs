export default {
  method: 'POST',
  path: '/api/wallets',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      id: 'payap',
      name: 'Payap',
      accountId: 'abc123',
      connectionId: 'https://app.payap.com/join',
      payUrl: 'https://app.payap.com/pay',
      logoMediaUploadId: 'abcd',
      primaryColorHex: '#abc123',
      assetTypes: [
        { 'id': 'quartz.nzd' },
        { 'id': 'airpoints' },
        { 'id': 'centrapay.token', 'collectionIds': '98h1d312' },
        { 'id': 'centrapay.token', 'collectionIds': 'ca9h0221sacw' },
      ],
    },
  },
  response: {
    id: 'payap',
    createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    createdByAccountName: 'Payap',
    createdAt: '2020-05-01T12:30:00.000Z',
    status: 'active',
    url: 'https://app.payap.com/join',
    merchantId: 'abc123',
    logoMediaUploadId: 'abcd',
    logoImg: 'imgLink',
    primaryColorHex: '#abc123',
    assetTypes: [
      { id: 'quartz.nzd' },
      { id: 'airpoints' },
      { id: 'centrapay.token', collectionIds: '98h1d312' },
      { id: 'centrapay.token', collectionIds: 'ca9h0221sacw' }
    ]
  }
};
