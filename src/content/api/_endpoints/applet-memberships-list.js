export default {
  method: 'GET',
  path: '/api/accounts/Jaim1Cu1Q55uooxSens6yk/applet-memberships',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    queryString: {
      pageKey: 'eyJzayI6IkFwcGxldE1lbW1dGVMTWNRcEo0NnUifQ==',
      paginationLimit: '1'
    }
  },
  response: {
    nextPageKey: 'asxaasd0-l32-1lbW1dGVMTWNRcESDasd9jkSK==',
    items: [
      {
        id: 'ad90asd90k12',
        accountId: 'asd901k2e09',
        appletId: 'WRhAxxWpTKb5U7pXyxQjjY',
        name: 'Centrapay Cafe',
        mediaUploadId: '8aoMfscvtuewsuJzmzBzAs',
        img: 'https://media-upload.centrapay.com/image.png?jhbdsfau67ewejshb=487hsdjhbdgs743',
        appletAccountId: 'Jaim1Cu1Q55uooxSens6yk',
        createdAt: '2021-08-25T00:02:49.488Z',
        createdBy: 'crn::user:b657195e-dc2f-11ea-8566-e7710d592c99',
        extensions: [
          {
            type: 'loyalty',
            loyaltyProgramId: 'L001',
            getPromotionsUrl: 'service.payap.com/api/loyaltyPrograms/L001/promotions',
            getPromotionMembershipsUrl: 'service.payap.com/api/loyaltyPrograms/L001/promotionMemberships',
            getLoyaltyProgramUrl: 'service.payap.com/api/loyaltyPrograms/L001'
          }
        ]
      }
    ]
  }
};
