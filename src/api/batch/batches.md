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

The batch model represents the progression for loading of a file.

{% h4 Required Fields %}

|   Field    |        Type        |                     Description                      |
| :--------- | :----------------- | :--------------------------------------------------- |
| id         | String             | The Batch's unique identifier                        |
| status     | String             | The current [Lifecycle Stage][] of the batch         |
| type       | String             | [Batch Type][] id used to describe the batch content |
| totalCount | {% dt BigNumber %} | The number of items processed                        |
| errorCount | {% dt BigNumber %} | Total [Error][] counted                              |
| errors     | Array              | [Error][] list for the batch                         |

<a name="batch-lifecycle">
### Batch Lifecycle

Different stages of a Batch's lifecycle

<img src="{{site.url}}/images/batch-lifecycle.png" style="display: block; margin: auto;" />

|  Status  |                              Description                               |
| :------- | :--------------------------------------------------------------------- |
| created  | The batch has successfully been submitted                              |
| copied   | The file has been transferred to Centrapay                             |
| chunked  | The batch has been broken up for processing                            |
| complete | The batch has been processed and may include errors                    |
| error    | There is an error accessing or reading the file, preventing processing |

<a name="batch-types">
### Batch Types

The following table describes the Batch Types supported for loading.

<table>
  <thead>
    <tr style="text-align: left">
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    {%- assign batch_types = site.html_pages | where_exp:"item", "item.batch_type != nil" -%}
    {%- for batch_type in batch_types -%}
    <tr>
      <td>
        <a href="{{ batch_type.url | absolute_url }}">{{ batch_type.batch_type }}</a>
      </td>
      <td>
       {{ batch_type.title }}
      </td>
    </tr>
    {%- endfor -%}
  </tbody>
</table>

<a name="error">
### Error

An Error represents the complete or partial failure of the batch. This could be caused by the contents, access or file format.

{% h4 Required Fields %}

|  Field  |  Type  |              Description               |
| :------ | :----- | :------------------------------------- |
| message | String | A description of what caused the Error |


{% h4 Optional Fields %}

|   Field    |        Type        |                         Description                         |
| :--------- | :----------------- | :---------------------------------------------------------- |
| externalId | String             | Field used in debugging in reference to an id from the file |
| index      | {% dt BigNumber %} | Item offset where the Error was identified in the file      |

## Operations

### Create Batch **EXPERIMENTAL**

Initialize loading of entities from a batch file.

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

|   Field   |  Type  |                    Description                    |
| :-------- | :----- | :------------------------------------------------ |
| type      | String | [Batch Type][] used to describe the batch content |
| url       | String | The url where the file is located                 |
| accountId | String | Centrapay Account Id that submitted the Batch     |


{% h4 Example Response Payload %}

{% json %}
{
	id: "AVH5uG4gRLYK6YR8JyrViN",
	status: "created",
	type: "farmlands-external-asset",
	count: "0",
	errorCount: "0",
	errors: []
}
{% endjson %}

### Get Batch **EXPERIMENTAL**

{% reqspec %}
  GET '/api/batches/{id}'
  path_param 'id', 'AVH5uG4gRLYK6YR8JyrViN'
  auth 'api-key'
{% endreqspec %}

{% h4 Example Response Payload %}

{% json %}
{
	"id": "AVH5uG4gRLYK6YR8JyrViN",
	"status": "complete",
	"type": "farmlands-external-asset",
	"count": "160000",
	"errorCount": "1",
	"errors": [
		{
			"externalId": "69d64d80-f9bd-4057-bc5b-1c55685d995b",
			"index": "1954",
			"message": "INVALID_BARCODE_LENGTH",
		}
	]
}
{% endjson %}

[Batch Type]: #batch-types
[Lifecycle Stage]: #batch-lifecycle
[Error]: #error
[Errors]: #error
