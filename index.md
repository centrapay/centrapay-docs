---
layout: default
title: Centrapay Documentation
---

# Introduction

Welcome to Centrapay! We allow you to transact Digital Assets or Vouchers via your point of sale, payment terminal, shopping cart or unattended device. We accomplish this via our Payments API which allows merchants, customers, terminals, and smart wallets to interact with eachother. 

# Example Payment Flows

## Voucher Redemption

1. Merchant creates a payment request via our API 
2. Costumer is prompted to enter a voucher code on terminal
3. Constumer enters voucher Code into terminal 
4. The terminal calls our API with the details of the transaciton 
5. We redeem the voucher if it is valid or reject it if it isn't
6. terminal displays result.

## Dynamic QR Code

1. Merchant creates a payment request via our API
2. We respond with the payment request and a generated QR code
3. The QR code is displayed by the terminal
4. Consumer scans the QR code displayed
5. Consumer selects payment type from a list of payment options a merchant supports via a centrapay connected app
6. We prompt their smart wallet to pay the request
7. Smart wallet pays the request
8. We verify payment and notify the terminal
9. Terminal displays result

## Static QR Code at a vending machine

1. Consumer scans QR code and calls the merchants backend
2. Merchant creates a payment request via our API
3. Smart wallet displays information to the customer
4. Customer selects payment options supported by the given merchant
5. Smart wallet transfers funds to merchant
6. We verify they have the required credit and notify merchant
7. Customer picks an item from the machine > Product is vended > Merchant refunds the customer via our API

## Barcode

1. Customer generates a one time barcode via our connected app inside of their smart wallet
2. Merchant scans the barcode and creates a payment request via our API which includes the customers barcode as a parameter
3. We respond with the payment request and a generated QR code
4. The QR code is displayed by the terminal 
5. Consumer scans the QR code displayed
6. Consumer selects payment type from a list of payment options a merchant supports via a centrapay connected app
7. We prompt their smart wallet to pay the request
8. Smart wallet pays the request
9. We verify payment and notify the terminal
10. Terminal displays result

# API keys and access

We handle authorization via api keys, which are sent in the header when making a request to any of our endpoints. To get set up with an api key so you can start using the payments API contact us via email at **devsupport@centrapay.com.**

# Endpoints

