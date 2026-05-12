export default {
  method: 'GET',
  path: '/api/promotions/8aoMfscvtuewsuJzmzBzAs/activities',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    items: [
      {
        id: 'WRhAxxWpTKb5U7pXyxQjjY',
        activityType: 'promotion:created',
        promotionId: '8aoMfscvtuewsuJzmzBzAs',
        programId: 'WRhAxxWpTKb5U7pXyxQjjY',
        createdAt: '2023-02-08T04:04:27.426Z',
      },
      {
        id: '26yUWG6wFgmva8UaDiCTWq',
        activityType: 'promotion:shared-progress-incremented',
        promotionId: '8aoMfscvtuewsuJzmzBzAs',
        programId: 'WRhAxxWpTKb5U7pXyxQjjY',
        accountId: '57SyRRgZ1U8Kq2wKpCnSR5',
        targetProgress: '1',
        createdAt: '2023-06-14T12:30:00.000Z',
      },
      {
        id: 'DKTs3U38hdhfEqwF1JKoT2',
        activityType: 'promotion:ended',
        promotionId: '8aoMfscvtuewsuJzmzBzAs',
        createdBy: 'crn::user:1234',
        createdAt: '2024-02-16T00:47:54.131Z',
        status: 'ended',
      },
    ],
    nextPageKey: 'DKTs3U38hdhfEqwF1JKoT2',
  },
};
