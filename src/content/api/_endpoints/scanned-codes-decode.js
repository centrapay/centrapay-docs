export default {
  method: 'POST',
  path: '/api/decode',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      code: '123456789',
      scannedBy: 'merchant',
      merchantConfigId: 'P9gm1s1Cu1Q5uooxs'
    },
  },
};
