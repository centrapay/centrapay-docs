---
layout: default
grand_parent: API Reference
parent: Accounts
title: Accounts
nav_order: 1
permalink: /api/accounts
redirect_from:
  - /accounts
---

# Accounts
{:.no_toc}

An Account represents a permission boundary around Centrapay resources.
Accounts can have [API Keys][] and [Account Memberships][] which grant access to the resources.

Accounts are classified as either "individual" or "org". Individual accounts
can only have a single member and Centrapay users can only be a member of a single
individual account.


## Contents
{:.no_toc .text-delta}

* TOC
{:toc}


## Models

### Account


|     Field     |        Type        |                                  Description                                  |
| :------------ | :----------------- | :---------------------------------------------------------------------------- |
| id            | String             | The unique identifier.                                                        |
| type          | String             | Account type, must be either 'org' or 'individual'.                           |
| name          | String             | The display name of the Account.                                              |
| region        | String             | The region that the Account will operate in. Only defined for 'org' Accounts. |
| test          | Boolean            | A flag which is only present if the Account is for testing.                   |
| createdAt     | {% dt Timestamp %} | When the Account was created.                                                 |
| modifiedAt    | {% dt Timestamp %} | When the Account was updated.                                                 |
| createdBy     | {% dt CRN %}       | The User or API Key that created the Account.                                 |
| modifiedBy    | {% dt CRN %}       | The User or API Key that updated the Account.                                 |
| subscriptions | Array              | A list of [Subscriptions](#subscription) on the Account.                      |

### Subscription

| Field |  Type  |          Description          |
| :---- | :----- | :---------------------------- |
| name  | String | The name of the Subscription. |

## Operations

### Create an Account

{% reqspec %}
  POST '/api/accounts'
  auth 'api-key'
  body ({
    name: 'Centrapay Cafe',
    type: 'org',
  })
{% endreqspec %}

{% h4 Required Fields %}

| Field |  Type  |                     Description                     |
| :---- | :----- | :-------------------------------------------------- |
| name  | String | The name of the Account.                            |
| type  | String | Account type, must be either "org" or "individual". |

{% h4 Optional Fields %}

| Field  |  Type   |                                                                 Description                                                                  |
| :----- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| owner  | String  | Id of user to add as member with "account-owner" role.                                                                                       |
| test   | Boolean | A flag indicating if the Account is for testing.                                                                                             |
| region | String  | The region that the Account will operate in. Required for 'org' Accounts, not allowed for 'individual' Accounts. Can be "NZ", "AU", or "US". |


{% h4 Example response payload %}

{% json %}
{
  "id": "Jaim1Cu1Q55uooxSens6yk",
  "name": "Centrapay Cafe",
  "type": "org",
  "region": "NZ",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "createdAt": "2020-06-12T01:17:46.499Z",
  "modifiedAt": "2020-06-12T01:17:46.499Z",
  "modifiedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "version": "1",
  "subscriptions": [],
}
{% endjson %}

### Get an Account

{% reqspec %}
  GET '/api/accounts/{accountId}'
  auth 'api-key'
  path_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "id": "Jaim1Cu1Q55uooxSens6yk",
  "name": "Centrapay Cafe",
  "type": "org",
  "region": "NZ",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "createdAt": "2020-06-12T01:17:46.499Z",
  "modifiedAt": "2020-06-12T01:17:46.499Z",
  "modifiedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "version": "1",
  "subscriptions": [],
}
{% endjson %}

### Update an Account

{% reqspec %}
  PUT '/api/accounts/{accountId}'
  auth 'api-key'
  path_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
  body ({ name: 'Shortland St Cafe' })
{% endreqspec %}

{% h4 Required Fields %}

| Field |  Type  |       Description       |
| :---- | :----- | :---------------------- |
| name  | String | The name of the account |

{% h4 Example response payload %}

{% json %}
{
  "id": "Jaim1Cu1Q55uooxSens6yk",
  "name": "Shortland St Cafe",
  "type": "org",
  "region": "NZ",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "createdAt": "2020-06-12T01:17:46.499Z",
  "modifiedAt": "2020-06-12T02:35:12.112Z",
  "modifiedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "version": "2",
  "subscriptions": [],
}
{% endjson %}

[API Keys]: {% link api/api-keys.md %}
[Account Memberships]: {% link api/accounts/account-memberships.md %}
