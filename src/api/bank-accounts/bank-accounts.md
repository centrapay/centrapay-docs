---
layout:  default
grand_parent: API Reference
parent: Bank Accounts
title: Bank Accounts
nav_order: 1
permalink: /api/bank-accounts
redirect_from:
  - /fiat
  - /fiat/bank-accounts
  - /fiat/bank-authorities
  - /fiat/authorities
---

# Bank Accounts
{:.no_toc}

Bank Accounts are used to get money in and out of a Centrapay Account. Money is
moved by creating "Top Up" or "Withdrawal" [Funds Transfers][].

Bank Accounts must be "direct debit authorized" before they can be used for a
Top Up and they must be "verified" before top up funds are released. Bank
Accounts do not require "direct debit authorization" or "verification" in order
to perform a Withdrawal. A 4-digit code from any recent Centrapay-initiated
bank transaction can be used to verify a bank account.


## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Bank Account
{% h4 Mandatory Fields %}

|         Field         |        Type        |                                                        Description                                                         |
| :-------------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------- |
| id                    | String             | The Bank Account's unique identifier.                                                                                      |
| bankAccountNumber     | String             | The user's Bank Account number.                                                                                            |
| bankAccountName       | String             | The name on the Bank Account provided by the user.                                                                         |
| accountId             | String             | The id of the owning Centrapay [Account][].                                                                                |
| status                | String             | The current status of the Bank Account.                                                                                    |
| verified              | Boolean            | Flag indicating the Bank Account is verified, allowing it to be used to Top Up.                                            |
| type                  | String             | The [Bank Account Type][] of the bank, defaults to `centrapay`.                                                            |
| directDebitAuthorized | Boolean            | Flag indicating the user accepts our [Direct Debit terms][dd-terms]{:.external} and has authority to operate this account. |
| approvals             | Array              | A list of [Bank Account Approval Type Summaries][].                                                                        |
| createdAt             | {% dt Timestamp %} | When the Bank Account was created.                                                                                         |
| createdBy             | {% dt CRN %}       | The User or API Key that created the Bank Account.                                                                         |
| modifiedAt            | {% dt Timestamp %} | When the Bank Account was updated.                                                                                         |
| modifiedBy            | {% dt CRN %}       | The User or API Key that updated the Bank Account.                                                                         |

{% h4 Optional Fields %}

|    Field     |  Type   |                         Description                         |
| :----------- | :------ | :---------------------------------------------------------- |
| phoneNumber  | String  | The user's phone number.                                    |
| fullName     | String  | The first and last name of the user.                        |
| emailAddress | String  | The user's email address.                                   |
| test         | Boolean | A flag which is present if the Bank Account is for testing. |

<a name="bank-account-approval-type-summary">
### Bank Account Approval Type Summary **EXPERIMENTAL**

A summary of the [Bank Account Approvals][] for a Bank Account.
There is one object per type of Bank Account Approval, which provides a summary of the approval status.

{% h4 Fields %}

|   Name    |        Type        |                                                   Description                                                   |
| --------- | ------------------ | --------------------------------------------------------------------------------------------------------------- |
| type      | String             | The type of Bank Account Approval summary.                                                                      |
| status    | String             | The summarized status of the Bank Account Approvals. Supported values are `pending`, `approved` and `declined`. |
| updatedAt | {% dt Timestamp %} | When the Bank Account Approval summary was updated.                                                             |

<a name="bank-account-type">
### Bank Account Type **EXPERIMENTAL**

Types of bank accounts to allow access to different [Asset Types][].

|   type    |                          description                           |
| --------- | -------------------------------------------------------------- |
| centrapay | Allows topup and withdrawal of the `centrapay.nzd` asset type. |
| kete      | Allows topup and withdrawal of the `kete.nzd` asset type.      |
| quartz    | Allows usage of the `quartz.nzd` asset type.                   |

## Operations

<span id="bank-account-create"></span>
### Creating a Bank Account

