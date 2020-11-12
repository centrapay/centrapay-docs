---
layout: default
parent: Fiat
title: Asset Transfers
---

# Asset Transfers
{:.no_toc}

An asset transfer is an asynchronous exchange of an asset or an amount to a recipient.

A recipient is an existing Centrapay user or someone who can create an account to claim the asset transfer by verifying
their phone number.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Create an Asset Transfer

{% endpoint POST https://service.centraypay.com/api/asset-transfers %}

You can transfer an asset or an amount from a wallet to a recipient.

Here's an example of an asset transfer which sends the entire value to the recipient:

```sh
curl -X POST "https://service.centraypay.com/api/asset-transfers" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{
    "assetId": "YGRo6TYYSxH3js7",
    "recipientAlias": "+64221231234"
  }'
```

Here's an example of a $60 transfer from a wallet:

```sh
curl -X POST "https://service.centraypay.com/api/asset-transfers" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{
    "walletId": "sai2Pai7ohgongo",
    "value": "6000",
    "recipientAlias": "+64221231234"
  }'
```

**Required Fields**

| Parameter      | Type   | Description                                                                          |
|:---------------|:-------|:-------------------------------------------------------------------------------------|
| assetId        | String | id of the asset to send. Required if walletId not specified                          |
| walletId       | String | id of the wallet to send from. The ID associated with the asset, usually wallet id   |
| value          | String | Amount to send. Units depend on the wallet ledger type. Required if walletId present |
| recipientAlias | String | Phone number, email or handle of receiver                                            |

**Optional Parameters**

| Parameter      | Type   | Description                                               |
|:---------------|:-------|:----------------------------------------------------------|
| description    | String | Shows up in your transaction history against the transfer |
| message        | String | A message which shows up in the SMS of the receiver       |
| senderName     | String | Human readable name for the sender                        |


**Example response payload**

```json
{
  "id": "M7Kn2stAxNa6ri7h",
  "status": "created",
  "value": "6000",
  "assetId": "YGRo6TYYSxH3js7",
  "description": "$60 Giftcard",
  "message": "Happy birthday",
  "senderName": "My Cafe",
  "claimable": true,
  "recipientId": "a2d0bfe8-18b1-11eb-8c75-13468b775817",
  "senderAccountId": "aBc932S9182qwCDqwer",
  "recipientAccountId": "oS3Xom2au3Ooy9aihai",
  "createdAt": "2020-05-01T12:30:00.000Z"
}
```

**Error Responses**

| Status | Code                                      | Description                                                       |
|:-------|:------------------------------------------|:------------------------------------------------------------------|
| 403    | {% break _ INSUFFICIENT_WALLET_BALANCE %} | The value of the asset-transfer exceeds the balance on the wallet |

## Claim an Asset Transfer

{% endpoint POST /api/asset-transfers/${id}/claim %}

```sh
curl -X POST "https://service.centraypay.com/api/asset-transfers/M7Kn2stAxNa6ri7h/claim" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json"
```

**Example response payload**

```json
{
  "id": "M7Kn2stAxNa6ri7h",
  "status": "claimed",
  "value": "6000",
  "assetId": "YGRo6TYYSxH3js7",
  "description": "$60 Giftcard",
  "message": "Happy birthday",
  "senderName": "My Cafe",
  "recipientId": "a2d0bfe8-18b1-11eb-8c75-13468b775817",
  "senderAccountId": "aBc932S9182qwCDqwer",
  "recipientAccountId": "oS3Xom2au3Ooy9aihai",
  "createdAt": "2020-05-01T12:30:00.000Z"
}
```

## Look up an Asset Transfer

{% endpoint GET https://service.centraypay.com/api/asset-transfers/${id} %}

```sh
curl -X GET "https://service.centraypay.com/api/asset-transfers/M7Kn2stAxNa6ri7h" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json"
```

**Example response payload (ledger asset)**

```json
{
  "id": "M7Kn2stAxNa6ri7h",
  "status": "sent",
  "value": "6000",
  "walletId": "sai2Pai7ohgongo",
  "ledgerId": "centrapay.nzd.main",
  "description": "$60 Giftcard",
  "message": "Happy birthday",
  "senderName": "My Cafe",
  "recipientId": "a2d0bfe8-18b1-11eb-8c75-13468b775817",
  "senderAccountId": "aBc932S9182qwCDqwer",
  "recipientAccountId": "oS3Xom2au3Ooy9aihai",
  "createdAt": "2020-05-01T12:30:00.000Z",
  "sentAt": "2020-05-01T12:30:00.000Z"
}
```

**Example response payload (discreet asset)**

```json
{
  "id": "M7Kn2stAxNa6ri7h",
  "status": "claimed",
  "value": "6000",
  "assetId": "YGRo6TYYSxH3js7",
  "description": "$60 Giftcard",
  "message": "Happy birthday",
  "senderName": "My Cafe",
  "recipientId": "a2d0bfe8-18b1-11eb-8c75-13468b775817",
  "senderAccountId": "aBc932S9182qwCDqwer",
  "recipientAccountId": "oS3Xom2au3Ooy9aihai",
  "createdAt": "2020-05-01T12:30:00.000Z"
}
```

## List Claimable Asset Transfers

{% endpoint GET https://service.centraypay.com/api/asset-transfers?claimable=1 %}

```sh
curl -X GET "https://service.centraypay.com/api/asset-transfers?claimable=1" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json"
```

**Example response payload**

```json
[
  {
    "id": "M7Kn2stAxNa6ri7h",
    "status": "created",
    "value": "6000",
    "assetId": "YGRo6TYYSxH3js7",
    "description": "$60 Giftcard",
    "message": "Happy birthday",
    "senderName": "My Cafe",
    "claimable": true,
    "recipientId": "a2d0bfe8-18b1-11eb-8c75-13468b775817",
    "senderAccountId": "aBc932S9182qwCDqwer",
    "recipientAccountId": "oS3Xom2au3Ooy9aihai",
    "createdAt": "2020-05-01T12:30:00.000Z"
  }
]
```

## List Sent Asset Transfers

{% endpoint GET https://service.centraypay.com/api/asset-transfers?senderAccountId=${id} %}

```sh
curl -X GET "https://service.centraypay.com/api/asset-transfers?senderAccountId=aBc932S9182qwCDqwer" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json"
```

**Example response payload**

```json
[
  {
    "id": "M7Kn2stAxNa6ri7h",
    "status": "created",
    "value": "6000",
    "assetId": "YGRo6TYYSxH3js7",
    "description": "$60 Giftcard",
    "message": "Happy birthday",
    "senderName": "My Cafe",
    "claimable": true,
    "recipientId": "a2d0bfe8-18b1-11eb-8c75-13468b775817",
    "senderAccountId": "aBc932S9182qwCDqwer",
    "recipientAccountId": "oS3Xom2au3Ooy9aihai",
    "createdAt": "2020-05-01T12:30:00.000Z"
  }
]
```

## List Received Asset Transfers

{% endpoint GET https://service.centraypay.com/api/asset-transfers?recipientAccountId=${id} %}

```sh
curl -X GET "https://service.centraypay.com/api/asset-transfers?recipientAccountId=oS3Xom2au3Ooy9aihai" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json"
```

**Example response payload**

```json
[
  {
    "id": "M7Kn2stAxNa6ri7h",
    "status": "created",
    "value": "6000",
    "assetId": "YGRo6TYYSxH3js7",
    "description": "$60 Giftcard",
    "message": "Happy birthday",
    "senderName": "My Cafe",
    "claimable": true,
    "recipientId": "a2d0bfe8-18b1-11eb-8c75-13468b775817",
    "senderAccountId": "aBc932S9182qwCDqwer",
    "recipientAccountId": "oS3Xom2au3Ooy9aihai",
    "createdAt": "2020-05-01T12:30:00.000Z"
  }
]
```
