export default {
  method: 'POST',
  path: '/api/connections/1234/authorize',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      walletId: 'vendswift-nz',
    },
  },
  response: {
    id: '1234',
    createdBy: 'crn:1234abc:api-key:MyAPIKey',
    createdByAccountName: 'Salespoint',
    createdAt: '2021-08-25T00:02:49.488Z',
    status: 'created',
    url: 'https://app.centrapay.com/connect/1234',
    updatedBy: 'crn:1234abc:api-key:MyAPIKey',
    updatedAt: '2022-08-25T00:02:49.488Z',
    walletId: 'vendswift-nz',
    walletName: ''
  }
};
