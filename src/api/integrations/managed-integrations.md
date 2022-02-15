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

|   Field    |          Type          |                                                   Description                                                   |
| :--------- | :--------------------- | :-------------------------------------------------------------------------------------------------------------- |
| id         | String                 | The Managed Integration's unique identifier.                                                                    |
| type       | String                 | The type of Managed Integration. Supported types are `kete-enrolment`.                                          |
| active     | Boolean                | Flag indicating whether the Managed Integration is active.                                                      |
| status     | String                 | Current status of the Managed Integration. Supported values are `pending`, `active`, `inactive` and `archived`. |
| externalId | String                 | Field used to reference an id from an external system.                                                          |
| invitation | [Invitation Summary][] | A summary of the associated [Invitation][].                                                                     |
| params     | Object                 | [Params](#params) depending on the Managed Integration type.                                                    |
| createdAt  | {% dt Timestamp %}     | When the Managed Integration was created.                                                                       |
| createdBy  | {% dt CRN %}           | The User or API Key that created the Managed Integration.                                                       |
| updatedAt  | {% dt Timestamp %}     | When the Managed Integration was updated.                                                                       |
| updatedBy  | {% dt CRN %}           | The User or API Key that updated the Managed Integration.                                                       |

{% h4 Optional Fields %}

|       Field        |        Type        |                         Description                         |
| :----------------- | :----------------- | :---------------------------------------------------------- |
| claimedByAccountId | String             | Centrapay account id used to claim the Managed Integration. |
| claimedBy          | {% dt CRN %}       | The User or API Key that claimed the Managed Integration.   |
| claimedAt          | {% dt Timestamp %} | When the Managed Integration was claimed.                   |

<a name="invitation-summary">
### Invitation Summary **EXPERIMENTAL**

A summary of the [Invitation][] for a Managed Integration.

{% h4 Fields %}

|   Name    |        Type        |             Description             |
| --------- | ------------------ | ----------------------------------- |
| id        | String             | The Invitation's unique identifier. |
| code      | String             | The Invitation code.                |
| expiresAt | {% dt Timestamp %} | When the Invitation expires.        |

## Params

### kete-enrolment

{% h4 Mandatory Fields %}

|    Field     |  Type  |           Description           |
| :----------- | :----- | :------------------------------ |
| bankAccounts | Array  | A list of bank account numbers. |
| givenName    | String | First name.                     |
| familyName   | String | Last name.                      |
| email        | String | Email address.                  |
| phoneNumber  | String | The user's NZ phone number.     |

## Operations

### Create or Update a Managed Integration **EXPERIMENTAL**

{% reqspec %}
  POST '/api/managed-integrations/{type}/{externalId}'
  auth 'api-key'
  path_param 'type', 'kete-enrolment'
  path_param 'externalId', 'DKTs3U38hdhfEqwF1JKoT2'
  example {
    body ({
      active: 'true',
      params: {
        bankAccounts: ['06-0384-947723945-00'],
        givenName: 'John',
        familyName: 'Doe',
        email: 'john@doe.com',
        phoneNumber: '+642803809319'
      }
    })
  }
{% endreqspec %}

{% h4 Required Fields %}

| Field  |  Type   |                         Description                          |
| :----- | :------ | :----------------------------------------------------------- |
| active | Boolean | Flag indicating whether the Managed Integration is active.   |
| params | Object  | [Params](#params) depending on the Managed Integration type. |

{% h4 Example response payload %}

{% json %}
{
  "id": "5ee0c486308f590260d9a07f",
  "type": "kete-enrolment",
  "externalId": "DKTs3U38hdhfEqwF1JKoT2",
  "active": "true",
  "params": {
    "bankAccounts": ['06-0384-947723945-00'],
    "givenName": "John",
    "familyName": "Doe",
    "email": "john@doe.com",
    "phoneNumber": "+642803809319"
  },
  "invitation": {
    "id": "dadfaTs3U38hdhfEqwF1JKoT2",
    "url": "https://centrapay.com/kete-enrolment/DKTs3U38hdhfEqwF1JKoT2/5ee0c486308f590260d9a07f",
    "expiresAt": "2020-06-13T01:17:46.499Z",
  },
  "status": "active",
  "claimedByAccountId": "Jaim1Cu1Q55uooxSens6yk",
  "claimedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "claimedAt": "2020-06-12T01:17:46.499Z",
  "createdAt": "2020-06-11T01:17:46.499Z",
  "createdBy": "crn:BIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "updatedAt": "2020-06-12T01:17:46.499Z",
  "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
}
{% endjson %}

{% h4 Error Responses %}

| Status |             Code             |                           Description                            |
| :----- | :--------------------------- | :--------------------------------------------------------------- |
| 400    | {% break _ INVALID_PARAMS %} | Invalid [Params](#params) provided for Managed Integration type. |

[Invitation]: {% link api/invitations.md %}
[Invitation Summary]: #invitation-summary
[Integration]: {% link api/integrations/integrations.md %}
