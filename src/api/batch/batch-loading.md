---
layout: default
grand_parent: API Reference
parent: Batch
title: Batch Loading
nav_order: 1
permalink: /api/batch-loading
---

# Batch Loading
{:.no_toc}

Batch loading enables bulk loading of assets onto the Centrapay platform.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Batch lifecycle

<img src="{{site.url}}/images/batch-lifecycle.png" style="display: block; margin: auto;" />

|  Status  |                 Description                  |
| :------- | :------------------------------------------- |
| created  | The batch has successfully been initiated.   |
| copied   | The file has been transferred to Centrapay.  |
| chunked  | The batch has been broken up for processing. |
| complete | The batch processing has been completed.     |
| error    | There is an error with the batch file.       |

## Create a Batch **EXPERIMENTAL**



Initialize loading of assets from a batch file.

{% reqspec %}
  POST '/api/external-asset-batches'
  auth 'api-key'
  example {
    body ({
      type: 'farmlands-external-asset',
      url: 'https://azurebuckets.com/1234',
      accountId: 'C4QnjXvj8At6SMsEN4LRi9'
    })
  }
{% endreqspec %}

{% h4 Required Fields %}

|   Field   |  Type  |               Description                |
| :-------- | :----- | :--------------------------------------- |
| type      | String | The batch's type.                        |
| url       | String | The url where the batch file is located. |
| accountId | String | The Batch’s owning Centrapay Account id. |

{% h4 Supported Batch Types %}

|           Type           |           Description           |
| :----------------------- | :------------------------------ |
| farmlands-external-asset | [Asset loading for Farmlands][] |

{% h4 Example Response Payload %}

{% json %}
{
	id: "abc1234",
	status: "created",
	type: "farmlands-external-asset",
	count: 0,
	errorCount: 0,
	errors: []
}
{% endjson %}

## Get batch progress **EXPERIMENTAL**

{% reqspec %}
  GET '/api/external-asset-batches/{batchId}'
  path_param 'batchId', 'abc1234'
  auth 'api-key'
{% endreqspec %}

{% h4 Example Response Payload %}

{% json %}
{
	"id": "abc1234",
	"status": "complete",
	"type": "farmlands",
	"count": "10",
	"errorCount": "2",
	"errors": [
		{
			"ref": "1234",
			"index": "5",
			"message": "no dice",
		}
	]
}
{% endjson %}

[Asset loading for Farmlands]: {% link api/batch/farmlands.md %}
