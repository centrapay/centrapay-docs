---
layout:  default
grand_parent: API Reference
parent: Bank Accounts
title: Bank Account Approvals
permalink: /api/bank-account-approvals
---

# Bank Account Approvals
{:.no_toc}

A Bank Account Approval represents any added authorization on a [Bank Account][].
This may be an approval from Centrapay or a consent from a Centrapay [Account][] owner
that allows access to a third-party system. See [Bank Account Approval Types][].

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Bank Account Approval
{% h4 Fields %}

|       Field        |        Type        |                                                          Description                                                           |
| :----------------- | :----------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| id                 | String             | The Bank Account Approval's unique identifier.                                                                                 |
| bankAccountId      | String             | The id of the associated [Bank Account][].                                                                                     |
| accountId          | String             | The id of the owning Centrapay [Account][].                                                                                    |
| type               | String             | The type of Bank Account Approval. See [Bank Account Approval Types][].                                                        |
| status             | String             | The current status of the Bank Account Approval. Supported values are `created`, `pending`, `approved`, `declined` and `done`. |
| createdAt          | {% dt Timestamp %} | When the Bank Account Approval was created.                                                                                    |
| createdBy          | {% dt CRN %}       | The User or API Key that created the Bank Account Approval.                                                                    |
| modifiedAt         | {% dt Timestamp %} | When the Bank Account Approval was updated.                                                                                    |
| modifiedBy         | {% dt CRN %}       | The User or API Key that updated the Bank Account Approval.                                                                    |
| approvalActivities | Array              | An array of [Bank Account Approval Activity] associated with the Bank Account Approval.                                        |
| mediaUploadId      | String   {% opt %} | The id of the associated [Media Upload][]. Required for type `settlement`.                                                     |
| refreshToken       | String   {% opt %} | A long lived access token for access to a third-party system. Required for type `account-consent` and `payment-consent`.       |
| consentId          | String {% opt %}   | A unique identifier for an authorization in a third-party system.                                                              |

### Bank Account Approval Activity
{% h4 Fields %}

|     Field      |        Type        |                             Description                              |
| :------------- | :----------------- | :------------------------------------------------------------------- |
| activityNumber | Number             | Unique sequential Bank Account Approval Activity number.             |
| approvalId     | String             | The id of the associated [Bank Account Approval][].                  |
| activityType   | String             | The type of the Bank Account Approval Activity.                      |
| createdAt      | {% dt Timestamp %} | When the Bank Account Approval Activity was created.                 |
| createdBy      | {% dt CRN %}       | The User or API Key that created the Bank Account Approval Activity. |

### Bank Account Approval Types

|      Name       |                                                                                                                    description                                                                                                                    |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| settlement      | An `approved` Bank Account Approval of type `settlement` is required for the funds in a [Settlement Wallet][] to be released. A [Media Upload][] is uploaded by the user to provide evidence of ownership of the [Bank Account][] to be approved. |
| account-consent | An `approved` Bank Account Approval of type `account-consent` provides an access token to read account details from a third-party.                                                                                                                |
| payment-consent  | An `approved` Bank Account Approval of type `payment-consent` provides an access token for creating payments with a third-party.                                                                                                                   |

## Operations

### Request Bank Account Approval **EXPERIMENTAL**
{% reqspec %}
  POST '/api/bank-account-approvals'
  auth 'api-key'
  example {
    body ({
      mediaUploadId: 'uooxSens6ykJaim1Cu1Q55',
      bankAccountId: 'WRhAxxWpTKb5U7pXyxQjjY',
      type: 'settlement',
    })
  }
{% endreqspec %}

{% h4 Required Fields %}

|     Field     |  Type  |                                               Description                                                |
| :------------ | :----- | :------------------------------------------------------------------------------------------------------- |
| mediaUploadId | String | The id of the associated [Media Upload][].                                                               |
| bankAccountId | String | The id of the associated [Bank Account][].                                                               |
| type          | String | The [Bank Account Approval Type][]. A Bank Account Approval can only be requested for type `settlement`. |

{% h4 Example response payload %}

{% json %}
id: DcTs3U38HdhfEqwF1GKoT3
mediaUploadId: uooxSens6ykJaim1Cu1Q55
bankAccountId: WRhAxxWpTKb5U7pXyxQjjY
accountId: Jaim1Cu1Q55uooxSens6yk
type: settlement
status: created
createdAt: "2021-11-08T21:52:39.915Z"
createdBy: "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
modifiedAt: "2021-11-08T21:52:39.915Z"
modifiedBy: "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
{% endjson %}

{% h4 Error Responses %}

| Status |             Code             |                                         Description                                          |
| :----- | :--------------------------- | :------------------------------------------------------------------------------------------- |
| 403    | APPROVAL_ALREADY_IN_PROGRESS | There is already a Bank Account Approval in progress that is awaiting review from Centrapay. |

### Get Bank Account Approval **EXPERIMENTAL**
{% reqspec %}
  GET '/api/bank-account-approvals/{bankAccountApprovalId}'
  auth 'api-key'
  path_param 'bankAccountApprovalId', 'bbab9a768921019cb856'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
id: bbab9a768921019cb856
bankAccountId: WRhAxxWpTKb5U7pXyxQjjY
accountId: Jaim1Cu1Q55uooxSens6yk
type: account-consent
status: approved
createdAt: "2021-11-08T21:52:39.915Z"
createdBy: "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
modifiedAt: "2021-11-08T21:52:39.915Z"
modifiedBy: "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
refreshToken: "y04Njk3LTRjNmZkYjBhMzRiZSIsIm5vbmNlIjoiOTg3MTJjMGNkZmFiNWZjNzMwM2MxMzNl"
consentId: "d24dbe-e2bc46ac-d924e38af112"
{% endjson %}

