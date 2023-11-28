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
};
