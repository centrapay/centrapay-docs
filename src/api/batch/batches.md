---
layout: default
grand_parent: API Reference
parent: Batches
title: Batches
nav_order: 1
permalink: /api/batches
---

# Batches
{:.no_toc}

Batches enable bulk loading of resource onto the Centrapay platform.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

<a name="batch">
### Batch

{% h4 Required Fields %}

|   Field    |        Type        |                   Description                   |
| :--------- | :----------------- | :---------------------------------------------- |
| id         | String             | The Batch's unique identifier                   |
| status     | String             | The current [Lifecycle Status][] of the batch   |
| type       | String             | The [Batch Type][]                              |
| count      | {% dt BigNumber %} | The number of objects in the batch              |
| errorCount | {% dt BigNumber %} | The number of [Errors][] found within the batch |
| errors     | Array              | Array of [Error][]                              |

<a name="batch-statuses">
### Batch Lifecycle and Statuses

|  Status  |                 Description                 |
| :------- | :------------------------------------------ |
| created  | The batch has successfully been initiated   |
| copied   | The file has been transferred to Centrapay  |
| chunked  | The batch has been broken up for processing |
| complete | The batch processing has been completed     |
| error    | There is an error with the batch file       |

<img src="{{site.url}}/images/batch-lifecycle.png" style="display: block; margin: auto;" />

<a name="batch-types">
### Batch Types

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    {%- assign batch_types = site.html_pages | where_exp:"item", "item.permalink contains '/api/batch-types/'" -%}
    {%- for batch_type in batch_types -%}
    <tr>
      <td>
        <a href="{{ batch_type.url | absolute_url }}">{{ batch_type.title }}</a>
      </td>
      <td>
       {{ batch_type.description }}
      </td>
    </tr>
    {%- endfor -%}
  </tbody>
</table>

<a name="error">
### Error

{% h4 Required Fields %}

|  Field  |  Type  |           Description            |
| :------ | :----- | :------------------------------- |
| message | String | Description of the error's cause |


{% h4 Optional Fields %}

|   Field    |        Type        |             Description              |
| :--------- | :----------------- | :----------------------------------- |
| externalId | String             | External unique identifier           |
| index      | {% dt BigNumber %} | Index of the error in the batch file |

## Operations

### Create a Batch **EXPERIMENTAL**

Initialize loading of assets from a batch file.

{% reqspec %}
  POST '/api/batches'
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
| type      | String | The [Batch Type][].                      |
| url       | String | The url where the batch file is located. |
| accountId | String | The Batch’s owning Centrapay Account id. |


{% h4 Example Response Payload %}

{% json %}
{
	id: "abc1234",
	status: "created",
	type: "farmlands-external-asset",
	count: "0",
	errorCount: "0",
	errors: []
}
{% endjson %}

### Get batch progress **EXPERIMENTAL**

{% reqspec %}
  GET '/api/batches/{id}'
  path_param 'id', 'abc1234'
  auth 'api-key'
{% endreqspec %}

{% h4 Example Response Payload %}

{% json %}
{
	"id": "abc1234",
	"status": "complete",
	"type": "farmlands-external-asset",
	"count": "0",
	"errorCount": "1",
	"errors": [
		{
			"externalId": "1234",
			"index": "5",
			"message": "No closing bracket found",
		}
	]
}
{% endjson %}

[Batch Type]: #batch-types
[Lifecycle Status]: #batch-statuses
[Error]: #error
[Errors]: #error
