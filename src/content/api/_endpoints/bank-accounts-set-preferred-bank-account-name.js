export default {
  method: 'POST',
  path: '/api/bank-accounts/WRhAxxWpTKb5U7pXyxQjjY/set-preferred-bank-account-name',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      preferredBankAccountName: 'Everyday Account'
    },
  },
  response: {
    activityNumber: 1,
    createdAt: '2020-06-12T01:17:46.499Z',
    bankAccountId: 'WRhAxxWpTKb5U7pXyxQjjY',
    type: 'set-preferred-bank-account-name',
    preferredBankAccountName: 'Everyday Account',
    createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
  }
};
