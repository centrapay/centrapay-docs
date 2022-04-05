---
layout:  default
grand_parent: API Reference
parent: Bank Accounts
title: Bank Account Requests
permalink: /api/bank-account-requests
---

# Bank Account Requests
{:.no_toc}

Bank Account Requests facilitate user authorization of access to bank accounts.
Typically the authorization will follow an OAuth flow where the user is
redirected to a third-party system to authenticate and select one or more bank
accounts. After a bank account request has been completed, one or more
Centrapay Bank Account resources may be created and long-lived access tokens
may be stored against those Bank Accounts.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Bank Account Request
{% h4 Fields %}

|      Field       |        Type        |                                             Description                                              |
| :--------------- | :----------------- | :--------------------------------------------------------------------------------------------------- |
| id               | String             | The Bank Account Request's unique identifier.                                                        |
| accountId        | String             | The id of the owning Centrapay [Account][].                                                          |
| type             | String             | The type of Bank Account Request. See [Bank Account Request Types][].                                |
| status           | String             | The current status of the Bank Account Request. Supported values are `created`, `failed` and `done`. |
| createdAt        | {% dt Timestamp %} | When the Bank Account Request was created.                                                           |
| createdBy        | {% dt CRN %}       | The User or API Key that created the Bank Account Request.                                           |
| updatedAt        | {% dt Timestamp %} | When the Bank Account Request was updated.                                                           |
| updatedBy        | {% dt CRN %}       | The User or API Key that updated the Bank Account Request.                                           |
| authorizationUrl | String             | A URL to the third-party beginning the authorization flow.                                           |

### Bank Account Request Types

|      Name      |                                      description                                       |
| :------------- | :------------------------------------------------------------------------------------- |
| quartz-details | Request will initiate an authorization flow for authorizing access to account details. |
| quartz-payment | Request will initiate an authorization flow for authorizing access to create payments. |

## Operations

### Create Bank Account Request **EXPERIMENTAL**

{% reqspec %}
  POST '/api/bank-account-requests'
  auth 'api-key'
  example {
    body ({
      accountId: 'uooxSens6ykJaim1Cu1Q55',
      type: 'quartz-details',
    })
  }
{% endreqspec %}

{% h4 Fields %}

|     Field     |       Type        |                                   Description                                    |
| :------------ | :---------------- | :------------------------------------------------------------------------------- |
| accountId     | String            | The id of the owning [Account][].                                                |
| type          | String            | The type of Bank Account Request.                                                |
| bankAccountId | String  {% opt %} | The id of the associated [Bank Account][]. Required if type is `quartz-payment`. |

{% h4 Example response payload %}

{% json %}
  id: 3KVjuKW2CZCJeJVqPxwkX7
  accountId: B4u4WZCu3joZFVWT3XjWW3
  type: quartz-details
  status: created
  createdAt: 2022-03-31T02:56:29.713Z
  createdBy: crn:B4u4WZCu3joZFVWT3XjWW3:api-key:MyApiKey
  updatedAt: 2022-03-31T02:56:29.713Z
  updatedBy: crn:B4u4WZCu3joZFVWT3XjWW3:api-key:MyApiKey
  authorizationUrl: https://example.com/authorization-url
{% endjson %}

### Authorize Bank Account Request **EXPERIMENTAL**

{% reqspec %}
  POST '/api/bank-account-requests/{bankAccountRequestId}/authorize'
  path_param 'bankAccountRequestId', '3KVjuKW2CZCJeJVqPxwkX7'
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
[Bank Account Request Types]: {% link api/bank-accounts/bank-account-requests.md %}#bank-account-request-types
