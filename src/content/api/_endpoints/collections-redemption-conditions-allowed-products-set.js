export default {
  method: 'POST',
  path: '/api/collections/c_NFhUgPQEYbk2EbTXAYArTX/redemption-conditions/DKTs3U38hdhfEqwF1JKoT2/set-allowed-products',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
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
    id: 'DKTs3U38hdhfEqwF1JKoT2',
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
    createdBy: 'crn::user:b657195e-dc2f-11ea-8566-e7710d592c99',
    updatedAt: '2022-11-12T04:30:11.001Z',
    updatedBy: 'crn::user:b657195e-dc2f-11ea-8566-e7710g542c49',
  }
};
