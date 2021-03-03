---
layout: default
title: Home
nav_order: 1
---
<style>

a.external:after {
  content: " " url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAVklEQVR4Xn3PgQkAMQhDUXfqTu7kTtkpd5RA8AInfArtQ2iRXFWT2QedAfttj2FsPIOE1eCOlEuoWWjgzYaB/IkeGOrxXhqB+uA9Bfcm0lAZuh+YIeAD+cAqSz4kCMUAAAAASUVORK5CYII=);
}

</style>

# Introduction
{:.no_toc}

Welcome to Centrapay! We enable you to transact Fiat currency, 
Giftcards, Digital Assets and Vouchers via your point of sale, 
payment terminal, shopping cart or unattended device. We
accomplish this via our APIs which allow merchants, customers,
terminals, and smart wallets to interact with each other.

## Contents
{:.no_toc .text-delta}

* TOC
{:toc}


## Explanation of concepts
 
 * merchant id - scope of settlement, ie, may be shared  by multiple sites
 * client id - payment configuration for a merchant, may be shared by multiple integrated terminals
 * scope of merchant api key -
 * terminal id - used for billing - merchant Centrapay subscriptions allow a number of unique terminals per month
 * device id - used for auditing and police investigations 

## Example Payment Flows

### Voucher Redemption

1. Merchant creates a payment request via our API
2. Consumer is prompted to enter a voucher code on terminal
3. Consumer enters voucher Code into terminal
4. The terminal calls our API with the details of the transaction
5. We redeem the voucher if it is valid or reject it if it isn't
6. terminal displays result.

### Dynamic QR Code

1. Merchant creates a payment request via our API
2. We respond with the payment request and a generated QR code
3. The QR code is displayed by the terminal
4. Consumer scans the QR code displayed
5. Consumer selects payment type from a list of payment options a merchant supports via a Centrapay connected app
6. We prompt their smart wallet to pay the request
7. Smart wallet pays the request
8. We verify payment and notify the terminal
9. Terminal displays result

### Static QR Code at a vending machine

1. Consumer scans QR code and calls the merchants backend
2. Merchant creates a payment request via our API
3. Smart wallet displays information to the customer
4. Customer selects payment options supported by the given merchant
5. Smart wallet transfers funds to merchant
6. We verify they have the required credit and notify merchant
7. Customer picks an item from the machine > Product is vended > Merchant refunds the customer via our API

### Barcode

1. Customer generates a one time barcode via our connected app inside of their smart wallet
2. Merchant scans the barcode and creates a payment request via our API which includes the customers barcode as a parameter
3. We respond with the payment request and a generated QR code
4. The QR code is displayed by the terminal
5. Consumer scans the QR code displayed
6. Consumer selects payment type from a list of payment options a merchant supports via a Centrapay connected app
7. We prompt their smart wallet to pay the request
8. Smart wallet pays the request
9. We verify payment and notify the terminal
10. Terminal displays result

## API keys and access tokens

We handle authorization via merchant API keys or user access tokens. See our
[auth documentation]({% link auth.md %}) for more details. Our APIs for initiating
transactions can be tested using the documented test merchant API keys.  User
access tokens are issued via our login page using OAuth. For more help getting
setup, contact us via email at **devsupport@centrapay.com**.

## Experimental Features

Some API features may be flagged as **EXPERIMENTAL**. These API features may be
removed or changed without warning and should not be relied on in a production
setting.
