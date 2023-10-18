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

After an asset transfer is completed the recipientAlias, lastSentTo and
message fields are scrubbed to avoid storing PII.


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

<a name="asset-transfer-create">
## Create an Asset Transfer

Transfer an asset to a recipient. Some assets can be transfered only in whole
(eg giftcards or tokens) while others can be transfered only in part (eg money).

Some assets can be transferred without supplying a recipient. A `url` field will be
returned in these cases. The `url` will link to a page to claim the asset.

{% reqspec %}
  POST '/api/asset-transfers'
  auth 'api-key'
  example {
    title 'Whole asset transfer'
    body ({
      assetId: 'YGRo6TYYSxH3js7',
      recipientAlias: '+642212312'
    })
  }
  example {
    title 'Partial asset transfer'
    body ({
      assetId: 'sai2Pai7ohgongo',
      value: '6000',
      recipientAlias: '+642212312'
    })
  }
  example {
    title 'Without Recipient'
    body ({
      assetId: 'sai2Pai7ohgongo',
    })
  }
{% endreqspec %}


{% h4 Required Fields %}

| Parameter      | Type   | Description                                                |
|:---------------|:-------|:-----------------------------------------------------------|
| assetId        | String | Id of a discrete asset to transfer or wallet to draw from. |


{% h4 Optional Parameters %}

|       Parameter       |        Type        |                                  Description                                  |
| :-------------------- | :----------------- | :---------------------------------------------------------------------------- |
| recipientAlias        | String             | Phone number, email or handle of receiver.                                    |
| description           | String             | Shows up in transaction history against the transfer. {% maxlen 200 %}        |
| message               | String             | A message which shows up in the SMS of the receiver. {% maxlen 100 %}         |
| value                 | {% dt BigNumber %} | Amount to send. Required for money transfers. Units depend on the asset type. |
| senderName            | String             | Human readable name for the sender. {% maxlen 30 %}                           |
| suppressNotifications | Boolean            | Suppress notifications from Centrapay (SMS/Email).                            |

{% h4 Example response payload (With Recipient) %}

{% json %}
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
  "updatedAt": "2020-05-02T01:03:37.222Z",
  "suppressNotifications": false
}
{% endjson %}

The above example has $10 left on a $60 dollar giftcard at the time of transfer.

{% h4 Example response payload (Without Recipient) %}

{% json %}
{
  "id": "M7Kn2stAxNa6ri7h",
  "status": "created",
  "value": "1000",
  "assetId": "YGRo6TYYSxH3js7",
  "assetType": "centrapay.token.main",
  "description": "Centrapay Token",
  "message": "Happy birthday",
  "senderName": "CentraCafe",
  "createdAt": "2020-05-01T12:30:00.000Z",
  "updatedAt": "2020-05-02T01:03:37.222Z",
  "suppressNotifications": false,
  "url": "https://app.centrapay.com/transfer/M7Kn2stAxNa6ri7h"
}
{% endjson %}

{% h4 Error Responses %}

| Status |                   Code                    |                                   Description                                    |
| :----- | :---------------------------------------- | :------------------------------------------------------------------------------- |
| 403    | {% break _ INSUFFICIENT_WALLET_BALANCE %} | The value of the asset-transfer exceeds the balance on the wallet                |
| 403    | {% break _ QUOTA_EXCEEDED %}              | The transfer exceeds one or more spend quota limits. See [Quota Error Response]. |
| 403    | {% break _ ASSET_NOT_ACTIVE %}            | The asset is not active and cannot be transferred.                               |
| 403    | {% break _ RECIPIENT_MISSING %}           | The asset must be transferred with a recipient supplied.                         |


## Get an Asset Transfer

{% reqspec %}
  GET '/api/asset-transfers/{assetTransferId}'
  auth 'api-key'
  path_param 'assetTransferId', 'M7Kn2stAxNa6ri7h'
{% endreqspec %}

{% h4 Example response payload (In-progress money transfer) %}

{% json %}
{
  "id": "M7Kn2stAxNa6ri7h",
  "status": "sent",
  "value": "6000",
  "assetId": "sai2Pai7ohgongo",
  "assetType": "centrapay.nzd.main",
  "message": "Happy birthday",
  "senderName": "My Cafe",
  "lastSentTo": "+64212312345",
  "senderAccountId": "aBc932S9182qwCDqwer",
  "recipientAccountId": "oS3Xom2au3Ooy9aihai",
  "claimedByAccountId": "9EDxUT91TMsUjoqoQeBuLQ",
  "recipientAlias": "+64212312345",
  "createdAt": "2020-05-01T12:30:00.000Z",
  "updatedAt": "2020-05-02T01:03:37.222Z",
  "suppressNotifications": false
}
{% endjson %}

{% h4 Example response payload (completed giftcard transfer) %}

{% json %}
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
  "recipientAlias": "+64******2345",
  "createdAt": "2020-05-01T12:30:00.000Z",
  "updatedAt": "2020-05-02T01:03:37.222Z",
  "suppressNotifications": false
}
{% endjson %}

## Get an Asset Transfer Summary

{% reqspec %}
  GET '/api/asset-transfers/{assetTransferId}/summary'
  path_param 'assetTransferId', 'M7Kn2stAxNa6ri7h'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "id": "M7Kn2stAxNa6ri7h",
  "status": "created",
  "assetId": "YGRo6TYYSxH3js7",
  "message": "Happy birthday",
  "senderName": "My Cafe",
	"createdAt": "2020-05-01T12:30:00.000Z"
}
{% endjson %}

## Resolve claimable assets **EXPERIMENTAL**

When you send another centrapay user cash or assets, they're automatically assigned to them.
However, if they're not signed up yet then these assets are not immediately assigned.

If unclaimed, asset transfers are returned after 2 weeks.

New accounts should call this endpoint to allocate assets that you've been sent.

{% reqspec %}
  POST '/api/me/resolve-claimable-assets'
  auth 'api-key'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{}
{% endjson %}

## List Asset Transfers **EXPERIMENTAL**

Returns a [paginated][] list of Asset Transfers.

{% reqspec %}
  GET '/api/asset-transfers'
  auth 'api-key'
  example {
    title 'List asset transfers received'
    query_param 'recipientAccountId', 'oS3Xom2au3Ooy9aihai'
  }
  example {
    title 'List asset transfers sent'
    query_param 'senderAccountId', 'aBc932S9182qwCDqwer'
  }
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
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
      "updatedAt": "2020-05-02T01:03:37.222Z",
      "suppressNotifications": false
    }
  ]
}
{% endjson %}

[Quota Error Response]: {% link api/quotas.md %}#quota-error-response
[paginated]: {% link api/pagination.md %}
