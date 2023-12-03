export default {
  method: 'POST',
  path: '/api/external-assets',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      accountId: 'Jaim1Cu1Q55uooxSens6yk',
      category: 'giftcard',
      type: 'epay.nzd.test',
      issuer: 'ezipay',
      externalId: '23403321042',
      pin: '3771'
    },
  },
  response: {
    id: 'L75M3L56N2PtBSt8g7uXLU',
    category: 'giftcard',
    type: 'epay.nzd.main',
    accountId: 'Jaim1Cu1Q55uooxSens6yk',
    issuer: 'ezipay',
    externalId: '************21042',
    description: '$60 Acme Giftcard',
    productCode: '23403',
    currency: 'NZD',
    initialBalance: '7000',
    balance: '6000',
    availableBalance: '6000',
    balanceUpdatedAt: '2020-06-10T15:30:00.000Z',
    expiresAt: '2020-12-31T00:00:00.000Z',
    createdAt: '2020-05-01T12:30:00.000Z'
  }
};
