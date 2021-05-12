---
layout: default
title: Quotas
nav_order: 7
permalink: /api/quotas
redirect_from:
  - /quotas
---

# Quotas
{:.no_toc}

Centrapay account quotas are enforced on usage types such as spending or topping up, and may apply to a time
period (daily, monthly, yearly). Account quotas may be affected by the verification status of the Centrapay account.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}


## Getting account quotas **EXPERIMENTAL**

{% endpoint GET https://service.centrapay.com/api/accounts/{accountId}/quotas %}

Retrieve quota limits and usages for the current intervals. Ie, all quotas for
the current day, current month and current year as well as any quotas that are
not associated with a temporal period.

```sh
curl -X GET "https://service.centrapay.com/api/accounts/Jaim1Cu1Q55uooxSens6yk/quotas" \
  -H "x-api-key: 1234"
```

**Example response payload**

```json
[
  {
    "limit": "1000",
    "interval": "2021-03",
    "period": "monthly",
    "usage": "500",
    "type": "spend",
    "assetType": "centrapay.nzd.main"
  },
  {
    "limit": "9999",
    "interval": "2021",
    "period": "yearly",
    "usage": "1555",
    "type": "spend",
    "assetType": "centrapay.nzd.main"
  },
  {
    "limit": "1000",
    "interval": "2021-03",
    "period": "monthly",
    "usage": "500",
    "type": "topup",
    "assetType": "centrapay.nzd.main"
  },
  {
    "limit": "9999",
    "interval": "2021",
    "period": "yearly",
    "usage": "5000",
    "type": "topup",
    "assetType": "centrapay.nzd.main"
  }
]
```

## Quota model

**Required Fields**

| Field                                 | Type   | Description                    |
| :------------------------------------ | :----- | :----------------------------- |
| type                                  | String | The quota's type.              |
| limit                                 | String | The quota's upper usage limit. |
| usage                                 | String | The quota's current usage.     |

**Optional Fields**

| Field       | Type     | Description                                                                                |
| :---------- | :------- | :--------------------------------------------------------------------------                |
| assetType   | String   | The type of asset the quota is scoped to, eg `centrapay.nzd.main`.                         |
| period      | String   | The recurring, time-bound quota's duration: `daily`, `monthly` or `yearly`.                |
| interval    | String   | The specific day, month or year the quota applies to, eg: `2020-01-01`, `2020-01`, `2020`. |

**Supported Quota Types**

The following table describes the supported quota types and variants. The
"Scoped" column indicates whether the quota can have different values for
different asset types. The "Periods" column indicates which periods are
applicable to the quota.

| Type  | Description                                                         | Scoped | Periods            |
|:------|:--------------------------------------------------------------------|:------:|:-------------------|
| spend | Value of wallet-based payments or asset transfers from the account. |   Yes  | `monthly` `yearly` |
| topup | Value of topups from bank accounts linked to the account.           |   Yes  | `monthly` `yearly` |

<span id="quota-error-response"></span>
**Error Responses**

If a quota limit is exceeded by an action that enforces quota limits, the following error response will be returned. The `quotas` field will contain all quota limits that are exceeded with the usage set to the amount that the quota would have been updated to if the action was completed.

```json
{
  "message": "QUOTA_EXCEEDED",
  "quotas":[{
    "limit": "9999",
    "interval": "2021",
    "period": "yearly",
    "usage": "10000",
    "type": "topup",
    "assetType": "centrapay.nzd.main"
  }]
}
```
