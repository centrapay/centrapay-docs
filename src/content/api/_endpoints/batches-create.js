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
};
