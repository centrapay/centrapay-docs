export default {
  method: 'POST',
  path: '/payments/api/requests.create',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
    queryString: {
      merchantId: 'b0792018-6efc-4bca-a148-83bc57ff75b9',
      clientId: 'b80c361f-805a-405c-b0af-366d3b5bd4ef',
      amount: '300',
      asset: 'NZD',
    },
  },
  response: {
    clientId: 'b80c361f-805a-405c-b0af-366d3b5bd4ef',
    denomination: {
      amount: 350,
      asset: 'NZD'
    },
    notifyUrl: 'http://example.com/payments/api/service.notify',
    payments: [
      {
        account: 'bc1qs3z0uh5e9k9tlhcswqg76vxkewjsjq2htlpv2f',
        amount: 0.0027625,
        ledger: 'g.crypto.bitcoin.mainnet',
        methods: [
          'qr_code'
        ]
      }
    ],
    qrCode: 'cp_9e98c00c-1556-4c95-ba78-2dd1fc97fc5b',
    status: 'new',
    paidBy: {
      transactionId: 'd52cc472-613c-4f25-ae2d-e880a0a24646',
      amount: 1020
    },
    description: 'Coffee',
    externalReference: '03.01.09.chancellor',
    merchantId: 'b0792018-6efc-4bca-a148-83bc57ff75b9',
    requestId: '9e98c00c-1556-4c95-ba78-2dd1fc97fc5b',
    createdAt: '2019-12-10T22:30:51.500Z',
    updatedAt: '2019-12-10T22:31:04.983Z'
  }
};
