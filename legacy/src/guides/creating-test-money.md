---
layout: default
parent: Guides
title: Creating Test Money
nav_order: 3
permalink: /guides/creating-test-money
---

# Creating Test Money

In order to make testing easier, most Centrapay assets have a "test" variant
which can be issued at no cost. In the case of money, issuing the test variant
(eg "centrapay.nzd.test") requires linking a "test" bank account which, instead
of going through the banking system, sends transaction notifications to the
email address of the initiating user.

The test bank account can be used to create a topup request. The 4-digit bank
account verification code, which normally appears in your bank account
statement, will be included in the emailed transaction notification.

The test assets can be created via either the Centrapay API or the Centrapay
app.

{% warning Test bank accounts count toward resource quotas. %}


## Via API

To create test dollars via the Centrapay API:

1. **Add email to Centrapay profile:** If not already configured, set an email
   on your Centrapay user profile via the [update profile endpoint][].

2. **Create a test bank account:** Create a bank account, using "00-" as the
   bank account number prefx, via the [create bank account endpoint][].

3. **Create a test topup:** Use the test bank account id to topup up via the
   [topup endpoint][]. The topup *must* be created with a Centrapay user (ie:
   authenticated with JWT, not an API key) in order for the transaction email
   notification to be delivered.

4. **Verify the bank account:** Post the 4-digit code from the test transaction
   confirmation email, along with the test bank account id, to the
   [verify bank account endpoint][].


## Via Centrapay App

To create test dollars via the Centrapay app:

1. **Enable Test Assets:** Create a test payment request at
   {% external_link https://app.centrapay.com/test %}. Follow the link to pay the payment
   request (`https://app.centrapay.com/pay/{id}`) and, when prompted, enable
   test assets.

2. **Link Test Bank Account:** Visit {% external_link https://app.centrapay.com/bank-accounts %}
   and link a bank account using "00-" as the bank account number prefix.

3. **Topup and Verify:** Topup via {% external_link https://app.centrapay.com/topup %} by
   choosing the test bank account. You will receive a test transaction
   confirmation email with a 4-digit code to "verify" the test bank account.
   After the bank account is verified, the topup amount will be released into
   your Centrapay account.

[update profile endpoint]: {% link api/profiles.md %}#updating-a-user-profile
[create bank account endpoint]: {% link api/bank-accounts/bank-accounts.md %}#bank-account-create
[topup endpoint]: {% link api/bank-accounts/funds-transfers.md %}#creating-a-top-up
[verify bank account endpoint]: {% link api/bank-accounts/bank-accounts.md %}#verify-a-bank-account
