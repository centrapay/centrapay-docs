export default {
  method: 'POST',
  path: '/api/bank-accounts',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      accountId: 'Jaim1Cu1Q55uooxSens6yk',
      bankAccountNumber: '12-1234-1234567-123',
      bankAccountName: 'John Doe',
      directDebitAuthority: {
        phoneNumber: '+64212345678',
        fullName: 'John Doe',
        emailAddress: 'john.doe@gmail.com'
      }
    },
  },
  response: {
    id: 'WRhAxxWpTKb5U7pXyxQjjY',
    accountId: 'Jaim1Cu1Q55uooxSens6yk',
    bankAccountNumber: '12-1234-1234567-123',
    bankAccountName: 'John Doe',
    directDebitAuthorized: true,
    status: 'created',
    verified: false,
    type: 'centrapay',
    createdAt: '2020-06-12T01:17:46.499Z',
    createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    modifiedAt: '2020-06-12T01:17:46.499Z',
    modifiedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    approvals: []
  }
};
