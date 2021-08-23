---
layout: default
parent: API Reference
title: Integration Requests
permalink: /api/integration-requests
---

# Integration Requests
{:.no_toc}

Integration Requests enable terminal integrations and acceptance of asset types for a [Merchant][].

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Integration Request

{% h4 Mandatory Fields %}

|   Field    |  Type  |                                                           Description                                                            |
| :--------- | :----- | :------------------------------------------------------------------------------------------------------------------------------- |
| id         | String | The Integration Request's unique identifier.                                                                                     |
| accountId  | String | The Integration Request's owning Centrapay Account ID.                                                                           |
| merchantId | String | The Merchant ID for the Integration Request.                                                                                     |
| type       | String | The type of the Integration Request. Refer to [Integration Types](#integration-types).                                           |
| status     | String | The current status of the Integration Request. Supported values are `active`, `available`, `pending`, `rejected` and `disabled`. |

{% h4 Optional Fields %}

|   Field    |  Type  |                            Description                            |
| :--------- | :----- | :---------------------------------------------------------------- |
| terminalId | String | The payment system terminal ID. Required for NZ Epay integration. |

### Integration Types

| Name     | Description                                      |
| :------- | : ---------------------------------------------- |
| verifone | Terminal vendor [Verifone][verifone]{:.external} |
| windcave | Terminal vendor [Windcave][windcave]{:.external} |
| epay     | Asset provider [ePay][epay]{:.external}          |

## Operations

### Create an Integration Request **EXPERIMENTAL**

{% reqspec %}
  POST '/api/integration-requests'
  auth 'api-key'
  body ({
    accountId: 'Jaim1Cu1Q55uooxSens6yk',
    merchantId: '5ee0c486308f590260d9a07f',
    type: 'epay'
  })
{% endreqspec %}

{% h4 Required Fields %}

|   Field    |  Type  |                      Description                       |
| :--------- | :----- | :----------------------------------------------------- |
| accountId  | String | The Integration Request's owning Centrapay Account id. |
| merchantId | String | The Merchant ID for the Integration Request.           |
| type       | String | The type of the Integration Request.                   |

{% h4 Example response payload %}

```json
{
  "id": "DKTs3U38hdhfEqwF1JKoT2",
  "accountId": "Jaim1Cu1Q55uooxSens6yk",
  "merchantId": "5ee0c486308f590260d9a07f",
  "type": "verifone",
  "status": "pending",
  "createdAt": "2020-06-12T01:17:46.499Z",
  "updatedAt": "2020-06-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
}
```

{% h4 Error Responses %}

| Status |             Code              |                               Description                                |
| :----- | :---------------------------- | :----------------------------------------------------------------------- |
| 403    | INTEGRATION_ALREADY_REQUESTED | An Integration Request with the same merchantId and type already exists. |

### Search Integration Requests **EXPERIMENTAL**

{% reqspec %}
  GET '/api/integration-requests'
  auth 'api-key'
  query_param 'type', 'epay'
  query_param 'pending', 'true'
  query_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
{% endreqspec %}

{% h4 Query Parameters %}

| Parameter |                                                   Description                                                    |
| :-------- | :--------------------------------------------------------------------------------------------------------------- |
| accountId | The Integration Request's owning Centrapay Account ID. Required unless caller has global read access permission. |
| type      | The type of Integration Request.                                                                                 |
| pending   | When set to `true`, only include Integration Requests with pending status.                                       |

{% h4 Example response payload %}

```json
{
  "items": [
    {
      "id": "DKTs3U38hdhfEqwF1JKoT2",
      "accountId": "Jaim1Cu1Q55uooxSens6yk",
      "merchantId": "5ee0c486308f590260d9a07f",
      "type": "epay",
      "status": "pending",
      "terminalId": "11000021",
      "createdAt": "2020-06-12T01:17:46.499Z",
      "updatedAt": "2020-06-12T01:17:46.499Z",
      "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
      "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
    }
  ]
}
```

### Update Integration Request **EXPERIMENTAL**

Supply parameter values for the Integration Request.

{% reqspec %}
  POST '/api/integration-requests/{integrationRequestId}/update'
  auth 'api-key'
  path_param 'integrationRequestId', 'DKTs3U38hdhfEqwF1JKoT2'
  body ({
    terminalId: '11000021'
  })
{% endreqspec %}

{% h4 Optional Fields %}

|   Field    |  Type  |                                           Description                                           |
| :--------- | :----- | :---------------------------------------------------------------------------------------------- |
| terminalId | String | ePay terminalId for the Integration Request. Required if type is `epay`. |

{% h4 Example response payload %}

```json
{
  "id": "DKTs3U38hdhfEqwF1JKoT2",
  "accountId": "Jaim1Cu1Q55uooxSens6yk",
  "merchantId": "5ee0c486308f590260d9a07f",
  "type": "epay",
  "status": "pending",
  "terminalId": "11000021",
  "createdAt": "2020-06-12T01:17:46.499Z",
  "updatedAt": "2020-06-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
}
```

### Activate Integration Request **EXPERIMENTAL**

{% reqspec %}
  POST '/api/integration-requests/{integrationRequestId}/activate'
  auth 'api-key'
  path_param 'integrationRequestId', 'DKTs3U38hdhfEqwF1JKoT2'
{% endreqspec %}

{% h4 Example response payload %}

```json
{
  "id": "DKTs3U38hdhfEqwF1JKoT2",
  "accountId": "Jaim1Cu1Q55uooxSens6yk",
  "merchantId": "5ee0c486308f590260d9a07f",
  "type": "epay",
  "status": "active",
  "terminalId": "11000021",
  "createdAt": "2020-06-12T01:17:46.499Z",
  "updatedAt": "2020-06-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
}
```

{% h4 Error Responses %}

| Status |             Code              |                                    Description                                     |
| :----- | :---------------------------- | :--------------------------------------------------------------------------------- |
| 403    | INTEGRATION_PARAM_MISSING     | Integration Request needs updating with the required parameters before activating. |
| 403    | INTEGRATION_ALREADY_ACTIVATED | Integration Request is already activated.                                          |

[verifone]: https://www.verifone.com/en/us
[windcave]: https://www.windcave.com/
[epay]: https://www.epay.com/
[Merchant]: {% link api/merchants/merchants.md %}
