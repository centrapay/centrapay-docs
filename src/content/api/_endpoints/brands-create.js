export default {
  method: 'POST',
  path: '/api/brands',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      name: 'Centrapay Cafe',
      accountId: 'C4QnjXvj8At6SMsEN4LRi9',
      logoMediaUploadId: 'AVH5uG4gRLYK6YR8JyrViN',
      primaryColorHex: '#000000'
    },
  },
  response: {
    id: 'WRhAxxWpTKb5U7pXyxQjjY',
    name: 'Centrapay Cafe',
    accountId: 'C4QnjXvj8At6SMsEN4LRi9',
    logoMediaUploadId: 'AVH5uG4gRLYK6YR8JyrViN',
    logoImg: 'https://static.centrapay.com/assets/AVH5uG4gRLYK6YR8JyrViN/logo.png',
    primaryColorHex: '#000000',
    createdAt: '2018-10-02T00:29:09.307Z',
    createdBy: 'crn::user:46d42f1f-2816-4ce9-9781-fe93e8ebb0c6',
    updatedAt: '2019-10-02T00:29:09.307Z',
    updatedBy: 'crn::user:46d42f1f-2816-4ce9-9781-fe93e8ebb0c6',
    test: true
  }
};
