<template>
  <div>
    <header
      class="not-prose bg-bottom bg-cover bg-[#174B33] bg-blend-overlay bg-[url('/countryside.jpg')]"
    >
      <Prose class="desktop-gutters px-8 py-16 space-y-6">
        <h1 class="type-display text-content-inverse-primary mb-8 mt-4">
          <b>Farmlands</b>
        </h1>
        <p class="type-body-2 text-content-inverse-secondary">
          Farmlands has partnered with Centrapay to deliver new ways for your business to authorise and process Farmlands Card payments that are faster, easier, and more secure than ever.
        </p>
        <div class="space-y-1">
          <span class="type-body-3 text-content-inverse-secondary">
            Made By
          </span>
          <div class="flex items-center space-x-2">
            <span class="type-body-2 text-content-inverse-primary">
              Centrapay
            </span>
            <verified-check class="icon-sm text-brand-accent" />
          </div>
        </div>
        <div class="space-y-1">
          <div class="type-body-3 text-content-inverse-secondary">
            Links
          </div>
          <NuxtLink
            to="https://www.farmlands.co.nz/"
            target="_blank"
            class="hover:no-underline flex items-center w-min type-body-2 text-interactive-tertiary hover:text-interactive-tertiary-active"
          >
            Website
            <external-link class="ml-2 icon-sm" />
          </NuxtLink>
        </div>
        <div class="flex items-center space-x-6">
          <NuxtLink
            v-for="link in externalNavigation"
            :key="link.name"
            :to="link.href"
            target="_blank"
            class="icon-md text-interactive-tertiary hover:text-interactive-tertiary-active"
          >
            <component :is="link.logoName" />
          </NuxtLink>
        </div>
      </Prose>
    </header>
    <main class="desktop-gutters px-8">
      <Prose class="prose-h2:border-none">
        <h2>
          Overview
        </h2>
        <p>
          In partnership with Centrapay, Farmlands now offers two new digital solutions that will allow Card Partners to authorise payments in real-time and process Farmlands invoices faster. There are no transactional costs for Card Partners that use these new options.
        </p>
        <p class="mt-8">
          Your business can now either fully integrate your retail point of sale system or access a secure web portal when accepting Farmlands Card payments anytime, anywhere.
        </p>
        <div class="m-auto max-w-[450px] pt-4 pb-3">
          <img
            src="~/assets/images/farmlands-flow.png"
          >
        </div>
        <h3>
          Solutions
        </h3>
        <div class="not-prose flex flex-col md:flex-row pt-4 md:space-x-6 lg:space-x-12 pb-16 space-y-6 md:space-y-0">
          <card
            class="max-w-l"
            image-src="/farmlands-pos-background.png"
            title="1. POS API"
            description="A comprehensive payment API to support Farmlands Card payments. This option is for Card Partners that need integration with their retail point of sale system."
            :link="{
              text: 'POS Integration Guide',
              url: '/guides/farmlands-pos-integration',
            }"
          />
          <card
            class="max-w-l"
            image-src="/farmlands-portal-background.png"
            title="2. Portal"
            description="A secure web portal for Farmlands Card payments. This option allows Card Partners to authorise payments without having to integrate their retail point of sale system."
            button-url=""
            :link="{
              text: 'Portal Introduction Guide',
              url: '#',
            }"
          />
        </div>
      </Prose>
    </main>
  </div>
</template>

<script setup>
const externalNavigation = [
  { name: 'Facebook', logoName: 'facebook-logo', href: 'https://www.facebook.com/farmlandsnz/' },
  { name: 'Twitter', logoName: 'twitter-logo', href: 'https://twitter.com/farmlands?lang=en' },
  { name: 'Instagram', logoName: 'instagram-logo', href: 'https://www.instagram.com/farmlandsnz/?hl=en' },
  { name: 'LinkedIn', logoName: 'linked-in-logo', href: 'https://www.linkedin.com/company/farmlands-trading-society-ltd/?originalSubdomain=nz' },
];

useHead({
  title: 'Farmlands',
  meta: [
    {
      name: 'description',
      content: 'Farmlands has partnered with Centrapay to provide new ways for your business to accept Farmlands Cards faster, easier and more securely than ever.',
    },
    {
      property: 'og:image',
      content: '/countryside.jpg',
    },
    {
      property: 'og:image:width',
      content: '1200'
    },
    {
      property: 'og:image:height',
      content: '630'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
  ],
});
</script>
