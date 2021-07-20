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
| merchantId     | String             | The id of the [Merchant][] the Payment Request is on behalf of.             |
| merchantName   | String             | The name of the Merchant the Payment Request is on behalf of.               |
| configId       | String             | The [Merchant Config][] id used to configure the payment options.           |
| status         | String             | "new", "paid", "cancelled", "expired"                                       |
| liveness       | String             | Indicates test assets are accepted. Values are "main" or "test".            |
| createdAt      | {% dt Timestamp %} | When the payment request was created.                                       |
| updatedAt      | {% dt Timestamp %} | When the payment request was updated.                                       |
| expiresAt      | {% dt Timestamp %} | When the payment request expires.                                           |


{% h4 Optional Fields %}

| Field            | Type   | Description                                                                                                                                                                   |
|------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| patronCodeId     | String | The id of a [Patron Code][] the payment request is attached to.                                                                                                               |
| barcode          | String | Scanned patron barcode used to create the payment request.                                                                                                                    |
| expirySeconds    | Number | The expiry seconds used to configure the payment request expiry.                                                                                                              |
| lineItems        | Array  | **EXPERIMENTAL** The [Line Items](#line-item) being paid for.                                                                                                                 |
| purchaseOrderRef | String | A reference to a purchase order for this payment request.                                                                                                                     |
| invoiceRef       | String | A reference to an invoice for this payment request.                                                                                                                           |
| redirectUrl      | String | **Experimental** Url to redirect to after paying or cancelling a payment request. The redirectUrl prefix must be from one of allowedRedirectUrls for the [Merchant Config][]. |



### Payment Option

{% h4 Mandatory Fields %}

| Field     | Type               | Description                                                             |
|-----------|--------------------|-------------------------------------------------------------------------|
| assetType | String             | An [Asset Type][] reference.                                            |
| amount    | {% dt BigNumber %} | The value required to pay using the canonical units for the asset type. |

{% h4 Optional Fields %}

| Field          | Type   | Description                                                                                                                                                            |
|----------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| bitcoinAddress | String | ★  Address to send Bitcoin, when the "assetType" is `bitcoin.*`                                                                                                        |
| cennzAddress   | String | ★  Address to send CPay, when the "assetType" is `cennznet.*`                                                                                                          |
| wavesAddress   | String | ★  Waves address to send Zap tokens, when the "assetType" is `zap.*`                                                                                                   |
| productCodes   | Array  | Supported product codes for the payment request, when the "assetType" is `epay.nzd.*`                                                                                  |

★  For payment options which specify an address, there's a requirement to make a transaction on an
external ledger. Once you have made that payment, you can use the transaction id for
[Paying a Payment Request][].



### Line Item

An order item for which payment is requested. The currency and units for a line
item price will be consistent with the payment request value and the sum of
line item prices should equal the payment request value.

Line items can include a discount amount. A discount that applies to multiple
line items may be represented as a separate line item with a negative amount.


{% h4 Mandatory Fields %}

| Field | Type               | Description                                                           |
|-------|--------------------|-----------------------------------------------------------------------|
| name  | String             | The product description.                                              |
| sku   | String             | The product (stock keeping unit) code.                                |
| qty   | {% dt BigNumber %} | The product quantity (eg. item count, weight, volume etc).            |
| price | {% dt BigNumber %} | The final price in cents (eg. product price * qty - discounts + tax). |


{% h4 Optional Fields %}

| Field          | Type               | Description                                          |
|----------------|--------------------|------------------------------------------------------|
| tax            | {% dt BigNumber %} | Tax rate (percentage).                               |
| discount       | {% dt BigNumber %} | Discount amount in cents (tax exclusive).            |
| productId      | String             | Manufacturer's product identifier (eg GTIN/EAN).     |
| restricted     | Boolean            | Disallow payment with a "restricted" [Asset Type][]. |
| classification | Object             | [Product Classification][].                          |


### Product Classification

{% h4 Mandatory Fields %}

| Field | Type   | Description                          |
|-------|--------|--------------------------------------|
| type  | String | The classification type (see below). |
| code  | String | The classification code.             |
| name  | String | The classification description.      |

{% h4 Optional Fields %}

| Field | Type | Description                                        |
|-------|------|----------------------------------------------------|
| props | Map  | The product classification properties (see below). |


{% h4 Classification Types %}

Currently only "GS1" is supported. See [GS1 Global Product
Classification][]{:.external}. When "GS1" is used as the product classification
type then the product code should be the GPC product brick identifier.


{% h4 Classification Properties %}

Classification properties allow optional additional product characterizing
attrubutes to be supplied. In the case of GS1 product classifications this
corresponds to the GPC brick attributes.


## Operations

### Create a Payment Request **EXPERIMENTAL**

{% reqspec %}
  POST '/api/payment-requests'
  auth 'api-key'
  example {
    title 'Create a Payment Request'
    body ({
      configId: '5efbe2fb96c08357bb2b9242',
      value: { amount: '8991', currency: 'NZD' },
    })
  }
  example {
    title 'Create a Payment Request with redirect url'
    body ({
      configId: '5efbe2fb96c08357bb2b9242',
      value: { amount: '8991', currency: 'NZD' },
      redirectUrl: 'https://example.com/store/checkout?cartId=1234',
    })
  }
  example {
    title 'Create a Payment Request with a Patron Code'
    body ({
      barcode: '1219210961929460',
      configId: '5efbe2fb96c08357bb2b9242',
      value: { amount: '8991', currency: 'NZD' },
    })
  }
  example {
    title 'Create a Payment Request with purchase order and invoice'
    body ({
      configId: '5efbe2fb96c08357bb2b9242',
      value: { amount: '8991', currency: 'NZD' },
      purchaseOrderRef: 'oF6kj1QlH5gK0y9rjRHFh2',
      invoiceRef: 'sy8CRmo3sp3ArOpnfmb423'
    })
  }
  example {
    title 'Create a Payment Request with Line Items'
    body ({
      configId: '5efbe2fb96c08357bb2b9242',
      value: { amount: '6190', currency: 'NZD' },
      lineItems: [
        {
          name: 'Coffee Grounds',
          sku: 'GH1234',
          qty: '1',
          price: '4195',
          tax: '15.00',
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
            props: {
              '20001479': '30008960'
            }
          }
        },
      ],
    })
  }
{% endreqspec %}

