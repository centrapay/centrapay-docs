export default {
  method: 'POST',
  path: '/api/payment-requests',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      required: {
        configId: '5efbe2fb96c08357bb2b9242',
        value: {
          amount: '10000',
          currency: 'NZD'
        }
      },
      optional: {
        barcode: '123456789',
        conditionsEnabled: true,
        patronNotPresent: true,
        preAuth: true,
        invoiceRef: 'sy8CRmo3sp3ArOpnfmb423',
        purchaseOrderRef: 'oF6kj1QlH5gK0y9rjRHFh2',
        lineItems: [
          {
            name: 'Hard Hat',
            sku: 'GH1234',
            qty: '1',
            price: '4000',
            tax: '15',
            discount: '400'
          },
          {
            name: 'Tool Belt',
            sku: 'GH1234',
            qty: '1',
            price: '6000',
            tax: '15',
            discount: '600'
          }
        ],
        redirectUrl: 'https://www.example.com/store/checkout',
      }
    },
  },
};
