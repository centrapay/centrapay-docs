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
    statusCode: 200,
  }
};