### Accept a Bank Account Approval **EXPERIMENTAL**
{% reqspec %}
  POST '/api/bank-account-approvals/{bankAccountApprovalId}/accept'
  auth 'api-key'
  path_param 'bankAccountApprovalId', 'DcTs3U38HdhfEqwF1GKoT3'
  example {
    body ({
      reason: 'All details match',
    })
  }
{% endreqspec %}

{% h4 Optional Fields %}

| Field  |  Type  |                     Description                     |
| :----- | :----- | :-------------------------------------------------- |
| reason | String | The reason for accepting the Bank Account Approval. |

{% h4 Example response payload %}

{% json %}
{}
{% endjson %}

{% h4 Error Responses %}

| Status |           Code            |                           Description                            |
| :----- | :------------------------ | :--------------------------------------------------------------- |
| 403    | APPROVAL_ALREADY_REVIEWED | The Bank Account Approval has already been accepted or declined. |

### Decline a Bank Account Approval **EXPERIMENTAL**
{% reqspec %}
  POST '/api/bank-account-approvals/{bankAccountApprovalId}/decline'
  auth 'api-key'
  path_param 'bankAccountApprovalId', 'DcTs3U38HdhfEqwF1GKoT3'
  example {
    body ({
      reason: 'All details match',
    })
  }
{% endreqspec %}

{% h4 Required Fields %}

| Field  |  Type  |                     Description                     |
| :----- | :----- | :-------------------------------------------------- |
| reason | String | The reason for declining the Bank Account Approval. |

{% h4 Example response payload %}

{% json %}
{}
{% endjson %}

{% h4 Error Responses %}

| Status |           Code            |                           Description                            |
| :----- | :------------------------ | :--------------------------------------------------------------- |
| 403    | APPROVAL_ALREADY_REVIEWED | The Bank Account Approval has already been accepted or declined. |

### List Bank Account Approvals **EXPERIMENTAL**
{% reqspec %}
  GET '/api/bank-accounts/{bankAccountId}/approvals'
  auth 'api-key'
  path_param 'bankAccountId', '5vpkxjn6z787LiAKCqwuf9'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
"items": [
  {
    "id": "PJ6jTgDNv1xfFAooCoWZLe",
    "bankAccountId": "5vpkxjn6z787LiAKCqwuf9",
    "createdAt": "2022-08-21T21:41:46.361Z",
    "modifiedAt": "2022-08-21T21:41:46.361Z",
    "accountId": "TEZiZWAtX6v1hJucU4fGKx",
    "createdBy": "crn::user:7c0a034a-c36e-4645-b12b-57dec339ab47",
    "modifiedBy": "crn::user:7c0a034a-c36e-4645-b12b-57dec339ab47",
    "type": "account-consent",
    "status": "approved",
    "refreshToken": "tXC4dFm3yNAQbLrm4JxY6pynGoEG8vSJ",
    "consentId": "fFAoo-CoWZLea8-4dFm3yNAoWZLe"
  },
  {
    "id": "WiFna4hCc7k4KYUxncFPg4",
    "bankAccountId": "5vpkxjn6z787LiAKCqwuf9",
    "createdAt": "2022-08-11T20:53:57.337Z",
    "modifiedAt": "2022-08-11T20:53:57.337Z",
    "accountId": "TEZiZWAtX6v1hJucU4fGKx",
    "createdBy": "crn::user:7c0a034a-c36e-4645-b12b-57dec339ab47",
    "modifiedBy": "crn::user:7c0a034a-c36e-4645-b12b-57dec339ab47",
    "type": "payment-consent",
    "status": "approved",
    "refreshToken": "dAGLl8AfnNCGEKEmBm1FryaDyW1JBh28",
    "consentId": "4KYUx-ncFPg4a8-Ll8AfnNCcFPg4"
  },
  {
    "id": "SoQkkv4rWRwrknrdkYbBuB",
    "bankAccountId": "5vpkxjn6z787LiAKCqwuf9",
    "createdAt": "2022-08-21T21:41:22.345Z",
    "modifiedAt": "2022-08-21T21:41:22.345Z",
    "accountId": "TEZiZWAtX6v1hJucU4fGKx",
    "createdBy": "crn::user:7c0a034a-c36e-4645-b12b-57dec339ab47",
    "modifiedBy": "crn::user:7c0a034a-c36e-4645-b12b-57dec339ab47",
    "type": "account-consent",
    "status": "declined",
    "refreshToken": "rX3MNTxFwKIU2lhyZOrq87Aw74ASSHUM",
    "consentId": "rknrd-kYbBuBa8-MNTxFwKIYbBuB"
  }
]
{% endjson %}

[Account]: {% link api/accounts/accounts.md %}
[Bank Account]: {% link api/bank-accounts/bank-accounts.md %}
[Settlement Wallet]: {% link api/assets/wallets.md %}#settlement-wallets
[Media Upload]: {% link api/media-uploads.md %}
[Bank Account Approval]: {% link api/bank-accounts/bank-account-approvals.md %}
[Bank Account Approval Activity]: {% link api/bank-accounts/bank-account-approvals.md %}#bank-account-approval-activity
[Bank Account Approval Type]: {% link api/bank-accounts/bank-account-approvals.md %}#bank-account-approval-types
[Bank Account Approval Types]: {% link api/bank-accounts/bank-account-approvals.md %}#bank-account-approval-types
