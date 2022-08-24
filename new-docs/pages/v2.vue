<template>
  <div>
    <div class="my-4">
      <span class="type-headline-3">Getting Started</span>
    </div>
    <p>
      Welcome to Centrapay! We enable you to transact fiat currency,
      giftcards, digital assets and vouchers via your point of sale,
      payment terminal, shopping cart or unattended device. We
      accomplish this via our APIs which allow merchants, customers,
      terminals, and smart wallets to interact with each other.<br><br>

      For more help getting setup, contact us via email at
      <NuxtLink href="mailto:integrations@centrapay.com">
        integrations@centrapay.com.
      </NuxtLink>
    </p>
    <div class="flex flex-col md:flex-row md:space-x-4">
      <card
        icon-name="Dashboard"
        class="mb-4"
        title="Guides"
        description="Checkout our Guides for hints on where to begin."
        link="https://docs.centrapay.com/guides"
      />
      <card
        icon-name="Rocket"
        class="mb-4"
        title="API Reference"
        description="See the API Reference for a deeper dive"
        link="https://docs.centrapay.com/api"
      />
    </div>
  </div>
</template>
