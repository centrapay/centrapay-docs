export default {
  method: 'POST',
  path: '/api/bank-accounts/b5URhAxxWpTKyxQjjY7pXW/archive',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    }
  },
  response: {
    id: 'b5URhAxxWpTKyxQjjY7pXW',
    accountId: 'Jaim1Cu1Q55uooxSens6yk',
    bankAccountNumber: '12-1234-1234567-123',
    bankAccountName: 'Jane Doe', // sourced from account consent if one exists
    preferredBankAccountName: 'Everyday Account', // Optional, but only available on quartz bank accounts
    balance: '123', // interim booked fetched with account info consent
    availableBalance: '100', // interim available fetched with account info consent
    status: 'archived',
    verified: true, // backwards compatible
    directDebitAuthorized: true, // user consent for direct debit
    createdAt: '2020-06-12T01:17:46.499Z',
    test: true
  }
};
