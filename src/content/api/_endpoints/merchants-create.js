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
  response: {
    id: '5ee0c486308f590260d9a07f',
    accountId: 'C4QnjXvj8At6SMsEN4LRi9',
    name: 'Centrapay Cafe Auckland',
    country: 'NZ',
    test: false,
    onboardingStatus: 'applied',
    createdAt: '2021-11-12T01:17:46.499Z',
    updatedAt: '2021-11-12T01:17:46.499Z',
    createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    updatedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey'
  }
};
