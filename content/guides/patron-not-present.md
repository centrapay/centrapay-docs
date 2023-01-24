---
title: Patron Not Present
---

Centrapay’s Patron Not Present extension allows a merchant to complete a payment when the Patron is not physically present at the time of payment (e.g. phone-based orders).

You can enable this extension by [creating a Payment Request](https://docs.centrapay.com/api/payment-requests#create-a-payment-request) with the `patronNotPresent` flag set to true.

```bash [Request]
curl -X POST https://service.centrapay.com/api/payment-requests \
  -H "X-Api-Key: $api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "barcode": "123456789",
    "configId": "5ee168e8597be5002af7b454",
    "lineItems": [
      {
        "name": "Tool Belt",
        "sku": "GH1234",
        "qty": "1",
        "price": "6000",
        "tax": "15",
        "discount": "600"
      }
    ],
    "patronNotPresent": true,
    "value": {
      "amount": "6000",
      "currency": "NZD"
    }
  }'
```
