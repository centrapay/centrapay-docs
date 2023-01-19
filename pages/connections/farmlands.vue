<template>
  <main>
    <div
      class="bg-bottom bg-cover bg-[#174B33] bg-blend-overlay bg-[url('~/assets/images/countryside.jpg')]"
    >
      <div class="desktop-gutters md:px-20 py-16 px-4 space-y-6">
        <header
          class="space-y-6"
        >
          <span
            class="text-content-on-color text-base leading-6 uppercase font-semibold tracking-wider block"
          >
            Project
          </span>
          <h1
            class="text-content-inverse-primary text-4xl leading-10 font-extrabold block"
          >
            Farmlands
          </h1>
        </header>
        <p class="text-content-inverse-secondary text-xl leading-7 font-normal">
          Farmlands has partnered with Centrapay to provide new ways for your business to accept Farmlands Cards faster, easier and more securely than ever.
        </p>
        <div class="space-y-1">
          <p class="text-content-inverse-secondary type-subtitle-2">
            Made By
          </p>
          <div class="flex items-center">
            <p class="text-content-inverse-primary pr-2">
              Centrapay
            </p>
            <verified-check class="icon-sm text-brand-accent" />
          </div>
        </div>
        <div class="space-y-1">
          <div class="text-content-inverse-secondary type-subtitle-2">
            Links
          </div>
          <NuxtLink
            to="https://www.farmlands.co.nz/"
            target="_blank"
            class="no-underline"
          >
            <div class="flex items-center space-x-2">
              <div class="text-content-inverse-primary">
                Website
              </div>
              <external-link class="text-interactive-tertiary icon-sm" />
            </div>
          </NuxtLink>
        </div>
        <div class="flex items-center text-interactive-tertiary icon-md space-x-6">
          <NuxtLink
            to="https://www.facebook.com/farmlandsnz/"
            target="_blank"
          >
            <facebook-logo />
          </NuxtLink>
          <NuxtLink
            to="https://twitter.com/farmlands?lang=en"
            target="_blank"
          >
            <twitter-logo />
          </NuxtLink>
          <NuxtLink
            to="https://www.instagram.com/farmlandsnz/?hl=en"
            target="_blank"
          >
            <instagram-logo />
          </NuxtLink>
          <NuxtLink
            to="https://www.linkedin.com/company/farmlands-trading-society-ltd/?originalSubdomain=nz"
            target="_blank"
          >
            <linked-in-logo />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="desktop-gutters">
      <div class="px-6 md:px-20">
        <h2 class="text-content-primary text-4xl leading-10 font-extrabold tracking-tight pt-16 pb-4">
          Overview
        </h2>
        <div class="text-content-secondary type-body-1 py-4">
          <p>
            In partnership with Centrapay, Farmlands now offer Card Partners two new digital ways to accept and reconcile Farmlands Card payments. There are no additional costs to Card Partners to utilise these new digital tools provided by Centrapay.
          </p>
          <p class="mt-8">
            Whether your business needs a solution fully-integrated with your retail point-of-sale system, or just access to a secure web portal to take payments anytime, anywhere - there is now an option for you.
          </p>
        </div>
        <div class="m-auto max-w-[450px] pt-4 pb-3">
          <img
            src="~/assets/images/farmlands-flow.png"
          >
        </div>
      </div>
      <div class="px-6 md:px-40">
        <h3 class="text-content-primary text-xl leading-7 font-semibold tracking-tight pt-3">
          Solutions
        </h3>

        <div class="flex flex-col md:flex-row pt-4 md:space-x-6 lg:space-x-12 pb-16 space-y-6 md:space-y-0">
          <card
            class="md:w-1/2"
            image-src="/farmlands-pos-background.png"
            title="1. POS API"
            description="A comprehensive payment API to support Farmlands Card payments. This option is for Card Partners that require integration with their retail Point-Of-Sale system."
            :link="{
              text: 'POS Integration Guide',
              url: '/guides/farmlands-pos-integration',
            }"
          />
          <card
            class="md:w-1/2"
            image-src="/farmlands-portal-background.png"
            title="2. Portal"
            description="A secure web portal for Farmlands Card payments. This option is for Card Partners that do not require integration with their retail Point-Of-Sale system."
            button-url=""
            :link="{
              text: 'Portal Introduction Guide',
              url: '',
            }"
          />
        </div>
      </div>
    </div>
  </main>
</template>
