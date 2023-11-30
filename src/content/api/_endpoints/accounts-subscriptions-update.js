export default {
  method: 'PUT',
  path: '/api/accounts/Jaim1Cu1Q55uooxSens6yk/subscriptions',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      subscriptions: [
        'quartz'
      ]
    },
  },
  response: {
    subscriptions: [ 'quartz' ]
  }
};
