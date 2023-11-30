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
  response: {
    id: 'DcTs3U38HdhfEqwF1GKoT3',
    mediaUploadId: 'uooxSens6ykJaim1Cu1Q55',
    bankAccountId: 'WRhAxxWpTKb5U7pXyxQjjY',
    accountId: 'Jaim1Cu1Q55uooxSens6yk',
    type: 'settlement',
    status: 'created',
    createdAt: '2021-11-08T21:52:39.915Z',
    createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    modifiedAt: '2021-11-08T21:52:39.915Z',
    modifiedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey'
  }
};