A Bank Account can be created with or without direct debit authorized.  By including
`directDebitAuthority`, the user accepts our [Direct Debit terms][dd-terms]{:.external}
and has authority to operate this account.

{% reqspec %}
  POST '/api/bank-accounts'
  auth 'api-key'
  example {
    title 'Create without direct debit authorized'
    body ({
      accountId: 'Jaim1Cu1Q55uooxSens6yk',
      bankAccountNumber: '12-1234-1234567-123',
      bankAccountName: 'John Doe',
    })
  }
  example {
    title 'Create with direct debit authorized'
    body ({
      accountId: 'Jaim1Cu1Q55uooxSens6yk',
      bankAccountNumber: '12-1234-1234567-123',
      bankAccountName: 'John Doe',
      directDebitAuthority: {
        phoneNumber: '+64212345678',
        fullName: 'John Doe',
        emailAddress: 'john.doe@gmail.com',
      }
    })
  }
{% endreqspec %}

{% h4 Required Fields %}

|       Field       |  Type  |                    Description                     |
| :---------------- | :----- | :------------------------------------------------- |
| accountId         | String | The id of the owning Centrapay [Account][].        |
| bankAccountNumber | String | The user's Bank Account number.                    |
| bankAccountName   | String | The name on the Bank Account provided by the user. |

{% h4 Optional Fields %}

Note, fields which have a star (✩) create a direct-debit authority and are required for Top Up. All
fields below when specified are required together.

|    Field     |  Type   |                         Description                         |
| :----------- | :------ | :---------------------------------------------------------- |
| phoneNumber  | String  | ✩ The user's phone number.                                  |
| fullName     | String  | ✩ The first and last name of the user.                      |
| emailAddress | String  | ✩ The user's email address.                                 |
| type         | String  | The [Bank Account Type][] to be created.                    |
| test         | Boolean | A flag which is present if the Bank Account is for testing. |


{% h4 Example response payload %}

{% json %}
{
  "id": "WRhAxxWpTKb5U7pXyxQjjY",
  "accountId": "Jaim1Cu1Q55uooxSens6yk",
  "bankAccountNumber": "12-1234-1234567-123",
  "bankAccountName": "John Doe",
  "directDebitAuthorized": true,
  "status": "created",
  "verified": false,
  "type": "centrapay",
  "createdAt": "2020-06-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "modifiedAt": "2020-06-12T01:17:46.499Z",
  "modifiedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "approvals": []
}
{% endjson %}

{% h4 Error Responses %}

| Status |                      Code                        |                                     Description                                         |
| :----- | :----------------------------------------------- | :-------------------------------------------------------------------------------------- |
| 403    | {% break _ BANK_ACCOUNT_LIMIT_EXCEEDED %}        | The Centrapay account already has the max amount of Bank Accounts.                      |
| 403    | {% break _ BANK_ACCOUNT_HOLDER_LIMIT_EXCEEDED %} | The global maximum Bank Accounts for the provided Bank Account number has been reached. |
| 403    | {% break _ DUPLICATE_BANK_ACCOUNT %}             | The Centrapay account already holds this Bank Account.                                  |

<span id="direct-debit-authority"></span>
### Adding a direct debit authority to a Bank Account

By using this endpoint, the user accepts our [Direct Debit terms][dd-terms]{:.external} and has
authority to operate this account.

{% reqspec %}
  POST '/api/bank-accounts/{bankAccountId}/direct-debit-authorities'
  path_param 'bankAccountId', 'WRhAxxWpTKb5U7pXyxQjjY'
  auth 'api-key'
  body ({
    phoneNumber: '+64212345678',
    fullName: 'John Doe',
    emailAddress: 'john@doe.org',
  })
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "id": "WRhAxxWpTKb5U7pXyxQjjY",
  "accountId": "Jaim1Cu1Q55uooxSens6yk",
  "bankAccountNumber": "12-1234-1234567-123",
  "bankAccountName": "John Doe",
  "directDebitAuthorized": true,
  "status": "created",
  "verified": false,
  "type": "centrapay",
  "createdAt": "2020-06-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "modifiedAt": "2020-06-12T01:17:46.499Z",
  "modifiedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "approvals": []
}
{% endjson %}