Our endpoints are documented fully using Swagger here [https://service.centrapay.com/payments/api/documentation](https://service.centrapay.com/payments/api/documentation)

**Base Url:** service.centrapay.com/payments/api

|             |                                                                                                   |
| Requests    | /requests.cancel <br> /requests.create <br> /requests.info <br> /requests.pay <br> /requests.void |
| Service     | /service.info                                                                                     |
| Transaction | /transactions.refund                                        |


## Creating a payment request

[Documentation](https://service.centrapay.com/payments/api/documentation#/Requests/postRequestscreate){:target="_blank"}

**POST** https://service.centrapay.com/payments/api/requests.create

```
curl -X POST "https://service.centrapay.com/payments/api/requests.create" \
    -H 'x-api-key:f32c5497297084e5354b47c40d5ccacb109ce483' \
    -d merchantId="1399b053-b3dd-4c5b-9859-b5bf5c2ac477" \
    -d amount=300 \
    -d asset='NZD'
```

**Required Parameters**

| Parameter  | Description                                 |
| amount     | The payment amount in cents                 |
| asset      | The currency - NZD or AUD                   |
| merchantId | The ID of the merchant creating the request |

**OptionalParameters**

| Parameter         | Description                                                  |
| clientId          | The ID of the merchant specific client configuration         |
| description       | Description of the payment                                   |
| externalReference | Unique merchant reference for the payment request            |
| notifyUrl         | The URL that will receive **POST** requests from the webhook |


## Getting the information about a payment request 

[Documentation](https://service.centrapay.com/payments/api/documentation#/Requests/getRequestsinfo){:target="_blank"}

**GET** https://service.centrapay.com/payments/api/requests.info

```
curl -G "https://service.centrapay.com/payments/api/requests.info" \
    -H 'x-api-key:f32c5497297084e5354b47c40d5ccacb109ce483' \
    -d requestId="a95b3b0d-1278-4613-8772-20d146065a2e"
```

**Required Parameters**

| Parameter | Description                                                               |
| requestId | The payment requestId that is generated when `/requests.create` is called |


## Paying a payment request

[Documentation](https://service.centrapay.com/payments/api/documentation#/requests/postRequestspay){:target="_blank"}

**POST** https://service.centrapay.com/payments/api/requests.pay

```
curl -X POST "https://service.centrapay.com/payments/api/requests.pay" \
    -H 'x-api-key:f32c5497297084e5354b47c40d5ccacb109ce483' \
    -d authorization="12345678" \
    -d ledger="g.pocketvouchers.pv" \
    -d requestId="7d2b1d52-b609-4ccd-b4cc-c4a9af881bd9"
```

**Note** To test Pocket Vouchers, generate a test value voucher by texting ‘CENTRALBONUS’ 393.
You will then receive a response text containing an 8 digit voucher code that has $20 of loaded credit. 

The received code is only valid for two weeks from the issue date. You might get charged your standard text rates from your provider.

**Required Parameters**

| Parameter     | Description                                                               |
| authorization | The voucher code                                                          |
| ledger        | The ledger to use for payment          |
| requestId     | The payment requestId that is generated when `/requests.create` is called |


## Cancelling a payment request 

[Documentation](https://service.centrapay.com/payments/api/documentation#/Requests/postRequestscancel){:target="_blank"}

**POST** https://service.centrapay.com/payments/api/requests.cancel 

```
curl -X POST "https://service.centrapay.com/payments/api/requests.cancel" \
    -H 'x-api-key:f32c5497297084e5354b47c40d5ccacb109ce483' \
    -d requestId="a95b3b0d-1278-4613-8772-20d146065a2e"
```

**Required Parameters**

| Parameter | Description                                                               |
| requestId | The payment requestId that is generated when `/requests.create` is called |


## Voiding a payment request 

[Documentation](https://service.centrapay.com/payments/api/documentation#/Requests/postRequestsvoid){:target="_blank"}

**POST** https://service.centrapay.com/payments/api/requests.void

```
curl -X POST "https://service.centrapay.com/payments/api/requests.void" \
    -H 'x-api-key:f32c5497297084e5354b47c40d5ccacb109ce483' \
    -d requestId="a95b3b0d-1278-4613-8772-20d146065a2e"
```

**Required Parameters**

| Parameter | Description |         
| requestId | The payment requestId that is generated when `/requests.create` is called.|


## Refunding a transaction 

[Documentation](https://service.centrapay.com/payments/api/documentation#/Transactions/postTransactionsrefund){:target="_blank"}

**POST** https://service.centrapay.com/payments/api/transactions.refund

```
curl -X POST "https://service.centrapay.com/payments/api/transactions.refund" \
    -H 'x-api-key:f32c5497297084e5354b47c40d5ccacb109ce483' \
    -d transactionId="7d2b1d52-b609-4ccd-b4cc-c4a9af881bd9" \
    -d amount=100
```

### Refunding a transaction can be done two ways:

1. Refund the full or partial amount once

    * If you refund a transaction without providing an external reference, you will get a succesful response for the first request and then an ALREADY_REFUNDED message for any refund requests that follow for the same transaction, unless an external reference is provided.

2. Refund a partial amount multiple times up to the transaction amount

    * If you provide an external reference then a transaction can be refunded multiple times provided that the external reference is unique for each refund request. When a duplicate external reference is provided when attempting to refund the same transaction we return a successful response if the amount of the request is the same both times but do not process another refund, this is because we assume it to be a repeat request. If the amount is different you will get a REPEAT_REFERENCE error message.

**Required Parameters for one time refund**

| Parameter | Description |
| transactionId | The transaction to refund you can either get this by setting notifyUrl when the request is created and receiving a webhook notification with the transaction details, or call `/requests.info` and grab the transactionId from there. |
| amount | The amount to refund in cents |

**Additional required Parameter for multiple refunds**

| Parameter | Description |
| externalReference | A reference supplied by the merchant that must be unique for each refund of that transaction, can be anything you want but it must be unique. |

# Errors

## Error codes

| Error code | Http code | Message                             |
| 1          | 401       | KEY_NOT_AUTHORIZED                  |
| 2          | 404       | REQUEST_NOT_FOUND                   |
| 3          | 404       | TRANSACTION_NOT_FOUND               |
| 4          | 404       | MERCHANT_NOT_FOUND                  |
| 5          | 400       | INVALID_REQUEST_ID                  |
| 6          | 400       | INVALID_AMOUNT                      |
| 7          | 400       | INVALID_ASSET                       |
| 8          | 400       | INVALID_AUTHORIZATION               |
| 9          | 400       | INVALID_LEDGER                      |
| 10         | 400       | INVALID_MERCHANT_ID                 |
| 11         | 400       | INVALID_CLIENT_ID                   |
| 12         | 400       | INVALID_PATRON_CODE                 |
| 13         | 400       | INVALID_DESCRIPTION                 |
| 14         | 400       | INVALID_REFERENCE                   |
| 15         | 400       | INVALID_NOTIFY_URL                  |
| 16         | 400       | INVALID_TRANSACTION_ID              |
| 17         | 400       | REQUEST_CANCELLED                   |
| 18         | 400       | REQUEST_EXPIRED                     |
| 19         | 400       | REQUEST_PAID                        |
| 51         | 500       | INTERNAL_ERROR                      |
| 76         | 503       | EXTERNAL_SERVICE                    |
| 77         | 500       | INTERNAL_ERROR                      |
| 126        | 403       | IN_USE                              |
| 151        | 403       | IN_USE                              |
| 176        | 400       | LEDGER_NOT_ENABLED                  |
| 177        | 400       | INVALID_LEDGER                      |
| 178        | 500       | INTERNAL_SERVER_ERROR               |
| 179        | 404       | BITCOIN_TRANSACTION_NOT_FOUND       |
| 180        | 400       | OLD_TRANSACTION                     |
| 181        | 400       | INSUFFICIENT_PAYMENT                |
| 182        | 403       | MERCHANT_TRANSACTION_LIMIT_EXCEEDED |
| 183        | 403       | INVALID_TRANSACTION_AMOUNT          |
| 184        | 403       | INVALID_VOUCHER_AMOUNT              |
| 185        | 403       | VOUCHER_EXPIRED                     |
| 186        | 403       | INSUFFICIENT_VOUCHER_BALANCE        |
| 187        | 404       | VOUCHER_UNKNOWN                     |
| 276        | 400       | ALREADY_REFUNDED                    |
| 277        | 400       | INVALID_AMOUNT                      |

# Webhooks

## Successful webhook notification

```json
{ 
    "iss": "b4d5d7a3-38bf-4c41-8e38-e33d96ddb169", 
    "iat": 1538440151, 
    "jti": "fff41104-8a22-493a-a9d2-f6d94e7b901e", 
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
        "timestamp": "2018-10-02T00:29:08.761Z", 
        "account": "1Fy8xwtT8csbVwVCw2NMkpTjXx7AURY7fp", 
        "responseCode": "00", 
        "settlementDate": "2018-10-02T00:29:08.760Z", 
        "receipt": "", 
        "authCode": "961241" 
    } 
} 
```

## Failure webhook notification

```json
{
    "iss": "b4d5d7a3-38bf-4c41-8e38-e33d96ddb169",
    "iat": 1585003238,
    "jti": "44c32390-aa1f-400b-b01a-b1bc58339745",
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

`TransactionType` can either be:

| CANCELLED | For a request that has been cancelled |
| EXPIRED   | For a request that has expired        |
| PURCHASE  | For a completed transaction           |
| REFUND    | For a refunded transaction            |
