---
layout:  default
parent:  Bank Accounts
title: Bank Accounts
permalink: /api/bank-accounts
redirect_from:
  - /fiat
  - /fiat/bank-accounts
  - /fiat/bank-authorities
  - /fiat/authorities
---

# Bank Accounts
{:.no_toc}

A Bank Account is a way to get funds in and out of a user's wallet.

A Bank Authority represents an individual's consent for Centrapay to transfer funds.

In order to move funds from a Centrapay wallet to a bank account (withdrawal), we only need the
minimum required fields. There's no need to authorize direct debit authority, nor verify the account
using a code on a bank statement.

In order to move funds between a bank account to a Centrapay wallet (top up), we need explicit
authorization and verification from the user. Bank account authorization and verification status can
be observed based on the `directDebitAuthorized` and `verified` flags.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

<span id="bank-account-create"></span>
## Creating a bank account

{% endpoint POST https://service.centrapay.com/api/bank-accounts %}

An example of a minimal POST to create a bank account.

```sh
curl -X POST "https://service.centrapay.com/api/bank-accounts" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{
    "accountId": "Jaim1Cu1Q55uooxSens6yk",
    "bankAccountNumber": "12-1234-1234567-123",
    "bankAccountName": "John Doe"
  }'
```

An example of a minimal POST to create a bank account and a direct debit authority.

By including directDebitAuthority, the user accepts our [Direct Debit terms][dd-terms]{:.external}
and has authority to operate this account.

```sh
curl -X POST "https://service.centrapay.com/api/bank-accounts" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{
    "accountId": "Jaim1Cu1Q55uooxSens6yk",
    "bankAccountNumber": "12-1234-1234567-123",
    "bankAccountName": "John Doe",
    "directDebitAuthority": {
      "phoneNumber": "+64212345678",
      "fullName": "John Doe",
      "emailAddress": "john.doe@gmail.com"
    }
  }'
```

**Required Fields**

|       Field       |  Type  |                    Description                    |
| :---------------- | :----- | :------------------------------------------------ |
| bankAccountNumber | String | The user's bank account number                    |
| bankAccountName   | String | The name on the bank account provided by the user |

**Optional Fields**

Note, fields which have a star (✩) create a direct-debit authority and are required for Top Up. All
fields below when specified are required together.

|    Field     |  Type   |              Description               |
| :----------- | :------ | :------------------------------------- |
| phoneNumber  | String  | ✩ The user's phone number.             |
| fullName     | String  | ✩ The first and last name of the user. |
| emailAddress | String  | ✩ The user's email address.            |


**Example response payload**

```json
{
  "id": "WRhAxxWpTKb5U7pXyxQjjY",
  "accountId": "Jaim1Cu1Q55uooxSens6yk",
  "bankAccountNumber": "12-1234-1234567-123",
  "bankAccountName": "John Doe",
  "directDebitAuthorized": true,
  "status": "created",
  "verified": false,
  "createdAt": "2020-06-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "modifiedAt": "2020-06-12T01:17:46.499Z",
  "modifiedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
}
```

**Error Responses**

| Status |                      Code                        |                                     Description                                         |
| :----- | :----------------------------------------------- | :-------------------------------------------------------------------------------------- |
| 403    | {% break _ BANK_ACCOUNT_LIMIT_EXCEEDED %}        | The Centrapay account already has the max amount of bank accounts.                      |
| 403    | {% break _ BANK_ACCOUNT_HOLDER_LIMIT_EXCEEDED %} | The global maximum bank accounts for the provided bank account number has been reached. |
| 403    | {% break _ DUPLICATE_BANK_ACCOUNT %}             | The Centrapay account already holds this bank account.                                  |

<span id="direct-debit-authority"></span>
## Adding a direct debit authority to a bank account

By using this endpoint, the user accepts our [Direct Debit terms][dd-terms]{:.external} and has
authority to operate this account.

{% endpoint POST https://service.centrapay.com/api/bank-accounts/${bankAccountId}/direct-debit-authorities %}

```sh
curl -X POST "https://service.centrapay.com/api/bank-accounts/WRhAxxWpTKb5U7pXyxQjjY/direct-debit-authorities" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{
    "phoneNumber": "+64212345678",
    "fullName": "John Doe",
    "emailAddress": "john@doe.org"
  }'
```

**Example response payload**

```json
{
  "id": "WRhAxxWpTKb5U7pXyxQjjY",
  "accountId": "Jaim1Cu1Q55uooxSens6yk",
  "bankAccountNumber": "12-1234-1234567-123",
  "bankAccountName": "John Doe",
  "directDebitAuthorized": true,
  "status": "created",
  "verified": false,
  "createdAt": "2020-06-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "modifiedAt": "2020-06-12T01:17:46.499Z",
  "modifiedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
}
```

**Required Fields**

Note, fields which have a star (✩) are required for Top Up. All fields below when specified are
required together.

|    Field     |  Type   |              Description               |
| :----------- | :------ | :------------------------------------- |
| phoneNumber  | String  | ✩ The user's phone number.             |
| fullName     | String  | ✩ The first and last name of the user. |
| emailAddress | String  | ✩ The user's email address.            |


**Error Responses**

| Status |                           Code                |                          Description                               |
| :----- | :-------------------------------------------- | :----------------------------------------------------------------- |
| 403    | {% break _ DIRECT_DEBIT_ALREADY_AUTHORIZED %} | This bank authority cannot be changed as all fields have been set. |

<span id="bank-authority-get"></span>
## Get information about a bank account

{% endpoint GET https://service.centrapay.com/api/bank-accounts/${id} %}

```sh
curl -X GET https://service.centrapay.com/api/bank-accounts/WRhAxxWpTKb5U7pXyxQjjY \
  -H "x-api-key: 1234"
```

<span id="verify-bank-account"></span>
## Verify a bank account

Verification codes show up on statements when a user makes withdrawals and deposits. To verify an
account, you need to direct the user to make a topup/withdrawal and then check their statement.

{% endpoint POST https://service.centrapay.com/api/bank-accounts/${bankAccountId}/verify %}

```sh
curl -X POST "https://service.centrapay.com/api/bank-accounts/WRhAxxWpTKb5U7pXyxQjjY/verify" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{ "verificationCode": "1111" }'
```

**Required Fields**

|      Field       |  Type  |              Description              |
| :--------------- | :----- | :------------------------------------ |
| verificationCode | String | The code on the user's bank statement |

**Example response payload**

```json
{
  "verificationCode": "1111"
}
```

**Error Responses**

| Status | Code                                                      | Description                                                                     |
| :----- | :-------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 403    | {% break _ BANK_ACCOUNT_ALREADY_VERIFIED %}               | The bank account is already verified.                                           |
| 403    | {% break _ BANK_ACCOUNT_VERIFICATION_ATTEMPTS_EXCEEDED %} | The bank account's maximum failed verification attempts has been reached.       |
| 403    | {% break _ ACCOUNT_MISMATCH %}                            | The top up / withdrawal and the bank account do not belong to the same account. |


## Verify a bank authority **DEPRECATED**

If you're creating new interfaces, please work with our [verify endpoint](#verify-bank-account)
for bank accounts.

Verification codes show up on statements when a user makes withdrawals and deposits. To verify an
account, you need to direct the user to make a topup/withdrawal and then check their statement.

{% endpoint POST https://service.centrapay.com/api/bank-authorities/${bankAccountId}/verify %}

```sh
curl -X POST "https://service.centrapay.com/api/bank-authorities/WRhAxxWpTKb5U7pXyxQjjY/verify" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{ "verificationCode": "1111" }'
```

**Required Fields**

|      Field       |  Type  |              Description              |
| :--------------- | :----- | :------------------------------------ |
| verificationCode | String | The code on the user's bank statement |

**Example response payload**

```json
{
  "verificationCode": "1111"
}
```

**Example response payload**

```json
{
  "id": "WRhAxxWpTKb5U7pXyxQjjY",
  "accountId": "Jaim1Cu1Q55uooxSens6yk",
  "bankAccountNumber": "12-1234-1234567-123",
  "bankAccountName": "John Doe",
  "status": "created",
  "directDebitAuthorized": true,
  "verified": false,
  "createdAt": "2020-06-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "modifiedAt": "2020-06-12T01:17:46.499Z",
  "modifiedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
}
```


<span id="bank-account-list"></span>
## List bank accounts

{% endpoint GET https://service.centrapay.com/api/accounts/${accountId}/bank-accounts %}

```sh
curl -X GET "https://service.centrapay.com/api/accounts/Jaim1Cu1Q55uooxSens6yk/bank-accounts" \
  -H "x-api-key: 1234"
```

**Example response payload**

```json
[
  {
    "id": "WRhAxxWpTKb5U7pXyxQjjY",
    "accountId": "Jaim1Cu1Q55uooxSens6yk",
    "bankAccountNumber": "12-1234-1234567-123",
    "bankAccountName": "John Doe",
    "status": "created",
    "verified": false,
    "directDebitAuthorized": true,
    "createdAt": "2020-06-12T01:17:46.499Z",
  },
  {
    "id": "b5URhAxxWpTKyxQjjY7pXW",
    "accountId": "Jaim1Cu1Q55uooxSens6yk",
    "bankAccountNumber": "12-1234-1234567-123",
    "bankAccountName": "Jane Doe",
    "status": "active",
    "verified": true,
    "directDebitAuthorized": true,
    "createdAt": "2020-06-12T01:17:46.499Z",
  }
]
```

## List bank authorities **DEPRECATED**

If you're creating new interfaces, please work with our [list endpoint](#bank-account-list)
for bank accounts.

{% endpoint GET https://service.centrapay.com/api/bank-authorities %}

```sh
curl -X GET "https://service.centrapay.com/api/bank-authorities" \
  -H "x-api-key: 1234"
```

**Example response payload**

```json
[
  {
    "id": "WRhAxxWpTKb5U7pXyxQjjY",
    "accountId": "Jaim1Cu1Q55uooxSens6yk",
    "bankAccountNumber": "12-1234-1234567-123",
    "bankAccountName": "John Doe",
    "status": "created",
    "verified": false,
    "directDebitAuthorized": true,
    "createdAt": "2020-06-12T01:17:46.499Z",
  },
  {
    "id": "b5URhAxxWpTKyxQjjY7pXW",
    "accountId": "Jaim1Cu1Q55uooxSens6yk",
    "bankAccountNumber": "12-1234-1234567-123",
    "bankAccountName": "Jane Doe",
    "status": "active",
    "verified": true,
    "directDebitAuthorized": true,
    "createdAt": "2020-06-12T01:17:46.499Z",
  }
]
```

## Creating a bank authority **DEPRECATED**

If you're creating new interfaces, please work with our [create endpoint](#bank-account-create)
for bank accounts.

Creating a bank authority both creates a new bank account and a direct debit
authority.

By using this endpoint, the user accepts our [Direct Debit terms][dd-terms]{:.external} and has
authority to operate this account.

{% endpoint POST https://service.centrapay.com/api/bank-authorities %}

```sh
curl -X POST "https://service.centrapay.com/api/bank-authorities" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{
    "fullName": "John Doe",
    "accountId": "Jaim1Cu1Q55uooxSens6yk",
    "phoneNumber": "+64212345678",
    "directDebitAuthorized": true,
    "emailAddress": "John.doe@email.com",
    "bankAccountNumber": "12-1234-1234567-123",
    "bankAccountName": "John Doe"
  }'
```

**Required Fields**

|       Field       |  Type  |                    Description                        |
| :---------------- | :----- | :---------------------------------------------------- |
| accountId         | String | The [account id]({% link accounts.md %}) of the user |
| fullName          | String | The first and last name of the user                   |
| phoneNumber       | String | The user's phone number                               |
| emailAddress      | String | The user's email address                              |
| bankAccountNumber | String | The user's bank account number                        |
| bankAccountName   | String | The name on the bank account provided by the user     |

**Example response payload**

```json
{
  "id": "WRhAxxWpTKb5U7pXyxQjjY",
  "accountId": "Jaim1Cu1Q55uooxSens6yk",
  "bankAccountNumber": "12-1234-1234567-123",
  "bankAccountName": "John Doe",
  "status": "created",
  "verified": false,
  "directDebitAuthorized": true,
  "createdAt": "2020-06-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "modifiedAt": "2020-06-12T01:17:46.499Z",
  "modifiedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
}
```

**Error Responses**

| Status |             Code                                         |                         Description                                                                     |
| :----- | :------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| 403    | {% break _ BANK_AUTHORITY_LIMIT_EXCEEDED %}              | The account already has the max amount of bank accounts.                                                |
| 403    | {% break _ BANK_AUTHORITIES_FOR_BANK_ACCOUNT_EXCEEDED %} | There are already two bank accounts for the provided bank account number, which is the maximum allowed. |

## Get information about a bank authority **DEPRECATED**

If you're creating new interfaces, please work with our [get endpoint](#bank-authority-get)
for bank accounts.

{% endpoint GET https://service.centrapay.com/api/bank-authorities/${id} %}

```sh
curl -X GET https://service.centrapay.com/api/bank-authorities/WRhAxxWpTKb5U7pXyxQjjY \
  -H "x-api-key: 1234"
```

**Example response payload**

```json
{
  "id": "WRhAxxWpTKb5U7pXyxQjjY",
  "accountId": "Jaim1Cu1Q55uooxSens6yk",
  "bankAccountNumber": "12-1234-1234567-123",
  "bankAccountName": "John Doe",
  "status": "created",
  "directDebitAuthorized": true,
  "verified": false,
  "createdAt": "2020-06-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "modifiedAt": "2020-06-12T01:17:46.499Z",
  "modifiedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
}
```

[dd-terms]: https://centrapay.com/directdebit-termsandconditions/
