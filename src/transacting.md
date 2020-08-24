---
layout: default
title: Transacting
nav_order: 2
---
<style>

a.external:after {
  content: " " url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAVklEQVR4Xn3PgQkAMQhDUXfqTu7kTtkpd5RA8AInfArtQ2iRXFWT2QedAfttj2FsPIOE1eCOlEuoWWjgzYaB/IkeGOrxXhqB+uA9Bfcm0lAZuh+YIeAD+cAqSz4kCMUAAAAASUVORK5CYII=);
}

</style>

# Transacting
{:.no_toc}


Throughout our documentation we will talk about payment requests and
transactions in several places, and it is important to know the difference. A
payment request is generated when the `/requests.create` endpoint has been
called. Payment Requests are then used to configure the different payment types
a merchant accepts, set the amount of the transaction as well as the fiat
currency e.g. NZD, and to set up any webhooks. Transactions are created when a
payment request has been paid successfully via the `requests.pay` endpoint, or
when a completed transaction has been refunded via the `requests.void` or
`transactions.refund` endpoint.

Our payments endpoints have interactive Swagger documentation at
[https://service.centrapay.com/payments/api/documentation](https://service.centrapay.com/payments/api/documentation){:target="\_blank"}{:.external}.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}


## Creating a payment request

[Swagger Docs](https://service.centrapay.com/payments/api/documentation#/Requests/postRequestscreate){:target="\_blank"}{:.external}

**POST** https://service.centrapay.com/payments/api/requests.create

```sh
curl -X POST "https://service.centrapay.com/payments/api/requests.create" \
  -H 'x-api-key:f32c5497297084e5354b47c40d5ccacb109ce483' \
  -d merchantId="1399b053-b3dd-4c5b-9859-b5bf5c2ac477" \
  -d amount=300 \
  -d asset='NZD'
```

**Required Parameters**

| Parameter  | Description                                 |
|:-----------|:--------------------------------------------|
| amount     | The payment amount in cents                 |
| asset      | The currency - NZD or AUD                   |
| merchantId | The ID of the merchant creating the request |

**OptionalParameters**

| Parameter            | Description                                                                      |
|:---------------------|:---------------------------------------------------------------------------------|
| clientId             | The ID of the merchant specific client configuration                             |
| description          | Description of the payment                                                       |
| externalReference    | Unique merchant reference for the payment request                                |
| notifyUrl            | The URL that will receive **POST** requests from the webhook                     |
| paymentExpirySeconds | The amount of seconds until a request expires, must be an integer greater than 0 |
| terminalId           | The payment system terminal Id                                                   |
| deviceId             | Physical payment system device Id                                                |

## Getting the information about a payment request


[Swagger Docs](https://service.centrapay.com/payments/api/documentation#/Requests/getRequestsinfo){:target="\_blank"}{:.external}

**GET** https://service.centrapay.com/payments/api/requests.info

```sh
curl -G "https://service.centrapay.com/payments/api/requests.info" \
  -H 'x-api-key:f32c5497297084e5354b47c40d5ccacb109ce483' \
  -d requestId="a95b3b0d-1278-4613-8772-20d146065a2e"
```

**Required Parameters**

| Parameter | Description                                                               |
|:----------|:--------------------------------------------------------------------------|
| requestId | The payment requestId that is generated when `/requests.create` is called |


## Paying a payment request

[Swagger Docs](https://service.centrapay.com/payments/api/documentation#/Requests/postRequestspay){:target="\_blank"}{:.external}

**POST** https://service.centrapay.com/payments/api/requests.pay

```sh
curl -X POST "https://service.centrapay.com/payments/api/requests.pay" \
  -H 'x-api-key:f32c5497297084e5354b47c40d5ccacb109ce483' \
  -d authorization="12345678" \
  -d ledger="g.pocketvouchers.pv" \
  -d requestId="7d2b1d52-b609-4ccd-b4cc-c4a9af881bd9"
```

**Required Parameters**

| Parameter     | Description                                                                                              |
|:--------------|:---------------------------------------------------------------------------------------------------------|
| authorization | An identifier that can be used to pay or verify payment on the ledger. See below for expected values.    |
| ledger        | The ledger to use for payment. See `payments[].ledger` in the `requests.info` response for valid values. |
| requestId     | The payment requestId that is generated when `/requests.create` is called.                               |

**Expected Authorization Values**

| Ledger Type      | Authorization Param Value    |
|:-----------------|:-----------------------------|
| Centrapay Wallet | Centrapay wallet id          |
| Pocket Vouchers  | Pocket Vouchers voucher code |
| Bitcoin          | Bitcoin transaction id       |

**Centrapay Wallet Permissions**

To pay with a Centrapay Wallet ledger the user (identified by the API Key or
identity token) must have permission to transfer funds from the specified
wallet.

**Testing Pocket Vouchers**

To test Pocket Vouchers, generate a test value voucher by texting
"CENTRALBONUS" to 393.  You will then receive a response text containing an 8
digit voucher code that has $20 of loaded credit. The received code is only
valid for two weeks from the issue date. You might get charged your standard
text rates from your provider.


## Cancelling a payment request

[Swagger Docs](https://service.centrapay.com/payments/api/documentation#/Requests/postRequestscancel){:target="\_blank"}{:.external}

**POST** https://service.centrapay.com/payments/api/requests.cancel

```sh
curl -X POST "https://service.centrapay.com/payments/api/requests.cancel" \
  -H 'x-api-key:f32c5497297084e5354b47c40d5ccacb109ce483' \
  -d requestId="a95b3b0d-1278-4613-8772-20d146065a2e"
```

**Required Parameters**

| Parameter | Description                                                               |
|:----------|:--------------------------------------------------------------------------|
| requestId | The payment requestId that is generated when `/requests.create` is called |


## Voiding a payment request

[Swagger Docs](https://service.centrapay.com/payments/api/documentation#/Requests/postRequestsvoid){:target="\_blank"}{:.external}

**POST** https://service.centrapay.com/payments/api/requests.void

```sh
curl -X POST "https://service.centrapay.com/payments/api/requests.void" \
  -H 'x-api-key:f32c5497297084e5354b47c40d5ccacb109ce483' \
  -d requestId="a95b3b0d-1278-4613-8772-20d146065a2e"
```

**Required Parameters**

| Parameter | Description                                                                |
|:----------|:---------------------------------------------------------------------------|
| requestId | The payment requestId that is generated when `/requests.create` is called. |


## Refunding a transaction

[Swagger Docs](https://service.centrapay.com/payments/api/documentation#/Transactions/postTransactionsrefund){:target="\_blank"}{:.external}

**POST** https://service.centrapay.com/payments/api/transactions.refund

```sh
curl -X POST "https://service.centrapay.com/payments/api/transactions.refund" \
  -H 'x-api-key:f32c5497297084e5354b47c40d5ccacb109ce483' \
  -d transactionId="7d2b1d52-b609-4ccd-b4cc-c4a9af881bd9" \
  -d amount=100
```

### Refunding a transaction can be done two ways:

1. Refund the full or partial amount once

    * If you refund a transaction without providing an external reference, you will get a successful response for the first request and then an ALREADY_REFUNDED message for any refund requests that follow for the same transaction, unless an external reference is provided.

2. Refund a partial amount multiple times up to the transaction amount

    * If you provide an external reference then a transaction can be refunded multiple times provided that the external reference is unique for each refund request. When a duplicate external reference is provided when attempting to refund the same transaction we return a successful response if the amount of the request is the same both times but do not process another refund, this is because we assume it to be a repeat request. If the amount is different you will get a REPEAT_REFERENCE error message.

**Required Parameters for one time refund**

| Parameter     | Description                           |
|:--------------|:--------------------------------------|
| transactionId | The transaction to refund you can either get this by setting notifyUrl when the request is created and receiving a webhook notification with the transaction details, or call `/requests.info` and grab the transactionId from there. |
| amount        | The amount to refund in cents                                                                                                                                                                                                         |

**Additional required Parameter for multiple refunds**

| Parameter         | Description                          |
|:------------------|:-------------------------------------|
| externalReference | A reference supplied by the merchant that must be unique for each refund of that transaction, can be anything you want but it must be unique. |

## Errors

### Error codes

<div class="payments-errors" markdown="1">

| Error code | Http code |               Message               |                                                                                                                        Description                                                                                                                        |
|:---------- |:--------- |:----------------------------------- |:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1          | 401       | KEY_NOT_AUTHORIZED                  | The Api Key was not found in the headers or is invalid                                                                                                                                                                                                    |
| 2          | 404       | REQUEST_NOT_FOUND                   | The provided request doesn’t exist                                                                                                                                                                                                                        |
| 3          | 404       | TRANSACTION_NOT_FOUND               | The provided transaction doesn’t exist                                                                                                                                                                                                                    |
| 4          | 404       | MERCHANT_NOT_FOUND                  | The provided Merchant doesn’t exist                                                                                                                                                                                                                       |
| 5          | 400       | INVALID_REQUEST_ID                  | RequestId must be a valid UUID                                                                                                                                                                                                                            |
| 6          | 400       | INVALID_AMOUNT                      | Amount must be a positive integer greater than zero                                                                                                                                                                                                       |
| 7          | 400       | INVALID_ASSET                       | Asset was not a supported currency type                                                                                                                                                                                                                   |
| 8          | 400       | INVALID_AUTHORIZATION               | Authorization must be a non empty string                                                                                                                                                                                                                  |
| 9          | 400       | INVALID_LEDGER                      | Ledger must be a non empty string                                                                                                                                                                                                                         |
| 10         | 400       | INVALID_MERCHANT_ID                 | MerchantId must be a non empty string                                                                                                                                                                                                                     |
| 11         | 400       | INVALID_CLIENT_ID                   | ClientId must be a valid UUID                                                                                                                                                                                                                             |
| 12         | 400       | INVALID_PATRON_CODE                 | PatronCode must be a non empty string                                                                                                                                                                                                                     |
| 13         | 400       | INVALID_DESCRIPTION                 | Description must be a non empty string                                                                                                                                                                                                                    |
| 14         | 400       | INVALID_REFERENCE                   | ExternalReference must be a non empty string                                                                                                                                                                                                              |
| 15         | 400       | INVALID_NOTIFY_URL                  | NotifyUrl must be a non empty string                                                                                                                                                                                                                      |
| 16         | 400       | INVALID_TRANSACTION_ID              | TransactionId must be a non empty string                                                                                                                                                                                                                  |
| 17         | 400       | REQUEST_CANCELLED                   | Action cannot be completed because the request has already been cancelled                                                                                                                                                                                 |
| 18         | 400       | REQUEST_EXPIRED                     | Action cannot be completed because the request has expired                                                                                                                                                                                                |
| 19         | 400       | REQUEST_PAID                        | Action cannot be completed because the request has been paid                                                                                                                                                                                              |
| 20         | 400       | INVALID_PAYMENT_EXPIRY_SECONDS      | PaymentExpirySeconds is either empty, or is not an integer greater than 0                                                                                                                                                                                 |
| 21         | 403       | FORBIDDEN                           | The Api Key provided doesn’t have the required permissions or the resource is not found                                                                                                                                                                   |
| 51         | 500       | INTERNAL_ERROR                      | Something went wrong while trying to cancel the request, we have received an error message and will figure out what went wrong.                                                                                                                           |
| 76         | 503       | EXTERNAL_SERVICE                    | Failed to get a quote for the exchange rate for one or more of the payment types needed to create the payment request.                                                                                                                                    |
| 77         | 500       | INTERNAL_ERROR                      | Something went wrong while trying to create the request, we have received an error message and will figure out what went wrong.                                                                                                                           |
| 126        | 403       | IN_USE                              | A webSocket channel for this request already exists                                                                                                                                                                                                       |
| 151        | 403       | IN_USE                              | An active WS connection already exists for that patronCode                                                                                                                                                                                                |
| 176        | 400       | LEDGER_NOT_ENABLED                  | Merchant is not configured with the provided ledger                                                                                                                                                                                                       |
| 177        | 400       | INVALID_LEDGER                      | The ledger provided doesn’t exist                                                                                                                                                                                                                         |
| 178        | 500       | INTERNAL_SERVER_ERROR               | Something went wrong while trying to pay a request, we have received an error message and will figure out what went wrong.                                                                                                                                |
| 179        | 404       | BITCOIN_TRANSACTION_NOT_FOUND       | A transaction for the provided authorization could not be found on the bitcoin block chain                                                                                                                                                                |
| 180        | 400       | OLD_TRANSACTION                     | The provided authorization is for a transaction that was confirmed before the payment request was created                                                                                                                                                 |
| 181        | 400       | INSUFFICIENT_PAYMENT                | The transaction was found on the bitcoin blockchain but the amount received by Centrapay is less than the total of the payment                                                                                                                            |
| 182        | 403       | MERCHANT_TRANSACTION_LIMIT_EXCEEDED | The merchant that the voucher is associated with has reached the limit that they are configured to transact, e.g. If merchant has $500 worth of vouchers to give out, this error comes when $500 has been redeemed and someone tries to redeem a voucher. |
| 183        | 403       | INVALID_TRANSACTION_AMOUNT          | The transaction amount provided was less than the redemption amount or larger than the amount on a value voucher                                                                                                                                          |
| 184        | 403       | INVALID_VOUCHER_AMOUNT              | The transaction amount provided was less than the redemption amount or larger than the amount on a value voucher                                                                                                                                          |
| 185        | 403       | VOUCHER_EXPIRED                     | The voucher has expired                                                                                                                                                                                                                                   |
| 186        | 403       | INSUFFICIENT_VOUCHER_BALANCE        | The voucher balance is less than the required amount                                                                                                                                                                                                      |
| 187        | 404       | VOUCHER_UNKNOWN                     | The voucher code supplied does not correspond to any valid vouchers                                                                                                                                                                                       |
| 189        | 403       | INSUFFICIENT_WALLET_BALANCE         | The wallet balance is less than the required amount                                                                                                                                                                                                       |
| 190        | 200       | TRANSACTION_ALREADY_EXISTS          | A successful payment transaction already exists for a payment request.                                                                                                                                                                                    |
| 191        | 500       | OPTIMISTIC_LOCK_ERROR               | A resource was updated concurrently. Request should be retried after refreshing latest state if applicable.                                                                                                                                               |
| 276        | 400       | ALREADY_REFUNDED                    | The transaction has already been refunded                                                                                                                                                                                                                 |
| 277        | 400       | INVALID_AMOUNT                      | The refund requested is greater than the transaction amount                                                                                                                                                                                               |

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

  A payment request can be cancelled by either calling the `/requests.cancel` or `/requests.void` endpoint before a request has been paid successfully. When a request has been cancelled we send a JWT that when decoded matches the *Payment Request Cancelled* example in the Decoded Webhook JWT Examples section below.

#### Payment Request Expired

  A payment request expires two minutes after being created if it hasn't been cancelled, or paid. When a request has expired we send a JWT that when decoded matches the *Payment Request Cancelled* example in the Decoded Webhook JWT Examples section below with the `transactionType` set to EXPIRED.

#### Transaction Completed

  A transaction is considered complete when `requests.pay` is called with parameters that satisfy a payment request and the request has been paid successfully. When a transaction has been completed we send a JWT that when decoded matches the *Transaction Completed* example in the Decoded Webhook JWT Examples section belolw.

#### Transaction Refunded

  A transaction can be refunded one to many times and each time a transaction has been refunded successfully we notify the webhook associated with the original payment request. A transaction can be refunded when `transactions.refund` has been called for a partial or full refund, or when `requests.void` is called for a request that has been paid. When a transaction has been refunded we send a JWT that when decoded matches the *Transaction Completed* example in the Decoded Webhook JWT Examples section below but with `transactionType` set to REFUND.

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
| request         | Request object, see details at requests.info                |
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
