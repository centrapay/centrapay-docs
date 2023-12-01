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
  response: {
    userId: '9f4b3bae-dc30-11ea-ab70-2743d9be3dd5',
    givenName: 'John',
    familyName: 'Doe',
    featureUpdates: true,
    marketingUpdates: true,
    email: 'john.doe@centrapay.com',
    emailVerified: true,
    phoneNumber: '+64271112222',
    phoneVerified: true
  }
};
