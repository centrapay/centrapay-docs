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

<a name="requests-create">
## Creating a payment request

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

| Parameter  | Description                                          |
|:-----------|:-----------------------------------------------------|
| amount     | The payment amount in cents                          |
| asset      | The currency - NZD or AUD                            |
| merchantId | The ID of the merchant creating the request          |
| clientId   | The ID of the merchant specific client configuration |


{% h4 Optional Parameters %}

| Parameter            | Description                                                                        |
|:---------------------|:-----------------------------------------------------------------------------------|
| description          | Description of the payment                                                         |
| externalReference    | Unique merchant reference for the payment request                                  |
| notifyUrl            | The URL that will receive **POST** requests from the webhook                       |
| paymentExpirySeconds | The amount of seconds until a request expires, must be an integer greater than 0   |
| terminalId           | The payment system terminal Id. Required for NZ Epay integration.                  |
| deviceId             | Physical payment system device Id                                                  |
| patronCode           | Associate this payment request with an active Patron Code. |


<a name="requests-info">
## Getting the information about a payment request

[Swagger Docs](https://service.centrapay.com/payments/api/documentation#/Requests/getRequestsinfo){:target="\_blank"}{:.external}

{% reqspec %}
  GET '/payments/api/requests.info'
  query_param 'requestId', 'a95b3b0d-1278-4613-8772-20d146065a2e'
  auth 'api-key'
{% endreqspec %}


{% h4 Required Parameters %}

| Parameter | Description                                                                |
|:----------|:---------------------------------------------------------------------------|
| requestId | The payment requestId that is generated when [requests.create][] is called |

<a name="requests-pay">
## Paying a payment request

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
| test               | g.test.testUplink        | *None*                         |

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


<a name="requests-cancel">
## Cancelling a payment request

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


<a name="requests-void">
## Voiding a payment request

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


<a name="transactions-refund">
## Refunding a transaction

[Swagger Docs](https://service.centrapay.com/payments/api/documentation#/Transactions/postTransactionsrefund){:target="\_blank"}{:.external}

{% reqspec %}
  POST '/payments/api/requests.void'
  auth 'api-key'
  query_param 'transactionId', '7d2b1d52-b609-4ccd-b4cc-c4a9af881bd9'
  query_param 'amount', '100'
{% endreqspec %}


### Refunding a transaction can be done two ways:

1. Refund the full or partial amount once

   If you refund a transaction without providing an external reference, you
   will get a successful response for the first request and then an
   ALREADY_REFUNDED message for any refund requests that follow for the same
   transaction, unless an external reference is provided.

2. Refund a partial amount multiple times up to the transaction amount

   If you provide an external reference then a transaction can be refunded
   multiple times provided that the external reference is unique for each
   refund request. When a duplicate external reference is provided when
   attempting to refund the same transaction we return a successful response if
   the amount of the request is the same both times but do not process another
   refund, this is because we assume it to be a repeat request. If the amount
   is different you will get a REPEAT_REFERENCE error message.

{% h4 Required Parameters for one time refund %}

| Parameter     | Description                                                                                                                        |
|:--------------|:-----------------------------------------------------------------------------------------------------------------------------------|
| transactionId | The transaction to refund. The transaction id for a payment can be obtained from a webhook notification or from [requests.info][]. |
| amount        | The amount to refund in cents                                                                                                      |

{% h4 Additional required Parameter for multiple refunds %}

| Parameter         | Description                                                                                                                                   |
|:------------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
| externalReference | A reference supplied by the merchant that must be unique for each refund of that transaction, can be anything you want but it must be unique. |

## Errors

### Error codes

<div class="payments-errors" markdown="1">

| Error code | Http code | Message                                           | Description                                                                                                                                                                                                                                                              |
|------------|-----------|---------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1          | 401       | {% break _ KEY_NOT_AUTHORIZED %}                  | The Api Key was not found in the headers or is invalid                                                                                                                                                                                                                   |
| 2          | 404       | {% break _ REQUEST_NOT_FOUND %}                   | The provided request doesn’t exist                                                                                                                                                                                                                                       |
| 3          | 404       | {% break _ TRANSACTION_NOT_FOUND %}               | The provided transaction doesn’t exist                                                                                                                                                                                                                                   |
| 4          | 404       | {% break _ MERCHANT_NOT_FOUND %}                  | The provided Merchant doesn’t exist                                                                                                                                                                                                                                      |
| 5          | 400       | {% break _ INVALID_REQUEST_ID %}                  | RequestId must be a valid UUID                                                                                                                                                                                                                                           |
| 6          | 400       | {% break _ INVALID_AMOUNT %}                      | Amount must be a positive integer greater than zero                                                                                                                                                                                                                      |
| 7          | 400       | {% break _ INVALID_ASSET %}                       | Asset was not a supported currency type                                                                                                                                                                                                                                  |
| 8          | 400       | {% break _ INVALID_AUTHORIZATION %}               | Authorization must be a non empty string                                                                                                                                                                                                                                 |
| 9          | 400       | {% break _ INVALID_LEDGER %}                      | Ledger must be a non empty string                                                                                                                                                                                                                                        |
| 10         | 400       | {% break _ INVALID_MERCHANT_ID %}                 | MerchantId must be a non empty string                                                                                                                                                                                                                                    |
| 11         | 400       | {% break _ INVALID_CLIENT_ID %}                   | ClientId must be a valid UUID                                                                                                                                                                                                                                            |
| 12         | 400       | {% break _ INVALID_PATRON_CODE %}                 | PatronCode must be a non empty string                                                                                                                                                                                                                                    |
| 13         | 400       | {% break _ INVALID_DESCRIPTION %}                 | Description must be a non empty string                                                                                                                                                                                                                                   |
| 14         | 400       | {% break _ INVALID_REFERENCE %}                   | ExternalReference must be a non empty string                                                                                                                                                                                                                             |
| 15         | 400       | {% break _ INVALID_NOTIFY_URL %}                  | NotifyUrl must be a non empty string                                                                                                                                                                                                                                     |
| 16         | 400       | {% break _ INVALID_TRANSACTION_ID %}              | TransactionId must be a non empty string                                                                                                                                                                                                                                 |
| 17         | 400       | {% break _ REQUEST_CANCELLED %}                   | Action cannot be completed because the request has already been cancelled                                                                                                                                                                                                |
| 18         | 400       | {% break _ REQUEST_EXPIRED %}                     | Action cannot be completed because the request has expired                                                                                                                                                                                                               |
| 19         | 400       | {% break _ REQUEST_PAID %}                        | Action cannot be completed because the request has been paid                                                                                                                                                                                                             |
| 20         | 400       | {% break _ INVALID_PAYMENT_EXPIRY_SECONDS %}      | PaymentExpirySeconds is either empty, or is not an integer greater than 0                                                                                                                                                                                                |
| 21         | 403       | {% break _ FORBIDDEN %}                           | The Api Key provided doesn’t have the required permissions or the resource is not found                                                                                                                                                                                  |
| 51         | 500       | {% break _ INTERNAL_ERROR %}                      | Something went wrong while trying to cancel the request, we have received an error message and will figure out what went wrong.                                                                                                                                          |
| 76         | 503       | {% break _ EXTERNAL_SERVICE %}                    | Failed to get a quote for the exchange rate for one or more of the payment types needed to create the payment request.                                                                                                                                                   |
| 77         | 500       | {% break _ INTERNAL_ERROR %}                      | Something went wrong while trying to create the request, we have received an error message and will figure out what went wrong.                                                                                                                                          |
| 78         | 403       | {% break _ MERCHANT_CONFIGURATION_NOT_FOUND %}    | There was no merchant configuration found for the supplied merchantId and clientId                                                                                                                                                                                       |
| 126        | 403       | {% break _ IN_USE %}                              | A webSocket channel for this request already exists                                                                                                                                                                                                                      |
| 151        | 403       | {% break _ IN_USE %}                              | An active WS connection already exists for that patronCode                                                                                                                                                                                                               |
| 176        | 400       | {% break _ LEDGER_NOT_ENABLED %}                  | Merchant is not configured with the provided ledger                                                                                                                                                                                                                      |
| 177        | 400       | {% break _ INVALID_LEDGER %}                      | The ledger provided doesn’t exist                                                                                                                                                                                                                                        |
| 178        | 500       | {% break _ INTERNAL_SERVER_ERROR %}               | Something went wrong while trying to pay a request, we have received an error message and will figure out what went wrong.                                                                                                                                               |
| 179        | 404       | {% break _ BITCOIN_TRANSACTION_NOT_FOUND %}       | A transaction for the provided authorization could not be found on the bitcoin block chain                                                                                                                                                                               |
| 180        | 400       | {% break _ OLD_TRANSACTION %}                     | The provided authorization is for a transaction that was confirmed before the payment request was created                                                                                                                                                                |
| 181        | 400       | {% break _ INSUFFICIENT_PAYMENT %}                | The transaction was found on the bitcoin blockchain but the amount received by Centrapay is less than the total of the payment                                                                                                                                           |
| 182        | 403       | {% break _ MERCHANT_TRANSACTION_LIMIT_EXCEEDED %} | The merchant that the voucher is associated with has reached the limit that they are configured to transact, e.g. If merchant has $500 worth of vouchers to give out, this error comes when $500 has been redeemed and someone tries to redeem a voucher.                |
| 183        | 403       | {% break _ INVALID_TRANSACTION_AMOUNT %}          | The transaction amount provided was less than the redemption amount or larger than the amount on a value voucher                                                                                                                                                         |
| 184        | 403       | {% break _ INVALID_VOUCHER_AMOUNT %}              | The transaction amount provided was less than the redemption amount or larger than the amount on a value voucher                                                                                                                                                         |
| 185        | 403       | {% break _ VOUCHER_EXPIRED %}                     | The voucher has expired                                                                                                                                                                                                                                                  |
| 186        | 403       | {% break _ INSUFFICIENT_VOUCHER_BALANCE %}        | The voucher balance is less than the required amount                                                                                                                                                                                                                     |
| 187        | 404       | {% break _ VOUCHER_UNKNOWN %}                     | The voucher code supplied does not correspond to any valid vouchers                                                                                                                                                                                                      |
| 189        | 403       | {% break _ INSUFFICIENT_WALLET_BALANCE %}         | The wallet balance is less than the required amount                                                                                                                                                                                                                      |
| 190        | 200       | {% break _ TRANSACTION_ALREADY_EXISTS %}          | A successful payment transaction already exists for a payment request.                                                                                                                                                                                                   |
| 191        | 500       | {% break _ OPTIMISTIC_LOCK_ERROR %}               | A resource was updated concurrently. Request should be retried after refreshing latest state if applicable.                                                                                                                                                              |
| 192        | 403       | {% break _ INSUFFICIENT_ASSET_BALANCE %}          | The asset has insufficient funds to pay the payment request                                                                                                                                                                                                              |
| 193        | 403       | {% break _ INVALID_MERCHANT_CONFIGURATION %}      | The merchant is not configured properly to satisfy the payment request, could be incorrect information or the merchant's credentials might be blocked by an external service                                                                                             |
| 194        | 403       | {% break _ INACTIVE_ASSET %}                      | The asset has either expired or been blocked                                                                                                                                                                                                                             |
| 195        | 400       | {% break - INVALID_ASSET_ID %}                    | The asset corresponding to the asset id is not supported                                                                                                                                                                                                                 |
| 196        | 400       | {% break - INVALID_WALLET_ADDRESS %}              | The wallet address is not the same as the supported wallet address                                                                                                                                                                                                       |
| 197        | 400       | {% break - INVALID_TRANSACTION %}                 | The transaction has either missing query parameters or is not supported                                                                                                                                                                                                  |
| 198        | 403       | {% break - UNSUPPORTED_ASSET_TYPE %}              | The type of the asset does not match the ledger supplied                                                                                                                                                                                                                 |
| 199        | 403       | {% break - QUOTA_EXCEEDED %}              | The payment pay request exceeds the allowed spend quota supplied                                                                                                                                                                                                                 |
| 276        | 400       | {% break _ ALREADY_REFUNDED %}                    | The transaction has already been refunded                                                                                                                                                                                                                                |
| 277        | 400       | {% break _ INVALID_AMOUNT %}                      | The refund requested is greater than the transaction amount                                                                                                                                                                                                              |
| 278        | 500       | {% break _ INTERNAL_SERVER_ERROR %}               | Something went wrong while trying to refund the request, we have received an error message and will figure out what went wrong.                                                                                                                                          |
| 279        | 403       | {% break _ INVALID_TRANSACTION_TYPE %}            | The transaction attempted to be refunded is a refund which is not allowed                                                                                                                                                                                                |
| 280        | 403       | {% break _ REPEAT_REFERENCE %}                    | A separate refund request for the same transaction has the same external reference, trying to refund the same transaction twice with the same external reference is not allowed. If the amount of the refund is the same we assume it is a repeat request and return 200 |
| 281        | 403       | {% break _ PARTIAL_REFUNDS_NOT_ALLOWED %}         | The asset does not support partial refunds.                                                                                                                                                                                                                              |
| 400        | 400       | {% break _ BAD_REQUEST %}                         | The transaction had invalid parameters not listed above.                                                                                                                                                                                                                                                                     |

</div>

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

```json
{
  "token": "${JWT}"
}
```

The decoded JWT will contain a "transaction" property with a "transactionType"
that indicates the event type. Depending on the type of event, the payload will
also contain additional details about the transaction and payment request. For
example:

```json
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
```
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

```json
{
  "transaction": {
    "transactionId": "aba4b07d-fd12-43bc-bbb1-12fda46d9937",
    "transactionType": "PURCHASE",
    "ledger": "g.crypto.bitcoin.mainnet",
    "state": "completed",
    "amount": 2000,
    "request": {
      "requestId": "1b23d1f9-8a3e-414d-ac94-f4b331095197",
      "merchantId": "0b1100be-6a76-45b0-adb8-bfe7db5ae720",
      "externalReference": "12345sixseveneightnineten",
      "denomination": { "asset": "NZD", "amount": 2000 }
    },
    "createdAt": "2018-10-02T00:29:09.307Z",
    "updatedAt": "2018-10-02T00:29:11.383Z",
    "type": "BITCOIN",
    "authCode": "961241"
  }
}
```

#### Payment Request Cancelled

```json
{
  "transaction": {
    "transactionType": "CANCELLED",
    "request": {
      "requestId": "bec358bf-edb5-4633-a785-a95cc281d3b7",
      "merchantId": "c614d516-7fbe-4acc-8a49-ed1ce8c54e77",
      "clientId": "ac1cf8f3-3bbb-4286-beb5-70e7efe562c8",
      "denomination": {
        "asset": "NZD",
        "amount": "1"
      }
    }
  }
}
```


[requests.create]: #requests-create
[requests.pay]: #requests-pay
[requests.info]: #requests-info
[requests.void]: #requests-void
[requests.cancel]: #requests-cancel
[transactions.refund]: #transactions-refund
[Payment Requests]: {% link api/payment-requests/payment-requests.md %}
