---
layout: default
parent: API Reference
title: Invitations
---

# Invitations
An Invitation can be used to allow users to claim ownership of a resource on the Centrapay platform.

{:.no_toc}

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Invitation

{% h4 Mandatory Fields %}

|    Field     |        Type        |                               Description                                |
| :----------- | :----------------- | :----------------------------------------------------------------------- |
| id           | String             | The Invitation's unique identifier.                                      |
| code         | String             | The Invitation code.                                                     |
| type         | String             | The type of the related resource. Supported values are `kete-enrolment`. |
| resourceId   | String             | The id of the related resource.                                          |
| resourceType | String             | The type of the related resource. Supported values are `integration`.    |
| expiresAt    | {% dt Timestamp %} | When the Invitation expires.                                             |
| createdAt    | {% dt Timestamp %} | When the Invitation was created.                                         |
| createdBy    | {% dt CRN %}       | The User or API Key that created the Invitation.                         |
| updatedAt    | {% dt Timestamp %} | When the Invitation was updated.                                         |
| updatedBy    | {% dt CRN %}       | The User or API Key that updated the Invitation.                         |

{% h4 Optional Fields %}

|        Field        |        Type        |                         Description                         |
| :------------------ | :----------------- | :---------------------------------------------------------- |
| accepted            | Boolean            | A flag indicating whether the Invitation has been accepted. |
| acceptedAt          | {% dt Timestamp %} | When the Invitation was accepted.                           |
| acceptedBy          | {% dt CRN %}       | The User or API Key that accepted the Invitation.           |
| acceptedByAccountId | String             | The [Account] id of the user accepting the Invitation.      |

## Operations

### Get an Invitation **EXPERIMENTAL**

{% reqspec %}
  GET '/api/invitations/{invitationId}/{code}'
  auth 'api-key'
  path_param 'invitationId', 'DKTs3U38hdhfEqwF1JKoT2'
  path_param 'code', 'Kdbnvs3U38hdhfEqwdjvvLLs'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "id": "DKTs3U38hdhfEqwF1JKoT2",
  "code": "WIj211vFs9cNACwBb04vQw",
  "type": "kete-enrolment",
  "resourceId": "5ee0c486308f590260d9a07f",
  "resourceType": "integration",
  "exipresAt": "2021-08-26T00:02:49.488Z",
  "createdAt": "2021-08-25T00:02:49.488Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "updatedAt": "2021-08-25T00:02:49.488Z",
  "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
}
{% endjson %}

### Accept an Invitation **EXPERIMENTAL**

{% reqspec %}
  POST '/api/invitations/{invitationId}/accept'
  auth 'api-key'
  path_param 'invitationId', 'DKTs3U38hdhfEqwF1JKoT2'
  body ({
    code: 'WIj211vFs9cNACwBb04vQw',
    accountId: 'Jaim1Cu1Q55uooxSens6yk'
  })
{% endreqspec %}

{% h4 Required Fields %}

|   Field   |  Type  |                      Description                       |
| :-------- | :----- | :----------------------------------------------------- |
| code      | String | The Invitation code.                                   |
| accountId | String | The [Account] id of the user accepting the Invitation. |

{% h4 Example response payload %}

{% json %}
{
  "id": "DKTs3U38hdhfEqwF1JKoT2",
  "code": "WIj211vFs9cNACwBb04vQw",
  "type": "kete-enrolment",
  "resourceId": "5ee0c486308f590260d9a07f",
  "resourceType": "integration",
  "exipresAt": "2021-08-26T00:02:49.488Z",
  "createdAt": "2021-08-25T00:02:49.488Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "accepted": true,
  "acceptedAt": "2021-08-25T10:12:22.122Z",
  "acceptedBy": "crn::user:e2837e88-d408-11eb-8eac-3e22fb52e878",
  "acceptedByAccountId": "Jaim1Cu1Q55uooxSens6yk",
  "updatedAt": "2021-08-25T10:12:22.122Z",
  "updatedBy": "crn::user:e2837e88-d408-11eb-8eac-3e22fb52e878"
}
{% endjson %}

{% h4 Error Responses %}

| Status |            Code             |                Description                |
| :----- | :-------------------------- | :---------------------------------------- |
| 403    | INVITATION_EXPIRED          | The Invitation is expired.                |
| 403    | INVITATION_ALREADY_ACCEPTED | The Invitation has already been accepted. |

[Managed Integrations]: {% link api/integrations/managed-integrations.md %}
[Account]: {% link api/accounts/accounts.md %}