export default {
  method: 'GET',
  path: '/api/users/da75ad90-9a5b-4df0-8374-f48b3a8fbfcc/account-memberships',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: [
    {
      accountName: 'Centrapay Cafe',
      accountId: 'Jaim1Cu1Q55uooxSens6yk',
      accountType: 'org',
      role: 'account-owner'
    },
    {
      accountName: 'Centrapay Tea Warehouse',
      accountId: '5uooxSens6ykJaim1Cu1Q5',
      accountType: 'org',
      role: 'account-owner'
    }
  ]
};
