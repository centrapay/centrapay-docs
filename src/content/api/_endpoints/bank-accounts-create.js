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
};
