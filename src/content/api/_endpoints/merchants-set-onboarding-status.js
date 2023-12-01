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
  response: {
    type: 'set-onboarding-status',
    onboardingStatus: 'deactivated',
    onboardingStatusReason: 'change-of-ownership',
    merchantId: 'MhocUmpxxmgdHjr7DgKoKw',
    createdAt: '2021-09-12T01:11:22.491Z',
    createdBy: 'crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey',
    activityNumber: '2'
  }
};
