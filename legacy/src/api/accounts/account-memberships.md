---
layout: default
grand_parent: API Reference
parent: Accounts
title: Account Memberships
permalink: /api/account-memberships
---

# Account Memberships
{:.no_toc}

An Account Membership represents a user having access to a Centrapay
[Account][]. An Account Membership has a role which grants the user access to
some or all of the operations and resources within the account.


## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Account Member

A Member contains extended information about an user's access to an account.

{% h4 Required Fields %}

| Field       | Type   | Description                                              |
| :-----      | :----- | :------------------------------------------------------  |
| accountId   | String | The id of the [Account][] the Membership is scoped to.   |
| accountType | String | The type of the [Account][] the Membership is scoped to. |
| accountName | String | The name of the [Account][] the Membership is scoped to. |
| userId      | String | The id of the user the Membership belongs to.            |
| role        | String | The role governing Membership permissions.               |

{% h4 Optional Fields %}

|    Field    |        Type        |                        Description                         |
| :---------- | :----------------- | :--------------------------------------------------------- |
| subject     | {% dt CRN %}       | User or API key resource name for the membership.          |
| createdAt   | {% dt Timestamp %} | When the Membership was created.                           |
| createdBy   | {% dt CRN %}       | Resource that created the  member.                         |
| modifiedAt  | {% dt Timestamp %} | When the Membership was last modified.                     |
| modifiedBy  | {% dt CRN %}       | Resource that last modified the account member.            |
| version     | {% dt BigNumber %} | Number of times the document has been modified.            |
| testAccount | Boolean            | A flag which is present if the [Account][] is test         |


## Operations

### Add Member **EXPERIMENTAL**

{% reqspec %}
  POST '/api/accounts/{accountId}/members'
  auth 'api-key'
  path_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
  body ({ userId: 'da75ad90-9a5b-4df0-8374-f48b3a8fbfcc', role: 'account-owner' })
{% endreqspec %}


{% h4 Example response payload %}

{% json %}
{
  "accountId": "Jaim1Cu1Q55uooxSens6yk",
  "accountType": "org",
  "userId": "da75ad90-9a5b-4df0-8374-f48b3a8fbfcc",
  "role": "account-owner",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "createdAt": "2020-06-12T01:17:46.499Z",
  "modifiedAt": "2020-06-12T01:17:46.499Z",
  "modifiedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "version": "1"
}
{% endjson %}

### List Members

{% reqspec %}
  GET '/api/accounts/{accountId}/members'
  path_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
  auth 'api-key'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
[
  {
    "accountName": "Centrapay Cafe",
    "accountType": "org",
    "accountId": "Jaim1Cu1Q55uooxSens6yk",
    "userId": "b657195e-dc2f-11ea-8566-e7710d592c99",
    "createdAt": "2020-06-01T21:57:25.888Z",
    "role": "account-owner"
  },
  {
    "accountName": "Centrapay Tea Warehouse",
    "accountType": "org",
    "accountId": "0f9nvqdcn5eaaDLefkg1Xt",
    "userId": "9f4b3bae-dc30-11ea-ab70-2743d9be3dd5",
    "createdAt": "2020-06-02T10:l4:33.021Z",
    "role": "account-owner"
  }
]
{% endjson %}

### List Account Memberships for authenticated subject

{% reqspec %}
  GET '/api/account-memberships'
  auth 'api-key'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
[
  {
    "accountName": "Centrapay Tea Warehouse",
    "accountId": "5uooxSens6ykJaim1Cu1Q5",
    "accountType": "org",
    "role": "account-owner"
  }
]
{% endjson %}


### List Account Memberships for specific user

{% reqspec %}
  GET '/api/users/{userId}/account-memberships'
  auth 'api-key'
  path_param 'userId', '1234'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
[
  {
    "accountName": "Centrapay Cafe",
    "accountId": "Jaim1Cu1Q55uooxSens6yk",
    "accountType": "org",
    "role": "account-owner"
  },
  {
    "accountName": "Centrapay Tea Warehouse",
    "accountId": "5uooxSens6ykJaim1Cu1Q5",
    "accountType": "org",
    "role": "account-owner"
  }
]
{% endjson %}

[Account]: {% link api/accounts/accounts.md %}
