---
layout: default
nav_order: 5
parent: API Reference
title: Pagination
permalink: /api/pagination
---

# Pagination

Pagination allows a listing endpoint to return a subset of results. The goal is to reduce memory
usage and speed up page rendering.

### Models

{% h4 Mandatory Fields %}

| Field       | Type    | Description                   |
| ----------- | ------- | ----------------------------- |
| items       | Array   | A list from the current page. |

{% h4 Optional Fields %}

| Field       | Type    | Description                                                       |
| ----------- | ------- | ----------------------------------------------------------------- |
| nextPageKey | String  | Can be used to fetch the next page, not present on the last page. |

### Example

A page with more content

{% json %}
  nextPageKey: 5ee0c486308f590260d9a07f|ded3f328-1123-11ec-bf1a-5ba46eb12a7d
  items:
    - value: "16"
      assetType: centrapay.nzd.main
    - value: "32"
      assetType: centrapay.nzd.main
    - value: "64"
      assetType: centrapay.nzd.main
{% endjson %}

The last page

{% json %}
  items:
    - value: "128"
      assetType: centrapay.nzd.main
{% endjson %}
