export default {
  method: 'POST',
  path: '/api/accounts/Jaim1Cu1Q55uooxSens6yk/events',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      type: 'payment:paid',
      idempotencyKey: 'payment-de32dd90-b46c-11ea-93c3-83a333b86e7b',
    },
  },
  response: {
    statusCode: 200,
  }
};
