---
layout: default
nav_order: 1
parent: API Reference
title: API Introduction
permalink: /api/introduction
---

# API Introduction

The Centrapay API is an [RMM][]{:.external} level 2 RESTful web service which expresses
operations in terms of HTTP verbs on resource-oriented URLs. API endpoint
definitions in these docs are grouped by resource type along with definitions
for the associated resource types.

Most API calls require [authentication]({% link auth.md %}) using an API key or
JWT. HTTP requests and responses usually have JSON payloads and use
"application/json" as the content type.

Some API features may be flagged as **EXPERIMENTAL**. These API features may be
removed or changed without warning and should not be relied on in a production
setting.


<ul class="nav-list">
  {%- assign ordered_pages_list = site.html_pages | where_exp:"item", "item.nav_order != nil" -%}
  {%- assign unordered_pages_list = site.html_pages | where_exp:"item", "item.nav_order == nil" -%}
  {%- assign sorted_ordered_pages_list = ordered_pages_list | sort:"nav_order" -%}
  {%- assign sorted_unordered_pages_list = unordered_pages_list | sort:"title" -%}

  {%- assign pages_list = sorted_ordered_pages_list | concat: sorted_unordered_pages_list -%}

  {%- assign children_list = pages_list | where: "parent", "API Reference" -%}
  {%- for child in children_list -%}
    {%- unless child.url == page.url -%}
      <li>
        <a href="{{ child.url | absolute_url }}">{{ child.title }}</a>
      </li>
    {%- endunless -%}
  {%- endfor -%}

</ul>


[RMM]: https://en.wikipedia.org/wiki/Richardson_Maturity_Model
