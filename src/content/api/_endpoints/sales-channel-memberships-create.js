export default {
  method: 'POST',
  path: '/api/sales-channel-memberships',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      salesChannelId: 'sc_8nJwSXau7vL5S9rXo3CaCy',
      merchantId: 'SRqGn945cofvBFumd1NMYA'
    },
  },
  response: {
    id: 'scm_5DuWxSsYueGn5KiNME5EAU',
    accountId: '3xxehZLwMvzAqQyDxNpRSs',
    createdAt: '2025-04-24T04:32:55.083Z',
    createdBy: 'crn::user:b5fdc893-160d-414f-9da8-c2d38c6480c0',
    merchantId: 'SRqGn945cofvBFumd1NMYA',
    salesChannelId: 'sc_8nJwSXau7vL5S9rXo3CaCy',
    test: true,
    updatedAt: '2025-04-24T04:32:55.083Z',
    updatedBy: 'crn::user:b5fdc893-160d-414f-9da8-c2d38c6480c0',
    status: 'created'
  }
};
