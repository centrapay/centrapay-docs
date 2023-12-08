export default {
  method: 'GET',
  path: '/api/asset-activities',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    items: [
      {
        ref: 'C2kaVDzGaCpJLSbBfusu5W',
        type: 'transfer',
        kind: 'payment',
        refType: 'payment-request',
        assetId: 'ExVHwdGEFugJWVXWi4riNq',
        srcParty: 'crn::user:46d42f1f-2816-4ce9-9781-fe93e8ebb0c6',
        destParty: 'Dev Smoke Test Merchant',
        createdAt: '2023-11-28T21:18:40.583Z',
        accountId: '6QXN8cq8XVwEJeYe3XH9fe',
        createdBy: 'crn::service:payments-api',
        srcAssetId: 'ExVHwdGEFugJWVXWi4riNq',
        destAssetId: 'WTNEcn8HHd2YgVsKRyvcPh',
        amount: '1',
        activityType: 'value-out',
        activityNumber: '2',
        bankAccountId: '7GEDRsP9cyB9fScBziSmJa'
      },
      {
        ref: '9qyT2gthTt4Dv7AX5U1zkY',
        type: 'transfer',
        kind: 'payment',
        refType: 'payment-request',
        assetId: 'ExVHwdGEFugJWVXWi4riNq',
        srcParty: 'crn::user:46d42f1f-2816-4ce9-9781-fe93e8ebb0c6',
        destParty: 'Dev Smoke Test Merchant',
        createdAt: '2023-11-28T03:37:23.145Z',
        accountId: '6QXN8cq8XVwEJeYe3XH9fe',
        createdBy: 'crn::service:payments-api',
        srcAssetId: 'ExVHwdGEFugJWVXWi4riNq',
        destAssetId: 'WTNEcn8HHd2YgVsKRyvcPh',
        amount: '1',
        activityType: 'value-out',
        activityNumber: '3',
        bankAccountId: '7GEDRsP9cyB9fScBziSmJa'
      },
      {
        assetId: 'WxPhZtcBsf19yXjo8gVv9Y',
        activityNumber: '1',
        createdAt: '2022-11-07T22:12:57.224Z',
        createdBy: 'crn::application:rhea',
        activityType: 'created',
        accountId: '6QXN8cq8XVwEJeYe3XH9fe',
        status: 'active'
      }
    ]
  }
};
