---
layout:  default
grand_parent: API Reference
parent: Payment Requests
title: Payment Requests
nav_order: 1
permalink: /api/payment-requests
---

# Payment Requests
{:.no_toc}

Payment Requests represent the intention for a merchant to receive payment for
goods and services.  Payment Requests define the amount to be paid and the
asset types that are acceptable for payment.

A Payment Request is shared with, and paid by, a patron. The [Payment Flows Guide][]
has more details regarding negotiation of Payment Requests.

Payment Requests have the following statuses:

 * **new**: after being created.
 * **paid**: after being paid with one or more transactions.
 * **cancelled**: after being cancelled or voided by the merchant.
 * **expired**: after expiry time is reached without being paid or cancelled.

Payment requests can also be refunded for a short period of time after being paid.

Payment request state transitions can be notified to webhooks.

Centrapay Payment Requests are serviced via two sets of endpoints; the "next"
version (documented on this page) and the "legacy" version (documented at
[Legacy Payment Requests][]).

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Payment Request

{% h4 Mandatory Fields %}

| Field          | Type               | Description                                                                 |
|----------------|--------------------|-----------------------------------------------------------------------------|
| id             | String             | The payment request id.                                                     |
| value          | {% dt Monetary %}  | The canonical value of the payment request. Must be positive.               |
| paymentOptions | Array              | The [Payment Options](#payment-option), indicating valid asset for payment. |
| status         | String             | "new", "paid", "cancelled", "expired"                                       |
| liveness       | String             | Indicates test assets are accepted. Values are "main" or "test".            |
| createdAt      | {% dt Timestamp %} | When the payment request was created.                                       |
| updatedAt      | {% dt Timestamp %} | When the payment request was updated.                                       |
| expiresAt      | {% dt Timestamp %} | When the payment request expires.                                           |


{% h4 Optional Fields %}

| Field            | Type   | Description                                                          |
|------------------|--------|----------------------------------------------------------------------|
| patronCodeId     | String | The id of the [Patron Code][] the payment request is attached to.        |
| merchantId       | String | The id of the merchant the payment request is on behalf of.          |
| merchantName     | String | The name of the merchant the payment request is on behalf of.        |
| merchantConfigId | String | The merchant configuration id used to configure the payment options. |
| expirySeconds    | Number | The expiry seconds used to configure the payment request expiry.     |
| lineItems        | Array  | **EXPERIMENTAL** The [Line Items](#line-item) being paid for.       |


### Payment Option

{% h4 Mandatory Fields %}

| Field     | Type               | Description                                                             |
|-----------|--------------------|-------------------------------------------------------------------------|
| assetType | String             | An [Asset Type][] reference.                                            |
| amount    | {% dt BigNumber %} | The value required to pay using the canonical units for the asset type. |

{% h4 Optional Fields %}

| Field          | Type   | Description                                                                           |
|----------------|--------|---------------------------------------------------------------------------------------|
| bitcoinAddress | String | ★  Address to send Bitcoin, when the "assetType" is `bitcoin.*`                       |
| cennzAddress   | String | ★  Address to send CPay, when the "assetType" is `cennznet.*`                         |
| wavesAddress   | String | ★  Waves address to send Zap tokens, when the "assetType" is `zap.*`                  |
| productCodes   | Array  | Supported product codes for the payment request, when the "assetType" is `epay.nzd.*` |

★  For payment options which specify an address, there's a requirement to make a transaction on an
external ledger. Once you have made that payment, you can use the transaction id for
[Paying a Payment Request][].


### Line Item

An order item for which payment is requested. The currency and units for a line
item price will be consistent with the payment request value and the sum of
line item prices should equal the payment request value.

A line item price can be negative to represents a discount.

{% h4 Mandatory Fields %}

| Field | Type               | Description                                                           |
|-------|--------------------|-----------------------------------------------------------------------|
| name  | String             | The product description.                                              |
| sku   | String             | The product (stock keeping unit) code.                                |
| qty   | {% dt BigNumber %} | The product quantity (eg. item count, weight, volume etc).            |
| price | {% dt BigNumber %} | The final price in cents (eg. product price * qty - discounts + tax). |

{% h4 Optional Fields %}

| Field     | Type               | Description                           |
|-----------|--------------------|---------------------------------------|
| tax       | {% dt BigNumber %} | Tax rate (percentage).                |
| discount  | {% dt BigNumber %} | Discount amount in cents.             |
| productId | String             | Manufacturer's product identifier (eg GTIN/EAN). |


## Operations

### Create a Payment Request with Line Items **EXPERIMENTAL**

{% reqspec %}
  POST '/api/payment-requests'
  auth 'api-key'
  body ({
    merchantConfigId: '5efbe2fb96c08357bb2b9242',
    value: { currency: 'NZD', amount: '4195' },
    lineItems: [
      {
        name: 'Golden Hammer',
        sku: 'GH1234',
        qty: '1',
        price: '4195',
        tax: '15.00',
      },
      {
        name: 'Silver Bullets',
        sku: 'SB456',
        qty: '25',
        price: '1995',
        tax: '15.00',
        discount: '199',
      },
    ],
  })
{% endreqspec %}


<a name="patron-code"></a>
### Get a Payment Request linked to a Patron Code **EXPERIMENTAL**

Returns the latest Payment Request with status "new" that has been attached to a [Patron Code][].
The Payment Request may have been created with a reference to any Patron Code owned by the user's
account.

This endpoint should be polled just after a user's Patron Code has been scanned. This will allow
them to find the Payment Request and proceed to pay.

{% reqspec %}
  GET '/api/me/patron-code-payment-request'
  auth 'jwt'
{% endreqspec %}


{% h4 Example response payload when no new Payment Request found %}

```json
{}
```

{% h4 Example response payload with a Payment Request %}

```json
{
  "id": "207b5fb5-621e-4282-86c3-42ee47f87e74",
  "url": "https://app.centrapay.com/pay/207b5fb5-621e-4282-86c3-42ee47f87e74",
  "patronCodeId": "V17FByEP9gm1shSG6a1Zzx",
  "merchantId": "26d3Cp3rJmbMHnuNJmks2N",
  "merchantName": "Centrapay Café",
  "merchantConfigId": "5efbe2fb96c08357bb2b9242",
  "value": { "currency": "NZD", "amount": "100" },
  "paymentOptions": [
    {
      "amount": "100",
      "assetType": "centrapay.nzd.test"
    }
  ],
  "status": "new",
  "createdAt": "2021-06-08T04:04:27.426Z",
  "updatedAt": "2021-06-08T04:04:27.426Z",
  "expiresAt": "2021-06-08T04:06:27.426Z",
  "liveness": "test",
  "expirySeconds": 120
}
```



[Patron Code]: {% link api/patron-codes.md %}
[Asset Type]: {% link api/assets/asset-types.md %}
[Payment Flows Guide]: {% link guides/payment-flows.md %}
[Legacy Payment Requests]: {% link api/payment-requests/legacy-payment-requests.md %}
[Patron Code]: {% link api/patron-codes.md %}
[Paying a Payment Request]: {% link api/payment-requests/legacy-payment-requests.md %}#requests-pay
