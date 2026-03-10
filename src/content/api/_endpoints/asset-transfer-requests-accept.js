export default {
  method: 'POST',
  path: '/api/asset-transfer-requests/M7Kn2stAxNa6ri7h/accept',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      assetType: 'quartz-one-off.nzd.main',
    },
  },
  response: {
    id: 'M7Kn2stAxNa6ri7h',
    status: 'requested',
    assetType: 'quartz-one-off.nzd.main',
    recipientName: 'John Doe',
    recipientAlias: '12-1234-1234567-123',
    description: 'Movies',
    createdAt: '2024-03-01T23:56:21.514Z',
    createdBy: 'crn:userId:1234',
    value: '1000',
    expiresAt: '2020-05-03T01:03:37.222Z',
    authorizationUrl: 'https://secure.bnz.co.nz/oauth2/authorize',
  }
};
