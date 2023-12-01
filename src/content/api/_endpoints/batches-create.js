export default {
  method: 'POST',
  path: '/api/batches',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      type: 'farmlands-external-asset',
      url: 'https://azurebuckets.com/1234',
      accountId: 'C4QnjXvj8At6SMsEN4LRi9',
      test: true
    },
  },
  response: {
    id: 'AVH5uG4gRLYK6YR8JyrViN',
    accountId: '1mdj7bj95gjo92r0ux6wfy69gj3h77',
    status: 'created',
    type: 'farmlands-external-asset',
    url: 'https://azurebuckets.com/1234',
    test: true,
    count: '0',
    errorCount: '0',
    errors: []
  }
};
