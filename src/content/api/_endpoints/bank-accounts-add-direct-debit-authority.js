export default {
  method: 'POST',
  path: '/api/bank-accounts/WRhAxxWpTKb5U7pXyxQjjY/direct-debit-authorities',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      phoneNumber: '+64212345678',
      fullName: 'John Doe',
      emailAddress: 'john.doe@gmail.com'
    },
  },
};