{% h4 Example response payload %}

```json
{
  "id": "207b5fb5-621e-4282-86c3-42ee47f87e74",
  "url": "https://app.centrapay.com/pay/207b5fb5-621e-4282-86c3-42ee47f87e74",
  "patronCodeId": "V17FByEP9gm1shSG6a1Zzx",
  "barcode": "9990001234567895",
  "merchantId": "26d3Cp3rJmbMHnuNJmks2N",
  "merchantName": "Centrapay Café",
  "configId": "5efbe2fb96c08357bb2b9242",
  "purchaseOrderRef": "oF6kj1QlH5gK0y9rjRHFh2",
  "invoiceRef": "sy8CRmo3sp3ArOpnfmb423",
  "value": { "currency": "NZD", "amount": "6190" },
  "paymentOptions": [
    {
      "amount": "6190",
      "assetType": "centrapay.nzd.test"
    },
    {
      "amount": "6190",
      "assetType": "epay.nzd.test",
      "productCodes": [ "23403" ]
    }
  ],
  "lineItems": [
      {
        "name": "Coffee Grounds",
        "sku": "GH1234",
        "qty": "1",
        "price": "4195",
        "tax": "15.00",
      },
      {
        "name": "Centrapay Cafe Mug",
        "sku": "SB456",
        "qty": "25",
        "price": "1995",
        "tax": "15.00",
        "discount": "199",
      },
  ],
  "status": "new",
  "createdAt": "2021-06-08T04:04:27.426Z",
  "updatedAt": "2021-06-08T04:04:27.426Z",
  "expiresAt": "2021-06-08T04:06:27.426Z",
  "liveness": "test",
  "expirySeconds": 120
}
```

### Get a Payment Request by Id **EXPERIMENTAL**

{% reqspec %}
  GET '/api/payment-requests/{paymentRequestId}'
  auth 'jwt'
  path_param 'paymentRequestId', '207b5fb5-621e-4282-86c3-42ee47f87e74'
{% endreqspec %}

{% h4 Example response payload %}

```json
{
  "id": "207b5fb5-621e-4282-86c3-42ee47f87e74",
  "url": "https://app.centrapay.com/pay/207b5fb5-621e-4282-86c3-42ee47f87e74",
  "patronCodeId": "V17FByEP9gm1shSG6a1Zzx",
  "barcode": "9990001234567895",
  "merchantId": "26d3Cp3rJmbMHnuNJmks2N",
  "merchantName": "Centrapay Café",
  "configId": "5efbe2fb96c08357bb2b9242",
  "purchaseOrderRef": "oF6kj1QlH5gK0y9rjRHFh2",
  "invoiceRef": "sy8CRmo3sp3ArOpnfmb423",
  "value": { "currency": "NZD", "amount": "8991" },
  "paymentOptions": [
    {
      "amount": "8991",
      "assetType": "centrapay.nzd.test"
    }
  ],
  "lineItems": [
      {
        "name": "Coffee Grounds",
        "sku": "GH1234",
        "qty": "1",
        "price": "4195",
        "tax": "15.00",
      },
      {
        "name": "Centrapay Cafe Mug",
        "sku": "SB456",
        "qty": "25",
        "price": "1995",
        "tax": "15.00",
        "discount": "199",
      },
  ],
  "status": "new",
  "createdAt": "2021-06-08T04:04:27.426Z",
  "updatedAt": "2021-06-08T04:04:27.426Z",
  "expiresAt": "2021-06-08T04:06:27.426Z",
  "liveness": "test",
  "expirySeconds": 120
}
```


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
  "barcode": "9990001234567895",
  "merchantId": "26d3Cp3rJmbMHnuNJmks2N",
  "merchantName": "Centrapay Café",
  "configId": "5efbe2fb96c08357bb2b9242",
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


[Merchant]: {% link api/merchants/merchants.md %}
[Merchant Config]: {% link api/merchants/merchant-configs.md %}
[Product Classification]: #product-classification
[Patron Code]: {% link api/patron-codes.md %}
[Patron Code Ref]: #patron-code-ref
[Asset Type]: {% link api/assets/asset-types.md %}
[Payment Flows Guide]: {% link guides/payment-flows.md %}
[Legacy Payment Requests]: {% link api/payment-requests/legacy-payment-requests.md %}
[Paying a Payment Request]: {% link api/payment-requests/legacy-payment-requests.md %}#requests-pay
[GS1 Global Product Classification]: https://www.gs1.org/standards/gpc
