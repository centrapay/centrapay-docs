<template>
  <div class="desktop-gutters px-4 sm:px-8">
    <div class="prose max-w-none my-8">
      <h1 class="type-headline-3">
        Getting Started
      </h1>
      <p>
        Welcome to Centrapay! We enable you to transact fiat currency,
        giftcards, digital assets and vouchers via your point of sale,
        payment terminal, shopping cart or unattended device. We
        accomplish this via our APIs which allow merchants, customers,
        terminals, and smart wallets to interact with each other.
      </p>

      <p>
        For more help getting setup, contact us via email at
        <a href="mailto:integrations@centrapay.com">
          integrations@centrapay.com.
        </a>
      </p>
    </div>
    <div class="flex flex-col md:flex-row md:space-x-4">
      <LandingPageCard
        :icon="Dashboard"
        class="mb-4"
        title="Guides"
        description="Checkout our Guides for hints on where to begin."
        link="/guides/point-of-sale"
      />
      <LandingPageCard
        :icon="Rocket"
        class="mb-4"
        title="API Reference"
        description="See the API Reference for a deeper dive"
        :link="`test/api`"
      />
    </div>
  </div>
</template>

<script setup>
import LandingPageCard from './LandingPageCard.vue';
import Dashboard from './icons/Dashboard.vue';
import Rocket from './icons/Rocket.vue';
</script>
