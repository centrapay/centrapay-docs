export default {
  method: 'POST',
  path: '/api/payment-requests/MhocUmpxxmgdHjr7DgKoKw/refund',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      value: {
        amount: '100',
        currency: 'NZD'
      },
      externalRef: 'e8df06e2-13a5-48b4-b670-3fd6d815fe0a'
    },
  },
};
