---
layout: default
grand_parent: API Reference
parent: Integrations
title: Integration Requests
permalink: /api/integration-requests
---

# Integration Requests
{:.no_toc}

An Integration Request allows Centrapay users to request the creation of an [Integration][] on a Centrapay account.

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
| accountId  | String | The Integration Request's owning Centrapay Account id.                                                                           |
| merchantId | String | The Merchant id for the Integration Request.                                                                                     |
| type       | String | The type of the Integration Request. Refer to [Integration Types](#integration-types).                                           |
| status     | String | The current status of the Integration Request. Supported values are `active`, `available`, `pending`, `rejected` and `disabled`. |

{% h4 Optional Fields %}

|   Field    |         Type          |                                 Description                                 |
| :--------- | :-------------------- | :-------------------------------------------------------------------------- |
| terminalId | String                | The payment system terminal id. Required for NZ Epay integration.           |
| terminal   | [Terminal](#terminal) | The terminal configuration. Required for all terminal vendors except Vista. |
| product    | [Product](#product)   | The requested Epay gift card types to support.                              |

### Terminal
{% h4 Required Fields %}

|   Field    |  Type  |                     Description                     |
| :--------- | :----- | :-------------------------------------------------- |
| terminalId | String | The software or logical id of the payment terminal. |

{% h4 Optional Fields %}

|  Field   |  Type  |                        Description                        |
| :------- | :----- | :-------------------------------------------------------- |
| deviceId | String | The hardware id or serial number of the payment terminal. |

### Product
{% h4 Required Fields %}

| Field |  Type  |               Description               |
| :---- | :----- | :-------------------------------------- |
| name  | String | The name of the requested Epay product. |


### Integration Types

| Name     | Description                                      |
| :------- | : ---------------------------------------------- |
| verifone | Terminal vendor [Verifone][verifone]{:.external} |
| windcave | Terminal vendor [Windcave][windcave]{:.external} |
| epay     | Asset provider [ePay][epay]{:.external}          |
| smartpay | Terminal vendor [smartpay][smartpay]{:.external} |
| invenco  | Terminal vendor [invenco][invenco]{:.external}   |
| skyzer   | Terminal vendor [skyzer][skyzer]{:.external}     |
| vista    | Terminal vendor [vista][vista]{:.external}       |

## Operations

### Create an Integration Request **EXPERIMENTAL**

{% reqspec %}
  POST '/api/integration-requests'
  auth 'api-key'
  example {
    body ({
      merchantId: '5ee0c486308f590260d9a07f',
      type: 'verifone',
      terminal: {
        terminalId: '002039390093939',
        deviceId: '002-039-390'
      }
    })
  }
  example {
    body ({
      merchantId: '5ee0c486308f590260d9a07f',
      type: 'epay',
      product: {
        name: 'koha-card',
      }
    })
  }
{% endreqspec %}

{% h4 Required Fields %}

|   Field    |  Type  |                      Description                       |
| :--------- | :----- | :----------------------------------------------------- |
| merchantId | String | The Merchant id for the Integration Request.           |
| type       | String | The type of the Integration Request.                   |

{% h4 Optional Fields %}

|   Field    |  Type  |                      Description                       |
| :--------- | :----- | :----------------------------------------------------- |
| terminal   | [Terminal](#terminal) | The terminal configuration. Required for Verifone and Windcave integration. |
| product    | [Product](#product)   | The requested Epay gift card types to support.                              |

{% h4 Example response payload %}

{% json %}
id: DKTs3U38hdhfEqwF1JKoT2
accountId: Jaim1Cu1Q55uooxSens6yk
merchantId: 5ee0c486308f590260d9a07f
type: verifone
status: pending
createdAt: 2020-06-12T01:17:46.499Z
updatedAt: 2020-06-12T01:17:46.499Z
createdBy: crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey
updatedBy: crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey
terminal: {
  terminalId: '002039390093939',
  deviceId: '002-039-390'
}
{% endjson %}

{% json %}
id: DKTs3U38hdhfEqwF1JKoT2
accountId: Jaim1Cu1Q55uooxSens6yk
merchantId: 5ee0c486308f590260d9a07f
type: epay
status: pending
createdAt: 2020-06-12T01:17:46.499Z
updatedAt: 2020-06-12T01:17:46.499Z
createdBy: crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey
updatedBy: crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey
product: {
  name: 'koha-card',
}
{% endjson %}

### Get an Integration Request **EXPERIMENTAL**

{% reqspec %}
  GET '/api/integration-requests/{integrationRequestId}'
  auth 'api-key'
  path_param 'integrationRequestId', 'DKTs3U38hdhfEqwF1JKoT2'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
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
  "product": {
    "name": "koha-card"
  }
}
{% endjson %}

### Search Integration Requests **EXPERIMENTAL**

Returns a [paginated][] list of Integration Requests.

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
| accountId | The Integration Request's owning Centrapay Account id. Required unless caller has global read access permission. |
| type      | The type of Integration Request.                                                                                 |
| pending   | When set to `true`, only include Integration Requests with pending status.                                       |

{% h4 Example response payload %}

{% json %}
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
      "product": {
        "name": "koha-card"
      }
    }
  ]
}
{% endjson %}

### Configure Integration Request **EXPERIMENTAL**

Supply configuration values for the Integration Request.

{% reqspec %}
  PUT '/api/integration-requests/{integrationRequestId}/configs'
  auth 'api-key'
  path_param 'integrationRequestId', 'DKTs3U38hdhfEqwF1JKoT2'
  body ({
    terminalId: '11000021'
  })
{% endreqspec %}

{% h4 Optional Fields %}

|   Field    |  Type  |                               Description                                |
| :--------- | :----- | :----------------------------------------------------------------------- |
| terminalId | String | Epay terminalId for the Integration Request. Required if type is `epay`. |

{% h4 Example response payload %}

{% json %}
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
  "product": {
    "name": "koha-card"
  }
}
{% endjson %}

