export default {
  method: 'POST',
  path: '/api/invitations/DKTs3U38hdhfEqwF1JKoT2/revoke',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    id: 'DKTs3U38hdhfEqwF1JKoT2',
    code: 'WIj211vFs9cNACwBb04vQw',
    type: 'account-membership',
    resourceId: 'Hopo4g34sLVdjEMBs2p19F',
    resourceType: 'account',
    recipientAlias: 'user@org.com',
    params: {
      role: 'cashier',
      accountName: 'Centrapay Cafe'
    },
    createdAt: '2021-08-25T00:02:49.488Z',
    expiresAt: '2021-08-26T00:02:49.488Z',
    createdBy: 'crn::user:1234',
    updatedAt: '2021-08-25T00:00:00.000Z',
    updatedBy: 'crn::user:1234',
    status: 'revoked'
  }
};
