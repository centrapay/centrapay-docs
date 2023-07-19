---
layout: default
grand_parent: API Reference
parent: Merchants
title: Merchants
nav_order: 1
permalink: /api/merchants
redirect_from:
  - /merchants
---

# Merchants
{:.no_toc}

A merchant is an initiator of [Payment Requests][]. A Merchant has [Merchant Configs][]
which define the payment methods available for a Payment Request.


## Contents
{:.no_toc .text-delta}

* TOC
{:toc}


## Models

### Merchant

{% h4 Mandatory Fields %}

|      Field       |        Type        |                                                 Description                                                 |
| :--------------- | :----------------- | :---------------------------------------------------------------------------------------------------------- |
| id               | String             | Merchant's unique identifier.                                                                               |
| accountId        | String             | Id of Merchant's owning Centrapay account.                                                                  |
| name             | String             | Merchant name.                                                                                              |
| country          | String             | Merchant [ISO 3166]{:.external} country code. Must match the "region" on the [Account][].                   |
| createdAt        | {% dt Timestamp %} | When the Merchant was created.                                                                              |
| createdBy        | {% dt CRN %}       | The User or API Key that created the Merchant.                                                              |
| updatedAt        | {% dt Timestamp %} | When the Merchant was updated.                                                                              |
| updatedBy        | {% dt CRN %}       | The User or API Key that updated the Merchant.                                                              |
| onboardingStatus | String             | The onboarding status of the Merchant. See [Onboarding Statuses](#onboarding-statuses) for possible values. |

{% h4 Optional Fields %}

|         Field          |                  Type                   |                                                                        Description                                                                         |
| :--------------------- | :-------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| test                   | Boolean                                 | **EXPERIMENTAL** Flag indicating merchant is for testing.                                                                                                  |
| settlementConfig       | [Settlement Config](#settlement-config) | **EXPERIMENTAL** Merchant settlement config.                                                                                                               |
| location               | {% dt Location %}                       | **EXPERIMENTAL** Physical Location of Merchant.                                                                                                            |
| onboardingStatusReason | String                                  | The reason associated with the [Onboarding Status](#onboarding-statuses). See [Onboarding Status Reasons](#onboarding-status-reasons) for possible values. |

<a name="onboarding-statuses">
{% h4 Onboarding Statuses %}

|    Status    |                                                                Description                                                                 |                                      Allowed Reasons                                      |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| applied      | Identifies merchants that have registered to be activated for the Centrapay service.                                                       |                                                                                           |
| provisioning | Identifies merchants that are in the process of being activated for the Centrapay service.                                                 |                                                                                           |
| active       | Identifies merchants that have been activated for Centrapay services successfully (i.e. they have successfully created a Payment Request). |                                                                                           |
| deactivated  | Identifies merchants that have been de-registered for the Centrapay service.                                                               | duplicate, data-quality-issues, no-response, change-of-ownership, centrapay-discontinued. |
| on-hold      | Identifies merchants that have been placed on hold.                                                                                        | seasonal-business-closure, incompatible-terminal, no-response                             |

<a name="onboarding-status-reasons">
{% h4 Onboarding Status Reasons %}

|          Reason           |                           Description                            |
| :------------------------ | :--------------------------------------------------------------- |
| duplicate                 | The merchant already exists in the Centrapay system.             |
| data-quality-issues       | Data quality issues are preventing the merchant from onboarding. |
| no-response               | No response has been received from the merchant.                 |
| change-of-ownership       | The merchant has changed ownership.                              |
| centrapay-discontinued    | The merchant is no longer using Centrapay.                       |
| seasonal-business-closure | The merchant has closed temporarily.                             |
| incompatible-terminal     | The merchant does not have any compatible terminals.             |


### Settlement Config
{% h4 Optional Fields %}

|     Field     |  Type  |                                       Description                                        |
| :------------ | :----- | :--------------------------------------------------------------------------------------- |
| bankAccountId | String | The id of the bank account funds should be settled into. This must belong to the account |


## Operations

### Create a Merchant

{% reqspec %}
  POST '/api/merchants'
  auth 'api-key'
  body ({
    accountId: 'C4QnjXvj8At6SMsEN4LRi9',
    name: 'Centrapay Cafe Auckland',
    country: 'NZ',
    test: false,
  })
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "id": "5ee0c486308f590260d9a07f",
  "accountId": "yqwyya0rzz3vvshqw0474u89xtj5fn",
  "name": "Centrapay Cafe Auckland",
  "country": "NZ",
  "test": false,
  "onboardingStatus": "applied",
  "createdAt": "2021-11-12T01:17:46.499Z",
  "updatedAt": "2021-11-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
}
{% endjson %}

{% h4 Error Responses %}

| Status |                 Code                  |                                  Description                                   |
| :----- | :------------------------------------ | :----------------------------------------------------------------------------- |
| 403    | {% break _ BANK_ACCOUNT_MISMATCH %}   | The bank account in the settlement config does not belong to the same account. |
| 403    | {% break _ ACCOUNT_REGION_MISMATCH %} | The merchant's "country" does not match the "region" on the Account.           |

### Get a Merchant

{% reqspec %}
  GET '/api/merchants/{merchantId}'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
{% endreqspec %}


{% h4 Example response payload %}

{% json %}
{
  "id": "5ee0c486308f590260d9a07f",
  "accountId": "yqwyya0rzz3vvshqw0474u89xtj5fn",
  "name": "Parisian - Brown",
  "test": false,
  "country": "AD",
  "onboardingStatus": "applied",
  "createdAt": "2021-11-12T01:17:46.499Z",
  "updatedAt": "2021-11-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
}
{% endjson %}

### List Merchants for Account

Returns a [paginated][] list of Merchants attached to an Account.

{% reqspec %}
  GET '/api/accounts/{accountId}/merchants'
  auth 'api-key'
  path_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "items": [
    {
      "accountId": "Jaim1Cu1Q55uooxSens6yk",
      "country": "BT",
      "id": "5f6bf6ff81552101f8ff6122",
      "name": "Adams, Runolfsdottir and Botsford",
      "test": true,
      "onboardingStatus": "applied",
      "createdAt": "2021-11-12T01:17:46.499Z",
      "updatedAt": "2021-11-12T01:17:46.499Z",
      "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
      "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
    },
    {
      "accountId": "Jaim1Cu1Q55uooxSens6yk",
      "country": "GM",
      "id": "5f6bf6ff81552101f8ff6123",
      "name": "Vandervort Inc",
      "test": false,
      "onboardingStatus": "applied",
      "createdAt": "2021-11-12T01:17:46.499Z",
      "updatedAt": "2021-11-12T01:17:46.499Z",
      "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
      "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
    },
  ]
}
{% endjson %}

### Update a Merchant

{% reqspec %}
  PUT '/api/merchants/{merchantId}'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
  body ({
    name: 'Centrapay Café',
    location: {
      lat: '-36.8483579',
      lng: '174.7725834',
      city: 'Auckland',
      postCode: '1010',
      country: 'NZ'
    },
    settlementConfig: {
      bankAccountId: 'WRhAxxWpTKb5U7pXyxQjjY'
    }
  })
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "id": "5ee0c486308f590260d9a07f",
  "accountId": "yqwyya0rzz3vvshqw0474u89xtj5fn",
  "name": "Centrapay Café",
  "test": false,
  "country": "NZ",
  "onboardingStatus": "applied",
  "location": {
    "lat": "-36.8483579",
    "lng": "174.7725834",
    "city": "Auckland",
    "postCode": "1010",
    "country": "NZ"
  },
  "settlementConfig": {
    "bankAccountId": "WRhAxxWpTKb5U7pXyxQjjY"
  },
  "createdAt": "2021-09-12T01:11:22.491Z",
  "updatedAt": "2021-11-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
}
{% endjson %}

