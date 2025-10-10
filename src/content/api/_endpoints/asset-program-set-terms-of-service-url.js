export default {
  method: 'POST',
  path: '/api/asset-programs/ap_WRhAxxWpTKb5U7pXyxQjjY/terms-of-service',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      termsOfServiceUrl: 'https://example.com/terms-new',
    },
  },
  response: {
    id: 'ap_WRhAxxWpTKb5U7pXyxQjjY',
    accountId: 'Jaim1Cu1Q55uooxSens6yk',
    assetTypes: [ 'payap-debit' ],
    createdAt: '2021-08-25T00:02:49.488Z',
    createdBy: 'crn::user:b657195e-dc2f-11ea-8566-e7710d592c99',
    mediaUploadId: '8aoMfscvtuewsuJzmzBzAs',
    name: 'My Asset Program',
    privacyPolicyUrl: 'https://example.com/privacy',
    published: true,
    termsOfServiceUrl: 'https://example.com/terms-new',
    test: true,
    updatedAt: '2021-08-25T00:02:49.488Z',
    updatedBy: 'crn::user:b657195e-dc2f-11ea-8566-e7710d592c99',
    collectionIds: [ 'c_Xv990BzkgfoDS7bBls50pd' ],
  }
};
