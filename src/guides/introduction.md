---
layout: default
nav_order: 1
parent: Guides
title: Guides
permalink: /guides/introduction
---

# Guides

Guides and examples of how to use Centrapay.

<ul class="nav-list">
  {%- assign ordered_pages_list = site.html_pages | where_exp:"item", "item.nav_order != nil" -%}
  {%- assign unordered_pages_list = site.html_pages | where_exp:"item", "item.nav_order == nil" -%}
  {%- assign sorted_ordered_pages_list = ordered_pages_list | sort:"nav_order" -%}
  {%- assign sorted_unordered_pages_list = unordered_pages_list | sort:"title" -%}

  {%- assign pages_list = sorted_ordered_pages_list | concat: sorted_unordered_pages_list -%}

  {%- assign children_list = pages_list | where: "parent", "Guides" -%}
  {%- for child in children_list -%}
    {%- unless child.url == page.url -%}
      <li>
        <a href="{{ child.url | absolute_url }}">{{ child.title }}</a>
      </li>
    {%- endunless -%}
  {%- endfor -%}

</ul>