{% h4 Error Responses %}

| Status |                Code                 |                                  Description                                   |
| :----- | :---------------------------------- | :----------------------------------------------------------------------------- |
| 403    | {% break _ BANK_ACCOUNT_MISMATCH %} | The bank account in the settlement config does not belong to the same account. |

### Set Merchant Onboarding Status

{% reqspec %}
  POST '/api/merchants/{merchantId}/set-onboarding-status'
  auth 'api-key'
  path_param 'merchantId', '5ee0c486308f590260d9a07f'
  body ({
    onboardingStatus: 'deactivated',
		onboardingStatusReason: 'change-of-ownership'
  })
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "type": "set-onboarding-status",
  "onboardingStatus": "deactivated",
  "onboardingStatusReason": "change-of-ownership",
  "merchantId": "MhocUmpxxmgdHjr7DgKoKw",
  "createdAt": "2021-09-12T01:11:22.491Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "activityNumber": "2",
}
{% endjson %}

### Search Merchants

{% reqspec %}
  GET '/api/merchants/search'
  auth 'api-key'
{% endreqspec %}

{% h4 Request Query Parameters %}

|       Query Parameter   |                                  Description                                                         |
| :---------------------- | :--------------------------------------------------------------------------------------------------- |
| {% break _ origin %}    | The point to be searched around, passed as a lat/lng pair of the form 123.456,54.321                 |
| {% break _ distance %}  | The distance from the origin to be searched around in km. Required if origin is supplied             |
| {% break _ assetType %} | The assetType to filter merchants by. This can be supplied multiple times to further filter results  |
| {% break _ name %}      | Name of the merchant. This will match partial names                                                  |

