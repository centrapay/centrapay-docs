export default {
  method: 'POST',
  path: '/api/merchants/5ee0c486308f590260d9a07f/set-onboarding-status',
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
