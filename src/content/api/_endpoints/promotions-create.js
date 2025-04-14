export default {
  method: 'POST',
  path: '/api/loyalty-programs/WRhAxxWpTKb5U7pXyxQjjY/promotions',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      name: 'Spend a Buck',
      summary: 'Make a payment',
      mediaUploadId: '26yUWG6wFgmva8UaDiCTWq',
      startsAt: '2023-02-16T00:47:54.131Z',
      endsAt: '2024-02-16T00:47:54.131Z',
      rewards: [
        {
          assetType: 'centrapay.nzd.main',
          amount: '500',
        }
      ],
      eventType: 'payment',
      target: {
        type: 'count',
        amount: '1'
      },
      type: 'challenge',
      conditions: [
        {
          field: 'amount',
          value: '99',
          operator: 'greater-than'
        }
      ],
      description: 'The amount of the payment must be greater than $1.',
      supplyLimit: '10',
      repeatable: true
    },
  },
  response: {
    id: '8aoMfscvtuewsuJzmzBzAs',
    accountId: '57SyRRgZ1U8Kq2wKpCnSR5',
    programId: 'WRhAxxWpTKb5U7pXyxQjjY',
    name: 'Spend a Buck',
    summary: 'Make a payment',
    mediaUploadId: '26yUWG6wFgmva8UaDiCTWq',
    img: 'https://media-upload.centrapay.com/image.png?jhbdsfau67ewejshb=487hsdjhbdgs743',
    startsAt: '2023-02-16T00:47:54.131Z',
    endsAt: '2024-02-16T00:47:54.131Z',
    rewards: [
      {
        assetType: 'centrapay.nzd.main',
        amount: '500',
      },
      {
        promotionId: '8aoMfscvtuewsuJzmzBzAs',
      }
    ],
    eventType: 'payment',
    target: {
      type: 'count',
      amount: '1'
    },
    type: 'challenge',
    conditions: [
      {
        field: 'amount',
        value: '99',
        operator: 'greater-than'
      }
    ],
    description: 'The amount of the payment must be greater than $1.',
    supplyLimit: '10',
    remainingSupply: '10',
    createdAt: '2023-02-08T04:04:27.426Z',
    createdBy: 'crn::user:1234',
    updatedAt: '2023-02-08T04:04:27.426Z',
    updatedBy: 'crn::user:1234',
    repeatable: true
  },
};
