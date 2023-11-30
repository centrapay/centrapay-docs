export default {
  method: 'POST',
  path: '/api/bank-authorities',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      fullName: 'John Doe',
      accountId: 'Jaim1Cu1Q55uooxSens6yk',
      phoneNumber: '+64212345',
      emailAddress: 'John.doe@email.com',
      bankAccountNumber: '12-1234-1234567-123',
      bankAccountName: 'John Doe'
    },
  },
  response: {
    id: 'WRhAxxWpTKb5U7pXyxQjjY',
    accountId: 'Jaim1Cu1Q55uooxSens6yk',
    bankAccountNumber: '12-1234-1234567-123',
    bankAccountName: 'John Doe',
    status: 'created',
    verified: false,
    directDebitAuthorized: true,
    createdAt: '2020-06-12T01:17:46.499Z',
    createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    modifiedAt: '2020-06-12T01:17:46.499Z',
    modifiedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    approvals: []
  }
};
