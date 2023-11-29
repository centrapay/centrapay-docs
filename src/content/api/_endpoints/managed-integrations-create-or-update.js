export default {
  method: 'PUT',
  path: '/api/managed-integrations/paypal-referral/DKTs3U38hdhfEqwF1JKoT2',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      enabled: true,
      params: {
        centrapayMerchantId: '5ffcaf432003060007b98343',
        email: 'test@centrapay.com'
      }
    },
  },
};
