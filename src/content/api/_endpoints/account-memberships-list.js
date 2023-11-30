export default {
  method: 'GET',
  path: '/api/account-memberships',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: [
    {
      accountName: 'Centrapay Tea Warehouse',
      accountId: '5uooxSens6ykJaim1Cu1Q5',
      accountType: 'org',
      role: 'account-owner'
    }
  ]
};
