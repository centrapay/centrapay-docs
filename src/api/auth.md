---
layout: default
parent: API Reference
title: Auth
nav_order: 2
permalink: /api/auth
redirect_from:
  - /auth
---

# Auth

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Authenticating API Calls

API calls can be authenticated by either providing an API key in the
"X-Api-Key" header or by providing a user access token in the "Authorization"
header.

{% reqspec nosummary %}
  GET '/api/account-memberships'
  example {
    title 'Authenticate with API key'
    auth 'api-key'
  }
  example {
    title 'Authenticate with user access token'
    auth 'jwt'
  }
{% endreqspec %}

## API Keys

[API Keys][] provide enduring access to a single Centrapay account.

The Centrapay test merchant API key is available to test creating payment requests:
`f32c5497297084e5354b47c40d5ccacb109ce483`.


## User Access Tokens

User access tokens provide time-limited access to all Centrapay accounts for
which the user is a member. Access tokens are issued using OIDC code flow via
the Centrapay OAuth authorization server and login page at auth.centrapay.com.

After successfully negotiating the OIDC code flow your application will have access to three tokens:

| Id Token      | JWT containing user attributes such as id, phone and email.           |
| Access Token  | JWT granting access to Centrapay APIs. Expires after 1 hour.          |
| Refresh Token | Token for OIDC token exchange. Expires after 60 days or when revoked. |

A good starting point for learning more about OIDC is Okta's [OAuth OIDC Illustrated Guide][okta-oidc]{:.external}.

When initiating a login request, a valid redirect URI must be provided. To
obtain a dedicated OAuth client id with your application's redirect URI(s)
whitelisted please contact Centrapay support. Your callback URI can be for a
website (such as "https://yourapp.example.com/oidc-callback") or mobile app
(such as "com.example.yourapp://oidc-callback").

Your application can use any OIDC client to negotiate the authentication flow
but it must support OIDC authorization code flow with [PKCE][pkce]{:.external}.
See the [Example OIDC Consumer]({% link guides/example-oidc-consumer.md %}) guide for a
working example using the "oidc-client" JavaScript library. The Centrapay
authorization server configuration can be interrogated via
`https://auth.centrapay.com/.well-known/openid-configuration`.

When handling the OIDC callback, browser based applications should slurp the
callback parameters by performing a `location.replace()` so they are not
available in the browser's location bar or browsing history. If your application
needs to talk directly to service.centrapay.com from a browser then it will
also need to be whitelisted for cross-origin requests.


### Claims

The following table lists the claims which may be be included in a user id token.
At minimum, the "sub" claim and one of "phone_number" or "email" will be present.

| Name                  | Description                                                       |
|:----------------------|:------------------------------------------------------------------|
| sub                   | Centrapay user id                                                 |
| email                 | email address                                                     |
| phone_number          | phone number                                                      |
| given_name            | given name(s)                                                     |
| family_name           | surname                                                           |
| preferred_username    | Centrapay user handle                                             |
| phone_number_verified | phone number has been verified (can be used for account recovery) |
| email_verified        | email has been verified (can be used for account recovery)        |


## Permissions

Users and API keys are assigned a role for their associated Centrapay
account(s). The permissions granted to the roles are shown in the table below.

Most permissions apply only to resources owned by the associated account. Some
permissions, such as payment-requests:pay, apply globally to all resources
regardless of the account the resource belongs to. The global permissions are
indicated below with a star (✸).

|              Permission               | Account Owner  | Anon Consumer |  Merchant Terminal   |
| :------------------------------------ | :------------: | :-----------: | :------------------: |
| {% break : accounts:create         %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : accounts:read           %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : accounts:update         %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : quotas:read             %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : api-keys:create         %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : api-keys:update         %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : api-keys:list           %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : merchants:create        %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : merchants:read          %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : merchants:update        %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : merchants:list          %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : payment-requests:create %} |                |               | &nbsp;&nbsp;&nbsp; ✅ |
| {% break : payment-requests:read   %} |      ✸ ✅       |      ✸ ✅      |         ✸ ✅          |
| {% break : payment-requests:pay    %} |      ✸ ✅       |      ✸ ✅      | &nbsp;&nbsp;&nbsp; ✅ |
| {% break : payment-requests:cancel %} |                |               | &nbsp;&nbsp;&nbsp; ✅ |
| {% break : payment-requests:refund %} |                |               | &nbsp;&nbsp;&nbsp; ✅ |
| {% break : payment-requests:void   %} |                |               | &nbsp;&nbsp;&nbsp; ✅ |
| {% break : assets:read             %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : assets:spend            %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : wallets:transfer        %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : wallets:withdraw        %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : wallets:deposit         %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : wallets:create          %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : wallets:read            %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : asset-transfers:create  %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : asset-transfers:read    %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : asset-transfers:claim   %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : bank-accounts:create %}    | &nbsp;&nbsp; ✅ |               |                      |
| {% break : bank-accounts:read   %}    | &nbsp;&nbsp; ✅ |               |                      |
| {% break : quotas:read             %} | &nbsp;&nbsp; ✅ |               |                      |
| {% break : patron-codes:create %}     | &nbsp;&nbsp; ✅ |               |                      |
| {% break : patron-codes:read %}       | &nbsp;&nbsp; ✅ |               | &nbsp;&nbsp;&nbsp; ✅ |


[okta-oidc]: https://developer.okta.com/blog/2019/10/21/illustrated-guide-to-oauth-and-oidc
[pkce]: https://oauth.net/2/pkce/
[API Keys]: {% link api/api-keys.md %}
