export default {
  method: 'POST',
  path: '/api/wallets',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      accountId: 'Te2uDM7xhDLWGVJU3nzwnh',
      ledgerId: 'centrapay.nzd.main',
      settlement: 'true'
    },
  },
};