### Get Integration Request Configuration **EXPERIMENTAL**

{% reqspec %}
  GET '/api/integration-requests/{integrationRequestId}/configs'
  auth 'api-key'
  path_param 'integrationRequestId', 'DKTs3U38hdhfEqwF1JKoT2'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "terminalId": "11000021",
}
{% endjson %}

### Activate Integration Request **EXPERIMENTAL**

{% reqspec %}
  POST '/api/integration-requests/{integrationRequestId}/activate'
  auth 'api-key'
  path_param 'integrationRequestId', 'DKTs3U38hdhfEqwF1JKoT2'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
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
  "product": {
    "name": "koha-card"
  }
}
{% endjson %}

{% h4 Error Responses %}

| Status |             Code              |                                    Description                                     |
| :----- | :---------------------------- | :--------------------------------------------------------------------------------- |
| 403    | INTEGRATION_PARAM_MISSING     | Integration Request needs updating with the required parameters before activating. |
| 403    | INTEGRATION_ALREADY_ACTIVATED | Integration Request is already activated.                                          |

### Delete Integration Request **EXPERIMENTAL**

{% reqspec %}
  DELETE '/api/integration-requests/{integrationRequestId}'
  auth 'api-key'
  path_param 'integrationRequestId', 'DKTs3U38hdhfEqwF1JKoT2'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{}
{% endjson %}

[verifone]: https://www.verifone.com/en/us
[windcave]: https://www.windcave.com/
[epay]: https://www.epay.com/
[vista]: https://www.vista.co
[smartpay]: https://www.smartpay.co.nz
[invenco]: https://www.invenco.com/
[skyzer]: https://www.skyzer.co.nz
[Merchant]: {% link api/merchants/merchants.md %}
[paginated]: {% link api/pagination.md %}
[Integration]: {% link api/integrations/integrations.md %}