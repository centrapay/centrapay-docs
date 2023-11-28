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
};
