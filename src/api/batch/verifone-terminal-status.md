---
layout: default
title: Verifone Terminal Status Batch
parent: Batches
grand_parent: Api Reference
has_children: false
nav_exclude: true
batch_type: verifone-terminal-status
permalink: /api/batch-types/verifone-terminal-status
---

# Verifone Terminal Status Batch

Performs a bulk update to the current status for connected Verifone NZ payment terminals.

See the [Batch] resource for how to submit an instance of this batch.


| Type Name   | verifone-terminal-status |
| File Format | [JSONL][]{:.external}    |
| Record Type | [Terminal Status]       |

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Models

<a name="terminal-status">
### Terminal Status

{% h4 Fields %}

| Field             | Type                         | Description                                                 |
| :-                | :-                           | :-                                                          |
| status            | String                       | Current terminal status: "active" or "inactive".            |
| statusMessage     | String                       | Reason for status. Eg: "config update required".            |
| terminalId        | String                       | Logical terminal id. Eg: "325-136-329".                     |
| deviceId          | String {% opt %}             | Hardware serial number. Eg: "T404395000002".                |
| merchantId        | String {% opt %}             | Centrapay [Merchant] id.                                    |
| merchantConfigId  | String {% opt %}             | Centrapay [Merchant Config] id.                             |
| merchantName      | String {% opt %}             | Name of merchant. Eg: "Centra Café".                        |
| description       | String {% opt %}             | Description of the device. Eg "Front Till"                  |
| model             | String {% opt %}             | Hardware model. Eg: "VX820".                                |
| firstSeen         | {% dt Timestamp %} {% opt %} | Date when terminal status was first observed.               |
| lastSeen          | {% dt Timestamp %} {% opt %} | Date when terminal status was last observed.                |
| configVersion     | String {% opt %}             | Version of loaded terminal configuration. Eg: "20220214.1". |
| configUpdatedAt   | {% dt Timestamp %} {% opt %} | Date when terminal configuration was loaded.                |
| softwareVersion   | String {% opt %}             | Version of terminal software. Eg: "1.7.134".                |
| softwareUpdatedAt | {% dt Timestamp %} {% opt %} | Date when terminal software was updated.                    |


<a name="jsonl-example">
## Example JSONL File

A complete [JSONL]{:.external} batch file example. For more legible
examples refer to the pretty printed example below.

```json
{"merchantId":"06baa0708ee0e000696","merchantConfigId":"baa09e8158300063fc","merchantName":"Centra Café","description":"Till #1","model":"VX820","terminalId":"325-136-331","deviceId":"T404395000004","status":"inactive","statusMessage":"update required","firstSeen":"2020-01-14T09:00:00Z","lastSeen":"2022-03-14T09:00:00Z","configVersion": 20210914.1,"configUpdatedAt":"2021-09-15 09:00:00 UTC","softwareVersion":"1.7.134","softwareUpdatedAt":"2021-11-14 09:00:00 UTC"}
{"merchantId":"06baa0708ee0e000696","merchantConfigId":"baa09e8158300063fc","merchantName":"Centra Café","description":"Till #2","model":"VX820","terminalId":"325-136-329","deviceId":"T404395000002","status":"active","statusMessage":"ok","firstSeen":"2020-01-14T09:00:00Z","lastSeen":"2022-03-14T09:00:00Z","configVersion": 20220214.1,"configUpdatedAt":"2022-02-14 09:00:00 UTC","softwareVersion":"1.7.134","softwareUpdatedAt":"2021-11-14 09:00:00 UTC"}
```

<a name="example">
## Pretty Printed Example

{% warning
  Below our records have newlines for legibility.
  When submitting a batch file you must only use newlines to separate records.
%}

{% json %}
  merchantId: 06baa0708ee0e000696
  merchantConfigId: baa09e8158300063fc
  merchantName: "Centra Café"
  description: 'Till #2'
  model: 'VX820'
  terminalId: '325-136-329'
  deviceId: T404395000002
  status: active
  statusMessage: incompatible hardware
  firstSeen: '2020-01-14T09:00:00Z'
  lastSeen: '2022-03-14T09:00:00Z'
  configVersion: 20220214.1
  configUpdatedAt: 2022-02-14T09:00:00Z
  softwareVersion: 1.7.134
  softwareUpdatedAt: 2021-11-14T09:00:00Z
{% endjson %}


[Terminal Status]: #terminal-status
[Merchant]: {% link api/merchants/merchants.md %}
[Merchant Config]: {% link api/merchants/merchant-configs.md %}
[Example Models]: #example
[Batch]: {% link api/batch/batches.md %}
[JSONL]: https://jsonlines.org/
