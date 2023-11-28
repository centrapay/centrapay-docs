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
};
