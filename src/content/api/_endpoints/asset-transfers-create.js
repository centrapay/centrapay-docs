export default {
  method: 'POST',
  path: '/api/asset-transfers',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      assetId: 'YGRo6TYYSxH3js7',
      value: '1000',
      message: 'Happy birthday',
      senderName: 'My Cafe',
      claimType: 'multi',
      valueConfig: {
        type: 'flat',
        params: {
          amount: '100'
        }
      },
      claimConditions: [
        {
          type: 'frequency',
          params: {
            period: 'lifetime',
            limit: '1'
          }
        }
      ],
    },
  },
  response: {
    id: 'M7Kn2stAxNa6ri7h',
    status: 'created',
    value: '1000',
    assetId: 'YGRo6TYYSxH3js7',
    assetType: 'centrapay.ledger.main',
    assetCollectionId: 'c_Xv990BzkgfoDS7bBls50pd',
    description: 'Centrapay Ledger',
    message: 'Happy birthday',
    senderName: 'My Cafe',
    createdAt: '2020-05-01T12:30:00.000Z',
    updatedAt: '2020-05-02T01:03:37.222Z',
    suppressNotifications: false,
    claimType: 'multi',
    valueConfig: {
      type: 'flat',
      params: {
        amount: '100'
      }
    },
    claimConditions: [
      {
        type: 'frequency',
        params: {
          period: 'lifetime',
          limit: '1'
        }
      }
    ],
    remainingValue: '1000'
  }
};
