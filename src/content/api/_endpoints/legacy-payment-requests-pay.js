export default {
  method: 'POST',
  path: '/payments/api/requests.pay',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
    queryString: {
      authorization: '4a936ad82d8e51ae0afc317e944bfa569d935a45206b49b67117ee8aaa04a3b1',
      ledger: 'g.crypto.bitcoin.mainnet',
      requestId: '7d2b1d52-b609-4ccd-b4cc-c4a9af881bd9',
    },
  },
};
