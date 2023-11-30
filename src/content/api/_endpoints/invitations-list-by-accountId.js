export default {
  method: 'GET',
  path: '/api/accounts/8usozbJzCJYjR8i7y92vMV/invitations',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    items: [
      {
        id: 'DKTs3U38hdhfEqwF1JKoT2',
        code: 'WIj211vFs9cNACwBb04vQw',
        type: 'account-membership',
        resourceId: 'Hopo4g34sLVdjEMBs2p19F',
        resourceType: 'account',
        expiresAt: '2021-08-26T00:02:49.488Z',
        createdAt: '2021-08-25T00:02:49.488Z',
        createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
        updatedAt: '2021-08-25T00:02:49.488Z',
        updatedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
        recipientAlias: 'user@org.com',
        params: {
          role: 'account-owner',
          accountName: 'Centrapay Cafe'
        },
        status: 'created'
      },
      {
        id: 'JKKDMU38hd01hfEqwF1oT2',
        code: 'WIj211vFs9cNACwBb04vQw',
        type: 'account-membership',
        resourceId: 'Hopo4g34sLVdjEMBs2p19F',
        resourceType: 'account',
        expiresAt: '2021-08-26T00:02:49.488Z',
        createdAt: '2021-08-25T00:02:49.488Z',
        createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
        updatedAt: '2021-08-25T00:02:49.488Z',
        updatedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
        recipientAlias: 'john.doe@org.com',
        params: {
          role: 'cashier',
          accountName: 'Centrapay Tea Warehouse'
        },
        status: 'sent'
      }
    ]
  }
};
