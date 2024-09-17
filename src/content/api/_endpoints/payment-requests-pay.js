export default {
  method: 'POST',
  path: '/api/payment-requests/MhocUmpxxmgdHjr7DgKoKw/pay',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      assetType: 'centrapay.nzd.main',
      assetId: 'WRhAxxWpTKb5U7pXyxQjjY',
      amount: '200',
      mode: 'partial-payment',
      externalPaymentRef: '62e4b0d7-551b-4b93-8b62-28265b4457d1'
    },
  },
  response: {
    type: 'payment',
    value: {
      currency: 'NZD',
      amount: '1000'
    },
    assetType: 'centrapay.nzd.main',
    paymentRequestId: 'MhocUmpxxmgdHjr7DgKoKw',
    shortCode: 'CP-C7F-ZS5-015',
    merchantName: 'Centrapay Café',
    merchantId: '26d3Cp3rJmbMHnuNJmks2N',
    merchantAccountId: 'C4QnjXvj8At6SMsEN4LRi9',
    merchantConfigId: '5efbe2fb96c08357bb2b9242',
    createdAt: '2021-06-08T04:04:27.426Z',
    createdBy: 'crn::user:0af834c8-1110-11ec-9072-3e22fb52e878',
    paymentRequestCreatedBy: 'crn::user:0af834c8-1110-11ec-9072-3e22fb52e878',
    activityNumber: '2',
    mode: 'partial-payment',
    id: '94a564c9a66d4893b7edf8ccafe3c5fb',
    externalPaymentRef: '62e4b0d7-551b-4b93-8b62-28265b4457d1'
  }
};
