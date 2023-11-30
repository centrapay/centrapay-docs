export default {
  method: 'GET',
  path: '/api/nzbn/9429046246448',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    nzbn: '9429046246448',
    companyName: 'CENTRAPAY LIMITED',
    tradingName: 'CentraPay',
    companyNumber: '6340244',
    directors: [
      {
        firstName: 'John',
        lastName: 'DOE',
        addressLines: [
          '7 Tara Street',
          'Downmore',
          'Auckland'
        ]
      },
      {
        firstName: 'Jane',
        lastName: 'DOE',
        addressLines: [
          '82 Greatwood Road',
          'Northclover',
          'Auckland'
        ]
      }
    ]
  }
};
