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
| assetType | String             | An [Asset][] type reference.                                            |
| amount    | {% dt BigNumber %} | The value required to pay using the canonical units for the asset type. |


### Line Item

An order item for which payment is requested. The currency and units for a line
item price will be consistent with the payment request value and the sum of
line item prices should equal the payment request value.

A line item price can be negative to represents a discount.

{% h4 Mandatory Fields %}

| Field | Type               | Description                                                |
|-------|--------------------|------------------------------------------------------------|
| name  | String             | The product description.                                   |
| sku   | String             | The product (stock keeping unit) code.                     |
| qty   | {% dt BigNumber %} | The product quantity (eg. item count, weight, volume etc). |
| price | {% dt BigNumber %} | The line price (eg. product price * qty).                  |


## Operations

<a name="patron-code"></a>
### Get a Payment Request linked to a Patron Code **EXPERIMENTAL**

Returns the latest Payment Request with status "new" that has been attached to a [Patron Code][].
The Payment Request may have been created with a reference to any Patron Code owned by the user's
account.

This endpoint should be polled just after a user's Patron Code has been scanned. This will allow
them to find the Payment Request and proceed to pay.

{% endpoint GET https://service.centrapay.com/api/me/patron-code-payment-request %}

```sh
curl -X GET "https://service.centrapay.com/api/me/patron-code-payment-request" \
  -H "x-api-key: 1234"
```

**Example response payload when no new Payment Request found**

```json
{}
```

**Example response payload with a Payment Request**

```json
{
  "id": "207b5fb5-621e-4282-86c3-42ee47f87e74",
  "url": "https://app.centrapay.com/pay/207b5fb5-621e-4282-86c3-42ee47f87e74"
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
[Asset]: {% link api/assets/assets.md %}
[PaymentOption]: #payment-option
[LineItem]: #line-item
[Payment Flows Guide]: {% link guides/payment-flows.md %}
[Legacy Payment Requests]: {% link api/payment-requests/legacy-payment-requests.md %}
[Patron Code]: {% link api/patron-codes.md %}
