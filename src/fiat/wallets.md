---
layout: default
parent: Fiat
---

# Wallets
{:.no_toc}

A wallet represents a balance in a certain currency, that a given centrapay
account has access to.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}


## Creating a wallet

POST `https://service.centrapay.com/api/wallets`

```sh
curl -X POST "https://service.centrapay.com/api/wallets" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{ "accountId": "Te2uDM7xhDLWGVJU3nzwnh", "ledgerId": "centrapay.nzd.main" }'
```

**Required Fields**

| Field     | Type   | Description                                                      |
|:----------|:-------|:-----------------------------------------------------------------|
| accountId | String | The id of the account                                            |
| ledgerId  | String | The id of the ledger e.g. centrapay.nzd.main, centrapay.nzd.test |

**Example response payload**

```json
{
  "id": "WRhAxxWpTKb5U7pXyxQjjY",
  "accountId": "Te2uDM7xhDLWGVJU3nzwnh",
  "ledgerId": "centrapay.nzd.main",
  "currency": "NZD",
  "balance": "2000"
}
```

## Listing authorized wallets

GET `https://service.centrapay.com/api/wallets`

```sh
curl -X GET "https://service.centrapay.com/api/wallets" \
  -H "x-api-key: 1234"
```

**Example response payload**

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

GET `https://service.centrapay.com/api/wallets/${walletId}/transactions`

```sh
curl -X GET "https://service.centrapay.com/api/wallets/WRhAxxWpTKb5U7pXyxQjjY/transactions" \
  -H "x-api-key: 1234"
```

**Transaction Fields**

| Field            | Description                                                               |
|:-----------------|:--------------------------------------------------------------------------|
| amount           | Absolute transaction amount in cents.                                     |
| value            | Change to the wallet's balance in cents when the transaction was applied. |
| currency         | The currency of the transacion (same for all transactions in the wallet). |
| createdAt        | Transaction timestamp as ISO8601 date string.                             |
| type             | Transcation type: "transfer", "deposit" or "withdrawal".                  |
| destWalletId     | Id of the destination wallet if applicable.                               |
| srcWalletId      | Id of the source wallet if applicable.                                    |
| paymentRequestId | Id of the related payment request                                         |
| paymentTxnId     | Id of the related payment request transaction.                            |
| depositId        | Id of the related deposit request.                                        |
| withdrawalId     | Id of the related withdrawal request.                                     |

**Example response payload**

```json
{
  "items": [
    {
      "amount": "350",
      "value": "-350",
      "currency": "NZD",
      "createdAt": "2020-06-17T18:00:23.000Z",
      "type": "transfer",
      "destWalletId": "EfYJd5tZQ63CrehgTP2RPB",
      "srcWalletId": "EBVSreNmpsE2Pazw3SipXC"
    }
  ]
}
```
