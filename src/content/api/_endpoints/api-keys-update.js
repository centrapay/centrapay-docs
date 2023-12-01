export default {
  method: 'PUT',
  path: '/api/accounts/Jaim1Cu1Q55uooxSens6yk/api-keys/MyAPIkey',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      enabled: false
    },
  },
  response: {
    accountId: 'Jaim1Cu1Q55uooxSens6yk',
    name: 'MyAPIkey',
    createdAt: '2020-06-01T22:34:31.308Z',
    createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:AdminKey',
    modifiedAt: '2020-07-02T22:34:31.308Z',
    modifiedBy: 'crn:Jaim1Cu1Q55uooxSens6yk:api-key:MyAPIkey',
    enabled: false,
    version: '2',
    role: 'merchant-terminal'
  }
};
