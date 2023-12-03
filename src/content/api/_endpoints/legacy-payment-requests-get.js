export default {
  method: 'GET',
  path: '/payments/api/requests.info',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
    queryString: {
      requestId: 'TyqV56mEkNLUeiY2QskHNR',
    },
  },
  response: {
    requestId: 'TyqV56mEkNLUeiY2QskHNR',
    shortCode: 'CP-C7F-ZS5',
    merchantId: '5efbe17d96c083633e2b9241',
    merchantName: 'NZD Test Merchant',
    clientId: '5efbe2fb96c08357bb2b9242',
    denomination: {
      asset: 'NZD',
      amount: 100
    },
    payments: [
      {
        ledger: 'centrapay.nzd.test',
        amount: 100,
        methods: [
          'qr_code'
        ]
      }
    ],
    qrCode: 'https://app.centrapay.com/pay/TyqV56mEkNLUeiY2QskHNR',
    requestCode: 'https://app.centrapay.com/pay/TyqV56mEkNLUeiY2QskHNR',
    status: 'new',
    createdAt: '2021-11-29T23:04:54.253Z',
    updatedAt: '2021-11-29T23:04:54.253Z',
    liveness: 'test',
    paymentExpirySeconds: 120
  }
};
