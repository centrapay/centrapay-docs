export default {
  method: 'POST',
  path: '/api/payment-requests/MhocUmpxxmgdHjr7DgKoKw/conditions/1/accept',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    type: 'accept-condition',
    value: {
      currency: 'NZD',
      amount: 100
    },
    paymentRequestId: 'MhocUmpxxmgdHjr7DgKoKw',
    conditionId: '1',
    createdAt: '2022-05-12T01:17:00.000Z',
    createdBy: 'crn::user:0af834c8-1110-11ec-9072-3e22fb52e878',
    paymentRequestCreatedBy: 'crn::user:0af834c8-1110-11ec-9072-3e22fb52e878',
    activityNumber: '2',
    merchantAccountId: 'C4QnjXvj8At6SMsEN4LRi9',
    merchantId: '5ee0c486308f590260d9a07f',
    merchantConfigId: '5ee168e8597be5002af7b454',
    merchantName: 'Centrapay Café'
  }
};
