export default {
  method: 'PUT',
  path: '/api/merchants/5ee0c486308f590260d9a07f',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      name: 'Centrapay Café',
      location: {
        lat: '-36.8483579',
        lng: '174.7725834',
        city: 'Auckland',
        postCode: '1010',
        country: 'NZ'
      },
      settlementConfig: {
        bankAccountId: 'WRhAxxWpTKb5U7pXyxQjjY'
      }
    },
  },
  response: {
    id: '5ee0c486308f590260d9a07f',
    accountId: 'yqwyya0rzz3vvshqw0474u89xtj5fn',
    name: 'Centrapay Café',
    test: false,
    country: 'NZ',
    onboardingStatus: 'applied',
    location: {
      lat: '-36.8483579',
      lng: '174.7725834',
      city: 'Auckland',
      postCode: '1010',
      country: 'NZ'
    },
    settlementConfig: {
      bankAccountId: 'WRhAxxWpTKb5U7pXyxQjjY'
    },
    createdAt: '2021-09-12T01:11:22.491Z',
    updatedAt: '2021-11-12T01:17:46.499Z',
    createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    updatedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey'
  }
};
