export default {
  method: 'GET',
  path: '/api/integration-requests',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
    queryString: {
      type: 'epay',
      pending: 'true',
      accountId: 'Jaim1Cu1Q55uooxSens6yk'
    }
  },
};
