export default {
  method: 'GET',
  path: '/api/accounts/T3y6hogYA4d612BExypWYH/collections',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
    },
    queryString: {
      pageKey: 'Collection#2G5bXm4dnuDHnnKY8WeCPm|#Collection|8vq4kn03o0g1grrihk7ooloizpqt2y'
    }
  },
  response: {
    nextPageKey: 'Collection#E9eXsErwA444qFDoZt5iLA|#Collection',
    items: [
      {
        id: 'c_Xv990BzkgfoDS7bBls50pd',
        name: 'Bread',
        accountId: 'T3y6hogYA4d612BExypWYH',
        tokenExpiresAfter: {
          period: 'month',
          duration: '1'
        },
        maxValue: {
          currency: 'NZD',
          amount: '400'
        },
        test: true,
        type: 'product',
        status: 'active',
        createdBy: 'crn::user:b657195e-dc2f-11ea-8566-e7710d592c99',
        createdAt: '2021-05-12T04:30:11.001Z',
        mediaUploadId: '12345',
        img: 'https://media-upload.centrapay.com/image.png?jhbdsfau67ewejshb=487hsdjhbdgs743',
        issuer: 'Centrapay'
      }
    ]
  }
};
