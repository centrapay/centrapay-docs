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
};
