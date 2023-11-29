export default {
  method: 'POST',
  path: '/api/tokens',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      collectionId: 'Jaim1Cu1Q55uooxSens6yk',
      idempotencyKey: 'payment-de32dd90-b46c-11ea-93c3-83a333b86e7b',
      externalId: '23403283262'
    },
  },
};
