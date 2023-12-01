export default {
  method: 'GET',
  path: '/api/accounts/Jaim1Cu1Q55uooxSens6yk/quotas',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: [
    {
      limit: '1000',
      interval: '2021-03',
      period: 'monthly',
      usage: '500',
      type: 'spend',
      assetType: 'centrapay.nzd.main'
    },
    {
      limit: '9999',
      interval: '2021',
      period: 'yearly',
      usage: '1555',
      type: 'spend',
      assetType: 'centrapay.nzd.main'
    },
    {
      limit: '1000',
      interval: '2021-03',
      period: 'monthly',
      usage: '500',
      type: 'topup',
      assetType: 'centrapay.nzd.main'
    },
    {
      limit: '9999',
      interval: '2021',
      period: 'yearly',
      usage: '5000',
      type: 'topup',
      assetType: 'centrapay.nzd.main'
    }
  ]
};
