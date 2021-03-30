---
layout: default
parent: Fiat
title: Funds Transfers
---

# Funds Transfers
{:.no_toc}

A funds transfer represents either a top up to or a withdrawal from a Centrapay wallet. Topping up a wallet consists of making a bank transfer from the user's bank account to Centrapay. Once Centrapay has verified the transfer was successful a user will be given credit on their Centrapay wallet equal to the amount of the bank transfer.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}


## Creating a top up

{% endpoint POST https://service.centrapay.com/api/topups %}

```sh
curl -X POST "https://service.centrapay.com/api/topups" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{
    "amount": "10000",
    "walletId": "Te2uDM7xhDLWGVJU3nzwnh",
    "bankAuthorityId": "FRhAzzWpTKb5U7pZygQjjY"
  }'
```

**Required Fields**

|      Field      |  Type  |               Description                |
|:--------------- |:------ |:---------------------------------------- |
| amount          | String | Total amount of the transaction in cents |
| walletId        | String | The id of the wallet                     |
| bankAuthorityId | String | The id of the bank authority             |

**Example response payload**

```json
{
  "id": "hg2RfYTQ635tPBZEPJdCre",
  "walletId": "Te2uDM7xhDLWGVJU3nzwnh",
  "bankAuthorityId": "FRhAzzWpTKb5U7pZygQjjY",
  "accountId": "aBc932S9182qwCDqwer",
  "type": "topup",
  "amount": "10000",
  "status": "created",
  "createdAt": "2020-05-01T12:30:00.000Z",
  "updatedAt": "2020-05-01T12:30:00.000Z"
}
```

**Error Responses**

| Status |             Code              |                         Description                         |
| :----- | :---------------------------- | :---------------------------------------------------------- |
| 403    | {% break _ BANK_AUTHORITY_WALLET_MISMATCH %} | The wallet and the bank authority for the top up request do not belong to the same account. |
| 403    | {% break _ MAX_INFLIGHT_TOPUPS_EXCEEDED %}   | The bank authority already has ten pending top ups, which is the maximum a bank authority can have at any one time. |
| 403    | {% break _ MAX_INFLIGHT_TOPUP_AMOUNT_EXCEEDED %} | The top up can not be created because it is above the max amount of funds a bank authority can have pending at any one time. The max amount is $1000.00 for verified bank authorities and $100.00 for non-verified bank authorities. |
| 403    | {% break _ QUOTA_EXCEEDED %} | The topup exceeds one or more topup quota limits see [ Quota Error Response ]({% link quotas.md %}#quota-error-response-anchor)  |

## Getting a top up by id

{% endpoint GET https://service.centrapay.com/api/topups/${id} %}

```sh
curl -X GET "https://service.centrapay.com/api/topups/WRhAxxWpTKb5U7pXyxQjjY" \
  -H "x-api-key: 1234"
```

**Example response payload**

```json
{
  "id": "hg2RfYTQ635tPBZEPJdCre",
  "walletId": "Te2uDM7xhDLWGVJU3nzwnh",
  "bankAuthorityId": "FRhAzzWpTKb5U7pZygQjjY",
  "accountId": "aBc932S9182qwCDqwer",
  "type": "topup",
  "amount": "10000",
  "status": "created",
  "createdAt": "2020-05-01T12:30:00.000Z",
  "updatedAt": "2020-05-01T12:30:00.000Z"
}
```

## List top ups for authorized accounts

{% endpoint GET https://service.centrapay.com/topups %}

```sh
curl -X GET "https://service.centrapay.com/api/topups" \
  -H "x-api-key: 1234"
```

**Example response payload**

```json
[
  {
    "id": "5thg2RPBZEfYTPJdQ63Cre",
    "walletId": "Te2uDM7xhDLWGVJU3nzwnh",
    "bankAuthorityId": "FRhAzzWpTKb5U7pZygQjjY",
    "accountId": "aBc932S9182qwCDqwer",
    "type": "topup",
    "amount": "10000",
    "status": "created",
    "createdAt": "2020-05-01T12:30:00.000Z",
    "updatedAt": "2020-05-01T12:30:00.000Z"
  },
  {
    "id": "hg2RfYTQ635tPBZEPJdCre",
    "walletId": "Te2uDM7xhDLWGVJU3nzwnh",
    "bankAuthorityId": "FRhAzzWpTKb5U7pZygQjjY",
    "accountId": "aBc932S9182qwCDqwer",
    "type": "topup",
    "amount": "10000",
    "status": "created",
    "createdAt": "2020-05-01T12:30:00.000Z",
    "updatedAt": "2020-05-01T12:30:00.000Z"
  }
]
```
