---
title: Merchant Payment Conditions
---

Some [Asset Types](https://docs.centrapay.com/api/asset-types) such as tokens or closed-loop cards may require conditional operator approval. Merchant integrations are required to support [Payment Conditions](https://docs.centrapay.com/api/payment-requests#payment-condition) for these asset types in order for them to be accepted for payment.

Examples of Merchant Payment Conditions include:

- The merchant needs to confirm proof of identification for age-restricted purchases.
- The merchant needs to confirm that a promotional item was purchased.
- The patron needs to confirm the payment from their Centrapay integrated app.

## Payment Conditions Flow

In order to support Merchant Payment Conditions, the merchant integration must extend Centrapay's payment protocol by [creating the Payment Request](https://docs.centrapay.com/api/payment-requests#create-a-payment-request) with the `conditionsEnabled` flag set to true.

The example flow below assumes that the merchant integration has first connected with the Patron when [Requesting Payment](https://www.notion.so/Requesting-Payment-ad4c917a690a4bc3a4de5fc04a7396c2) using the [QR Code Flow for Merchants](https://www.notion.so/QR-Code-Flow-for-Merchants-a445069e6d9041b48f03bbc22bd5258a) or the [Barcode Flow for Merchants](https://www.notion.so/Barcode-Flow-for-Merchants-482ac4e5879642378297f3ad17a68b54).

```mermaid
sequenceDiagram
	autonumber

	participant Patron
	participant POS
	participant Centrapay

	Patron->>POS: Connect with Patron

	POS->>Centrapay: Create Payment Request (with conditionsEnabled = true)

	loop Poll for Payment Confirmation
		POS->>Centrapay: Get Payment Request

		alt Pending Condition Exists
			note over POS: ❓ Prompt Merchant to Accept or Decline Condition
			note over Patron: Inform Patron of Condition
			POS->>Centrapay: Merchant Accepts Condition
		else Payment Request status is paid
			note over POS: Stop Polling for Confirmation
		end
	end

	note over POS: ✅ Display Successful Payment
	note over Patron: ✅ Display Successful Payment
```

## How to Handle Payment Conditions

When Payment Conditions are present on a [Payment Request](https://docs.centrapay.com/api/payment-requests#payment-request), merchant integrations and consumer apps need to negotiate them with their respective parties using the `status` of each condition.

1. **Prompt**

    Merchant integrations should prompt the terminal operator to [accept](https://docs.centrapay.com/api/payment-requests#accept-payment-condition-for-a-payment-request-experimental) or [decline](https://docs.centrapay.com/api/payment-requests#decline-payment-condition-for-a-payment-request-experimental) any conditions that have status `awaiting-merchant`.

    Consumer apps should inform the Patron to [accept](https://docs.centrapay.com/api/payment-requests#accept-payment-condition-for-a-payment-request-experimental) or [decline](https://docs.centrapay.com/api/payment-requests#decline-payment-condition-for-a-payment-request-experimental) any conditions that have status `awaiting-patron`.

2. **Inform**

    Merchant integrations should inform the terminal operator of any conditions that have status `awaiting-patron` using the `message` provided with the condition.

    Consumer apps should inform the Patron of any conditions that have status `awaiting-merchant` using the `message` provided with the condition.

3. **Repeat** the above steps when polling shows conditions have changed.

## Additional Payment Condition Behaviours

The payment request status must always be polled after [accepting](https://docs.centrapay.com/api/payment-requests#accept-payment-condition-for-a-payment-request-experimental) or [declining](https://docs.centrapay.com/api/payment-requests#decline-payment-condition-for-a-payment-request-experimental) a condition as these actions may trigger the additional behaviours below.

- Conditions can be linked such that they are added or voided due to state changes on the [Payment Request](https://docs.centrapay.com/api/payment-requests#payment-request). Note that accepting or declining a voided condition will fail.
- The [Patron Not Present extension](https://www.notion.so/Patron-Not-Present-7da502cf99de4bd1af82a3bf8ed05e90) may prevent the presentation of conditions that are impossible to satisfy such as checking photo ID.