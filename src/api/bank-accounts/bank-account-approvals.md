---
layout:  default
grand_parent: API Reference
parent: Bank Accounts
title: Bank Account Approvals
permalink: /api/bank-account-approvals
---

# Bank Account Approvals
{:.no_toc}

An `approved` Bank Account Approval is required for the funds in a [Settlement Wallet][] to be released. A [Media Upload][] is uploaded by the user to provide evidence of ownership of the [Bank Account][] to be approved.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Bank Account Approval
{% h4 Mandatory Fields %}

|     Field     |        Type        |                                                      Description                                                       |
| :------------ | :----------------- | :--------------------------------------------------------------------------------------------------------------------- |
| id            | String             | The Bank Account Approval's unique identifier.                                                                         |
| bankAccountId | String             | The id of the associated [Bank Account][].                                                                             |
| mediaUploadId | String             | The id of the associated [Media Upload][].                                                                             |
| accountId     | String             | The id of the owning Centrapay [Account][].                                                                            |
| type          | String             | The type of Bank Account Approval.                                                                                     |
| status        | String             | The current status of the Bank Account Approval. Supported values are `created`, `pending`, `approved` and `declined`. |
| createdAt     | {% dt Timestamp %} | When the Bank Account Approval was created.                                                                            |
| createdBy     | {% dt CRN %}       | The User or API Key that created the Bank Account Approval.                                                            |
| modifiedAt    | {% dt Timestamp %} | When the Bank Account Approval was updated.                                                                            |
| modifiedBy    | {% dt CRN %}       | The User or API Key that updated the Bank Account Approval.                                                            |

### Bank Account Approval Activity
{% h4 Mandatory Fields %}

|     Field      |        Type        |                             Description                              |
| :------------- | :----------------- | :------------------------------------------------------------------- |
| activityNumber | Number             | Unique sequential Bank Account Approval Activity number.             |
| approvalId     | String             | The id of the associated [Bank Account Approval][].                  |
| activityType   | String             | The type of the Bank Account Approval Activity.                      |
| createdAt      | {% dt Timestamp %} | When the Bank Account Approval Activity was created.                 |
| createdBy      | {% dt CRN %}       | The User or API Key that created the Bank Account Approval Activity. |

## Operations

### Request Bank Account Approval **EXPERIMENTAL**
{% reqspec %}
  POST '/api/bank-account-approvals'
  auth 'api-key'
  example {
    body ({
      mediaUploadId: 'uooxSens6ykJaim1Cu1Q55',
      bankAccountId: 'WRhAxxWpTKb5U7pXyxQjjY',
    })
  }
{% endreqspec %}

{% h4 Required Fields %}

|     Field     |  Type  |                Description                 |
| :------------ | :----- | :----------------------------------------- |
| mediaUploadId | String | The id of the associated [Media Upload][]. |
| bankAccountId | String | The id of the associated [Bank Account][]. |

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

### Get Bank Account Approval by id **EXPERIMENTAL**
{% reqspec %}
  POST '/api/bank-account-approvals/{bankAccountApprovalId}'
  auth 'api-key'
  path_param 'bankAccountApprovalId', 'DcTs3U38HdhfEqwF1GKoT3'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
id: DcTs3U38HdhfEqwF1GKoT3
mediaUploadId: uooxSens6ykJaim1Cu1Q55
bankAccountId: WRhAxxWpTKb5U7pXyxQjjY
accountId: Jaim1Cu1Q55uooxSens6yk
type: settlement
status: pending
createdAt: "2021-11-08T21:52:39.915Z"
createdBy: "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
modifiedAt: "2021-11-08T21:52:39.915Z"
modifiedBy: "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
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

[Account]: {% link api/accounts/accounts.md %}
[Bank Account]: {% link api/bank-accounts/bank-accounts.md %}
[Settlement Wallet]: {% link api/assets/wallets.md %}#settlement-wallets
[Media Upload]: {% link api/media-uploads.md %}
[Bank Account Approval]: {% link api/bank-accounts/bank-account-approvals.md %}
