<template>
  <main>
    <div class="desktop-gutters px-4 sm:px-6">
      <div class="my-4">
        <h1 class="type-headline-3">
          Getting Started
        </h1>
      </div>
      <p>
        Welcome to Centrapay! We enable you to transact fiat currency,
        giftcards, digital assets and vouchers via your point of sale,
        payment terminal, shopping cart or unattended device. We
        accomplish this via our APIs which allow merchants, customers,
        terminals, and smart wallets to interact with each other.
      </p>

      <p>
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
          :link="config.baseUrl + '/guides'"
        />
        <card
          icon-name="Rocket"
          class="mb-4"
          title="API Reference"
          description="See the API Reference for a deeper dive"
          :link="config.baseUrl + '/api'"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
const config = useRuntimeConfig();
</script>
