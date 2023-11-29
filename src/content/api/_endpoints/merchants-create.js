export default {
  method: 'POST',
  path: '/api/merchants',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      accountId: 'C4QnjXvj8At6SMsEN4LRi9',
      name: 'Centrapay Cafe Auckland',
      country: 'NZ',
      test: false
    },
  },
};
