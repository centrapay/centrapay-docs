---
layout: default
title: Accounts
nav_order: 4
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

{% endpoint POST https://service.centrapay.com/api/accounts %}

```sh
curl -X POST "https://service.centrapay.com/api/accounts" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{ "name": "Centrapay Cafe", "type": "org" }'
```

**Required Fields**

| Field |  Type  |                    Description                     |
| :---- | :----- | :------------------------------------------------- |
| name  | String | The name of the account                            |
| type  | String | Account type, must be either 'org' or 'individual' |


**Optional Fields**

| Field |  Type  |                      Description                       |
| :---- | :----- | :----------------------------------------------------- |
| owner | String | Id of user to add as member with "account-owner" role. |


**Example response payload**

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

{% endpoint GET https://service.centrapay.com/api/accounts/{accountId} %}

```sh
curl -X GET "https://service.centrapay.com/api/accounts/Jaim1Cu1Q55uooxSens6yk" \
  -H "x-api-key: 1234"
```

**Example response payload**

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

## List account memberships

List memberships for authorized user or API key:

{% endpoint GET https://service.centrapay.com/api/account-memberships %}

```sh
curl -X GET "https://service.centrapay.com/api/account-memberships" \
  -H "x-api-key: 1234"
```
List memberships for specific user:

{% endpoint GET https://service.centrapay.com/api/users/{userId}/account-memberships %}

```sh
curl -X GET "https://service.centrapay.com/api/users/1234/account-memberships" \
  -H "x-api-key: 1234"
```

**Example response payload**

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

## Update an account


{% endpoint PUT https://service.centrapay.com/api/accounts/{accountId} %}

```sh
curl -X PUT "https://service.centrapay.com/api/accounts/Jaim1Cu1Q55uooxSens6yk" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{ "name": "Shortland St Cafe" }'
```

**Required Fields**

| Field |  Type  |       Description       |
| :---- | :----- | :---------------------- |
| name  | String | The name of the account |

**Example response payload**

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

## Creating an API key

{% endpoint POST https://service.centrapay.com/api/accounts/{accountId}/api-keys %}

```sh
curl -X POST "https://service.centrapay.com/api/accounts/Jaim1Cu1Q55uooxSens6yk/api-keys" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{"name": "MyAPIkey", "role": "merchant-terminal"}'
```

**Required Fields**

| Field |  Type  |                                    Description                                     |
| :---- | :----- | :--------------------------------------------------------------------------------- |
| name  | String | The alphanumeric name of the API key, must be unique within account                |
| role  | String | API key role. Currently, only supported are "merchant-terminal" and "account-owner" |

**Example response payload**

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

{% endpoint GET https://service.centrapay.com/api/accounts/{accountId}/api-keys %}

```sh
curl "http://service.centrapay.com/api/accounts/Jaim1Cu1Q55uooxSens6yk/api-keys"
```

**Example response payload**

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

{% endpoint PUT https://service.centrapay.com/api/accounts/{accountId}/api-keys/{apikey-name} %}

```sh
curl -X PUT "https://service.centrapay.com/api/accounts/Jaim1Cu1Q55uooxSens6yk/api-keys/MyAPIkey" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{ "enabled": false }'
```

**Required Fields**

|  Field  |  Type   |      Description       |
| :------ | :------ | :--------------------- |
| enabled | Boolean | Enable/Disable API key |

**Example response payload**

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

{% endpoint POST https://service.centrapay.com/api/accounts/${accountId}/members %}

```sh
curl -X POST "https://service.centrapay.com/api/accounts/Jaim1Cu1Q55uooxSens6yk/members" \
  -H "x-api-key: 1234" \
  -H "content-type: application/json" \
  -d '{ "userId": "da75ad90-9a5b-4df0-8374-f48b3a8fbfcc", "role": "account-owner" }'
```

**Required Fields**

| Field  |  Type  |                            Description                            |
| :----- | :----- | :---------------------------------------------------------------- |
| userId | String | The id of the user to add to the acccount.                        |
| role   | String | Account member role. Currently only "account-owner" is supported. |


**Example response payload**

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

## List account members

{% endpoint GET https://service.centrapay.com/api/accounts/{accountId}/members %}

```sh
curl -X GET http://service.centrapay.com/api/accounts/Jaim1Cu1Q55uooxSens6yk/members \
  -H "x-api-key: 1234"
```

**Example response payload**

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
