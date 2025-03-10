export default {
  method: 'POST',
  path: '/api/loyalty-programs',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      name: 'Centrapay Cafe Loyalty Program',
      description: 'Centrapay Cafe Loyalty: Earn rewards, enjoy perks! Join now!',
      mediaUploadId: '8aoMfscvtuewsuJzmzBzAs',
      accountId: 'Jaim1Cu1Q55uooxSens6yk',
    },
  },
  response: {
    id: 'WRhAxxWpTKb5U7pXyxQjjY',
    name: 'Centrapay Cafe Loyalty Program',
    description: 'Centrapay Cafe Loyalty: Earn rewards, enjoy perks! Join now!',
    mediaUploadId: '8aoMfscvtuewsuJzmzBzAs',
    img: 'https://media-upload.centrapay.com/image.png?jhbdsfau67ewejshb=487hsdjhbdgs743',
    accountId: 'Jaim1Cu1Q55uooxSens6yk',
    createdAt: '2021-08-25T00:02:49.488Z',
    createdBy: 'crn::user:b657195e-dc2f-11ea-8566-e7710d592c99',
    test: true,
    status: 'draft'
  }
};
