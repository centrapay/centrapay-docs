---
layout: default
grand_parent: API Reference
parent: Assets
title: Wallets
permalink: /api/wallets
redirect_from:
  - /assets/wallets
---

# Wallets
{:.no_toc}

A wallet is an asset that represents [money][]. The wallet
maintains a record of all transactions it has participated in. A wallet has a
single balance and a single currency.


## Contents
{:.no_toc .text-delta}

* TOC
{:toc}


## Creating a wallet

{% reqspec %}
  POST '/api/wallets'
  auth 'api-key'
  body ({
    accountId: 'Te2uDM7xhDLWGVJU3nzwnh',
    ledgerId: 'centrapay.nzd.main',
  })
{% endreqspec %}

{% h4 Required Fields %}

| Field     | Type   | Description                                                      |
|:----------|:-------|:-----------------------------------------------------------------|
| accountId | String | The id of the account                                            |
| ledgerId  | String | The id of the ledger e.g. centrapay.nzd.main, centrapay.nzd.test |

{% h4 Example response payload %}

```json
{
  "id": "WRhAxxWpTKb5U7pXyxQjjY",
  "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
  "ledgerId": "centrapay.nzd.main",
  "currency": "NZD",
  "balance": "2000"
}
```

{% h4 Error Responses %}

| Status | Code                                      | Description                                                          |
|--------|-------------------------------------------|----------------------------------------------------------------------|
| 403    | {% break _ ACCOUNT_MAX_WALLETS_REACHED %} | The maximum number of wallets for the given ledger has been reached. |


## Listing authorized wallets

{% reqspec %}
  GET '/api/wallets'
  auth 'api-key'
{% endreqspec %}

{% h4 Example response payload %}

```json
[
  {
    "id": "WRhAxxWpTKb5U7pXyxQjjY",
    "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
    "ledgerId": "centrapay.nzd.main",
    "currency": "NZD",
    "balance": "2000"
  },
  {
    "id": "NQ1yeromwnWPD2hY41L2yS",
    "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
    "ledgerId": "centrapay.nzd.test",
    "currency": "NZD",
    "balance": "20"
  }
]
```

## Listing Wallet Transactions **EXPERIMENTAL**

{% reqspec %}
  GET '/api/wallets/{walletId}/transactions'
  path_param 'walletId', 'WRhAxxWpTKb5U7pXyxQjjY'
  auth 'api-key'
{% endreqspec %}


{% h4 Transaction Fields %}

| Field            | Description                                                               |
|:-----------------|:--------------------------------------------------------------------------|
| activityNumber   | Unique sequential wallet transaction number                               |
| amount           | Absolute transaction amount in cents.                                     |
| value            | Change to the wallet's balance in cents when the transaction was applied. |
| createdAt        | Transaction timestamp as ISO8601 date string.                             |
| activityType     | Hints to the type of transaction: undefined or "returned-asset-transfer"  |
| destWalletId     | Id of the destination wallet if applicable.                               |
| srcWalletId      | Id of the source wallet if applicable.                                    |
| destParty        | Display value for party receiving funds if applicable. See note below.    |
| srcParty         | Display value for party providing funds if applicable. See note below.    |
| paymentRequestId | Id of the related payment request if applicable.                          |
| topupId          | Id of the related topup funds transfer request if applicable.             |
| assetTransferId  | Id of the related asset transfer request if applicable.                   |
| withdrawalId     | Id of the related withdrawal request if applicable.                       |

{% h4 Party Values %}

The "destParty" and "srcParty" are optionally provided depending on the purpose
of the transaction. Values may include a merchant name, user handle, masked user
email, masked user phone, or bank account.


{% h4 Example response payload (Payment) %}

```json
{
  "items": [
    {
      "activityNumber": "1",
      "amount": "350",
      "value": "-350",
      "createdAt": "2020-06-17T18:00:23.000Z",
      "destParty": "Centrapay Cafe",
      "destWalletId": "GfYJd5tZQ63CrehgTP2RPB",
      "srcWalletId": "EBVSreNmpsE2Pazw3SipXC",
      "paymentRequestId": "76961bc8-878b-11eb-bc82-abcc0f5e1f60"
    }
  ]
}
```

{% h4 Example response payload (Topup) %}

```json
{
  "items": [
    {
      "activityNumber": "1",
      "amount": "5000",
      "value": "5000",
      "createdAt": "2020-06-17T18:00:23.000Z",
      "srcParty": "12-4000-100001-00",
      "destWalletId": "EBVSreNmpsE2Pazw3SipXC",
      "topupId": "77hqHDzw6KaaG2P2hoshUB"
    }
  ]
}
```

{% h4 Example response payload (Sent Asset) %}

```json
{
  "items": [
    {
      "activityNumber": "1",
      "amount": "2500",
      "value": "-2500",
      "createdAt": "2020-06-17T18:00:23.000Z",
      "destParty": "+6422*****36",
      "srcWalletId": "EBVSreNmpsE2Pazw3SipXC",
      "assetTransferId": "TtQHufC4LGBY2eiPRopRm3"
    }
  ]
}
```

{% h4 Example response payload (Received Asset) %}

```json
{
  "items": [
    {
      "activityNumber": "1",
      "amount": "2500",
      "value": "2500",
      "createdAt": "2020-06-17T18:00:23.000Z",
      "srcParty": "+6421*****18",
      "destWalletId": "EBVSreNmpsE2Pazw3SipXC",
      "assetTransferId": "TtQHufC4LGBY2eiPRopRm3"
    }
  ]
}
```

{% h4 Example response payload (Returned Asset) %}

```json
{
  "items": [
    {
      "activityNumber": "1",
      "amount": "2500",
      "value": "2500",
      "createdAt": "2020-06-17T18:00:23.000Z",
      "activityType": "returned-asset-transfer",
      "srcParty": "+6421*****18",
      "destWalletId": "EBVSreNmpsE2Pazw3SipXC",
      "assetTransferId": "TtQHufC4LGBY2eiPRopRm3"
    }
  ]
}
```

{% h4 Example response payload (Withdraw) %}

```json
{
  "items": [
    {
      "activityNumber": "1",
      "amount": "2500",
      "value": "2500",
      "createdAt": "2020-06-17T18:00:23.000Z",
      "srcWalletId": "EBVSreNmpsE2Pazw3SipXC",
      "destParty": "12-3546-2544786-00",
      "withdrawalId": "TtQHufC4LGBY2eiPRopRm3"
    }
  ]
}
```

[money]: {% link api/assets/assets.md %}#money
