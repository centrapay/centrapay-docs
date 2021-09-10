---
layout: default
parent: API Reference
title: API Keys
permalink: /api/api-keys
---

# API Keys
{:.no_toc}

API keys provide enduring access to a single Centrapay [Account][].


## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### API Key

{% h4 Mandatory Fields %}

| Field     | Type               | Description                                                              |
| :----     | :-----             | :-----------------------------------------------------------------       |
| accountId | String             | The id of the Centrapay [Account][] the API Key is scoped to.            |
| name      | String             | The alphanumeric name of the API key, must be unique within the account. |
| role      | String             | The role governing API key permissions.                                  |
| enabled   | Boolean            | Flag indicating the API Key is usable for authentication.                |
| createdAt | {% dt Timestamp %} | When the API Key was created.                                            |

{% h4 Roles and Permissions %}

Supported roles are: "account-owner" and "merchant-terminal". See [Auth Permissions][] for role details.


## Operations

<span id="create-api-key"></span>
### Create an API Key

{% reqspec %}
  POST '/api/accounts/{accountId}/api-keys'
  auth 'api-key'
  path_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
  body ({ name: 'MyAPIkey', role: 'merchant-terminal' })
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
  name: MyAPIkey
  createdAt: "2020-06-01T22:32:56.631Z"
  enabled: true
  role: "merchant-terminal"
  accountId: "Jaim1Cu1Q55uooxSens6yk"
  secret: "EoaEL7skkedBBy9MzrBSyxG95vUAKjYkiFvWEfiAx"
{% endjson %}

### List API Keys

{% reqspec %}
  GET '/api/accounts/{accountId}/api-keys'
  auth 'api-key'
  path_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}

- accountId: "Jaim1Cu1Q55uooxSens6yk"
  name: "MyOtherAPIkey"
  createdAt: "2020-06-01T21:57:25.888Z"
  enabled: false
  role: "merchant-terminal"

- accountId: "Jaim1Cu1Q55uooxSens6yk"
  name: "MyAPIkey"
  createdAt: "2020-06-01T22:34:31.308Z"
  enabled: true
  role: "merchant-terminal"

{% endjson %}

<span id="update-api-key"></span>
### Update an API Key

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

| Field   | Type    | Description            |
| :------ | :------ | :--------------------- |
| enabled | Boolean | Enable/Disable API key |

{% h4 Example response payload %}

{% json %}
  accountId: "Jaim1Cu1Q55uooxSens6yk"
  name: "MyAPIkey"
  createdAt: "2020-06-01T22:34:31.308Z"
  enabled: false
  role: "merchant-terminal"
{% endjson %}

[Account]: {% link api/accounts/accounts.md %}
[Auth Permissions]: {% link api/auth.md %}#permissions
