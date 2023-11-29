export default {
  method: 'POST',
  path: '/payments/api/requests.cancel',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
    queryString: {
      requestId: 'a95b3b0d-1278-4613-8772-20d146065a2e',
    },
  },
};
