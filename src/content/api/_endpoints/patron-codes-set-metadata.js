export default {
  method: 'POST',
  path: '/api/patron-codes/{patronCodeId}/metadata',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json'
    },
    payload: {
      metadata: {
        deviceId: 'device-001',
      },
    },
  },
  response: {
    patronCodeId: 'V17FByEP9gm1shSG6a1Zzx',
    createdAt: '2021-06-08T22:55:00.000Z',
    createdBy: 'crn:WRhAxxWpTKb5U7pXyxQjjY:api-key:MyApiKey',
    metadata: {
      deviceId: 'device-001',
    },
  },
};
