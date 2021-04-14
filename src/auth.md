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
"X-Api-Key" header or by providing a user access token in the "Authorization"
header.


Example call with API key:

```
curl -X GET "https://service.centrapay.com/api/account-memberships" \
    -H "X-Api-Key: ${my_api_key}"
```

Example call with user access token:

```
curl -X GET "https://service.centrapay.com/api/account-memberships" -H "Authorization: ${my_access_token}"
```

## API Keys

API keys provide enduring access to a single Centrapay account.

See: [Creating API Keys]({% link accounts.md %}#creating-api-key).

The Centrapay test merchant API key is available to test creating payment requests:
`f32c5497297084e5354b47c40d5ccacb109ce483`.


## User Access Tokens

User access tokens provide time-limited access to all Centrapy accounts for
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
See the [Example Web Browser OIDC Consumer](#oidcjs-example) section below for a
working example using the "oidc-client" JavaScript library. The Centrapy
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

| Permission                            |  Account Owner  | Anon Consumer | Merchant Terminal |
|:--------------------------------------|:---------------:|:-------------:|:-----------------:|
| {% break : accounts:create         %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : accounts:read           %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : accounts:update         %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : quotas:read             %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : api-keys:create         %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : api-keys:update         %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : api-keys:list           %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : merchants:create        %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : merchants:read          %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : merchants:update        %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : merchants:list          %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : payment-requests:create %} |                 |               |         ✅        |
| {% break : payment-requests:read   %} |       ✸ ✅      |      ✸ ✅     |         ✅        |
| {% break : payment-requests:update %} |                 |               |         ✅        |
| {% break : payment-requests:pay    %} |       ✸ ✅      |      ✸ ✅     |                   |
| {% break : payment-requests:void   %} |                 |               |         ✅        |
| {% break : payment-requests:refund %} |                 |               |         ✅        |
| {% break : assets:read             %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : assets:spend            %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : wallets:transfer        %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : wallets:withdraw        %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : wallets:deposit         %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : wallets:create          %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : wallets:read            %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : asset-transfers:create  %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : asset-transfers:read    %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : asset-transfers:claim   %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : bank-authorities:create %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : bank-authorities:read   %} | &nbsp;&nbsp; ✅ |               |                   |
| {% break : quotas:read             %} | &nbsp;&nbsp; ✅ |               |                   |


<span id="oidcjs-example"></span>
## Example Web Browser OIDC Consumer

This example demonstrates how to integrate a browser based application with the
Centrapay OAuth server using the [oidc-client-js][oidcjs]{:.external}
JavaScript library.

### OIDC User Manager Configuration

```javascript
import Oidc from 'oidc-client';

Oidc.Log.logger = console;

const yourCentrapayOauthClientId = '7mapl0nqonkgl5vfeb3cf86miu';
const yourAppOidcRedirectUri = window.location.origin + '/oidc-callback';
const userPhoneNumber = '+6421234567890';
const userManager = new Oidc.UserManager({
  /*
   * Required configs
   */
  authority: 'https://auth.centrapay.com/',
  response_type: 'code',
  scope: 'openid',
  client_id: yourCentrapayOauthClientId,
  redirect_uri: yourAppOidcLoginRedirectUri,
  loadUserInfo: false, // "/oauth2/userInfo" call unsupported by Centrapay OAuth server
  post_logout_redirect_uri: yourAppOidcLogoutRedirectUri,
  metadata: {
    end_session_endpoint: 'https://auth.centrapay.com/logout'
  }
  /*
   * Recommended configs
   */
  userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
  automaticSilentRenew: true,
  monitorSession: false, // Suppress session event double firing
  extraQueryParams: { u: userPhoneNumber }, // Populate Centrapay login form
});
```

### Minimal OIDC Client Usage

```javascript
async function login() {
  userManager.stopSilentRenew();
  userManager.clearStaleState();
  /* State attribute is stored and retrievable with OIDC callback state param */
  await userManager.signinRedirect({ state: window.location.href });
}

async function handleOidcCallback() {
  const result = await userManager.signinRedirectCallback().catch((err) => {
    console.log('Something went wrong handling OIDC callback');
  });
  /* Restore previous location stored against state param */
  window.location.replace(result.state || '/');
}

async function init() {
  let user = null;
  if (window.location.pathname == '/oidc-callback') {
    await handleOidcCallback();
  } else {
    user = await userManager.getUser();
  }
  if (!user) {
    await login();
  }
  return user;
}

init().then(console.log);
```

### Trigger Token Refresh

Manually trigger a token refresh when expired due to user being offline.

```javascript
async function refreshUser() {
  const user await userManager.getUser();
  if (user.expired) {
    await userManager.signinSilent();
    await userManager.signinSilentCallback();
    console.log('User refreshed');
  } else {
    console.log('User not refreshed');
  }
  return await userManager.getUser();
}

refreshUser()
  .then(console.log)
  .catch(err => {
    console.log({ msg: 'Something went wrong refreshing user token, login required', err });
  });
```

### Detect OIDC User Refresh

Detect when OIDC user is refreshed via auto silent renew. The new user *may*
have changed with updated claims, for example, if they have added an email address.

```javascript
userManager.events.addUserLoaded((user) => {
  console.log({ msg: 'user auto renew completed', user });
});
```

### OIDC Client Logout

```javascript
async function logout() {
  /* State attribute is stored and retrievable with OIDC callback state param */
  await userManager.signoutRedirect({ state: window.location.href });
}

async function handleLogoutOidcCallback() {
  const result = await userManager.signoutRedirectCallback().catch((err) => {
    console.log('Something went wrong handling OIDC callback');
  });
  /* Restore previous location stored against state param */
  window.location.replace(result.state || '/');
}
```

[okta-oidc]: https://developer.okta.com/blog/2019/10/21/illustrated-guide-to-oauth-and-oidc
[pkce]: https://oauth.net/2/pkce/
[oidcjs]: https://github.com/IdentityModel/oidc-client-js
