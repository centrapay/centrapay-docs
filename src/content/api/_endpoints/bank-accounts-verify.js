export default {
  method: 'POST',
  path: '/api/bank-accounts/WRhAxxWpTKb5U7pXyxQjjY/verify',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      verificationCode: '1111'
    },
  },
  response: {
    verificationCode: '1111'
  }
};
