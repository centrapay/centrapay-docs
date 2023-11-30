export default {
  method: 'GET',
  path: '/api/bank-authorities',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: [
    {
      id: 'WRhAxxWpTKb5U7pXyxQjjY',
      accountId: 'Jaim1Cu1Q55uooxSens6yk',
      bankAccountNumber: '12-1234-1234567-123',
      bankAccountName: 'John Doe',
      status: 'created',
      verified: false,
      directDebitAuthorized: true,
      createdAt: '2020-06-12T01:17:46.499Z',
      approvals: [

      ]
    },
    {
      id: 'b5URhAxxWpTKyxQjjY7pXW',
      accountId: 'Jaim1Cu1Q55uooxSens6yk',
      bankAccountNumber: '12-1234-1234567-123',
      bankAccountName: 'Jane Doe',
      status: 'active',
      verified: true,
      directDebitAuthorized: true,
      createdAt: '2020-06-12T01:17:46.499Z',
      approvals: [
        {
          type: 'settlement',
          status: 'pending',
          updatedAt: '2021-11-08T21:52:39.915Z'
        }
      ]
    }
  ]
};
