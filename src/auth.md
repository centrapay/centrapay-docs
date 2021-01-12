---
layout: default
title: Auth
nav_order: 2
---

# Auth

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Authenticating API Calls

API calls can be authenticated by either providing an API key in the
"X-Api-Key" header or by providing an user access token in the "Authorization"
header.


Example call with API key:

```
curl -X GET "https://service.centrapay.com/api/account-memberships" -H "X-Api-Key: my-api-key"
```

Example call with user access token:

```
curl -X GET "https://service.centrapay.com/api/account-memberships" -H "Authorization my-access-token"
```

## API Keys

API keys provide enduring access to a single Centrapay account.

See: [Creating API Keys]({% link accounts.md %}#creating-an-api-key).


## User Access Tokens

User access tokens provide time-limited access to all Centrapy accounts for
which the user is a member.  Access tokens are issued using OIDC code flow via
the Centrapay OAuth authorization server at auth.centrapay.com.

A good starting point for learning about OIDC is Okta's [OAuth OIDC Illustrated Guide][1]{:target="\_blank"}{:.external}.

## Permissions

Users and API keys are assigned a role for their associated Centrapay
account(s). The permissions granted to the roles are shown in the table below.

Most permissions apply only to resources owned by the associated account. Some
permissions, such as payment-requests:pay, apply globally to all resources
regardless of the account the resource belongs to. The global permissions are
indicated below with a star (✸).

| Permission              | Account Owner | Anon Consumer | Merchant Terminal |
|:------------------------|:-------------:|:-------------:|:-----------------:|
| accounts:create         |       ✅      |               |                   |
| accounts:read           |       ✅      |               |                   |
| accounts:update         |       ✅      |               |                   |
| api-keys:create         |       ✅      |               |                   |
| api-keys:update         |       ✅      |               |                   |
| api-keys:list           |       ✅      |               |                   |
| merchants:create        |       ✅      |               |                   |
| merchants:read          |       ✅      |               |                   |
| merchants:update        |       ✅      |               |                   |
| merchants:list          |       ✅      |               |                   |
| payment-requests:create |               |               |         ✅        |
| payment-requests:read   |      ✸ ✅     |      ✸ ✅     |         ✅        |
| payment-requests:update |               |               |         ✅        |
| payment-requests:pay    |      ✸ ✅     |      ✸ ✅     |                   |
| payment-requests:void   |               |               |         ✅        |
| payment-requests:refund |               |               |         ✅        |
| assets:read             |       ✅      |               |                   |
| assets:spend            |       ✅      |               |                   |
| wallets:transfer        |       ✅      |               |                   |
| wallets:withdraw        |       ✅      |               |                   |
| wallets:deposit         |       ✅      |               |                   |
| wallets:create          |       ✅      |               |                   |
| wallets:read            |       ✅      |               |                   |
| asset-transfers:create  |       ✅      |               |                   |
| asset-transfers:read    |       ✅      |               |                   |
| asset-transfers:claim   |       ✅      |               |                   |
| bank-authorities:create |       ✅      |               |                   |
| bank-authorities:read   |       ✅      |               |                   |


[1]: https://developer.okta.com/blog/2019/10/21/illustrated-guide-to-oauth-and-oidc
