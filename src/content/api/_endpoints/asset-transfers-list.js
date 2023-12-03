export default {
  method: 'GET',
  path: '/api/asset-transfers',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
    queryString: {
      recipientAccountId: 'oS3Xom2au3Ooy9aihai',
    },
  },
  response: {
    items: [
      {
        id: 'M7Kn2stAxNa6ri7h',
        status: 'created',
        value: '6000',
        assetId: 'YGRo6TYYSxH3js7',
        description: '$60 Giftcard',
        message: 'Happy birthday',
        senderName: 'My Cafe',
        senderAccountId: 'aBc932S9182qwCDqwer',
        recipientAccountId: '9EDxUT91TMsUjoqoQeBuLQ',
        claimedByAccountId: '9EDxUT91TMsUjoqoQeBuLQ',
        recipientAlias: '+64*****2345',
        createdAt: '2020-05-01T12:30:00.000Z',
        updatedAt: '2020-05-02T01:03:37.222Z',
        suppressNotifications: false
      }
    ]
  }
};
