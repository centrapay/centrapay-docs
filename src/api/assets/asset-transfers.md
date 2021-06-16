---
layout: default
grand_parent: API Reference
parent: Assets
title: Asset Transfers
permalink: /api/asset-transfers
redirect_from:
  - /assets/asset-transfers
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

## Asset Transfer lifecycle

Asset Transfer goes through different lifecycle stages.

<img src="{{site.url}}/images/asset-lifecycle.png" style="display: block; margin: auto;" />

| State    | Description                                                                                                        |
|:---------|:-------------------------------------------------------------------------------------------------------------------|
| created  | Asset transfer successfully created                                                                                |
| sent     | Asset transfer notification (sms, email) was sent to a new user                                                    |
| expired  | Asset transfer expired as new user didn't create his account and claimed the asset. This is very short lived state |
| returned | Asset transfer expired and was returned to original owner                                                          |
| claimed  | Asset transfer was successfully completed                                                                          |

## Create an Asset Transfer

{% endpoint POST https://service.centrapay.com/api/asset-transfers %}

You can transfer a discrete asset or an amount from a wallet to a recipient.

Here's an example of a $60 transfer from a wallet:

```sh
curl -X POST "https://service.centrapay.com/api/asset-transfers" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{
    "assetId": "sai2Pai7ohgongo",
    "value": "6000",
    "recipientAlias": "+64221231234"
  }'
```

For discrete assets, you transfer the entire value to the recipient as balances can't be transferred
between accounts. Here's an example:

```sh
curl -X POST "https://service.centrapay.com/api/asset-transfers" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{
    "assetId": "YGRo6TYYSxH3js7",
    "recipientAlias": "+64221231234"
  }'
```

{% h4 Required Fields %}

| Parameter      | Type   | Description                                                |
|:---------------|:-------|:-----------------------------------------------------------|
| assetId        | String | Id of a discrete asset to transfer or wallet to draw from. |
| recipientAlias | String | Phone number, email or handle of receiver.                 |


{% h4 Optional Parameters %}

| Parameter   | Type               | Description                                                                                |
| :---------- | :-----             | :---------                                                                                 |
| description | String             | Shows up in transaction history against the transfer                                       |
| message     | String             | A message which shows up in the SMS of the receiver. 100 character limit                   |
| value       | {% dt BigNumber %} | Amount to send. Required for wallet transfers, and units depend on the wallet ledger type. |
| senderName  | String             | Human readable name for the sender                                                         |
| senderAlias | String             | Phone number, email or handle of sender to return asset to. See (★) note below.            |

★ Only provide a senderAlias value if you are invoking asset transfer with api
key. In case that recipient doesn't claim asset in 2 weeks or asset was sent to
an invalid Alias (wrong phone number etc) we will use senderAlias to return the
asset. If asset cannot be returned to a sender it will be returned to asset
owner.


{% h4 Example response payload %}

```json
{
  "id": "M7Kn2stAxNa6ri7h",
  "status": "created",
  "value": "1000",
  "assetId": "YGRo6TYYSxH3js7",
  "assetType": "epay.nzd.main",
  "description": "$60 Giftcard",
  "message": "Happy birthday",
  "senderName": "My Cafe",
  "recipientAccountId": "9EDxUT91TMsUjoqoQeBuLQ",
  "claimedByAccountId": "9EDxUT91TMsUjoqoQeBuLQ",
  "recipientAlias": "+64212312345",
  "createdAt": "2020-05-01T12:30:00.000Z",
  "updatedAt": "2020-05-02T01:03:37.222Z"
}
```

The above example has $10 left on a $60 dollar giftcard at the time of transfer.

{% h4 Error Responses %}

| Status | Code                                      | Description                                                       |
|:-------|:------------------------------------------|:------------------------------------------------------------------|
| 403    | {% break _ INSUFFICIENT_WALLET_BALANCE %} | The value of the asset-transfer exceeds the balance on the wallet |
| 403    | {% break _ QUOTA_EXCEEDED %} | The transfer exceeds one or more spend quota limits. See [Quota Error Response]. |

{% h4 Example webhook response %}

TBD
```json
{}
```

## Look up an Asset Transfer

After an asset transfer is resolved we scrub the recipientAlias, lastSentTo and message fields to avoid storing PII against
our model.

{% endpoint GET https://service.centrapay.com/api/asset-transfers/${id} %}

```sh
curl -X GET "https://service.centrapay.com/api/asset-transfers/M7Kn2stAxNa6ri7h" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json"
```

{% h4 Example response payload (ledger asset) %}

```json
{
  "id": "M7Kn2stAxNa6ri7h",
  "status": "sent",
  "value": "6000",
  "assetId": "sai2Pai7ohgongo",
  "assetType": "centrapay.nzd.main",
  "description": "$60 Giftcard",
  "message": "Happy birthday",
  "senderName": "My Cafe",
  "lastSentTo": "+64212312345",
  "senderAccountId": "aBc932S9182qwCDqwer",
  "recipientAccountId": "oS3Xom2au3Ooy9aihai",
  "claimedByAccountId": "9EDxUT91TMsUjoqoQeBuLQ",
  "recipientAlias": "+64212312345",
  "createdAt": "2020-05-01T12:30:00.000Z",
  "updatedAt": "2020-05-02T01:03:37.222Z"
}
```

{% h4 Example response payload (discrete asset) %}

```json
{
  "id": "M7Kn2stAxNa6ri7h",
  "status": "claimed",
  "value": "6000",
  "assetId": "YGRo6TYYSxH3js7",
  "assetType": "epay.nzd.main",
  "description": "$60 Giftcard",
  "message": "Happy birthday",
  "senderName": "My Cafe",
  "recipientAccountId": "9EDxUT91TMsUjoqoQeBuLQ",
  "claimedByAccountId": "9EDxUT91TMsUjoqoQeBuLQ",
  "recipientAlias": "+64*****2345",
  "createdAt": "2020-05-01T12:30:00.000Z",
  "updatedAt": "2020-05-02T01:03:37.222Z"
}
```

## Resolve claimable assets **EXPERIMENTAL**

When you send another centrapay user cash or assets, they're automatically assigned to them.
However, if they're not signed up yet then these assets are not immediately assigned.

If unclaimed, asset transfers are returned after 2 weeks.

New accounts should call this endpoint to allocate assets that you've been sent.

{% endpoint POST https://service.centrapay.com/api/me/resolve-claimable-assets %}

```sh
curl -X POST "https://service.centrapay.com/api/me/resolve-claimable-assets" \
  -H "x-api-key: 1234"
```

{% h4 Example response payload %}

```json
{}
```

## List Sent Asset Transfers **EXPERIMENTAL**

{% endpoint GET https://service.centrapay.com/api/asset-transfers?senderAccountId=${id} %}

```sh
curl -X GET "https://service.centrapay.com/api/asset-transfers?senderAccountId=aBc932S9182qwCDqwer" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json"
```

{% h4 Example response payload %}

```json
{
  "items": [
    {
      "id": "M7Kn2stAxNa6ri7h",
      "status": "created",
      "value": "6000",
      "assetId": "YGRo6TYYSxH3js7",
      "description": "$60 Giftcard",
      "message": "Happy birthday",
      "senderName": "My Cafe",
      "senderAccountId": "aBc932S9182qwCDqwer",
      "recipientAccountId": "9EDxUT91TMsUjoqoQeBuLQ",
      "claimedByAccountId": "9EDxUT91TMsUjoqoQeBuLQ",
      "recipientAlias": "+64*****2345",
      "createdAt": "2020-05-01T12:30:00.000Z",
      "updatedAt": "2020-05-02T01:03:37.222Z"
    }
  ]
}
```

## List Received Asset Transfers **EXPERIMENTAL**

{% endpoint GET https://service.centrapay.com/api/asset-transfers?recipientAccountId=${id} %}

```sh
curl -X GET "https://service.centrapay.com/api/asset-transfers?recipientAccountId=oS3Xom2au3Ooy9aihai" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json"
```

{% h4 Example response payload %}

```json
{
  "items": [
    {
      "id": "M7Kn2stAxNa6ri7h",
      "status": "created",
      "value": "6000",
      "assetId": "YGRo6TYYSxH3js7",
      "description": "$60 Giftcard",
      "message": "Happy birthday",
      "senderName": "My Cafe",
      "recipientAccountId": "9EDxUT91TMsUjoqoQeBuLQ",
      "claimedByAccountId": "9EDxUT91TMsUjoqoQeBuLQ",
      "recipientAlias": "+64*****2345",
      "createdAt": "2020-05-01T12:30:00.000Z",
      "updatedAt": "2020-05-02T01:03:37.222Z"
    }
  ]
}
```

[Quota Error Response]: {% link api/quotas.md %}#quota-error-response
