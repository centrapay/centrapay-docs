export default {
  method: 'GET',
  path: '/api/merchants/search',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
    queryString: {
      origin: '123.42,32.22',
      distance: '100',
      asset: 'epay.nzd.main,37873',
      pageKey: '10',
      paginationLimit: '10',
    }
  },
};
