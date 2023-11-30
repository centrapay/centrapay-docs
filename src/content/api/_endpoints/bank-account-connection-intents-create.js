export default {
  method: 'POST',
  path: '/api/bank-account-connection-intents',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      accountId: 'B4u4WZCu3joZFVWT3XjWW3',
      type: 'account-information-consent',
      test: true
    },
  },
  response: {
    id: '3KVjuKW2CZCJeJVqPxwkX7',
    accountId: 'B4u4WZCu3joZFVWT3XjWW3',
    type: 'account-information-consent',
    status: 'created',
    createdAt: '2022-03-31 02:56:29 UTC',
    createdBy: 'crn:B4u4WZCu3joZFVWT3XjWW3:api-key:MyApiKey',
    updatedAt: '2022-03-31 02:56:29 UTC',
    updatedBy: 'crn:B4u4WZCu3joZFVWT3XjWW3:api-key:MyApiKey',
    authorizationUrl: 'https://example.com/authorization-url',
    test: true
  }
};
