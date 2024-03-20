export default {
  method: 'POST',
  path: '/api/accounts/Jaim1Cu1Q55uooxSens6yk/events',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      type: 'user-login',
      idempotencyKey: 'login-de32dd90-b46c-11ea-93c3-83a333b86e7b',
      data: {
        'userId': 'b657195e-dc2f-11ea-8566-e7710d592c99-123',
      },
      test: true
    },
  },
  response: {
    id: 'L75M3L56N2PtBSt8g7uXLU',
    accountId: 'Jaim1Cu1Q55uooxSens6yk',
    type: 'user-login',
    data: {
      'userId': 'b657195e-dc2f-11ea-8566-e7710d592c99-123',
    },
    idempotencyKey: 'login-de32dd90-b46c-11ea-93c3-83a333b86e7b',
    test: true,
    createdAt: '2020-05-01T12:30:00.000Z',
    createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
  }
};
