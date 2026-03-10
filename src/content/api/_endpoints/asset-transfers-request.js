export default {
  method: 'POST',
  path: '/api/asset-transfer-requests',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      recipientName: 'John Doe',
      recipientAlias: '12-1234-1234567-123',
      value: '1000',
      message: 'Movies'
    },
  },
  response: {
    id: 'M7Kn2stAxNa6ri7h',
    recipientName: 'John Doe',
    recipientAlias: '12-1234-1234567-123',
    status: 'requested',
    message: 'Movies',
    createdAt: '2024-03-01T23:56:21.514Z',
    createdBy: 'crn:userId:1234',
    value: '1000',
    expiresAt: '2020-05-03T01:03:37.222Z'
  }
};
