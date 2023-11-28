export default {
  method: 'POST',
  path: '/api/businesses',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      nzbn: '9429046246448',
      taxNumber: {
        value: '123-456-789',
        type: 'nz-gst'
      }
    },
  },
};
