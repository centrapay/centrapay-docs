export default {
  method: 'POST',
  path: '/api/payment-requests/MhocUmpxxmgdHjr7DgKoKw/void',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
  },
  response: {
    type: 'refund',
    value: {
      currency: 'NZD',
      amount: '1000'
    },
    assetType: 'centrapay.nzd.main',
    paymentRequestId: 'MhocUmpxxmgdHjr7DgKoKw',
    shortCode: 'CP-C7F-ZS5-032',
    merchantName: 'Centrapay Café',
    merchantId: '26d3Cp3rJmbMHnuNJmks2N',
    merchantAccountId: 'C4QnjXvj8At6SMsEN4LRi9',
    merchantConfigId: '5efbe2fb96c08357bb2b9242',
    createdAt: '2021-06-08T04:04:27.426Z',
    createdBy: 'crn::user:0af834c8-1110-11ec-9072-3e22fb52e878',
    paymentRequestCreatedBy: 'crn::user:0af834c8-1110-11ec-9072-3e22fb52e878',
    activityNumber: '3'
  }
};
