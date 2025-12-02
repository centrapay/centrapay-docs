export default {
  method: 'GET',
  path: '/api/payment-links/1234/summary',
  request: {
    headers: {
      'Content-Type': 'application/json',
    }
  },
  response: {
    id: '1234',
    merchantId: 'b040b262ddb80ea8',
    paymentRequestId: '12d22ece51eb0338',
  }
};
