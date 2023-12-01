export default {
  method: 'GET',
  path: '/api/bank-accounts/WRhAxxWpTKb5U7pXyxQjjY',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    id: 'WRhAxxWpTKb5U7pXyxQjjY',
    accountId: 'Jaim1Cu1Q55uooxSens6yk',
    status: 'created',
    bankAccountNumber: '12-1234-1234567-123',
    bankAccountName: 'John Doe',
    directDebitAuthorized: false,
    bankRegion: 'nz',
    createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    createdAt: '2022-07-18T02:26:39.477Z',
    verified: false,
    modifiedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    modifiedAt: '2022-07-18T02:26:39.477Z',
    approvals: [
      {
        type: 'account-information-consent',
        status: 'approved',
        updatedAt: '2021-11-08T21:52:39.915Z'
      }
    ],
    type: 'quartz',
    test: true,
  }
};
