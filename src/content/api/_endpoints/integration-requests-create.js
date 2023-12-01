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
  response: {
    id: 'DKTs3U38hdhfEqwF1JKoT2',
    accountId: 'Jaim1Cu1Q55uooxSens6yk',
    merchantId: '5ee0c486308f590260d9a07f',
    type: 'verifone',
    status: 'pending',
    createdAt: '2020-06-12 01:17:46 UTC',
    updatedAt: '2020-06-12 01:17:46 UTC',
    createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    updatedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    terminal: {
      terminalId: '002039390093939',
      deviceId: '002-039-390'
    }
  }
};
