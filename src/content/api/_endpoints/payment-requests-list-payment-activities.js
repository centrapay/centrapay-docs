export default {
  method: 'GET',
  path: '/api/payment-requests/MhocUmpxxmgdHjr7DgKoKw/activities',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    items: [
      {
        type: 'refund',
        value: {
          currency: 'NZD',
          amount: '600'
        },
        assetType: 'centrapay.nzd.main',
        paymentRequestId: 'MhocUmpxxmgdHjr7DgKoKw',
        shortCode: 'CP-C7F-ZS5-032',
        merchantName: 'Centrapay Café',
        merchantId: '5ee0c486308f590260d9a07f',
        merchantAccountId: 'C4QnjXvj8At6SMsEN4LRi9',
        merchantConfigId: '5ee168e8597be5002af7b454',
        createdAt: '2021-06-12T01:17:00.000Z',
        createdBy: 'crn::user:0af834c8-1110-11ec-9072-3e22fb52e878',
        paymentRequestCreatedBy: 'crn::user:0af834c8-1110-11ec-9072-3e22fb52e878',
        activityNumber: '3'
      },
      {
        type: 'payment',
        value: {
          currency: 'NZD',
          amount: '6190'
        },
        assetType: 'centrapay.nzd.main',
        paymentRequestId: 'MhocUmpxxmgdHjr7DgKoKw',
        shortCode: 'CP-C7F-ZS5-027',
        merchantName: 'Centrapay Café',
        merchantId: '5ee0c486308f590260d9a07f',
        merchantAccountId: 'C4QnjXvj8At6SMsEN4LRi9',
        merchantConfigId: '5ee168e8597be5002af7b454',
        createdAt: '2021-06-12T01:16:00.000Z',
        createdBy: 'crn::user:da75ad90-9a5b-4df0-8374-f48b3a8fbfcc',
        paymentRequestCreatedBy: 'crn::user:0af834c8-1110-11ec-9072-3e22fb52e878',
        activityNumber: '2'
      },
      {
        type: 'request',
        value: {
          currency: 'NZD',
          amount: '6190'
        },
        paymentRequestId: 'MhocUmpxxmgdHjr7DgKoKw',
        shortCode: 'CP-C7F-ZS5-015',
        merchantName: 'Centrapay Café',
        merchantId: '5ee0c486308f590260d9a07f',
        merchantAccountId: 'C4QnjXvj8At6SMsEN4LRi9',
        merchantConfigId: '5ee168e8597be5002af7b454',
        createdAt: '2021-06-12T01:15:46.000Z',
        createdBy: 'crn::user:0af834c8-1110-11ec-9072-3e22fb52e878',
        paymentRequestCreatedBy: 'crn::user:0af834c8-1110-11ec-9072-3e22fb52e878',
        activityNumber: '1'
      }
    ]
  }
};
