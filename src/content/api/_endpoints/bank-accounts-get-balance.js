export default {
  method: 'GET',
  path: '/api/accounts/Jaim1Cu1Q55uooxSens6yk/bank-account-balances',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    items: [
      {
        bankAccountId: 'b3f9ba1abff64775877d4a2fb073b123',
        bankAccountNumber: '12-1234-1234567-123',
        balance: '101.00',
        availableBalance: '101.00',
        test: true
      }
    ],
    nextPageKey: '48a16140-24d2-4aec-b52f-a9d4f8f23876'
  }
};
