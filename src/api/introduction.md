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


[RMM]: https://en.wikipedia.org/wiki/Richardson_Maturity_Model