{% h4 Example response payload %}

{% json %}
{
	items: [
		{
			"id": "M001",
			"name": "Store 1",
			"acceptedAssetTypes": [
				"centrapay.nzd.main",
				"epay.nzd.main",
			],
			"location": {
	      "lat": "123.45",
	      "lng": "32.21",
	      "city": "Auckland",
	      "country": "NZ",
	      "postCode": "1234",
	      "state": "Auckland",
	      "street": "2 Street Street",
	      "suburb": "Place",
	    },
		},
	],
}
{% endjson %}

### List all Merchants **DEPRECATED**

Returns a [paginated][] list of Merchants which belong to the authenticated subject.

{% reqspec %}
  GET '/api/merchants'
  auth 'api-key'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "items": [
    {
      "accountId": "3xsjxxwmnpkunjbcpekyekc84rzxr4",
      "country": "BT",
      "id": "5f6bf6ff81552101f8ff6122",
      "name": "Adams, Runolfsdottir and Botsford",
      "test": true,
      "onboardingStatus": "applied",
      "createdAt": "2021-11-12T01:17:46.499Z",
      "updatedAt": "2021-11-12T01:17:46.499Z",
      "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
      "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
    },
    {
      "accountId": "3xsjxxwmnpkunjbcpekyekc84rzxr4",
      "country": "GM",
      "id": "5f6bf6ff81552101f8ff6123",
      "name": "Vandervort Inc",
      "test": false,
      "onboardingStatus": "applied",
      "createdAt": "2021-11-12T01:17:46.499Z",
      "updatedAt": "2021-11-12T01:17:46.499Z",
      "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
      "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
    },
    {
      "accountId": "3xsjxxwmnpkunjbcpekyekc84rzxr4",
      "country": "MZ",
      "id": "5f6bf6ff81552101f8ff6124",
      "name": "West, O'Reilly and Huels",
      "test": true,
      "onboardingStatus": "applied",
      "createdAt": "2021-11-12T01:17:46.499Z",
      "updatedAt": "2021-11-12T01:17:46.499Z",
      "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
      "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey"
    },
  ]
}
{% endjson %}

[Merchant Configs]: {% link api/merchants/merchant-configs.md %}
[Payment Requests]: {% link api/payment-requests/payment-requests.md %}
[ISO 3166]: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
[Location]: {% link api/data-types.md %}#Location
[paginated]: {% link api/pagination.md %}
[Account]: {% link api/accounts/accounts.md %}
