export default {
  method: 'GET',
  path: '/api/assets/WRhAxxWpTKb5U7pXyxQjjY/transactions',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    items: [
      {
        ref: 'adRGJqMyMhmGfnDXasRZ',
        type: 'transfer',
        kind: 'refund',
        refType: 'payment-request',
        assetId: 'WRhAxxWpTKb5U7pXyxQjjY',
        srcParty: 'Coffee Ltd',
        destParty: 'crn::user:5a3b1ba7-d01k-409f-ld0a-jd81k0ald',
        createdAt: '2022-03-31T20:36:08.562Z',
        createdBy: 'crn::service:payments-api',
        srcAssetId: 'Jd9a89ZESjjCuUD9DJD9Al',
        destAssetId: 'WRhAxxWpTKb5U7pXyxQjjY',
        amount: '2000',
        activityType: 'value-in',
        activityNumber: '3'
      },
      {
        ref: 'adRGJqMyMhmGfnDXasRZ',
        type: 'transfer',
        kind: 'payment',
        refType: 'payment-request',
        assetId: 'WRhAxxWpTKb5U7pXyxQjjY',
        srcParty: 'crn::user:5a3b1ba7-d01k-409f-ld0a-jd81k0ald',
        destParty: 'Coffee Ltd',
        createdAt: '2022-03-31T20:35:54.717Z',
        createdBy: 'crn::service:payments-api',
        srcAssetId: 'WRhAxxWpTKb5U7pXyxQjjY',
        destAssetId: 'Jd9a89ZESjjCuUD9DJD9Al',
        amount: '3000',
        activityType: 'value-out',
        activityNumber: '2'
      },
      {
        ref: 'H4SZKwMcU9VCmnGEqDA7Mn',
        type: 'increment-balance',
        kind: 'topup',
        refType: 'topup',
        assetId: 'WRhAxxWpTKb5U7pXyxQjjY',
        createdAt: '2022-03-31T02:37:47.207Z',
        createdBy: 'crn::application:rhea',
        destAssetId: 'WRhAxxWpTKb5U7pXyxQjjY',
        amount: '7600',
        activityType: 'value-in',
        activityNumber: '1'
      }
    ]
  }
};
