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
};
