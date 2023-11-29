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
};
