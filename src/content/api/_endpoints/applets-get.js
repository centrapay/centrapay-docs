export default {
  method: 'GET',
  path: '/api/applets/a_WRhAxxWpTKb5U7pXyxQjjY',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
  },
  response: {
    id: 'a_WRhAxxWpTKb5U7pXyxQjjY',
    name: 'Centrapay Cafe',
    mediaUploadId: '8aoMfscvtuewsuJzmzBzAs',
    img: 'https://media-upload.centrapay.com/image.png?jhbdsfau67ewejshb=487hsdjhbdgs743',
    accountId: 'Jaim1Cu1Q55uooxSens6yk',
    createdAt: '2021-08-25T00:02:49.488Z',
    createdBy: 'crn::user:b657195e-dc2f-11ea-8566-e7710d592c99',
    extensions: [
      {
        type: 'loyalty',
        loyaltyProgramId: 'L001',
        getPromotionsUrl: 'https://service.payap.com/api/loyalty-programs/L001/promotions',
        getPromotionMembershipsUrl: 'https://service.payap.com/api/challenges?loyaltyProgramId=L001',
        getLoyaltyProgramUrl: 'https://service.payap.com/api/loyalty-programs/L001'
      }
    ]
  }
};
