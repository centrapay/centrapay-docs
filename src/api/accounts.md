---
layout: default
parent: API Reference
title: Accounts
permalink: /api/accounts
redirect_from:
  - /accounts
---

# Accounts
{:.no_toc}

An account represents a subscription to centrapay services and it owns
resources within centrapay such as merchants and wallets.  Accounts will have
apiKeys and users associated with them. Account membership grants access to all
resources owned by the account.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}


## Creating an account

{% reqspec %}
  POST '/api/accounts'
  auth 'api-key'
  body ({
    name: 'Centrapay Cafe',
    type: 'org',
  })
{% endreqspec %}

{% h4 Required Fields %}

| Field |  Type  |                    Description                     |
| :---- | :----- | :------------------------------------------------- |
| name  | String | The name of the account                            |
| type  | String | Account type, must be either 'org' or 'individual' |


{% h4 Optional Fields %}

| Field |  Type  |                      Description                       |
| :---- | :----- | :----------------------------------------------------- |
| owner | String | Id of user to add as member with "account-owner" role. |


{% h4 Example response payload %}

```json
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
```

## Get information about an account

{% reqspec %}
  GET '/api/accounts/{accountId}'
  auth 'api-key'
  path_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
{% endreqspec %}

{% h4 Example response payload %}

```json
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
```

## Update an account

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

```json
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
```

<span id="creating-api-key"></span>
## Creating an API key

{% reqspec %}
  POST '/api/accounts/{accountId}/api-keys'
  auth 'api-key'
  path_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
  body ({ name: 'MyAPIkey', role: 'merchant-terminal' })
{% endreqspec %}

```sh
curl -X POST "https://service.centrapay.com/api/accounts/Jaim1Cu1Q55uooxSens6yk/api-keys" \
```

{% h4 Required Fields %}

| Field |  Type  |                                    Description                                      |
| :---- | :----- | :---------------------------------------------------------------------------------- |
| name  | String | The alphanumeric name of the API key, must be unique within account                 |
| role  | String | API key role. Currently, only supported are "merchant-terminal" and "account-owner" |

{% h4 Example response payload %}

```json
{
  "name": "MyAPIkey",
  "createdAt": "2020-06-01T22:32:56.631Z",
  "enabled":true,
  "role": "merchant-terminal",
  "accountId": "Jaim1Cu1Q55uooxSens6yk",
  "secret": "EoaEL7skkedBBy9MzrBSyxG95vUAKjYkiFvWEfiAx"
}
```

## List account API keys

{% reqspec %}
  GET '/api/accounts/{accountId}/api-keys'
  auth 'api-key'
  path_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
{% endreqspec %}

{% h4 Example response payload %}

```json
[
  {
    "accountId": "Jaim1Cu1Q55uooxSens6yk",
    "name": "MyOtherAPIkey",
    "createdAt": "2020-06-01T21:57:25.888Z",
    "enabled":false,
    "role": "merchant-terminal"
  },
  {
    "accountId": "Jaim1Cu1Q55uooxSens6yk",
    "name": "MyAPIkey",
    "createdAt": "2020-06-01T22:34:31.308Z",
    "enabled":true,
    "role": "merchant-terminal"
  }
]
```

## Update account API key

{% reqspec %}
  PUT '/api/accounts/{accountId}/api-keys/{apiKeyName}'
  path_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
  path_param 'apiKeyName', 'MyAPIkey'
  auth 'api-key'
  body ({
    enabled: false
  })
{% endreqspec %}


{% h4 Required Fields %}

|  Field  |  Type   |      Description       |
| :------ | :------ | :--------------------- |
| enabled | Boolean | Enable/Disable API key |

{% h4 Example response payload %}

```json
{
  "accountId": "Jaim1Cu1Q55uooxSens6yk",
  "name": "MyAPIkey",
  "createdAt": "2020-06-01T22:34:31.308Z",
  "enabled":false,
  "role": "merchant-terminal"
}
```

## Add account member **EXPERIMENTAL**

{% reqspec %}
  POST '/api/accounts/{accountId}/members'
  auth 'api-key'
  path_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
  body ({ userId: 'da75ad90-9a5b-4df0-8374-f48b3a8fbfcc', role: 'account-owner' })
{% endreqspec %}

{% h4 Required Fields %}

| Field  |  Type  |                            Description                            |
| :----- | :----- | :---------------------------------------------------------------- |
| userId | String | The id of the user to add to the acccount.                        |
| role   | String | Account member role. Currently only "account-owner" is supported. |


{% h4 Example response payload %}

```json
{
  "accountId": "Jaim1Cu1Q55uooxSens6yk",
  "userId": "da75ad90-9a5b-4df0-8374-f48b3a8fbfcc",
  "role": "account-owner",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "createdAt": "2020-06-12T01:17:46.499Z",
  "modifiedAt": "2020-06-12T01:17:46.499Z",
  "modifiedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "version": "1"
}
```

## List members for account

{% reqspec %}
  GET '/api/accounts/{accountId}/members'
  path_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
  auth 'api-key'
{% endreqspec %}

{% h4 Example response payload %}

```json
[
  {
    "accountId": "Jaim1Cu1Q55uooxSens6yk",
    "userId": "b657195e-dc2f-11ea-8566-e7710d592c99",
    "createdAt": "2020-06-01T21:57:25.888Z",
    "role": "account-owner"
  },
  {
    "accountId": "Jaim1Cu1Q55uooxSens6yk",
    "userId": "9f4b3bae-dc30-11ea-ab70-2743d9be3dd5",
    "createdAt": "2020-06-01T22:34:31.308Z",
    "role": "account-owner"
  }
]
```

## List account memberships for authenticated subject

{% reqspec %}
  GET '/api/account-memberships'
  auth 'api-key'
{% endreqspec %}

{% h4 Example response payload %}

```json
[
  {
    "accountId": "5uooxSens6ykJaim1Cu1Q5",
    "accountType": "org",
    "role": "account-owner"
  }
]
```


## List memberships for specific user

{% reqspec %}
  GET '/api/users/{userId}/account-memberships'
  auth 'api-key'
  path_param 'userId', '1234'
{% endreqspec %}

{% h4 Example response payload %}

```json
[
  {
    "accountId": "Jaim1Cu1Q55uooxSens6yk",
    "accountType": "org",
    "role": "account-owner"
  },
  {
    "accountId": "5uooxSens6ykJaim1Cu1Q5",
    "accountType": "org",
    "role": "account-owner"
  }
]
```

## List merchants for account

{% reqspec %}
  GET '/api/account/{accountId}/merchants'
  auth 'api-key'
  path_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
{% endreqspec %}

{% h4 Example response payload %}

```json
{
  "items": [
    {
      "accountId": "3xsjxxwmnpkunjbcpekyekc84rzxr4",
      "country": "BT",
      "id": "5f6bf6ff81552101f8ff6122",
      "name": "Adams, Runolfsdottir and Botsford",
      "test": true
    },
    {
      "accountId": "3xsjxxwmnpkunjbcpekyekc84rzxr4",
      "country": "NZ",
      "id": "5f6bf6ff81552101f8ff6123",
      "name": "Vandervort Inc",
      "test": false
    },
    {
      "accountId": "3xsjxxwmnpkunjbcpekyekc84rzxr4",
      "country": "MZ",
      "id": "5f6bf6ff81552101f8ff6124",
      "name": "West, O'Reilly and Huels",
      "test": true
    },
  ]
}
```
