---
layout: default
nav_order: 3
parent: API Reference
title: Status Codes
permalink: /api/status-codes
---

# HTTP Status Codes

Centrapay APIs respond with 200, 400, 401, 403, 404, or 429 HTTP status codes.
In rare cases endpoints may respond with 5xx status codes.

Some legacy or deprecated endpoints may have exceptions to the guidelines
documented here. Any such exceptions will be documented on the endpoints.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}


## 200 Ok

Everything's ok. Enjoy your well formed response!

## 400 Malformed Request

This is a syntax failure. When you get these back, your application needs to change the way it
behaves in order to get back the resource that you're after.

Don't try again, this is never going to work.

{% h4 Example response body %}

```json
{
  "statusCode": 400,
  "message": "\"amount\" is required"
}
```

{% h4 Debugging %}

* Make sure you set "content-type: application/json"
* The response body should indicate where the error is
* Make sure your HTTP body fields are set correctly
* Check query parameters are set correctly
* Check path parameters are set correctly

## 401 Unauthorized

API key or JWT is missing. Go look at our [Auth][] documentation.

{% h4 Example response body %}

```json
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Missing authentication"
}
```


## 403 Permission Denied

A 403 status indicates resource missing, permission denied or
business rule violation.

### Resource missing or permission denied

{% h4 Example response body %}

```json
{
  "statusCode": 403,
  "error": "Forbidden",
  "message": "Forbidden"
}
```

{% h4 Debugging %}

* Check the resource id is correct
* Check your user or API key has membership for the account that owns the resource you are accessing.
* Check the role of your user or API key has permission (See [Auth Permissions][]).

### Business rule violated

When the resource exists and access is authorized but some other business rule
is violated then a 403 is returned. Additional information will be included in
the "message" field of the response body. The possible values for the "message"
field will be documented on each endpoint.

{% h4 Example response body %}

```json
{
  "statusCode": 403,
  "error": "Forbidden",
  "message": "INSUFFICIENT_BALANCE"
}
```


## 404 Route Not Found

Variant on a 400, there's a bug in your code that means you've got a typo in the URL. Please check
against examples in our documentation.

{% h4 Example response body %}

```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Not Found"
}
```

## 429 Too Many Requests

Centrapay API rate limits have been exceeded.

{% h4 Example response body %}

```json
{
  "statusCode": 429,
  "error": "Too Many Requests",
  "message": "RATE_LIMIT_EXCEEDED"
}
```

{% h4 Debugging %}

 * Check the `Retry-After` HTTP response header for the number of seconds
   before the next request will be accepted.
 * Contact [devsupport@centrapay.com]() to increase your limits.


## 5xx Server Error

If you get a 500 level error, something has gone wrong on our end. Our goal is
to never have these codes. Usually a Centrapay Engineer will investigate but
bug reports are also welcome at [devsupport@centrapay.com]().


[Auth]: {% link api/auth.md %}
[Auth Permissions]: {% link api/auth.md %}#permissions
