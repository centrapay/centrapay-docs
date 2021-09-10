---
layout:         default
grand_parent:   API Reference
parent:         Accounts
title:          Businesses
permalink:      /api/businesses
---

# Businesses
{:.no_toc}

A Business represents a company registered with the New Zealand Companies Office.

A Business is associated with a single [Account][].

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

### Business

|     Field     |        Type        |                    Description                     |
| :------------ | :----------------- | :------------------------------------------------- |
| id            | String             | The unique identifier.                             |
| accountId     | String             | The Centrapay accountId for an org account.        |
| accountName   | String             | The Centrapay account name for an org account.     |
| nzbn          | String             | The unique NZBN identifier.                        |
| name          | String             | Trading name recorded in the Companies Register.   |
| companyNumber | String             | Company number recorded in the Companies Register. |
| createdAt     | {% dt Timestamp %} | When the Business was created.                     |
| updatedAt     | {% dt Timestamp %} | When the Business was updated.                     |
| createdBy     | {% dt CRN %}       | The User or API Key that created the Business.     |
| updatedBy     | {% dt CRN %}       | The User or API Key that updated the Business.     |

## Operations

### Create a Business **EXPERIMENTAL**

If `accountId` is not provided when creating a business, then a new
org account will be created and associated to the business.

{% reqspec %}
  POST '/api/businesses'
  auth 'api-key'
  body ({
    nzbn: '9429046246448'
  })
{% endreqspec %}

{% h4 Required Fields %}

| Field |  Type  |         Description         |
| :---- | :----- | :-------------------------- |
| nzbn  | String | The unique NZBN identifier. |

{% h4 Optional Fields %}

|   Field   |  Type  |       Description        |
| :-------- | :----- | :----------------------- |
| accountId | String | The Centrapay accountId. |

{% h4 Example response payload %}

{% json %}
{
  "id": "DKTs3U38hdhfEqwF1JKoT2",
  "accountId": "Jaim1Cu1Q55uooxSens6yk",
  "accountName": "Centrapay",
  "nzbn": "9429046246448",
  "name": "CENTRAPAY LIMITED",
  "companyNumber": "6340244",
  "createdAt": "2020-06-12T01:17:46.499Z",
  "updatedAt": "2020-06-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
}
{% endjson %}

{% h4 Error Responses %}

| Status |      Code       |                             Description                             |
| :----- | :-------------- | :------------------------------------------------------------------ |
| 403    | INVALID_ACCOUNT | Account does not exist, is not authorized, or is of the wrong type. |
| 403    | INVALID_NZBN    | The NZBN provided does not match any NZ business.                   |

### Get a Business by Account ID **EXPERIMENTAL**

{% reqspec %}
  GET '/api/accounts/{accountId}/business'
  auth 'api-key'
  path_param 'accountId', 'Jaim1Cu1Q55uooxSens6yk'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "id": "DKTs3U38hdhfEqwF1JKoT2",
  "accountId": "Jaim1Cu1Q55uooxSens6yk",
  "accountName": "Centrapay",
  "nzbn": "9429046246448",
  "name": "CENTRAPAY LIMITED",
  "companyNumber": "6340244",
  "createdAt": "2020-06-12T01:17:46.499Z",
  "updatedAt": "2020-06-12T01:17:46.499Z",
  "createdBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
  "updatedBy": "crn:WIj211vFs9cNACwBb04vQw:api-key:MyApiKey",
}
{% endjson %}

### Search NZ Company Register **EXPERIMENTAL**

Returns a list of companies that match the queried param on company name, nzbn number or company
number. Results are [paginated][] and ordered by relevance.

{% reqspec %}
  GET '/api/nzbn-search'
  auth 'api-key'
  query_param 'q', 'centrapay'
{% endreqspec %}

{% h4 Query Parameters %}

| Parameter |                 Description                 |
| :-------- | :------------------------------------------ |
| q         | Company name, number or NZBN to search for. |

{% h4 Example response payload %}

{% json %}
{
  "items": [
    {
      "nzbn": "9429046246448",
      "companyName": "CENTRAPAY LIMITED",
      "companyNumber": "6340244"
    }
  ]
}
{% endjson %}

### Get Business Details from NZ Company Register **EXPERIMENTAL**

{% reqspec %}
  GET '/api/nzbn/{nzbn}'
  auth 'api-key'
  path_param 'nzbn', '9429046246448'
{% endreqspec %}

{% h4 Example response payload %}

{% json %}
{
  "nzbn": "9429046246448",
  "companyName": "CENTRAPAY LIMITED",
  "companyNumber": "6340244",
  "directors": [
    {
      "firstName": "John",
      "lastName": "DOE",
      "addressLines": ["7 Tara Street", "Downmore", "Auckland"]
    },
    {
      "firstName": "Jane",
      "lastName": "DOE",
      "addressLines": ["82 Greatwood Road", "Northclover", "Auckland"]
    }
  ]
}
{% endjson %}

[Account]: {% link api/accounts/accounts.md %}
[paginated]: {% link api/pagination.md %}
