---
layout:  default
grand_parent: API Reference
parent: Integrations
title: Managed Integrations
permalink: /api/managed-integrations
---

# Managed Integration
{:.no_toc}

A Managed Integration is an [Integration][]  which a third party can control.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Managed Integration

{% h4 Mandatory Fields %}

|   Field    |        Type        |                                                                Description                                                                 |
| :--------- | :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| id         | String             | The Managed Integration's unique identifier.                                                                                               |
| type       | String             | The type of Managed Integration. Supported types are `kete-enrolment`, `paypal-referral`.                                                  |
| enabled    | Boolean            | Flag indicating whether the Managed Integration should become active or inactive.                                                          |
| status     | String             | Current status of the Managed Integration. Supported values are `created`, `pending`, `provisioning`, `active`, `inactive` and `archived`. |
| externalId | String             | Field used to reference an id from an external system.                                                                                     |
| params     | Object             | [Params](#params) depending on the Managed Integration type.                                                                               |
| createdAt  | {% dt Timestamp %} | When the Managed Integration was created.                                                                                                  |
| createdBy  | {% dt CRN %}       | The User or API Key that created the Managed Integration.                                                                                  |
| updatedAt  | {% dt Timestamp %} | When the Managed Integration was updated.                                                                                                  |
| updatedBy  | {% dt CRN %}       | The User or API Key that updated the Managed Integration.                                                                                  |

{% h4 Optional Fields %}

|       Field        |          Type          |                            Description                            |
| :----------------- | :--------------------- | :---------------------------------------------------------------- |
| claimedByAccountId | String                 | Centrapay account id used to claim the Managed Integration.       |
| claimedBy          | {% dt CRN %}           | The User or API Key that claimed the Managed Integration.         |
| claimedAt          | {% dt Timestamp %}     | When the Managed Integration was claimed.                         |
| invitation         | [Invitation Summary][] | A summary of the associated [Invitation][].                       |
| inProgress         | Boolean                | Flag indicating whether a status transition is in progress.       |
| test               | Boolean                | A flag which is present if the Managed Integration is for testing |

<a name="invitation-summary">
### Invitation Summary **EXPERIMENTAL**

A summary of the [Invitation][] for a Managed Integration.

{% h4 Fields %}

|   Name    |        Type        |             Description             |
| --------- | ------------------ | ----------------------------------- |
| id        | String             | The Invitation's unique identifier. |
| code      | String             | The Invitation code.                |
| expiresAt | {% dt Timestamp %} | When the Invitation expires.        |

### Bank Account
{% h4 Mandatory Fields %}

| Field  |  Type  |       Description       |
| :----- | :----- | :---------------------- |
| number | String | The bank account number |

## Params

### kete-enrolment

{% h4 Mandatory Fields %}

|    Field     |  Type  |                   Description                    |
| :----------- | :----- | :----------------------------------------------- |
| bankAccounts | Array  | A list of [Bank Account](#bank-account) objects. |
| givenName    | String | First name.                                      |
| familyName   | String | Last name.                                       |
| email        | String | Email address.                                   |
| phoneNumber  | String | The user's NZ phone number.                      |

### paypal-referral

{% h4 Mandatory Fields %}

|        Field        |  Type  |                       Description                        |
| :------------------ | :----- | :------------------------------------------------------- |
| centrapayMerchantId | String | The ID of the Centrapay merchant that will be onboarded. |

## Operations

### Create or Update a Managed Integration **EXPERIMENTAL**

{% reqspec %}
  PUT '/api/managed-integrations/{type}/{externalId}'
  auth 'api-key'
  path_param 'type', 'kete-enrolment'
  path_param 'externalId', 'DKTs3U38hdhfEqwF1JKoT2'
  example {
    body ({
      enabled: true,
      params: {
        bankAccounts: [
          { number: '00-1111-2222222-00' },
        ],
        givenName: 'John',
        familyName: 'Doe',
        email: 'john@doe.com',
        phoneNumber: '+64270000000'
      }
    })
  }
{% endreqspec %}

{% h4 Required Fields %}

|       Field        |  Type   |                                    Description                                    |
| :----------------- | :------ | :-------------------------------------------------------------------------------- |
| enabled            | Boolean | Flag indicating whether the Managed Integration should become active or inactive. |
| params             | Object  | [Params](#params) depending on the Managed Integration type.                      |

{% h4 Optional Fields %}

| Field |  Type   |                                                    Description                                                     |
| :---- | :------ | :----------------------------------------------------------------------------------------------------------------- |
| test  | Boolean | Flag indicating the Managed Integration is for testing, this cannot be changed once the resource has been created. |

{% h4 Example response payload %}

{% json %}
{
  "id": "5ee0c486308f590260d9a07f",
  "type": "kete-enrolment",
  "externalId": "DKTs3U38hdhfEqwF1JKoT2",
  "enabled": true,
  "params": {
    "bankAccounts": [
      { "number": "00-1111-2222222-00" },
    ],
    "givenName": "John",
    "familyName": "Doe",
    "email": "john@doe.com",
    "phoneNumber": "+64270000000"
  },
  "invitation": {
    "id": "dadfaTs3U38hdhfEqwF1JKoT2",
    "code": "eg44tetbfsJHFJHFsfhbgds23",
    "expiresAt": "2020-06-13T01:17:46.499Z",
  },
  "status": "provisioning",
  "claimedByAccountId": "Jaim1Cu1Q55uooxSens6yk",
  "claimedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "claimedAt": "2020-06-12T01:17:46.499Z",
  "inProgress": true,
  "createdAt": "2020-06-11T01:17:46.499Z",
  "createdBy": "crn:BIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "updatedAt": "2020-06-12T01:17:46.499Z",
  "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
}
{% endjson %}

{% h4 Error Responses %}

| Status |                   Code                   |                                                 Description                                                 |
| :----- | :--------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| 400    | {% break _ INVALID_PARAMS %}             | Invalid [Params](#params) provided for Managed Integration type.                                            |
| 403    | {% break _ MERCHANT_LIVENESS_MISMATCH %} | The `test` flag on the merchant doesn't match the `test` flag on the `paypal-referral` managed integration. |

### Get a Managed Integration **EXPERIMENTAL**

{% reqspec %}
  GET '/api/managed-integrations/{id}'
  auth 'api-key'
  path_param 'id', 'dh375hdh08f590260d9a07f'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "id": "dh375hdh08f590260d9a07f",
  "type": "kete-enrolment",
  "externalId": "DKTs3U38hdhfEqwF1JKoT2",
  "enabled": true,
  "params": {
    "bankAccounts": [
      { "number": '00-1111-2222222-00' }
    ],
    "givenName": "John",
    "familyName": "Doe",
    "email": "john@doe.com",
    "phoneNumber": "+64270000000"
  },
  "invitation": {
    "id": "dadfaTs3U38hdhfEqwF1JKoT2",
    "code": "eg44tetbfsJHFJHFsfhbgds23",
    "expiresAt": "2020-06-13T01:17:46.499Z",
  },
  "status": "pending",
  "inProgress": true,
  "createdAt": "2020-06-11T01:17:46.499Z",
  "createdBy": "crn:BIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "updatedAt": "2020-06-12T01:17:46.499Z",
  "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
}
{% endjson %}


[Invitation]: {% link api/invitations.md %}
[Invitation Summary]: #invitation-summary
[Integration]: {% link api/integrations/integrations.md %}
