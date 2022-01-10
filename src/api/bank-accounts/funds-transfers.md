---
layout: default
grand_parent: API Reference
parent: Bank Accounts
title: Funds Transfers
permalink: /api/funds-transfers
redirect_from:
  - /fiat/funds-transfers
---

# Funds Transfers
{:.no_toc}

A funds transfer represents either a top up to or a withdrawal from a Centrapay wallet. Topping up a wallet consists of making a bank transfer from the user's bank account to Centrapay. Once Centrapay has verified the transfer was successful a user will be given credit on their Centrapay wallet equal to the amount of the bank transfer.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}


## Creating a top up

{% reqspec %}
  POST '/api/topups'
  auth 'api-key'
  body ({
    amount: '10000',
    walletId: 'Te2uDM7xhDLWGVJU3nzwnh',
    bankAuthorityId: 'FRhAzzWpTKb5U7pZygQjjY',
  })
{% endreqspec %}

{% h4 Required Fields %}

| Field           | Type               | Description                              |
| :-------------- | :-----             | :--------------------------------------- |
| amount          | {% dt BigNumber %} | Total amount of the transaction in cents |
| walletId        | String             | The id of the wallet                     |
| bankAuthorityId | String             | The id of the bank account               |

{% h4 Example response payload %}

{% json %}
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
{% endjson %}

{% h4 Error Responses %}

| Status |                       Code                       |                                                                                                             Description                                                                                                      |
| :----- | :----------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 403    | {% break _ BANK_AUTHORITY_WALLET_MISMATCH %}     | The wallet and the bank account for the top up request do not belong to the same account.                                                                                                                                    |
| 403    | {% break _ MAX_INFLIGHT_TOPUPS_EXCEEDED %}       | The bank account already has ten pending top ups, which is the maximum a bank authority can have at any one time.                                                                                                            |
| 403    | {% break _ MAX_INFLIGHT_TOPUP_AMOUNT_EXCEEDED %} | The top up can not be created because it is above the max amount of funds a bank account can have pending at any one time. The max amount is $1000.00 for verified bank accounts and $100.00 for non-verified bank accounts. |
| 403    | {% break _ QUOTA_EXCEEDED %}                     | The topup exceeds one or more top up quota limits. See [Quota Error Response][].                                                                                                     |
| 403    | {% break _ DIRECT_DEBIT_NOT_AUTHORIZED        %} | Bank account requires authorization for top up. See bank accounts [direct debit endpoint][].                                                                           |
| 403    | {% break _ INVALID_WALLET_TYPE        %} | The wallet type does not support top ups. See [settlement wallets][].                                                                           |

## Get a top up

{% reqspec %}
  GET '/api/topups/{topupId}'
  auth 'api-key'
  path_param 'topupId', 'WRhAxxWpTKb5U7pXyxQjjY'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
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
{% endjson %}

## List top ups for authorized accounts

{% reqspec %}
  GET '/api/topups'
  auth 'api-key'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
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
{% endjson %}

## List top ups for an account **EXPERIMENTAL**

{% reqspec %}
  GET '/api/accounts/{accountId}/topups'
  auth 'api-key'
  path_param 'accountId', 'aBc932S9182qwCDqwer'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
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
{% endjson %}

## Creating a Withdrawal **EXPERIMENTAL**

{% reqspec %}
  POST '/api/withdrawals'
  auth 'api-key'
  body ({
    amount: '10000',
    walletId: 'Te2uDM7xhDLWGVJU3nzwnh',
    bankAuthorityId: 'FRhAzzWpTKb5U7pZygQjjY',
  })
{% endreqspec %}

{% h4 Required Fields %}

| Field           | Type               | Description                              |
| :-------------- | :-----             | :--------------------------------------- |
| amount          | {% dt BigNumber %} | Total amount of the transaction in cents |
| walletId        | String             | The id of the wallet                     |
| bankAuthorityId | String             | The id of the bank account               |

{% h4 Example response payload %}

{% json %}
{
  "id": "hg2RfYTQ635tPBZEPJdCre",
  "walletId": "Te2uDM7xhDLWGVJU3nzwnh",
  "bankAuthorityId": "FRhAzzWpTKb5U7pZygQjjY",
  "accountId": "aBc932S9182qwCDqwer",
  "type": "withdrawal",
  "amount": "10000",
  "status": "created",
  "createdAt": "2020-05-01T12:30:00.000Z",
  "updatedAt": "2020-05-01T12:30:00.000Z"
}
{% endjson %}

{% h4 Error Responses %}

| Status |                     Code                      |                                         Description                                           |
| :----- | :-------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| 403    | {% break _ BANK_AUTHORITY_WALLET_MISMATCH %}  | The wallet and the bank account for the withdrawal request do not belong to the same account. |
| 403    | {% break _ INSUFFICIENT_WALLET_BALANCE %}     | The wallet balance is less than the required amount.                                          |
| 403    | {% break _ INVALID_WALLET_TYPE        %}      | The wallet type does not support withdrawals. See [settlement wallets][].                     |

## Get a Withdrawal **EXPERIMENTAL**

{% reqspec %}
  GET '/api/withdrawals/{withdrawalId}'
  auth 'api-key'
  path_param 'withdrawalId', 'WRhAxxWpTKb5U7pXyxQjjY'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "id": "hg2RfYTQ635tPBZEPJdCre",
  "walletId": "Te2uDM7xhDLWGVJU3nzwnh",
  "bankAuthorityId": "FRhAzzWpTKb5U7pZygQjjY",
  "accountId": "aBc932S9182qwCDqwer",
  "type": "withdrawal",
  "amount": "10000",
  "status": "created",
  "createdAt": "2020-05-01T12:30:00.000Z",
  "updatedAt": "2020-05-01T12:30:00.000Z"
}
{% endjson %}

## List Withdrawals for an account **EXPERIMENTAL**

Returns a [paginated][] list of Withdrawals for an account.

{% reqspec %}
  GET '/api/accounts/{accountId}/withdrawals'
  auth 'api-key'
  path_param 'accountId', 'aBc932S9182qwCDqwer'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "items": [
    {
      "id": "5thg2RPBZEfYTPJdQ63Cre",
      "walletId": "Te2uDM7xhDLWGVJU3nzwnh",
      "bankAuthorityId": "FRhAzzWpTKb5U7pZygQjjY",
      "accountId": "aBc932S9182qwCDqwer",
      "type": "withdrawal",
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
      "type": "withdrawal",
      "amount": "10000",
      "status": "done",
      "createdAt": "2020-05-01T12:30:00.000Z",
      "updatedAt": "2020-05-01T12:30:00.000Z"
    }
  ]
}
{% endjson %}

[direct debit endpoint]: {% link api/bank-accounts/bank-accounts.md %}#direct-debit-authority
[settlement wallets]: {% link api/assets/wallets.md %}#settlement-wallets
[Quota Error Response]: {% link api/quotas.md %}#quota-error-response
[paginated]: {% link api/pagination.md %}
