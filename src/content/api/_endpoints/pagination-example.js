export default {
  method: 'GET',
  path: '/api/examples',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
    queryString: {
      pageKey: 'Example#E9eXsErwA444qFDoZt5iLA|Activity#000000000000001|614161c4c4d3020073bd4ce8'
    }
  },
  response: {
    nextPageKey: '5ee0c486308f590260d9a07f|ded3f328-1123-11ec-bf1a-5ba46eb12a7d',
    items: [
      {
        value: '16',
        assetType: 'centrapay.nzd.main'
      },
      {
        value: '32',
        assetType: 'centrapay.nzd.main'
      },
      {
        value: '64',
        assetType: 'centrapay.nzd.main'
      }
    ]
  }
};
