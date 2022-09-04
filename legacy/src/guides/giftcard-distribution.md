---
layout: default
parent: Guides
title: Loading & Sending Assets
permalink: /guides/loading-and-sending-assets
---

# Loading and Sending Assets

[Assets][] such as Giftcards or Tokens can be issued by a Centrapay Account and then distributed to
another Centrapay user's phone number via SMS.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}

## Loading Giftcards

You can load Giftcards by calling our [External Assets] endpoint. You will need to use the giftcard
number for the `externalId` field. The `pin`, the `issuer` and the `type` need to be on hand too.

If your asset type is not included on the list, contact [integrations@centrapay.com](mailto:integrations@centrapay.com).

## Sending Assets

You can send Assets such as Tokens and Giftcards by calling our [Asset Transfers][] endpoint.
You will need to have the recipient's phone number for `recipientAlias` to identify the reciever.

Optionally the `senderAlias` field can be used if you're loading an asset on behalf of someone else.
If the `recipientAlias` doesn't end up creating a Centrapay account, then it will be sent to this
number.

## Example: Bulk distribution of Giftcards

Sometimes you might want to load and distribute Giftcards to a large number of recipients. This
requires some scripting, but this is not hard. We can do this with:

* A CSV to manage Giftcards to load
* A script to load and send Giftcards

Here's an example of the CSV named `input.csv`:

```
recipientAlias,cardNumber,pin,message
+64221231234,23403321042,1111,Hello Bob! Here's your giftcard
+64221231235,23403321042,1111,Hello Alice! Here's your giftcard
+64221231236,23403321042,1111,Hello Eve! Here's your giftcard
```

{% warning Phone numbers must start with +64 %}

Here's an example of the script to parse the CSV and send Giftcards. To run this, you will need:

* Node JS in your environment
* A copy of [Axios][]{:.external} for HTTP requests
* An [API Key][] to call our APIs
* Your [Account id][] for the initial load of each Giftcard

```javascript
#!/usr/bin/env node

const apiKey = 'api123'; // FIXME
const accountId = 'acc123'; // FIXME
const inputFile = './input.csv';
const type = 'epay.nzd.main';
const category = 'giftcard';
const issuer = 'ezipay';
const baseUrl = 'https://service.centrapay.com';

const axios = require('axios');
const fs = require('fs');
const sleep = require('util').promisify(setTimeout);

// calls axios and return parsed body, sleep and retry if we get 429
async function requestWithRetry(args) {
  let response;
  try {
    response = await axios.request(args);
  } catch(err) {
    if (err.response.status != 429) {
      throw(err);
    }
    const retrySeconds = Number(err.response.headers['retry-after']) + 1;
    await sleep(retrySeconds * 1000);
    response = await axios.request(args);
  }
  return response.data;
}

// loads and sends giftcard to a phone number
async function sendGiftcard({ recipientAlias, cardNumber, pin, message }) {
  const asset = await requestWithRetry({
    method: 'POST',
    url: `${baseUrl}/api/external-assets`,
    data: { accountId, pin, category, issuer, type, externalId: cardNumber },
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
    },
  });
  const assetTransfer = await requestWithRetry({
    method: 'POST',
    url: `${baseUrl}/api/asset-transfers`,
    data: { recipientAlias, message, assetId: asset.id },
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
    },
  });
  return `Sent ${cardNumber} to ${recipientAlias} with assetTransferId ${assetTransfer.id}`;
}

// takes a CSV and returns a list of objects where headings are the keys
function parseCsv(input) {
  const lines = String(input).split('\n').filter(line => line.length);
  const [headings, ...rows] = lines.map(row => row.split(',').map(cell => cell.trim()));
  const objectList = rows.map(values => {
    const outRow = {};
    for (const [i, heading] of Object.entries(headings)) {
      outRow[heading] = values[i]
    }
    return outRow;
  });
  return objectList;
}

// loads from input.csv and sends giftcards to people
async function run() {
  const start = new Date();
  const data = await fs.promises.readFile(inputFile);
  const csv = parseCsv(data);
  for (const row of csv) {
    const msg = await sendGiftcard(row);
    console.log(msg);
  }
  const duration = new Date() - start;
  return `Done in ${duration / 1000} seconds`;
}

// entry into the script
run()
  .then(console.log)
  .catch(console.error);
```

[Assets]: {% link api/assets/assets.md %}
[External Assets]: {% link api/assets/external-assets.md %}
[Asset Transfers]: {% link api/assets/asset-transfers.md %}#asset-transfer-create
[API Key]: {% link api/api-keys.md %}#asset-transfer-create
[Account id]: {% link api/accounts/accounts.md %}
[Account Memberships]: {% link api/accounts/account-memberships.md %}
[Axios]: https://www.npmjs.com/package/axios
