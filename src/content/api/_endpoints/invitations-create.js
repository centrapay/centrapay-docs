export default {
  method: 'POST',
  path: '/api/invitations',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      type: 'account-membership',
      resourceId: 'Hopo4g34sLVdjEMBs2p19F',
      resourceType: 'account',
      recipientAlias: 'user@org.com',
      params: {
        role: 'cashier',
      },
    },
  },
};
