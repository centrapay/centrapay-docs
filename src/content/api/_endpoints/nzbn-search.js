export default {
  method: 'GET',
  path: '/api/nzbn-search',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
    queryString: {
      q: 'centrapay',
    },
  },
  response: {
    items: [
      {
        nzbn: '9429046246448',
        companyName: 'CENTRAPAY LIMITED',
        companyNumber: '6340244'
      }
    ]
  }
};
