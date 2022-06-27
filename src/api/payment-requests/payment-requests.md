---
layout:  default
grand_parent: API Reference
parent: Payment Requests
title: Payment Requests
nav_order: 1
permalink: /api/payment-requests
redirect_from: /api/payment-activities
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
 * **refunded**: after being partially or fully refunded.

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

|       Field        |        Type        |                                                   Description                                                   |
| ------------------ | ------------------ | --------------------------------------------------------------------------------------------------------------- |
| id                 | String             | The payment request id.                                                                                         |
| shortCode          | String             | A shorter id that can be used to identify the payment request for up to two years.                              |
| value              | {% dt Monetary %}  | The canonical value of the payment request. Must be positive.                                                   |
| paymentOptions     | Array              | The [Payment Options](#payment-option), indicating valid asset for payment.                                     |
| merchantId         | String             | The id of the [Merchant][] the Payment Request is on behalf of.                                                 |
| merchantName       | String             | The name of the Merchant the Payment Request is on behalf of.                                                   |
| configId           | String             | The [Merchant Config][] id used to configure the payment options.                                               |
| status             | String             | "new", "paid", "cancelled", "expired", "refunded".                                                              |
| liveness           | String             | Indicates liveness of assets that are accepted, determined by the payment options. Values are "main" or "test". |
| createdAt          | {% dt Timestamp %} | When the payment request was created.                                                                           |
| updatedAt          | {% dt Timestamp %} | When the payment request was updated.                                                                           |
| expiresAt          | {% dt Timestamp %} | When the payment request expires.                                                                               |
| merchantConditions | Array              | A dynamic list of [Payment Conditions](#payment-condition) that require operator approval to complete a payment. Conditions are calculated when [polling a Payment Request](#get-a-payment-request).       |

{% h4 Optional Fields %}

|        Field         |  Type   |                                                                               Description                                                                                |
| -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| patronCodeId         | String  | The id of a [Patron Code][] the payment request is attached to.                                                                                                          |
| barcode              | String  | Scanned patron barcode used to create the payment request.                                                                                                               |
| expirySeconds        | Number  | The expiry seconds used to configure the payment request expiry.                                                                                                         |
| lineItems            | Array   | **EXPERIMENTAL** The [Line Items](#line-item) being paid for.                                                                                                            |
| purchaseOrderRef     | String  | A reference to a purchase order for this payment request.                                                                                                                |
| invoiceRef           | String  | A reference to an invoice for this payment request.                                                                                                                      |
| redirectUrl          | String  | **Experimental** URL to redirect the user to after they pay or cancel the Payment Request. Must start with one of the `allowedRedirectUrls` for the [Merchant Config][]. |
| externalRef          | String  | An external reference to the payment request                                                                                                                             |
| terminalId           | String  | The software or logical id of the payment terminal.                                                                                                                      |
| deviceId             | String  | The hardware id or serial number of the payment terminal.                                                                                                                |
| operatorId           | String  | POS operator Id.                                                                                                                                                         |
| createdByAccountId   | String  | Id of the [Centrapay Account]() creating the Payment Request.                                                                                                            |
| createdByAccountName | String  | Name of the [Centrapay Account]() creating the Payment Request.                                                                                                          |
| conditionsEnabled    | Boolean | Flag to indicate that a merchant is able to accept [Payment Conditions](#payment-condition).        |
| patronNotPresent     | Boolean | Flag to indicate the patron is not physically present. This may affect payment conditions or available [Payment Options]().                                              |
| cancellationReason   | String  | The reason that the payment request was cancelled. See [Cancellation Reasons](#cancellation-reasons) for possible values.                                                |
| preAuth              | Boolean | Flag to indicate the if the request is a pre authorization for supported [Asset Types]().                                                                            |


### Payment Option

{% h4 Mandatory Fields %}

|   Field   |        Type        |                               Description                               |
| --------- | ------------------ | ----------------------------------------------------------------------- |
| assetType | String             | An [Asset Type][] reference.                                            |
| amount    | {% dt BigNumber %} | The value required to pay using the canonical units for the asset type. |

{% h4 Optional Fields %}

|     Field      |  Type  |                                      Description                                      |
| -------------- | ------ | ------------------------------------------------------------------------------------- |
| bitcoinAddress | String | ★  Address to send Bitcoin, when the "assetType" is `bitcoin.*`                       |
| cennzAddress   | String | ★  Address to send CPay, when the "assetType" is `cennznet.*`                         |
| wavesAddress   | String | ★  Waves address to send Zap tokens, when the "assetType" is `zap.*`                  |
| productCodes   | Array  | Supported product codes for the payment request, when the "assetType" is `epay.nzd.*` |

★  For payment options which specify an address, there's a requirement to make a transaction on an external ledger.
Once you have made that payment, you can use the transaction id to [Pay a Payment Request](#pay) using the legacy payment API.

<a name="payment-condition">

### Payment Condition

Some [Asset Types][] require conditional approval to pay. Possible Payment Conditions include confirming proof of ID
or confirming a promotional item was purchased.

The `conditionsEnabled` flag should be set to true when [Creating a Payment Request](#create-a-payment-request) to indicate that
Payment Conditions can be accepted. If a Payment Condition arises, the absence of the `conditionsEnabled` flag will result in the
Payment Request being cancelled.

Conditions can either be [accepted](#accept-payment-condition) or [declined](#accept-payment-condition). If a condition is declined,
the Payment Request will be cancelled.

{% h4 Fields %}

|  Name   |        Type        |                                               Description                                                |
| ------- | ------------------ | -------------------------------------------------------------------------------------------------------- |
| id      | {% dt BigNumber %} | An enumerated identifier for the Payment Condition.                                                      |
| name    | String             | The name of the condition.                                                                               |
| message | String             | The human-readable description of the condition.                                                         |
| status  | String             | The status of the condition. Valid values include `accepted`, `declined`, `awaiting-merchant` or `void`. |


### Line Item

An order item for which payment is requested. The currency and units for a line
item price will be consistent with the payment request value and the sum of
line item prices should equal the payment request value.

Line items can include a discount amount. A discount that applies to multiple
line items may be represented as a separate line item with a negative amount.


{% h4 Mandatory Fields %}

| Field |        Type        |                              Description                              |
| ----- | ------------------ | --------------------------------------------------------------------- |
| name  | String             | The product description.                                              |
| sku   | String             | The product (stock keeping unit) code.                                |
| qty   | {% dt BigNumber %} | The product quantity (eg. item count, weight, volume etc).            |
| price | {% dt BigNumber %} | The final price in cents (eg. product price * qty - discounts + tax). |


{% h4 Optional Fields %}

|     Field      |        Type        |                     Description                      |
| -------------- | ------------------ | ---------------------------------------------------- |
| tax            | {% dt BigNumber %} | Tax rate (percentage).                               |
| discount       | {% dt BigNumber %} | Discount amount in cents (tax exclusive).            |
| productId      | String             | Manufacturer's product identifier (eg GTIN/EAN).     |
| restricted     | Boolean            | Disallow payment with a "restricted" [Asset Type][]. |
| classification | Object             | [Product Classification][].                          |


### Product Classification

{% h4 Mandatory Fields %}

| Field |  Type  |             Description              |
| ----- | ------ | ------------------------------------ |
| type  | String | The classification type (see below). |
| code  | String | The classification code.             |
| name  | String | The classification description.      |

{% h4 Optional Fields %}

| Field | Type |                    Description                     |
| ----- | ---- | -------------------------------------------------- |
| props | Map  | The product classification properties (see below). |


{% h4 Classification Types %}

Currently only "GS1" is supported. See [GS1 Global Product
Classification][]{:.external}. When "GS1" is used as the product classification
type then the product code should be the GPC product brick identifier.


{% h4 Classification Properties %}

Classification properties allow optional additional product characterizing
attrubutes to be supplied. In the case of GS1 product classifications this
corresponds to the GPC brick attributes.

### Paid By

The Paid By provides a summary of the transactions after the Payment Request was paid.

{% h4 Mandatory Fields %}

|     Field      |        Type        |                           Description                            |
| -------------- | ------------------ | ---------------------------------------------------------------- |
| assetTotals    | Array              | The sum of paid amounts [Asset Totals](#asset-total) for each transacted asset type. |

### Asset Total

{% h4 Mandatory Fields %}

|     Field      |        Type        |                               Description                                |
| -------------- | ------------------ | ------------------------------------------------------------------------ |
| type           | String             | The asset type used for the payment.                                     |
| description    | String             | A human readable description of the asset type used.                     |
| settlementDate | {% dt Timestamp %} | The estimated date that the merchant can expect settlement of funds.     |
| total          | {% dt Monetary %}  | The total monetary value of the asset type used to pay a Payment Request |

<a name="payment-activity"></a>
### Payment Activity **EXPERIMENTAL**

A Payment Activity records a transaction that has happened on a [Payment Request][].
Payment Activities are created when a Payment Request has been **created**, **paid**, **refunded**, **cancelled**, or **expired**.

{% h4 Mandatory Fields %}

|          Field          |        Type        |                     Description                      |
| ----------------------- | ------------------ | ---------------------------------------------------- |
| type                    | String             | See Activity Types below.                            |
| value                   | {% dt Monetary %}  | The value of the payment activity. Must be positive. |
| paymentRequestId        | String             | The Payment Request's id.                            |
| merchantId              | String             | The Payment Request's [Merchant][] id.               |
| merchantConfigId        | String             | The Payment Request's [Merchant Config][] id.        |
| merchantAccountId       | String             | The Payment Request's Merchant [Account][] id.       |
| merchantName            | String             | The Payment Request's Merchant name.                 |
| createdAt               | {% dt Timestamp %} | When the activity was created.                       |
| createdBy               | {% dt CRN %}       | The identity that created the activity.              |
| paymentRequestCreatedBy | {% dt CRN %}       | The identity that created the Payment Request.       |
| activityNumber          | {% dt BigNumber %} | Unique sequential number for the activity.           |
| shortCode               | String             | A shorter id that can be used for up to two years.   |

{% h4 Optional Fields %}

|       Field        |  Type   |                                                                  Description                                                                  |
| ------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| assetType          | String  | The [Asset Type][] for the "payment" or "refund" activity.                                                                                    |
| external           | Boolean | The payment activity is recording a transaction that occurred outside the Centrapay system.                                                   |
| cancellationReason | String  | The reason that the [Payment Request](#payment-request) was cancelled. See [Cancellation Reasons](#cancellation-reasons) for possible values. |
| conditionId        | Number  | The id of a condition if the activity was for a condition being accepted or declined.                                                         |

{% h4 Activity Types %}

|       Name        |                            Description                            |
| ----------------- | ----------------------------------------------------------------- |
| request           | [Payment Request][] was created.                                  |
| payment           | [Payment Request][] was paid.                                     |
| refund            | Funds were returned to the shopper.                               |
| cancellation      | [Payment Request][] was cancelled by the merchant or the shopper. |
| expiry            | [Payment Request][] wasn't paid before time out.                  |
| accept-condition  | A [Payment Condition][] was accepted.                             |
| decline-condition | A [Payment Condition][] was declined.                             |

<a name="cancellation-reasons">
{% h4 Cancellation Reasons %}

|            Reason            |                                                                                                     Description                                                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CANCELLED_BY_MERCHANT        | The merchant cancelled the payment request by calling the cancel or void endpoint.                                                                                                                                   |
| CANCELLED_BY_PATRON          | The patron cancelled the transaction.                                                                                                                                                                                |
| PATRON_CODE_INVALID          | The patron code on the payment request was invalid.                                                                                                                                                                  |
| INSUFFICIENT_ASSET_VALUE     | The asset has insufficient funds to pay the payment request or the transaction amount received by Centrapay is less than the total of the payment.                                                                   |
| PAYMENT_FAILED               | The payment request failed for an unknown reason.                                                                                                                                                                    |
| PATRON_CODE_EXPIRED          | The patron code on the payment request has expired.                                                                                                                                                                  |
| DECLINED_BY_PATRON           | The payment was declined by the patron during approval steps.                                                                                                                                                        |
| DECLINED_BY_MERCHANT         | The payment was declined by the merchant during approval steps.                                                                                                                                                      |
| PAYMENT_DECLINED             | The payment parameters were valid but payment was declined because additional payment restrictions were violated. For example, asset not active, asset overdrawn, quota exceeded or line item category restrictions. |
| PAYMENT_REQUEST_EXPIRED      | The payment request has expired.                                                                                                                                                                                     |
| NO_AVAILABLE_PAYMENT_OPTIONS | No payment options match the requested payment parameters.                                                                                                                                                           |
| PREAUTH_EXPIRED              | Attempted to create a “preauth completion” payment request using an expired payment request id.                                                                                                                      |

## Operations

<a name="create-payment-request"></a>
### Create a Payment Request

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
    title 'Create a Pre Authorization Payment Request'
    body ({
      barcode: '1219210961929460',
      configId: '5efbe2fb96c08357bb2b9242',
      value: { amount: '8991', currency: 'NZD' },
      preAuth: true
    })
  }
  example {
    title 'Create a Payment Request with purchase order, invoice, and external reference'
    body ({
      configId: '5efbe2fb96c08357bb2b9242',
      value: { amount: '8991', currency: 'NZD' },
      purchaseOrderRef: 'oF6kj1QlH5gK0y9rjRHFh2',
      invoiceRef: 'sy8CRmo3sp3ArOpnfmb423',
      externalRef: 'dYTC266s4DFdsgGd909f',
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

{% h4 Fields %}

|        Field         |       Type        |                                                                               Description                                                                                |
| :------------------- | :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| configId             | String            | The [Merchant Config][] id used to configure the payment options.                                                                                                        |
| value                | {% dt Monetary %} | The canonical value of the payment request. Must be positive.                                                                                                            |
| barcode              | String {% opt %}  | The patron's barcode to identify the account to attach the payment request to                                                                                            |
| expirySeconds        | String {% opt %}  | How long the payment request will be payable for.                                                                                                                        |
| lineItems            | Array {% opt %}   | **Experimental** The [Line Items](#line-item) being paid for.                                                                                                            |
| purchaseOrderRef     | String {% opt %}  | A reference to a purchase order for this payment request.                                                                                                                |
| invoiceRef           | String {% opt %}  | A reference to an invoice for this payment request.                                                                                                                      |
| externalRef          | String {% opt %}  | An external reference to the payment request                                                                                                                             |
| redirectUrl          | String {% opt %}  | **Experimental** URL to redirect the user to after they pay or cancel the Payment Request. Must start with one of the `allowedRedirectUrls` for the [Merchant Config][]. |
| terminalId           | String {% opt %}  | The software or logical id of the payment terminal.                                                                                                                      |
| deviceId             | String {% opt %}  | The hardware id or serial number of the payment terminal.                                                                                                                |
| operatorId           | String {% opt %}  | The POS operator Id.                                                                                                                                                     |
| createdByAccountId   | String {% opt %}  | The id of the [Centrapay Account]() creating the Payment Request.                                                                                                        |
| createdByAccountName | String {% opt %}  | The name of the [Centrapay Account]() creating the Payment Request.                                                                                                      |
| conditionsEnabled    | Boolean {% opt %} | Flag to opt into accepting [Asset Types]() which require conditions to be met. If not set, assets which require conditions will not be payment options.                  |
| patronNotPresent     | Boolean {% opt %} | Flag to indicate the patron is not physically present. This may affect payment conditions or available [Payment Options]().                                              |
| preAuth              | Boolean {% opt %} | Flag to indicate if the Payment Request is a pre authorization for supported [Asset Types](). If set barcode must be provided.                                         |

{% h4 Example response payload %}

{% json %}
{
  "id": "MhocUmpxxmgdHjr7DgKoKw",
  "shortCode": "CP-C7F-ZS5",
  "url": "https://app.centrapay.com/pay/MhocUmpxxmgdHjr7DgKoKw",
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
  "merchantConditions": [],
  "status": "new",
  "createdAt": "2021-06-08T04:04:27.426Z",
  "updatedAt": "2021-06-08T04:04:27.426Z",
  "expiresAt": "2021-06-08T04:06:27.426Z",
  "liveness": "test",
  "expirySeconds": 120
}
{% endjson %}

{% h4 Error Responses %}

| Status |                    Code                    |                                                Description                                                |
| :----- | :----------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| 400    | {% break _ LINE_ITEMS_SUM_CHECK_FAILED %}  | The sum value of the line items did not equal the value of the payment request.                           |
| 403    | {% break _ REDIRECT_URL_INVALID %}         | The supplied redirectUrl does not start with one of the `allowedRedirectUrls` on the [Merchant Config][]. |
| 400    | {% break _ CHECKSUM_FAILED %}              | Luhn checksum digit doesn't pass.                                                                         |
| 403    | {% break _ PATRON_CODE_INVALID %}          | Patron Code doesn't exist or has expired.                                                                 |
| 403    | {% break _ NO_AVAILABLE_PAYMENT_OPTIONS %} | No payment options match the requested payment parameters.                                                |

<a name="get-payment-request"></a>
### Get a Payment Request

{% reqspec %}
  GET '/api/payment-requests/{paymentRequestId}'
  auth 'jwt'
  path_param 'paymentRequestId', 'MhocUmpxxmgdHjr7DgKoKw'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "id": "MhocUmpxxmgdHjr7DgKoKw",
  "shortCode": "CP-C7F-ZS5",
  "url": "https://app.centrapay.com/pay/MhocUmpxxmgdHjr7DgKoKw",
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
  "merchantConditions": [
    {
      "id": "1",
      "name": "photo-id-check",
      "message": "Please check ID",
      "status": "awaiting-merchant"
    }
  ],
  "status": "new",
  "createdAt": "2021-06-08T04:04:27.426Z",
  "updatedAt": "2021-06-08T04:04:27.426Z",
  "expiresAt": "2021-06-08T04:06:27.426Z",
  "liveness": "test",
  "expirySeconds": 120
}
{% endjson %}

{% h4 Example response payload paid by multiple asset types %}

{% json %}
{
  "id": "MhocUmpxxmgdHjr7DgKoKw",
  "shortCode": "CP-C7F-ZS5",
  "url": "https://app.centrapay.com/pay/MhocUmpxxmgdHjr7DgKoKw",
  "merchantId": "26d3Cp3rJmbMHnuNJmks2N",
  "merchantName": "Centrapay Café",
  "configId": "5efbe2fb96c08357bb2b9242",
  "value": { "currency": "NZD", "amount": "1000" },
  "paymentOptions": [
    {
      "amount": "1000",
      "assetType": "centrapay.nzd.main"
    },
    {
      "amount": "1000",
      "assetType": "cca.coke.main"
    }
  ],
  "merchantConditions": [],
  "status": "paid",
  "createdAt": "2021-06-08T04:04:27.426Z",
  "updatedAt": "2021-06-08T04:04:27.426Z",
  "expiresAt": "2021-06-08T04:06:27.426Z",
  "liveness": "main",
  "expirySeconds": 120,
  "paidBy": {
    "assetTotals": [
      {
        "type": "centrapay.nzd.main",
        "description": "Centrapay NZD",
        "settlementDate": "2021-06-28T04:04:27.426Z",
        "total": {
          "amount": "550",
          "currency": "NZD"
        }
      },
      {
        "type": "cca.coke.main",
        "description": "Coke Token",
        "settlementDate": "2021-06-28T04:04:27.426Z",
        "total": {
          "amount": "450",
          "currency": "NZD"
        }
      }
    ]
  }
}
{% endjson %}

### Get a Payment Request by Short Code

Returns the latest Payment Request that matches the given short code.

{% reqspec %}
  GET '/api/payment-requests/short-code/{shortCode}'
  auth 'jwt'
  path_param 'shortCode', 'CP-C7F-ZS5'
{% endreqspec %}

{% h4 Example response payload with a Payment Request %}

{% json %}
{
  "id": "MhocUmpxxmgdHjr7DgKoKw",
  "shortCode": "CP-C7F-ZS5",
  "url": "https://app.centrapay.com/pay/MhocUmpxxmgdHjr7DgKoKw",
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
  "merchantConditions": [],
  "status": "new",
  "createdAt": "2021-06-08T04:04:27.426Z",
  "updatedAt": "2021-06-08T04:04:27.426Z",
  "expiresAt": "2021-06-08T04:06:27.426Z",
  "liveness": "test",
  "expirySeconds": 120
}
{% endjson %}

{% h4 Error Responses %}

| Status |             Code              |            Description            |
| :----- | :---------------------------- | :-------------------------------- |
| 400    | {% break _ CHECKSUM_FAILED %} | Luhn checksum digit doesn’t pass. |

<a name="patron-code"></a>
### Get a Payment Request linked to a Patron Code

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

{% json %}
{}
{% endjson %}

{% h4 Example response payload with a Payment Request %}

{% json %}
{
  "id": "MhocUmpxxmgdHjr7DgKoKw",
  "shortCode": "CP-C7F-ZS5",
  "url": "https://app.centrapay.com/pay/MhocUmpxxmgdHjr7DgKoKw",
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
  "merchantConditions": [],
  "status": "new",
  "createdAt": "2021-06-08T04:04:27.426Z",
  "updatedAt": "2021-06-08T04:04:27.426Z",
  "expiresAt": "2021-06-08T04:06:27.426Z",
  "liveness": "test",
  "expirySeconds": 120
}
{% endjson %}


<a name="pay"></a>
### Pay a Payment Request **EXPERIMENTAL**

There are two methods of paying a payment request.
The first uses Centrapay [Assets] and requires you to provide the Id and the type of the asset.
Alternatively you can provide an external transaction Id and the Centrapay [Asset Type][] for any payments that we support. An example of an external transaction would be a Bitcoin payment.

{% reqspec %}
  POST '/api/payment-requests/{paymentRequestId}/pay'
  auth 'jwt'
  example {
    title 'Pay a Payment Request with a Centrapay asset'
    body ({
      "assetType": "centrapay.nzd.main",
      "assetId": "WRhAxxWpTKb5U7pXyxQjjY"
    })
  }

  example {
    title 'Pay a Payment Request using external transaction'
    body ({
      "assetType": "bitcoin.main",
      "transactionId": "VMXMkUttDGTVz4ESv5ND56",
    })
  }

{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "type": "payment",
  "value": { "currency": "NZD", "amount": "1000" },
  "assetType": "centrapay.nzd.main",
  "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
  "shortCode": "CP-C7F-ZS5-015",
  "merchantName": "Centrapay Café",
  "merchantId": "26d3Cp3rJmbMHnuNJmks2N",
  "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
  "merchantConfigId": "5efbe2fb96c08357bb2b9242",
  "createdAt": "2021-06-08T04:04:27.426Z",
  "createdBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
  "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
  "activityNumber": "2",
},
{% endjson %}


{% h4 Error Responses %}

| Status |                  Code                  |                                                                                        Description                                                                                         |
| :----- | :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 403    | {% break _ INVALID_ASSET_TYPE %}       | Either the merchant is not configured with the provided asset type or the asset type does not exist.                                                                                       |
| 403    | {% break _ REQUEST_EXPIRED %}          | Action cannot be completed because the request has expired.                                                                                                                                |
| 403    | {% break _ REQUEST_PAID %}             | Action cannot be completed because the request has been paid.                                                                                                                              |
| 403    | {% break _ REQUEST_CANCELLED %}        | Action cannot be completed because the request has already been cancelled.                                                                                                                 |
| 403    | {% break _ INACTIVE_ASSET %}           | The asset is not spendable. It may have been disabled, expired, or already spent.                                                                                                          |
| 403    | {% break _ INVALID_MERCHANT_CONFIG %}  | The merchant is not configured properly to satisfy the payment request. This could be due to incorrect information, or the merchant’s credentials might be blocked by an external service. |
| 403    | {% break _ QUOTA_EXCEEDED %}           | The payment pay request exceeds the allowed spend quota supplied.                                                                                                                          |
| 403    | {% break _ INSUFFICIENT_ASSET_VALUE %} | The asset has insufficient funds to pay the payment request or the transaction amount received by Centrapay is less than the total of the payment.                                         |
| 403    | {% break _ ASSET_REDEMPTION_DENIED %}  | The asset redemption has been unsuccessful due to an error with provided payment parameters, the merchant, or the asset.                                                                   |
| 403    | {% break _ PAYMENT_DECLINED %}         | The payment parameters were valid but payment was declined because additional payment restrictions were violated.                                                                          |

<a name="refund"></a>
### Refund a Payment Request **EXPERIMENTAL**

{% reqspec %}
  POST '/api/payment-requests/{paymentRequestId}/refund'
  auth 'jwt'
  example {
    title 'Refund a Payment Request'
    body ({
      "value": {
        "amount": "100",
        "currency": "NZD",
      },
      "externalRef": "e8df06e2-13a5-48b4-b670-3fd6d815fe0a",
    })
  }

    example {
    title 'Refund a Payment Request with Line Items'
    body ({
      "value": {
        "amount": "6190",
        "currency": "NZD",
      },
      "externalRef": "e8df06e2-13a5-48b4-b670-3fd6d815fe0a",
      "lineItems": [
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

{% json %}
{
  "type": "refund",
  "value": { "currency": "NZD", "amount": "100" },
  "assetType": "centrapay.nzd.main",
  "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
  "shortCode": "CP-C7F-ZS5-015",
  "merchantName": "Centrapay Café",
  "merchantId": "5ee0c486308f590260d9a07f",
  "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
  "merchantConfigId": "5ee168e8597be5002af7b454",
  "createdAt": "2021-06-12T01:17:00.000Z",
  "createdBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
  "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
  "activityNumber": "3",
},
{% endjson %}

{% h4 Error Responses %}

| Status |                   Code                    |                                                                                                                     Description                                                                                                                     |
| :----- | :---------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 403    | {% break _ NOT_PAID %}                    | The payment request has not been paid.                                                                                                                                                                                                              |
| 403    | {% break _ ALREADY_REFUNDED %}            | The payment request has already been refunded.                                                                                                                                                                                                      |
| 403    | {% break _ INVALID_AMOUNT %}              | The refund requested is greater than the refundable amount.                                                                                                                                                                                         |
| 403    | {% break _ REPEAT_REFERENCE %}            | A refund has already been requested with the same external reference. Refunding the payment request twice with the same external reference is not allowed. If the amount of the refund is the same we assume it is a repeat request and return 200. |
| 403    | {% break _ PARTIAL_REFUNDS_NOT_ALLOWED %} | The asset does not support partial refunds.                                                                                                                                                                                                         |
| 403    | {% break _ INACTIVE_ASSET %}              | The asset is not refundable. It may have been disabled, expired, or already refunded.                                                                                                                                                               |
| 403    | {% break _ REFUND_NOT_SUPPORTED %}        | The asset type does not support refunds.                                                                                                                                                                                                            |
| 403    | {% break _ REFUND_WINDOW_EXCEEDED %}      | The time since the payment exceeds the window of time a payment request can be refunded in.                                                                                                                                                         |
| 400    | {% break _ LINE_ITEMS_SUM_CHECK_FAILED %} | The sum value of the line items did not equal the value of the refund.                                                                                                                                                                              |

<a name="void">
### Void a Payment Request **EXPERIMENTAL**

Voiding a payment request will cancel the request and trigger any refunds if necessary.

{% reqspec %}
  POST '/api/payment-requests/{paymentRequestId}/void'
  auth 'jwt'
  path_param 'paymentRequestId', 'MhocUmpxxmgdHjr7DgKoKw'
{% endreqspec %}

{% h4 Example response payload when payment request is unpaid%}
{% json %}
{
  "type": "cancellation",
	"cancellationReason": "CANCELLED_BY_MERCHANT",
  "value": {
    "currency": "NZD",
    "amount": "1000",
  },
  "assetType": "centrapay.nzd.main",
  "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
  "shortCode": "CP-C7F-ZS5-032",
  "merchantName": "Centrapay Café",
  "merchantId": "26d3Cp3rJmbMHnuNJmks2N",
  "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
  "merchantConfigId": "5efbe2fb96c08357bb2b9242",
  "createdAt": "2021-06-08T04:04:27.426Z",
  "createdBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
  "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
  "activityNumber": "2",
}
{% endjson %}

{% h4 Example response payload when payment request is paid%}
{% json %}
{
  "type": "refund",
  "value": {
    "currency": "NZD",
    "amount": "1000",
  },
  "assetType": "centrapay.nzd.main",
  "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
  "shortCode": "CP-C7F-ZS5-032",
  "merchantName": "Centrapay Café",
  "merchantId": "26d3Cp3rJmbMHnuNJmks2N",
  "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
  "merchantConfigId": "5efbe2fb96c08357bb2b9242",
  "createdAt": "2021-06-08T04:04:27.426Z",
  "createdBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
  "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
  "activityNumber": "3",
},
{% endjson %}

{% h4 Error Responses %}

| Status |                Code                |                                                                                                                     Description                                                                                                                     |
| :----- | :--------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 403    | {% break _ VOID_WINDOW_EXCEEDED %} | The void window is closed 24 hours after the request's `createdAt`. After the void window has closed if the request is paid, the [Refund][] endpoint can be used to reverse the payment.                                                            |
| 403    | {% break _ ALREADY_REFUNDED %}     | The payment request has already been refunded.                                                                                                                                                                                                      |
| 403    | {% break _ REPEAT_REFERENCE %}     | A refund has already been requested with the same external reference. Refunding the payment request twice with the same external reference is not allowed. If the amount of the refund is the same we assume it is a repeat request and return 200. |
| 403    | {% break _ INACTIVE_ASSET %}       | The asset is not refundable. It may have been disabled, expired, or already refunded.                                                                                                                                                               |
| 403    | {% break _ REFUND_NOT_SUPPORTED %} | The asset type does not support refunds.                                                                                                                                                                                                            |

<a name="list-activities-for-merchant"></a>
### List Payment Activities for a Merchant **EXPERIMENTAL**

List payment activities for a merchant. Results are [paginated][] and ordered by
descending activity created date.

{% reqspec %}
  GET '/api/payment-activities'
  auth 'jwt'
  query_param 'merchantId', '5ee0c486308f590260d9a07f'
  query_param 'pageKey', 'PaymentRequest#E9eXsErwA444qFDoZt5iLA|Activity#000000000000001|614161c4c4d3020073bd4ce8|2021-09-15T03:00:21.156Z'
{% endreqspec %}

{% h4 Required Fields %}

|   Field    |  Type  |                           Description                           |
| ---------- | ------ | --------------------------------------------------------------- |
| merchantId | String | The id of the [Merchant][] the Payment Request is on behalf of. |

{% h4 Optional Fields %}

|   Field   |  Type  |               Description                |
| --------- | ------ | ---------------------------------------- |
| pageKey   | String | Used to retrieve the next page of items. |


{% h4 Example response payload %}
{% json %}
{
  "nextPageKey": "PaymentRequest#E9eXsErwA444qFDoZt5iLA|Activity#000000000000001|614161c4c4d3020073bd4ce8|2021-09-15T03:00:21.156Z",
  "items": [
    {
      "type": "refund",
      "value": { "currency": "NZD", "amount": "600" },
      "assetType": "centrapay.nzd.main",
      "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
      "shortCode": "CP-C7F-ZS5-032",
      "merchantName": "Centrapay Café",
      "merchantId": "5ee0c486308f590260d9a07f",
      "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
      "merchantConfigId": "5ee168e8597be5002af7b454",
      "createdAt": "2021-06-12T01:17:00.000Z",
      "createdBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "activityNumber": "3",
    },
    {
      "type": "payment",
      "value": { "currency": "NZD", "amount": "6190" },
      "assetType": "centrapay.nzd.main",
      "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
      "shortCode": "CP-C7F-ZS5-027",
      "merchantName": "Centrapay Café",
      "merchantId": "5ee0c486308f590260d9a07f",
      "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
      "merchantConfigId": "5ee168e8597be5002af7b454",
      "createdAt": "2021-06-12T01:16:00.000Z",
      "createdBy": "crn::user:da75ad90-9a5b-4df0-8374-f48b3a8fbfcc",
      "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "activityNumber": "2",
    },
    {
      "type": "request",
      "value": { "currency": "NZD", "amount": "6190" },
      "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
      "shortCode": "CP-C7F-ZS5-015",
      "merchantName": "Centrapay Café",
      "merchantId": "5ee0c486308f590260d9a07f",
      "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
      "merchantConfigId": "5ee168e8597be5002af7b454",
      "createdAt": "2021-06-12T01:15:46.000Z",
      "createdBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "activityNumber": "1",
    }
  ]
}
{% endjson %}

<a name="list-activities"></a>
### List Payment Activities for a Payment Request **EXPERIMENTAL**

List payment activities for a payment request. Results are ordered by
descending activity created date.

{% reqspec %}
  GET '/api/payment-requests/{paymentRequestId}/activities'
  auth 'jwt'
  path_param 'paymentRequestId', 'MhocUmpxxmgdHjr7DgKoKw'
{% endreqspec %}

{% h4 Example response payload %}
{% json %}
{
  "items": [
    {
      "type": "refund",
      "value": { "currency": "NZD", "amount": "600" },
      "assetType": "centrapay.nzd.main",
      "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
      "shortCode": "CP-C7F-ZS5-032",
      "merchantName": "Centrapay Café",
      "merchantId": "5ee0c486308f590260d9a07f",
      "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
      "merchantConfigId": "5ee168e8597be5002af7b454",
      "createdAt": "2021-06-12T01:17:00.000Z",
      "createdBy": "da75ad90-9a5b-4df0-8374-f48b3a8fbfcc",
      "createdBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "activityNumber": "3",
    },
    {
      "type": "payment",
      "value": { "currency": "NZD", "amount": "6190" },
      "assetType": "centrapay.nzd.main",
      "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
      "shortCode": "CP-C7F-ZS5-027",
      "merchantName": "Centrapay Café",
      "merchantId": "5ee0c486308f590260d9a07f",
      "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
      "merchantConfigId": "5ee168e8597be5002af7b454",
      "createdAt": "2021-06-12T01:16:00.000Z",
      "createdBy": "crn::user:da75ad90-9a5b-4df0-8374-f48b3a8fbfcc",
      "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "activityNumber": "2",
    },
    {
      "type": "request",
      "value": { "currency": "NZD", "amount": "6190" },
      "paymentRequestId": "MhocUmpxxmgdHjr7DgKoKw",
      "shortCode": "CP-C7F-ZS5-015",
      "merchantName": "Centrapay Café",
      "merchantId": "5ee0c486308f590260d9a07f",
      "merchantAccountId": "C4QnjXvj8At6SMsEN4LRi9",
      "merchantConfigId": "5ee168e8597be5002af7b454",
      "createdAt": "2021-06-12T01:15:46.000Z",
      "createdBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "paymentRequestCreatedBy": "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
      "activityNumber": "1",
    }
  ]
}
{% endjson %}

<a name="accept-payment-condition"></a>
### Accept Payment Condition for a Payment Request **EXPERIMENTAL**

Accept a [Payment Condition][] listed in `merchantConditions` with status `awaiting-merchant`. Returns a [Payment Activity][].

{% reqspec %}
  POST '/api/payment-requests/{paymentRequestId}/conditions/{conditionId}/accept'
  auth 'jwt'
  path_param 'paymentRequestId', 'MhocUmpxxmgdHjr7DgKoKw'
  path_param 'conditionId', '1'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  type: "accept-condition",
  value: {
    currency: 'NZD',
    amount: 100
  },
  paymentRequestId: "MhocUmpxxmgdHjr7DgKoKw",
  conditionId: "1",
  createdAt: "2022-05-12T01:17:00.000Z",
  createdBy: "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
  paymentRequestCreatedBy: "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
  activityNumber: "2",
  merchantAccountId: "C4QnjXvj8At6SMsEN4LRi9",
  merchantId: "5ee0c486308f590260d9a07f",
  merchantConfigId: "5ee168e8597be5002af7b454",
  merchantName: "Centrapay Café",
}
{% endjson %}

{% h4 Error Responses %}

| Status |                 Code                  |                                                  Description                                                  |
| :----- | :------------------------------------ | :------------------------------------------------------------------------------------------------------------ |
| 403    | {% break _ PATRON_NOT_AUTHORIZED %}   | The Payment Condition is `awaiting-merchant`, therefore the patron is not authorized to accept the condition. |
| 403    | {% break _ MERCHANT_NOT_AUTHORIZED %} | The Payment Condition is `awaiting-patron`, therefore the merchant is not authorized to accept the condition. |
| 403    | {% break _ CONDITION_ALREADY_SET %}   | The Payment Condition has already been accepted or declined.                                                  |

<a name="decline-payment-condition"></a>
### Decline Payment Condition for a Payment Request **EXPERIMENTAL**

Decline a [Payment Condition][] listed in `merchantConditions` with status `awaiting-merchant`. Returns a [Payment Activity][].

{% reqspec %}
  POST '/api/payment-requests/{paymentRequestId}/conditions/{conditionId}/decline'
  auth 'jwt'
  path_param 'paymentRequestId', 'MhocUmpxxmgdHjr7DgKoKw'
  path_param 'conditionId', '1'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  type: "decline-condition",
  value: {
    currency: 'NZD',
    amount: 100
  },
  paymentRequestId: "MhocUmpxxmgdHjr7DgKoKw",
  conditionId: "1",
  createdAt: "2022-05-12T01:17:00.000Z",
  createdBy: "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
  paymentRequestCreatedBy: "crn::user:0af834c8-1110-11ec-9072-3e22fb52e878",
  activityNumber: "2",
  merchantAccountId: "C4QnjXvj8At6SMsEN4LRi9",
  merchantId: "5ee0c486308f590260d9a07f",
  merchantConfigId: "5ee168e8597be5002af7b454",
  merchantName: "Centrapay Café",
}
{% endjson %}

{% h4 Error Responses %}

| Status |                 Code                  |                                                  Description                                                   |
| :----- | :------------------------------------ | :------------------------------------------------------------------------------------------------------------- |
| 403    | {% break _ PATRON_NOT_AUTHORIZED %}   | The Payment Condition is `awaiting-merchant`, therefore the patron is not authorized to decline the condition. |
| 403    | {% break _ MERCHANT_NOT_AUTHORIZED %} | The Payment Condition is `awaiting-patron`, therefore the merchant is not authorized to decline the condition. |
| 403    | {% break _ CONDITION_ALREADY_SET %}   | The Payment Condition has already been accepted or declined.                                                   |

[Merchant]: {% link api/merchants/merchants.md %}
[Merchant Config]: {% link api/merchants/merchant-configs.md %}
[Product Classification]: #product-classification
[Patron Code]: {% link api/patron-codes.md %}
[Patron Code Ref]: #patron-code-ref
[Asset Type]: {% link api/assets/asset-types.md %}
[Asset Types]: {% link api/assets/asset-types.md %}
[Assets]: {% link api/assets/assets.md %}
[Payment Flows Guide]: {% link guides/payment-flows.md %}
[Legacy Payment Requests]: {% link api/payment-requests/legacy-payment-requests.md %}
[Paying a Legacy Payment Request]: {% link api/payment-requests/legacy-payment-requests.md %}#requests-pay
[GS1 Global Product Classification]: https://www.gs1.org/standards/gpc
[Legacy Payment API]: {% link api/payment-requests/legacy-payment-requests.md %}#requests-pay
[Account]: {% link api/accounts/accounts.md %}
[Centrapay Account]: {% link api/accounts/accounts.md %}
[Payment Request]: #payment-request
[Payment Options]: #payment-option
[Payment Activity]: #payment-activity
[Payment Condition]: #payment-condition
[Refund]: #refund
[paginated]: {% link api/pagination.md %}
