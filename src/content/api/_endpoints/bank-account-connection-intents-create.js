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
};
