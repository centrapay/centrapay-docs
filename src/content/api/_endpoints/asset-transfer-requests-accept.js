export default {
  method: 'POST',
  path: '/api/asset-transfer-requests/M7Kn2stAxNa6ri7h/accept',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      assetId: 'YGRo6TYYSxH3js7',
      value: '1000',
      senderName: 'Jane Doe'
    },
  },
  response: {
    assetTransferId: 'M7Kn2stAxNa6ri7h',
    status: 'accepted',
    type: 'asset-transfer:accepted',
    createdAt: '2020-05-02T01:03:37.222Z',
    createdBy: 'sdasd98199dadas',
    assetId: 'YGRo6TYYSxH3js7',
    senderName: 'Jane Doe',
    value: '1000',
  }
};
