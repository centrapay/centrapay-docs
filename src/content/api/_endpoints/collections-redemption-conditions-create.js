export default {
  method: 'POST',
  path: '/api/collections/c_NFhUgPQEYbk2EbTXAYArTX/redemption-conditions',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      merchantId: '36EALpZ89XpShxM2Ee9sXT',
      allowedProducts: [
        {
          sku: '100001',
          name: 'White Bread',
          maxValue: {
            currency: 'NZD',
            amount: '400'
          }
        },
        {
          sku: '100002',
          name: 'Sourdough Bread',
          maxValue: {
            currency: 'NZD',
            amount: '800'
          }
        }
      ]
    },
  },
  response: {
    id: '1234',
    merchantId: '36EALpZ89XpShxM2Ee9sXT',
    collectionId: 'c_NFhUgPQEYbk2EbTXAYArTX',
    allowedProducts: [
      {
        sku: '100001',
        name: 'White Bread',
        maxValue: {
          currency: 'NZD',
          amount: '400'
        }
      },
      {
        sku: '100002',
        name: 'Sourdough Bread',
        maxValue: {
          currency: 'NZD',
          amount: '800'
        }
      }
    ],
    createdAt: '2022-05-12T04:30:11.001Z',
    createdBy: 'crn::user:b657195e-dc2f-11ea-8566-e7710d592c99'
  }
};
