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
      merchantId: '5ee0c486308f590260d9a07f',
    },
  },
  response: {
    id: 'apm_Xv990BzkgfoDS7bBls50pd',
    accountId: 'Jaim1Cu1Q55uooxSens6yk',
    merchantId: '5ee0c486308f590260d9a07f',
    assetProgramId: 'ap_WRhAxxWpTKb5U7pXyxQjjY',
    createdAt: '2021-08-25T00:02:49.488Z',
    createdBy: 'crn::user:b657195e-dc2f-11ea-8566-e7710d592c99',
    test: true,
    updatedAt: '2021-08-25T00:02:49.488Z',
    updatedBy: 'crn::user:b657195e-dc2f-11ea-8566-e7710d592c99',
  }
};
