---
layout:  default
grand_parent: API Reference
parent: Bank Accounts
title: Bank Account Connection Intents
permalink: /api/bank-account-connection-intents
---

# Bank Account Connection Intents
{:.no_toc}

A Bank Account Connection Intent facilitates user authorization of access to Bank Accounts, for example, using Open Banking flows.
Typically the authorization will follow an OAuth flow where the user is redirected to a third-party system to authenticate and select
one or more bank accounts.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Bank Account Connection Intent
{% h4 Fields %}

|      Field       |        Type        |                                                     Description                                                      |
| :--------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------- |
| id               | String             | The Bank Account Connection Intent's unique identifier.                                                              |
| accountId        | String             | The id of the owning Centrapay [Account][].                                                                          |
| type             | String             | The type of Bank Account Connection Intent. See [Bank Account Connection Intent Types][].                            |
| status           | String             | The current status of the Bank Account Connection Intent. Supported values are `created`, `authorized` and `failed`. |
| createdAt        | {% dt Timestamp %} | When the Bank Account Connection Intent was created.                                                                 |
| createdBy        | {% dt CRN %}       | The User or API Key that created the Bank Account Connection Intent.                                                 |
| updatedAt        | {% dt Timestamp %} | When the Bank Account Connection Intent was updated.                                                                 |
| updatedBy        | {% dt CRN %}       | The User or API Key that updated the Bank Account Connection Intent.                                                 |
| authorizationUrl | String             | A URL to the third-party beginning the authorization flow.                                                           |
| test             | Boolean {% opt %}  | A flag which is present if the intention is to connect with a [Bank Account][] used for testing.                     |

### Bank Account Connection Intent Types

|      Name       |                                                                                               description                                                                                                |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| quartz-accounts | Initiates an authorization flow for authorizing access to bank account details. After a Bank Account Connection Intent has been authorized, one or more Centrapay Bank Account resources may be created. |
| quartz-payment  | Initiates an authorization flow for authorizing access to create payments.                                                                                                                               |

## Operations

### Create Bank Account Connection Intent **EXPERIMENTAL**

{% reqspec %}
  POST '/api/bank-account-connection-intents'
  auth 'api-key'
  example {
    body ({
      accountId: 'uooxSens6ykJaim1Cu1Q55',
      type: 'quartz-accounts',
      test: true
    })
  }
{% endreqspec %}

{% h4 Fields %}

|     Field     |       Type        |                                           Description                                            |
| :------------ | :---------------- | :----------------------------------------------------------------------------------------------- |
| accountId     | String            | The id of the owning [Account][].                                                                |
| type          | String            | The type of Bank Account Connection Intent.                                                      |
| bankAccountId | String  {% opt %} | The id of the associated [Bank Account][]. Required if type is `quartz-payment`.                 |
| test          | Boolean {% opt %} | A flag which is present if the intention is to connect with a [Bank Account][] used for testing. |


{% h4 Example response payload %}

{% json %}
  id: 3KVjuKW2CZCJeJVqPxwkX7
  accountId: B4u4WZCu3joZFVWT3XjWW3
  type: quartz-accounts
  status: created
  createdAt: 2022-03-31T02:56:29.713Z
  createdBy: crn:B4u4WZCu3joZFVWT3XjWW3:api-key:MyApiKey
  updatedAt: 2022-03-31T02:56:29.713Z
  updatedBy: crn:B4u4WZCu3joZFVWT3XjWW3:api-key:MyApiKey
  authorizationUrl: https://example.com/authorization-url
  test: true
{% endjson %}

{% h4 Error Responses %}

| Status |              Code               |                                                       Description                                                        |
| :----- | :------------------------------ | :----------------------------------------------------------------------------------------------------------------------- |
| 403    | {% break _ LIVENESS_MISMATCH %} | Only Bank Account Connection Intents with the `test` flag can be associated with test [Bank Accounts][], and vice versa. |

### Authorize Bank Account Connection Intent **EXPERIMENTAL**

{% reqspec %}
  POST '/api/bank-account-connection-intents/{bankAccountConnectionIntentId}/authorize'
  path_param 'bankAccountConnectionIntentId', '3KVjuKW2CZCJeJVqPxwkX7'
  auth 'api-key'
  example {
    body ({
      code: 'hKpKupTM391pE10xfQiorMxXarRKAHRhTfH_x',
    })
  }
{% endreqspec %}

{% h4 Fields %}

| Field |  Type  |                  Description                  |
| :---- | :----- | :-------------------------------------------- |
| code  | String | Authorization code returned from third-party. |

{% h4 Example response payload %}

{% json %}
{}
{% endjson %}


[Account]: {% link api/accounts/accounts.md %}
[Bank Account]: {% link api/bank-accounts/bank-accounts.md %}
[Bank Accounts]: {% link api/bank-accounts/bank-accounts.md %}
[Bank Account Connection Intent Types]: {% link api/bank-accounts/bank-account-connection-intents.md %}#bank-account-connection-intent-types
