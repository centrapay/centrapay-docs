export default {
  method: 'POST',
  path: '/api/tokens',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      collectionId: 'NFhUgPQEYbk2EbTXAYArTX',
      idempotencyKey: 'token-de32dd90-b46c-11ea-93c3-83a333b86e7b',
      accountId: 'WRhAxxWpTKb5U7pXyxQjjP',
    },
  },
};
