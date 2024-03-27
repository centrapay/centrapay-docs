export default {
  method: 'POST',
  path: '/api/asset-transfer-requests',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      recipientAlias: '12-1234-1234567-123',
      senderAccountId: '9EDxUT91TMsUjoqoQeBuLQ',
      value: '1000',
      assetType: 'quartz.nzd.test'
    },
  },
  response: {
    id: 'M7Kn2stAxNa6ri7h',
    recipientAlias: '12-1234-1234567-123',
    status: 'requested',
    assetType: 'quartz.nzd.main',
    description: 'request payment',
    senderName: 'john.doe@gmail.com',
    senderAccountId: '9EDxUT91TMsUjoqoQeBuLQ',
    createdAt: '2024-03-01T23:56:21.514Z',
    createdBy: 'crn:userId:1234',
    suppressNotifications: false,
    value: '1000',
    message: 'Payment request',
  }
};
