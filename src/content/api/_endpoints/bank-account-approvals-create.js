export default {
  method: 'POST',
  path: '/api/bank-account-approvals',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      mediaUploadId: 'uooxSens6ykJaim1Cu1Q55',
      bankAccountId: 'WRhAxxWpTKb5U7pXyxQjjY',
      type: 'settlement'
    },
  },
};
