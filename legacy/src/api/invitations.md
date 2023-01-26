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

|    Field     |        Type        |                                    Description                                       |
| :----------- | :----------------- | :----------------------------------------------------------------------------------- |
| id           | String             | The Invitation's unique identifier.                                                  |
| code         | String             | The Invitation code.                                                                 |
| type         | String             | The type of invitation. Supported values are `kete-enrolment`, `account-membership`. |
| resourceId   | String             | The id of the related resource.                                                      |
| resourceType | String             | The type of the related resource. Supported values are `integration`, `account`.     |
| expiresAt    | {% dt Timestamp %} | When the Invitation expires.                                                         |
| createdAt    | {% dt Timestamp %} | When the Invitation was created.                                                     |
| createdBy    | {% dt CRN %}       | The User or API Key that created the Invitation.                                     |
| updatedAt    | {% dt Timestamp %} | When the Invitation was updated.                                                     |
| updatedBy    | {% dt CRN %}       | The User or API Key that updated the Invitation.                                     |

{% h4 Optional Fields %}

|        Field        |        Type        |                         Description                         |
| :------------------ | :----------------- | :---------------------------------------------------------- |
| accepted            | Boolean            | A flag indicating whether the Invitation has been accepted. |
| acceptedAt          | {% dt Timestamp %} | When the Invitation was accepted.                           |
| acceptedBy          | {% dt CRN %}       | The User or API Key that accepted the Invitation.           |
| acceptedByAccountId | String             | The [Account] id of the user accepting the Invitation.      |
| recipientAlias      | String             | The email address of the user accepting the Invitation.     |
| params              | Object             | [Params](#params) dependent on the Invitation type.         |

### Params

| Field |  Type  |                                                                              Description                                                                              |
| :---- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| role  | String | The role that will be assigned to the account. Supported values are `account-owner`, `cashier`. Required when [Invitation](#invitation) type is `account-membership`. |

## Operations

### Create an Invitation **EXPERIMENTAL**

{% reqspec %}
  POST '/api/invitations'
  auth 'api-key'
  body ({
    type: "account-membership",
		resourceId: "Hopo4g34sLVdjEMBs2p19F",
		resourceType: "account",
		recipientAlias: "user@org.com",
    params: {
			role: "cashier"
		}
  })
{% endreqspec %}

{% h4 Required Fields %}

|     Field      |        Type        |                               Description                                            |
| :------------- | :----------------- | :----------------------------------------------------------------------------------- |
| type           | String             | The type of invitation. Supported values are `account-membership`.                   |
| resourceId     | String             | The id of the related resource.                                                      |
| resourceType   | String             | The type of the related resource. Supported values are `account`.                    |
| recipientAlias | String             | The email address of the user accepting the Invitation.                              |
| params         | Object             | [Params](#params) depending on the Invitation type.                                  |

{% h4 Example response payload %}

{% json %}
{
  "id": "DKTs3U38hdhfEqwF1JKoT2",
  "code": "WIj211vFs9cNACwBb04vQw",
  "type": "account-membership",
  "resourceId": "Hopo4g34sLVdjEMBs2p19F",
  "resourceType": "account",
  "exipresAt": "2021-08-26T00:02:49.488Z",
  "createdAt": "2021-08-25T00:02:49.488Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "updatedAt": "2021-08-25T00:02:49.488Z",
  "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "recipientAlias": "user@org.com",
  "params": {
		"role": "cashier"
	}
}
{% endjson %}

{% h4 Error Responses %}

| Status |           Code            |                                                       Description                                                           |
| :----- | :-------------------------| :-------------------------------------------------------------------------------------------------------------------------- |
| 403    | INVALID_ACCOUNT_TYPE      | The resourceId is associated with an account with a non `org` type.                                                         |
| 403    | RECIPIENT_ALREADY_INVITED | An active invitation for this recipientAlias and resource already exists, or the recipient has already joined the resource. |

### Get an Invitation by code **EXPERIMENTAL**

{% reqspec %}
  GET '/api/invitations/code/{code}'
  auth 'api-key'
  path_param 'code', 'WIj211vFs9cNACwBb04vQw'
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

### List Invitations by accountId **EXPERIMENTAL**

{% reqspec %}
  GET '/api/accounts/{accountId}/invitations'
  auth 'api-key'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "items": [
    {
      "id": "DKTs3U38hdhfEqwF1JKoT2",
      "code": "WIj211vFs9cNACwBb04vQw",
      "type": "account-membership",
      "resourceId": "Hopo4g34sLVdjEMBs2p19F",
      "resourceType": "account",
      "exipresAt": "2021-08-26T00:02:49.488Z",
      "createdAt": "2021-08-25T00:02:49.488Z",
      "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
      "updatedAt": "2021-08-25T00:02:49.488Z",
      "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
      "recipientAlias": "user@org.com",
      "params": {
        "role": "account-owner"
      }
    },
    {
      "id": "JKKDMU38hd01hfEqwF1oT2",
      "code": "WIj211vFs9cNACwBb04vQw",
      "type": "account-membership",
      "resourceId": "Hopo4g34sLVdjEMBs2p19F",
      "resourceType": "account",
      "exipresAt": "2021-08-26T00:02:49.488Z",
      "createdAt": "2021-08-25T00:02:49.488Z",
      "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
      "updatedAt": "2021-08-25T00:02:49.488Z",
      "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
      "recipientAlias": "john.doe@org.com",
      "params": {
        "role": "cashier"
      }
    },
  ]
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
