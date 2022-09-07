---
layout: default
grand_parent: API Reference
parent: Payment Requests
title: Legacy
permalink: /api/legacy-payment-requests
redirect_from:
  - /transacting
  - /api/transacting
---

# Legacy Payment Requests
{:.no_toc}

Centrapay Payment Requests are serviced via two sets of endpoints; the "next"
version (documented [Payment Requests][]) and the "legacy" version
(documented on this page). Use of legacy endpoints for new integrations is
discouraged where alternative endpoints have been provided.

Legacy Payment Request endpoints also have
[interactive Swagger documentation](https://service.centrapay.com/payments/api/documentation){:target="\_blank"}{:.external}.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Operations

<a name="requests-create">
### Creating a payment request

[Swagger Docs](https://service.centrapay.com/payments/api/documentation#/Requests/postRequestscreate){:target="\_blank"}{:.external}

{% reqspec %}
  POST '/payments/api/requests.create'
  auth 'api-key'
  query_param 'merchantId', '5efbe17d96c083633e2b9241'
  query_param 'clientId', '5efbe2fb96c08357bb2b9242'
  query_param 'amount', '300'
  query_param 'asset', 'NZD'
{% endreqspec %}

{% h4 Required Parameters %}

| Parameter  |                     Description                      |
| :--------- | :--------------------------------------------------- |
| amount     | The payment amount in cents                          |
| asset      | The currency code (e.g. 'NZD')                       |
| merchantId | The id of the merchant creating the request          |
| clientId   | The id of the merchant specific client configuration |

See [Asset Types][] for the list of possible `asset` values for each Asset Type.


{% h4 Optional Parameters %}

|      Parameter       |                                                   Description                                                   |
| :------------------- | :-------------------------------------------------------------------------------------------------------------- |
| description          | Description of the payment                                                                                      |
| externalReference    | Unique merchant reference for the payment request                                                               |
| notifyUrl            | The URL that will receive **POST** requests from the webhook                                                    |
| paymentExpirySeconds | The amount of seconds until a request expires, must be an integer greater than 0 and less than 86400 (24 hours) |
| terminalId           | The payment system terminal Id. Required for NZ Epay integration.                                               |
| deviceId             | Physical payment system device Id                                                                               |
| patronCode           | Associate this payment request with an active Patron Code.                                                      |

{% h4 Error Responses %}

| Status |                      Code                      |                                     Description                                     |
| :----- | :--------------------------------------------- | :---------------------------------------------------------------------------------- |
| 400    | {% break _ CHECKSUM_FAILED %}                  | `patronCode` luhn checksum digit doesn't pass.                                      |
| 403    | {% break _ PATRON_CODE_INVALID %}              | `patronCode` doesn't exist or has expired.                                          |
| 403    | {% break _ MERCHANT_CONFIGURATION_NOT_FOUND %} | There was no merchant configuration found for the supplied merchantId and clientId. |
| 403    | {% break _ NO_AVAILABLE_PAYMENT_OPTIONS %}     | No payment options match the requested payment parameters.                          |

<a name="requests-info">
### Getting the information about a payment request

[Swagger Docs](https://service.centrapay.com/payments/api/documentation#/Requests/getRequestsinfo){:target="\_blank"}{:.external}

{% reqspec %}
  GET '/payments/api/requests.info'
  query_param 'requestId', 'TyqV56mEkNLUeiY2QskHNR'
  auth 'api-key'
{% endreqspec %}


{% h4 Required Parameters %}

| Parameter | Description                                                                |
|:----------|:---------------------------------------------------------------------------|
| requestId | The payment requestId that is generated when [requests.create][] is called |

{% h4 Error Responses %}

| Http code | Error code |             Message             |             Description             |
| :-------- | :--------- | :------------------------------ | :---------------------------------- |
| 404       | 2          | {% break _ REQUEST_NOT_FOUND %} | The provided request doesn’t exist. |

{% h4 Example response payload of a new request %}
{% json %}
{
  "requestId": "TyqV56mEkNLUeiY2QskHNR",
  "shortCode": "CP-C7F-ZS5",
  "merchantId": "5efbe17d96c083633e2b9241",
  "merchantName": "NZD Test Merchant",
  "clientId": "5efbe2fb96c08357bb2b9242",
  "denomination": {
    "asset": "NZD",
    "amount": 100
  },
  "payments": [
    {
      "ledger": "centrapay.nzd.test",
      "amount": 100,
      "methods": [
        "qr_code"
      ]
    }
  ],
  "qrCode": "https://app.centrapay.com/pay/TyqV56mEkNLUeiY2QskHNR",
  "requestCode": "https://app.centrapay.com/pay/TyqV56mEkNLUeiY2QskHNR",
  "status": "new",
  "createdAt": "2021-11-29T23:04:54.253Z",
  "updatedAt": "2021-11-29T23:04:54.253Z",
  "liveness": "test",
  "paymentExpirySeconds": 120
}
{% endjson %}

{% h4 Example response payload of a paid request %}

{% json %}

{
  "requestId": "TyqV56mEkNLUeiY2QskHNR",
  "shortCode": "CP-C7F-ZS5",
  "merchantId": "5efbe17d96c083633e2b9241",
  "merchantName": "NZD Test Merchant",
  "clientId": "5efbe2fb96c08357bb2b9242",
  "denomination": {
    "asset": "NZD",
    "amount": 100
  },
  "payments": [
    {
      "ledger": "centrapay.nzd.test",
      "amount": 100,
      "methods": [
        "qr_code"
      ]
    }
  ],
  "qrCode": "https://app.centrapay.com/pay/TyqV56mEkNLUeiY2QskHNR",
  "requestCode": "https://app.centrapay.com/pay/TyqV56mEkNLUeiY2QskHNR",
  "status": "paid",
  "createdAt": "2021-11-29T23:04:54.253Z",
  "updatedAt": "2021-11-29T23:05:38.254Z",
  "liveness": "test",
  "paymentExpirySeconds": 120,
  "paidBy": {
    "ledger": "centrapay.nzd.test",
    "type": "centrapay.nzd.test",
    "authCode": "3MhaANvdS79qhvAj6nYFNT",
    "responseCode": "1234",
    "receipt": "",
    "v2": true,
    "paidAt": "2021-11-29T23:05:38.000Z",
    "amount": 100,
    "account": "3MhaANvdS79qhvAj6nYFNT",
    "transactionId": "TyqV56mEkNLUeiY2QskHNR",
    "description": "Centrapay Test NZD",
    "settlementDate": "2021-11-29T23:05:38.000Z",
    "assetTotals": [
      {
        "type": "centrapay.nzd.test",
        "description": "Centrapay Test NZD",
        "settlementDate": "2021-11-29T23:05:38.000Z",
        "total": {
          "amount": "100",
          "currency": "NZD"
        }
      }
    ]
  }
}
{% endjson %}


<a name="requests-pay">
### Paying a payment request

[Swagger Docs](https://service.centrapay.com/payments/api/documentation#/Requests/postRequestspay){:target="\_blank"}{:.external}

{% reqspec %}
  POST '/payments/api/requests.pay'
  auth 'api-key'
  query_param 'authorization', '12345678'
  query_param 'ledger', 'g.pocketvouchers.pv'
  query_param 'requestId', '7d2b1d52-b609-4ccd-b4cc-c4a9af881bd9'
{% endreqspec %}


{% h4 Required Parameters %}

| Parameter     | Description                                                                             |
|---------------|-----------------------------------------------------------------------------------------|
| requestId     | The id of the payment request to pay. See [requests.create][].                          |
| ledger        | The selected payment option to use. See below for expected values.                      |
| authorization | An identifier that can be used to pay or verify payment. See below for expected values. |

{% h4 Expected Ledger and Authorization Values %}

The "ledger" parameter indicates which payment option has been selected to pay
the payment request. The selected payment option must be one of the options
available for the payment request as per the `payments` array in the
[requests.create][] and [requests.info][] responses.

The table below lists the possible ledger and authorization param values. The
asset type is the value used to configure the merchant. The ledger param value
is returned with the payment request info as `payments[].ledger`.

| Asset Type         | Ledger Param Value       | Authorization Param Value      |
|:-------------------|:-------------------------|:-------------------------------|
| centrapay.nzd.main | centrapay.nzd.main       | *Centrapay wallet id*          |
| centrapay.nzd.test | centrapay.nzd.test       | *Centrapay wallet id*          |
| epay.nzd.main      | epay.nzd.main            | *Centrapay asset id*           |
| pocketvouchers     | g.pocketvouchers.pv      | *Pocket Vouchers voucher code* |
| bitcoin.main       | g.crypto.bitcoin.mainnet | *Bitcoin transaction id*       |
| cennznet.main      | cennznet.main            | *Cennznet transaction id*      |
| zap.main           | zap.main                 | *Waves transaction id*         |
| test               | g.test.testUplink        | *Any*                          |

{% h4 Centrapay Asset Permissions %}

To pay with a Centrapay asset or wallet ledger the user (identified by the API
Key or identity token) must have permission to redeem the asset or transfer
funds from the specified wallet.

{% h4 Testing Pocket Vouchers %}

To test Pocket Vouchers, generate a test value voucher by texting
"CENTRALBONUS" to 393.  You will then receive a response text containing an 8
digit voucher code that has $20 of loaded credit. The received code is only
valid for two weeks from the issue date. You might get charged your standard
text rates from your provider.

{% h4 Error Responses %}

| Http code | Message    | Description          |
| :-------- | :---------- | :------------|
| 403 | {% break _ REQUEST_EXPIRED %} | Action cannot be completed because the request has expired. |
| 403 | {% break _ REQUEST_PAID %}    | Action cannot be completed because the request has been paid. |
| 403 | {% break _ REQUEST_CANCELLED %} | Action cannot be completed because the request has already been cancelled. |
| 403 | {% break _ INVALID_ASSET_TYPE %}  | The merchant is not configured with the provided asset type. |
| 403 | {% break _ INACTIVE_ASSET %}  | The asset is not spendable. It may have been disabled, expired, or already spent. |
| 403 | {% break _ INVALID_MERCHANT_CONFIG %}  | The merchant is not configured properly to satisfy the payment request. This could be due to incorrect information, or the merchant’s credentials might be blocked by an external service. |
| 403 | {% break _ QUOTA_EXCEEDED %}  | The payment pay request exceeds the allowed spend quota supplied. |
| 403 | {% break _ INSUFFICIENT_ASSET_VALUE %}  | The asset has insufficient funds to pay the payment request or the transaction amount received by Centrapay is less than the total of the payment.  |
| 403 | {% break _ ASSET_REDEMPTION_DENIED %}  | The asset redemption has been unsuccessful due to an error with provided payment parameters, the merchant, or the asset. |

<a name="requests-cancel">
### Cancelling a payment request

[Swagger Docs](https://service.centrapay.com/payments/api/documentation#/Requests/postRequestscancel){:target="\_blank"}{:.external}

{% reqspec %}
  POST '/payments/api/requests.cancel'
  auth 'api-key'
  query_param 'requestId', 'a95b3b0d-1278-4613-8772-20d146065a2e'
{% endreqspec %}

{% h4 Required Parameters %}

| Parameter | Description                                                                |
|:----------|:---------------------------------------------------------------------------|
| requestId | The payment requestId that is generated when [requests.create][] is called |

{% h4 Error Responses %}

| Http code | Error code |             Message             |                          Description                          |
| :-------- | :--------- | :------------------------------ | :------------------------------------------------------------ |
| 404       | 2          | {% break _ REQUEST_NOT_FOUND %} | The provided request doesn’t exist.                           |
| 400       | 18         | {% break _ REQUEST_EXPIRED %}   | Action cannot be completed because the request has expired.   |
| 400       | 19         | {% break _ REQUEST_PAID %}      | Action cannot be completed because the request has been paid. |

<a name="requests-void">
### Voiding a payment request

[Swagger Docs](https://service.centrapay.com/payments/api/documentation#/Requests/postRequestsvoid){:target="\_blank"}{:.external}

{% reqspec %}
  POST '/payments/api/requests.void'
  auth 'api-key'
  query_param 'requestId', 'a95b3b0d-1278-4613-8772-20d146065a2e'
{% endreqspec %}


{% h4 Required Parameters %}

| Parameter | Description                                                                 |
|:----------|:----------------------------------------------------------------------------|
| requestId | The payment requestId that is generated when [requests.create][] is called. |

{% h4 Error Responses %}

| Http code | Error code |             Message             |             Description             |
| :-------- | :--------- | :------------------------------ | :---------------------------------- |
| 404       | 2          | {% break _ REQUEST_NOT_FOUND %} | The provided request doesn’t exist. |
| 403       |            | {% break _ VOID_WINDOW_EXCEEDED %} | The amount of time since the payment request was created exceeds the window of time a payment request can be voided (24 hours). |

Voiding a payment request can cause it to be cancelled or refunded. Therefore, this endpoint can give the same error responses as [requests.cancel][] and [transactions.refund][].
After 24 hours voiding a payment request will be disallowed, however a refund can still be made against the payment request if it has been paid successfully.

<a name="transactions-refund">
### Refunding a transaction

[Swagger Docs](https://service.centrapay.com/payments/api/documentation#/Transactions/postTransactionsrefund){:target="\_blank"}{:.external}

{% reqspec %}
  POST '/payments/api/transactions.refund'
  auth 'api-key'
  query_param 'transactionId', '7d2b1d52-b609-4ccd-b4cc-c4a9af881bd9'
  query_param 'amount', '100'
{% endreqspec %}


Refunding a transaction can be done with or without an external reference.

{% h4 Refund without external reference %}

If you refund a transaction without providing an external reference, you
will get a successful response for the first request and then an
ALREADY_REFUNDED message for any refund requests that follow for the same
transaction, unless an external reference is provided.

{% h4 Refund with external reference %}

If you provide an external reference then a transaction can be refunded
multiple times provided that the external reference is unique for each
refund request. When a duplicate external reference is provided when
attempting to refund the same transaction we return a successful response if
the amount of the request is the same both times but do not process another
refund, this is because we assume it to be a repeat request. If the amount
is different you will get a REPEAT_REFERENCE error message.

{% h4 Refund a Pre Auth Payment Request with Confirmations %}

The legacy refund endpoint cannot be used to refund Pre Auth Payment Requests with Confirmations. To Refund Pre Auth Payment Requests with Confirmations please use the [non-legacy refund endpoint][].

{% h4 Required Parameters for one time refund %}

| Parameter     | Description                                                                                                                        |
|:--------------|:-----------------------------------------------------------------------------------------------------------------------------------|
| transactionId | The transaction to refund. The transaction id for a payment can be obtained from a webhook notification or from [requests.info][]. |
| amount        | The amount to refund in cents                                                                                                      |

{% h4 Additional required Parameter for multiple refunds %}

| Parameter         | Description                                                                                                                                   |
|:------------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
| externalReference | A reference supplied by the merchant that must be unique for each refund of that transaction, can be anything you want but it must be unique. |

{% h4 Error Responses %}

| Http code | Error code |                   Message                   |                                                                                                                                Description                                                                                                                                |
| :-------- | :--------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 404       | 3          | {% break _ TRANSACTION_NOT_FOUND %}         | The provided transaction doesn’t exist.                                                                                                                                                                                                                                   |
| 400       | 276        | {% break _ ALREADY_REFUNDED %}              | The transaction has already been refunded.                                                                                                                                                                                                                                |
| 400       | 277        | {% break _ INVALID_AMOUNT %}                | The refund requested is greater than the transaction amount.                                                                                                                                                                                                              |
| 400       | 280        | {% break _ REPEAT_REFERENCE %}              | A separate refund request for the same transaction has the same external reference, trying to refund the same transaction twice with the same external reference is not allowed. If the amount of the refund is the same we assume it is a repeat request and return 200. |
| 403       | 281        | {% break _ PARTIAL_REFUNDS_NOT_ALLOWED %}   | The asset does not support partial refunds.                                                                                                                                                                                                                               |
| 403       | 283        | {% break _ INACTIVE_ASSET %}                | The asset is not refundable. It may have been disabled, expired, or already refunded.                                                                                                                                                                                     |
| 403       |            | {% break _ REFUND_NOT_SUPPORTED %}          | The asset type does not support refunds.                                                                                                                                                                                                                                  |
| 403       |            | {% break _ REFUND_WINDOW_EXCEEDED %}        | The time since the payment exceeds the window of time a transaction can be refunded in.                                                                                                                                                                         |

## Webhooks

Webhook notifications are sent for significant Payment life-cycle
events. The Webhook endpoint is notified by sending an HTTP POST request to the
`notifyUrl` defined in the Payment Request.

### Life-cycle Events That Trigger Webhooks

The supported event types that will be notified to the Payment Requests webhook
and the associated "transactionType" value that will be sent in the payload
are:


| Event Type                | Value of "transactionType" |
|:--------------------------|:---------------------------|
| Payment Request Cancelled | CANCELLED                  |
| Payment Request Expired   | EXPIRED                    |
| Transaction Completed     | PURCHASE                   |
| Transaction Refunded      | REFUND                     |

#### Payment Request Cancelled

A payment request can be cancelled by either calling the [requests.cancel][]
or [requests.void][] endpoint before a request has been paid successfully.
When a request has been cancelled we send a JWT that when decoded matches the
*Payment Request Cancelled* example in the Decoded Webhook JWT Examples
section below.

#### Payment Request Expired

A payment request expires two minutes after being created if it hasn't been
cancelled, or paid. When a request has expired we send a JWT that when
decoded matches the *Payment Request Cancelled* example in the Decoded
Webhook JWT Examples section below with the `transactionType` set to EXPIRED.

#### Transaction Completed

A transaction is considered complete when [requests.pay][] is called with
parameters that satisfy a payment request and the request has been paid
successfully. When a transaction has been completed we send a JWT that when
decoded matches the *Transaction Completed* example in the Decoded Webhook
JWT Examples section below.

#### Transaction Refunded

A transaction can be refunded one to many times and each time a transaction
has been refunded successfully we notify the webhook associated with the
original payment request. A transaction can be refunded when
[transactions.refund][] has been called for a partial or full refund, or when
[requests.void][] is called for a request that has been paid. When a
transaction has been refunded we send a JWT that when decoded matches the
*Transaction Completed* example in the Decoded Webhook JWT Examples section
below but with `transactionType` set to REFUND.

### Webhook Payload

The body of the webhook is a JSON document with the following format:

{% json %}
{
  "token": "${JWT}"
}
{% endjson %}

The decoded JWT will contain a "transaction" property with a "transactionType"
that indicates the event type. Depending on the type of event, the payload will
also contain additional details about the transaction and payment request. For
example:

{% json %}
{
  "transaction": {
    "transactionType": "REFUND",
    "request": {
      "requestId": "bec358bf-edb5-4633-a785-a95cc281d3b7",
      "denomination": {
        "asset": "NZD",
        "amount": "100"
      }
    }
  }
}
{% endjson %}

#### Webhook Payload Fields

| Property        | Description                                                 |
|:----------------|:------------------------------------------------------------|
| transactionId   | Id of the transaction                                       |
| transactionType | Indicates which event triggered the notification message    |
| state           | Current state of the transaction                            |
| ledger          | The ledger at which the authorization was processed         |
| amount          | Transaction amount in the lowest denomination available     |
| createdAt       | Timestamp at which the request was created                  |
| updatedAt       | Timestamp at which the request was updated                  |
| type            | The payment type used by the issuer to reconcile settlement |
| request         | Request object, see details at [requests.info][]            |
| authCode        | Authorization code used to settle this transaction          |

### Webhook JWT Validation

A webhook JWT can be validated by checking the signature against the Centrapay
Webhook public key:

```
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEt+vW2fE0mLLmdzJtYrz7J9q/yEXl
gmIjCXdv3VNvYfTsaBO5PJNiaD3l9lD8PzEQu31ePsOG81mDVuo40+dgLg==
-----END PUBLIC KEY-----
```

### Decoded Webhook JWT Examples

#### Transaction Completed Successfully

{% json %}
{
  "transaction": {
    "transactionId": "E6ctbmgmkgZ3xnPk3BkGvb",
    "transactionType": "PURCHASE",
    "ledger": "g.crypto.bitcoin.mainnet",
    "state": "completed",
    "amount": 2000,
    "request": {
      "requestId": "0FmbuirpQG4iuy6xAV9R1p",
      "merchantId": "613919a417bea000290e97e3",
      "externalReference": "12345sixseveneightnineten",
      "denomination": { "asset": "NZD", "amount": 2000 }
    },
    "createdAt": "2018-10-02T00:29:09.307Z",
    "updatedAt": "2018-10-02T00:29:11.383Z",
    "type": "BITCOIN",
    "authCode": "961241"
  }
}
{% endjson %}

#### Payment Request Cancelled

{% json %}
{
  "transaction": {
    "transactionType": "CANCELLED",
    "request": {
      "requestId": "0FmbuirpQG4iuy6xAV9R1p",
      "merchantId": "613919a417bea000290e97e3",
      "clientId": "613919a417bea000290e97e4",
      "denomination": {
        "asset": "NZD",
        "amount": "1"
      }
    }
  }
}
{% endjson %}


[requests.create]: #requests-create
[requests.pay]: #requests-pay
[requests.info]: #requests-info
[requests.void]: #requests-void
[requests.cancel]: #requests-cancel
[transactions.refund]: #transactions-refund
[Payment Requests]: {% link api/payment-requests/payment-requests.md %}
[Asset Types]: {% link api/assets/asset-types.md %}
[non-legacy refund endpoint]: {% link api/payment-requests/payment-requests.md %}#refund