{% h4 Required Fields %}

Note, fields which have a star (✩) are required for Top Up. All fields below when specified are
required together.

|    Field     |  Type   |              Description               |
| :----------- | :------ | :------------------------------------- |
| phoneNumber  | String  | ✩ The user's phone number.             |
| fullName     | String  | ✩ The first and last name of the user. |
| emailAddress | String  | ✩ The user's email address.            |


{% h4 Error Responses %}

| Status |                           Code                |                          Description                               |
| :----- | :-------------------------------------------- | :----------------------------------------------------------------- |
| 403    | {% break _ DIRECT_DEBIT_ALREADY_AUTHORIZED %} | This bank authority cannot be changed as all fields have been set. |

<span id="bank-authority-get"></span>
### Get information about a Bank Account

{% reqspec %}
  GET '/api/bank-accounts/{bankAccountId}'
  auth 'api-key'
  path_param 'bankAccountId', 'WRhAxxWpTKb5U7pXyxQjjY'
{% endreqspec %}

<span id="verify-bank-account"></span>
### Verify a Bank Account

Verification codes show up on statements when a user makes withdrawals and deposits. To verify an
account, you need to direct the user to make a Top Up or Withdrawal and then check their statement.

{% reqspec %}
  POST '/api/bank-accounts/{bankAccountId}/verify'
  auth 'api-key'
  path_param 'bankAccountId', 'WRhAxxWpTKb5U7pXyxQjjY'
  body ({ verificationCode: '1111' })
{% endreqspec %}

{% h4 Required Fields %}

|      Field       |  Type  |              Description               |
| :--------------- | :----- | :------------------------------------  |
| verificationCode | String | The code on the user's bank statement. |

{% h4 Example response payload %}

{% json %}
{
  "verificationCode": "1111"
}
{% endjson %}

{% h4 Error Responses %}

| Status | Code                                                      | Description                                                                     |
| :----- | :-------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 403    | {% break _ BANK_ACCOUNT_ALREADY_VERIFIED %}               | The bank account is already verified.                                           |
| 403    | {% break _ VERIFICATION_CODE_INVALID %}                   | The verification code is incorrect.                                             |
| 403    | {% break _ BANK_ACCOUNT_VERIFICATION_ATTEMPTS_EXCEEDED %} | The bank account's maximum failed verification attempts has been reached.       |
| 403    | {% break _ ACCOUNT_MISMATCH %}                            | The top up / withdrawal and the bank account do not belong to the same account. |


### Verify a Bank Authority **DEPRECATED**

If you're creating new interfaces, please work with our [verify endpoint](#verify-bank-account)
for Bank Accounts.

{% reqspec %}
  POST '/api/bank-authorities/{bankAccountId}/verify'
  auth 'api-key'
  path_param 'bankAccountId', 'WRhAxxWpTKb5U7pXyxQjjY'
  body ({ verificationCode: '1111' })
{% endreqspec %}

{% h4 Required Fields %}

|      Field       |  Type  |              Description              |
| :--------------- | :----- | :------------------------------------ |
| verificationCode | String | The code on the user's bank statement |

{% h4 Example response payload %}

{% json %}
{
  "verificationCode": "1111"
}
{% endjson %}

{% h4 Example response payload %}

{% json %}
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
  "approvals": []
}
{% endjson %}


<span id="bank-account-list"></span>
### List Bank Accounts

{% reqspec %}
  GET '/api/accounts/{accountId}/bank-accounts'
  auth 'api-key'
  path_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
