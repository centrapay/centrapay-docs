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
      merchantConfigId: '5ee168e8597be5002af7b454',
      scannedBy: 'merchant'
    },
  },
};
