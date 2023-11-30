export default {
  method: 'POST',
  path: '/api/businesses/DKTs3U38hdhfEqwF1JKoT2/set-onboarding-status',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      onboardingStatus: 'deactivated',
      onboardingStatusReason: 'change-of-ownership'
    },
  },
  response: {
    type: 'set-onboarding-status',
    onboardingStatus: 'deactivated',
    onboardingStatusReason: 'change-of-ownership',
    businessId: 'DKTs3U38hdhfEqwF1JKoT2',
    createdAt: '2020-06-12T01:17:46.499Z',
    createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    activityNumber: 2
  }
};
