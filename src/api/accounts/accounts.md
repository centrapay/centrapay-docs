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

{% h4 Mandatory Fields %}

| Field      | Type               | Description                                         |
|:-----------|:-------------------|:----------------------------------------------------|
| id         | String             | The unique identifier.                              |
| type       | String             | Account type, must be either 'org' or 'individual'. |
| name       | String             | The display name of the Account.                    |
| createdAt  | {% dt Timestamp %} | When the Account was created.                       |
| modifiedAt | {% dt Timestamp %} | When the Account was updated.                       |
| createdBy  | {% dt CRN %}       | The User or API Key that created the Account.       |
| modifiedBy | {% dt CRN %}       | The User or API Key that updated the Account.       |

{% h4 Optional Fields %}

| Field       | Type               | Description                                                         |
|:------------|:-------------------|:--------------------------------------------------------------------|
| test        | Boolean            | A flag which is only present if the account is for testing.         |
| externalId  | String             | Id of an external account that this Centrapay Account is mapped to. |

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

| Field | Type   | Description                                        |
|:------|:-------|:---------------------------------------------------|
| name  | String | The name of the account                            |
| type  | String | Account type, must be either 'org' or 'individual' |


{% h4 Optional Fields %}

| Field      | Type    | Description                                                         |
|:-----------|:--------|:--------------------------------------------------------------------|
| owner      | String  | Id of user to add as member with "account-owner" role.              |
| test       | Boolean | A flag indicating if the account is for testing.                    |
| externalId | String  | Id of an external account that this Centrapay Account is mapped to. |


{% h4 Example response payload %}

{% json %}
{
  "id": "Jaim1Cu1Q55uooxSens6yk",
  "name": "Centrapay Cafe",
  "type": "org",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "createdAt": "2020-06-12T01:17:46.499Z",
  "modifiedAt": "2020-06-12T01:17:46.499Z",
  "modifiedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "version": "1"
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
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "createdAt": "2020-06-12T01:17:46.499Z",
  "modifiedAt": "2020-06-12T01:17:46.499Z",
  "modifiedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "version": "1"
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

| Field | Type   | Description             |
|:------|:-------|:------------------------|
| name  | String | The name of the account |

{% h4 Example response payload %}

{% json %}
{
  "id": "Jaim1Cu1Q55uooxSens6yk",
  "name": "Shortland St Cafe",
  "type": "org",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "createdAt": "2020-06-12T01:17:46.499Z",
  "modifiedAt": "2020-06-12T02:35:12.112Z",
  "modifiedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "version": "2"
}
{% endjson %}

[API Keys]: {% link api/api-keys.md %}
[Account Memberships]: {% link api/accounts/account-memberships.md %}
