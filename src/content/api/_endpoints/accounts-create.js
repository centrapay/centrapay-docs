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
  response: {
    id: 'Jaim1Cu1Q55uooxSens6yk',
    name: 'Centrapay Cafe',
    type: 'org',
    region: 'NZ',
    createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    createdAt: '2020-06-12T01:17:46.499Z',
    modifiedAt: '2020-06-12T01:17:46.499Z',
    modifiedBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    version: '1',
    subscriptions: [],
  }
};