[
  {
    "id": "WRhAxxWpTKb5U7pXyxQjjY",
    "accountId": "Jaim1Cu1Q55uooxSens6yk",
    "bankAccountNumber": "12-1234-1234567-123",
    "bankAccountName": "John Doe",
    "status": "created",
    "verified": false,
    "type": "centrapay",
    "directDebitAuthorized": true,
    "createdAt": "2020-06-12T01:17:46.499Z",
    "approvals": []
  },
  {
    "id": "b5URhAxxWpTKyxQjjY7pXW",
    "accountId": "Jaim1Cu1Q55uooxSens6yk",
    "bankAccountNumber": "12-1234-1234567-123",
    "bankAccountName": "Jane Doe",
    "status": "active",
    "verified": true,
    "type": "centrapay",
    "directDebitAuthorized": true,
    "createdAt": "2020-06-12T01:17:46.499Z",
    "approvals": [
      {
        "type": "settlement",
        "status": "pending",
        "updatedAt": "2021-11-08T21:52:39.915Z"
      }
    ]
  }
]
{% endjson %}

### List Bank Authorities **DEPRECATED**

If you're creating new interfaces, please work with our [list endpoint](#bank-account-list)
for Bank Accounts.

{% reqspec %}
  GET '/api/bank-authorities'
  auth 'api-key'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
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
    "approvals": []
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
    "approvals": [
      {
        "type": "settlement",
        "status": "pending",
        "updatedAt": "2021-11-08T21:52:39.915Z"
      }
    ]
  }
]
{% endjson %}

### Creating a Bank Authority **DEPRECATED**

If you're creating new interfaces, please work with our [create endpoint](#bank-account-create)
for Bank Accounts.

Creating a Bank Authority both creates a new Bank Account and a direct debit
authority.

By using this endpoint, the user accepts our [Direct Debit terms][dd-terms]{:.external} and has
authority to operate this account.

{% reqspec %}
  POST '/api/bank-authorities'
  auth 'api-key'
  body ({
    fullName: 'John Doe',
    accountId: 'Jaim1Cu1Q55uooxSens6yk',
    phoneNumber: '+64212345',
    directDebitAuthorized: true,
    emailAddress: 'John.doe@email.com',
    bankAccountNumber: '12-1234-1234567-123',
    bankAccountName: 'John Doe'
  })
{% endreqspec %}

{% h4 Required Fields %}

|       Field       |  Type  |                    Description                        |
| :---------------- | :----- | :---------------------------------------------------- |
| accountId         | String | The id of the owning Centrapay [Account][]. |
| fullName          | String | The first and last name of the user                   |
| phoneNumber       | String | The user's phone number                               |
| emailAddress      | String | The user's email address                              |
| bankAccountNumber | String | The user's bank account number                        |
| bankAccountName   | String | The name on the bank account provided by the user     |

{% h4 Example response payload %}

{% json %}
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
  "approvals": []
}
{% endjson %}

{% h4 Error Responses %}

| Status |             Code                                         |                         Description                                                                     |
| :----- | :------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| 403    | {% break _ BANK_AUTHORITY_LIMIT_EXCEEDED %}              | The account already has the max amount of bank accounts.                                                |
| 403    | {% break _ BANK_AUTHORITIES_FOR_BANK_ACCOUNT_EXCEEDED %} | There are already two bank accounts for the provided bank account number, which is the maximum allowed. |

### Get information about a Bank Authority **DEPRECATED**

If you're creating new interfaces, please work with our [get endpoint](#bank-authority-get)
for Bank Accounts.

{% reqspec %}
  GET '/api/bank-authorities/{bankAccountId}'
  auth 'api-key'
  path_param 'bankAccountId', 'WRhAxxWpTKb5U7pXyxQjjY'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
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
  "approvals": []
}
{% endjson %}

[dd-terms]: https://centrapay.com/directdebit-termsandconditions/
[Funds Transfers]: {% link api/bank-accounts/funds-transfers.md %}
[Account]: {% link api/accounts/accounts.md %}
[Bank Account Approvals]: {% link api/bank-accounts/bank-account-approvals.md %}
[Bank Account Type]: {% link api/bank-accounts/bank-accounts.md %}#bank-account-type
[Bank Account Approval Type Summaries]: {% link api/bank-accounts/bank-accounts.md %}#bank-account-approval-type-summary
[Asset Types]: {% link api/assets/asset-types.md %}#supported-asset-types