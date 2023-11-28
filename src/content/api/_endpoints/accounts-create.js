export default {
  method: 'POST',
  path: '/api/accounts',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      name: 'Centrapay Cafe',
      type: 'org'
    },
  },
};
