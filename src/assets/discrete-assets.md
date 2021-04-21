---
layout: default
parent: Assets
title: Discrete Assets
---

# Discrete Assets
{:.no_toc}

Discrete assets are assets which may be spent in whole or in part but can only
be sent in whole.  Discrete assets may be issued by Centrapay or by a supported
third-party/external issuer.  Discrete assets can be spent by the owner to
satisfy payment requests which support the asset type.


## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Load an External Asset

{% endpoint POST https://service.centrapay.com/api/external-assets %}

Load an asset from a supported third-party issuer. Asset details will be obtained from the issuer.

```sh
curl -X POST "https://service.centrapay.com/api/external-assets" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{
    "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
    "category": "giftcard",
    "type": "epay.nzd.main",
    "issuer": "ezipay",
    "externalId": "23403283262",
    "pin": "1234"
  }'
```

Example response payload

```json
{
  "id": "L75M3L56N2PtBSt8g7uXLU",
  "category": "giftcard",
  "type": "epay.nzd.main",
  "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
  "issuer": "ezipay",
  "externalId": "***********60119",
  "description": "$60 Acme Giftcard",
  "currency": "NZD",
  "initialBalance": "7000",
  "balance": "6000",
  "balanceUpdatedAt": "2020-06-10T15:30:00.000Z",
  "expiresAt": "2020-12-31T00:00:00.000Z",
  "createdAt": "2020-05-01T12:30:00.000Z"
}
```

Load and transfer an asset to another Centrapay user.

```sh
curl -X POST "https://service.centrapay.com/api/external-assets" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{
    "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
    "category": "giftcard",
    "type": "epay.nzd.main",
    "issuer": "ezipay",
    "externalId": "23403283262",
    "pin": "1234",
    "assetTransfer": {
      "recipientAlias": "+64221231234",
      "message": "A message which shows up in the SMS of the receiver",
      "senderName": "Human readable name for the sender"
    }
  }'
```

**Example response payload**

```json
{
  "id": "L75M3L56N2PtBSt8g7uXLU",
  "category": "giftcard",
  "type": "epay.nzd.main",
  "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
  "issuer": "ezipay",
  "externalId": "***********60119",
  "description": "$60 Acme Giftcard",
  "currency": "NZD",
  "initialBalance": "7000",
  "balance": "6000",
  "balanceUpdatedAt": "2020-06-10T15:30:00.000Z",
  "expiresAt": "2020-12-31T00:00:00.000Z",
  "createdAt": "2020-05-01T12:30:00.000Z",
  "assetTransfer": {
    "recipientAlias": "+64*****1234",
    "message": "A message which shows up in the SMS of the receiver",
    "senderName": "Human readable name for the sender"
  }
}
```

Note, you can lookup the status of the Asset Transfer using the returned 'assetTransfer.id'


**Required Fields**

| Parameter  | Type   | Description                                                                                      |
|:-----------|:-------|:-------------------------------------------------------------------------------------------------|
| accountId  | String | The Centrapay account which will own the asset.                                                  |
| category   | String | The category an asset will be grouped by. Valid values: "giftcard".                              |
| type       | String | The Centrapay ledger corresponding to the asset. Valid values: "epay.nzd.main", "epay.nzd.test". |
| issuer     | String | The asset issuer. Valid values: "ezipay".                                                        |
| externalId | String | The issuer's asset id such as card number.                                                       |

**Optional Fields**

| Parameter     | Type                   | Description                                                                                |
|:------------- |:---------------------- |:------------------------------------------------------------------------------------------ |
| pin           | String                 | Additional secret required by the issuer for loading or redeeming the asset.               |
| description   | String                 | Description of the asset, eg: "$60 Acme Giftcard".                                         |
| assetTransfer | Asset Transfer Request | A message which shows up in the SMS of the receiver                                        |

**Asset Transfer Request: Required Fields**

| Parameter      | Type   | Description                                         |
|:---------------|:-------|:----------------------------------------------------|
| recipientAlias | String | A message which shows up in the SMS of the receiver |

**Asset Transfer Request: Optional Fields**

| Parameter   | Type   | Description                                            |
|:----------- |:-------|:-------------------------------------------------------|
| message     | String | A message which shows up in the SMS of the receiver    |
| senderName  | String | Human readable name for the sender                     |

**Error Responses**

| Status | Code                                      | Description                                                                      |
|:-------|:----------------------------------------- |:-------------------------------------------------------------------------------- |
| 403    | {% break _ UNKNOWN_ASSET %}               | Asset ID or PIN is incorrect.                                                    |
| 403    | {% break _ DUPLICATE_ASSET %}             | Asset already claimed by another account.                                        |
| 403    | {% break _ UNSUPPORTED_ASSET_TYPE %}      | Unsupported asset type, origin, or issuer.                                       |
| 403    | {% break _ DENIED_BY_ASSET_PROVIDER %}    | Asset exists, but is not enabled for use through centrapay.                      |
| 403    | {% break _ EXPIRED_BY_ASSET_PROVIDER %}   | Asset exists, but it's expired.                                                  |

[Quota Error Response]: {% link quotas.md %}#quota-error-response
