---
layout: default
grand_parent: API Reference
parent: Batches
title: Batch Types
permalink: /api/batch-types
---

# Batch Types

Models and examples of different batch types.

<ul class="nav-list">
  {%- assign batch_types = site.html_pages | where_exp:"item", "item.permalink contains '/api/batch-types/'" -%}
  {%- for batch_type in batch_types -%}
    <li>
      <a href="{{ batch_type.url | absolute_url }}">{{ batch_type.title }}</a> - {{ batch_type.description }}
    </li>
  {%- endfor -%}

</ul>

