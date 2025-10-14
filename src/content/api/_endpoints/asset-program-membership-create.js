export default {
  method: 'POST',
  path: '/api/asset-program-memberships',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      assetProgramId: 'ap_WRhAxxWpTKb5U7pXyxQjjY',
      accountId: 'Jaim1Cu1Q55uooxSens6yk',
      accept: true,
      approve: false,
      billingBankAccountId: 'WRhAxxWpTKb5U7pXyxQjjY',
    },
  },
  response: {
    id: 'apm_Xv990BzkgfoDS7bBls50pd',
    accountId: 'Jaim1Cu1Q55uooxSens6yk',
    assetProgramId: 'ap_WRhAxxWpTKb5U7pXyxQjjY',
    status: 'accepted',
    test: true,
    createdAt: '2021-08-25T00:02:49.488Z',
    createdBy: 'crn::user:b657195e-dc2f-11ea-8566-e7710d592c99',
    updatedAt: '2021-08-25T00:03:15.123Z',
    updatedBy: 'crn::user:b657195e-dc2f-11ea-8566-e7710d592c99',
    tosAcceptedAt: '2021-08-25T00:03:15.123Z',
    approvedAt: null,
    billingBankAccountId: 'WRhAxxWpTKb5U7pXyxQjjY',
  }
};
