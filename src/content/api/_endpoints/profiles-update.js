export default {
  method: 'POST',
  path: '/api/me/profile/update',
  request: {
    headers: {
      'Authorization': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      givenName: 'John',
      familyName: 'Doe',
      featureUpdates: false,
      marketingUpdates: true,
      email: 'john.doe@centrapay.com'
    },
  },
};
