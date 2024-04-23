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
      recipientAlias: '+642212312'
    },
  },
  response: {
    id: 'M7Kn2stAxNa6ri7h',
    status: 'created',
    value: '1000',
    assetId: 'YGRo6TYYSxH3js7',
    assetType: 'centrapay.token.main',
    description: 'Centrapay Token',
    message: 'Happy birthday',
    senderName: 'My Cafe',
    recipientAccountId: '9EDxUT91TMsUjoqoQeBuLQ',
    claimedByAccountId: '9EDxUT91TMsUjoqoQeBuLQ',
    recipientAlias: '+64212312345',
    createdAt: '2020-05-01T12:30:00.000Z',
    updatedAt: '2020-05-02T01:03:37.222Z',
    suppressNotifications: false
  }
};
