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
      mode: 'partial-payment'
    },
  },
};
