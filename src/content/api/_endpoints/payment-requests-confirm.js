export default {
  method: 'POST',
  path: '/api/payment-requests/MhocUmpxxmgdHjr7DgKoKw/confirm',
  request: {
    headers: {
      'X-Api-Key': '<TOKEN>',
      'Content-Type': 'application/json',
    },
    payload: {
      value: {
        amount: '6190',
        currency: 'NZD'
      },
      idempotencyKey: 'e8df06e2-13a5-48b4-b670-3fd6d815fe0a',
      invoiceRef: '2022-08-03T16:56:50-06:00',
      lineItems: [
        {
          name: 'Coffee Grounds',
          sku: 'GH1234',
          qty: '1',
          price: '4195',
          tax: '15.00'
        },
        {
          name: 'Centrapay Cafe Mug',
          sku: 'SB456',
          qty: '25',
          price: '1995',
          tax: '15.00',
          discount: '199',
          restricted: true,
          productId: '19412345123459',
          classification: {
            type: 'GS1',
            code: '10001874',
            name: 'CROCKERY',
            props: {
              20001479: '30008960'
            }
          }
        }
      ]
    },
  },
  response: {
    paymentRequestId: 'MhocUmpxxmgdHjr7DgKoKw',
    shortCode: 'CP-C7F-ZS5',
    value: {
      amount: '6190',
      currency: 'NZD'
    },
    preAuth: true,
    type: 'confirmation',
    idempotencyKey: 'e8df06e2-13a5-48b4-b670-3fd6d815fe0a',
    createdAt: '2021-06-08T04:04:27.426Z',
    updatedAt: '2021-06-08T04:04:27.426Z',
    lineItems: [
      {
        name: 'Coffee Grounds',
        sku: 'GH1234',
        qty: '1',
        price: '4195',
        tax: '15.00'
      },
      {
        name: 'Centrapay Cafe Mug',
        sku: 'SB456',
        qty: '25',
        price: '1995',
        tax: '15.00',
        discount: '199'
      }
    ],
    invoiceRef: '2022-08-03T16:56:50-06:00',
    createdByAccountId: 'Jaim1Cu1Q55uooxSens6yk',
    createdByAccountName: 'Bob\'s Burgers Intergration'
  }
};
