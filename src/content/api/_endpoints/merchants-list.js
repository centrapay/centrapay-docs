export default {
  method: 'GET',
  path: '/api/merchants',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    items: [
      {
        accountId: '3xsjxxwmnpkunjbcpekyekc84rzxr4',
        country: 'BT',
        id: '5f6bf6ff81552101f8ff6122',
        name: 'Adams, Runolfsdottir and Botsford',
        test: true,
        onboardingStatus: 'applied',
        createdAt: '2021-11-12T01:17:46.499Z',
        updatedAt: '2021-11-12T01:17:46.499Z',
        createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
        updatedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey'
      },
      {
        accountId: '3xsjxxwmnpkunjbcpekyekc84rzxr4',
        country: 'GM',
        id: '5f6bf6ff81552101f8ff6123',
        name: 'Vandervort Inc',
        test: false,
        onboardingStatus: 'applied',
        createdAt: '2021-11-12T01:17:46.499Z',
        updatedAt: '2021-11-12T01:17:46.499Z',
        createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
        updatedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey'
      },
      {
        accountId: '3xsjxxwmnpkunjbcpekyekc84rzxr4',
        country: 'MZ',
        id: '5f6bf6ff81552101f8ff6124',
        name: 'West, O\'Reilly and Huels',
        test: true,
        onboardingStatus: 'applied',
        createdAt: '2021-11-12T01:17:46.499Z',
        updatedAt: '2021-11-12T01:17:46.499Z',
        createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
        updatedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey'
      }
    ]
  }
};
