export default {
  method: 'POST',
  path: '/api/integration-requests',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      merchantId: '5ee0c486308f590260d9a07f',
      type: 'verifone',
      terminal: {
        terminalId: '002039390093939',
        deviceId: '002-039-390'
      }
    },
  },
};
