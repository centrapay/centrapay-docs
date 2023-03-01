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
            <VerifiedCheck class="icon-sm text-brand-accent" />
          </div>
        </div>
        <div class="space-y-1">
          <div class="type-body-3 text-content-inverse-secondary">
            Links
          </div>
          <a
            href="https://www.farmlands.co.nz/"
            target="_blank"
            class="hover:no-underline flex items-center w-min type-body-2 text-interactive-tertiary hover:text-interactive-tertiary-active"
          >
            Website
            <ExternalLink class="ml-2 icon-sm" />
          </a>
        </div>
        <div class="flex items-center space-x-6">
          <a
            v-for="link in externalNavigation"
            :key="link.name"
            :href="link.href"
            target="_blank"
            class="icon-md text-interactive-tertiary hover:text-interactive-tertiary-active"
          >
            <span class="sr-only">{{ link.description }}</span>
            <component :is="link.logo" />
          </a>
        </div>
      </Prose>
    </header>
    <main class="desktop-gutters px-8">
      <Prose class="prose-h2:border-none">
        <h2>
          Overview
        </h2>
        <p>
          In partnership with Centrapay, Farmlands has two new digital solutions that enable Card Partners to authorise Card payments in real-time, and process invoices to Farmlands faster.
          There are no transactional costs for Card Partners using these solutions.
        </p>
        <p class="mt-8">
          Your business can either fully integrate the Farmlands solution to your retail point of sale system, or access a secure web portal when accepting Farmlands Card as a form of payment for a sale anytime, anywhere.
        </p>
        <div class="m-auto max-w-[450px] pt-4 pb-3">
          <img
            src="/farmlands-flow.png"
            alt=""
          >
        </div>
        <h3>
          Solutions
        </h3>
        <div class="not-prose flex flex-col md:flex-row pt-4 md:space-x-6 lg:space-x-12 pb-16 space-y-6 md:space-y-0">
          <Card
            class="max-w-l"
            image-src="/farmlands-pos-background.png"
            title="1. POS API"
            description="A comprehensive payment API to support accepting Farmlands Cards as a form of payment. This option is for Card Partners that prefer full integration with their point of sale system."
            :link="{
              text: 'POS Integration Guide',
              url: '/guides/farmlands-pos-integration',
            }"
          />
          <Card
            class="max-w-l"
            image-src="/farmlands-portal-background.png"
            title="2. Portal"
            description="A secure web portal to support accepting Farmlands Cards as a form of payment. This option allows Card Partners to gain an authorisation for a transaction without having to integrate with their point of sale system."
            button-url=""
            :link="{
              text: 'Portal Guide',
              url: '/guides/farmlands-portal',
            }"
          />
        </div>
      </Prose>
    </main>
  </div>
</template>

<script setup>
import Card from './Card.vue';
import Prose from './Prose.vue';
import FacebookLogo from './icons/FacebookLogo.vue';
import TwitterLogo from './icons/TwitterLogo.vue';
import InstagramLogo from './icons/InstagramLogo.vue';
import LinkedInLogo from './icons/LinkedInLogo.vue';
import ExternalLink from './icons/ExternalLink.vue';
import VerifiedCheck from './icons/VerifiedCheck.vue';

const externalNavigation = [
  { name: 'Facebook', description: 'Farmlands Facebook', logo: FacebookLogo, href: 'https://www.facebook.com/farmlandsnz/' },
  { name: 'Twitter', description: 'Farmlands Twitter', logo: TwitterLogo, href: 'https://twitter.com/farmlands?lang=en' },
  { name: 'Instagram', description: 'Farmlands Instagram', logo: InstagramLogo, href: 'https://www.instagram.com/farmlandsnz/?hl=en' },
  { name: 'LinkedIn', description: 'Farmlands LinkedIn', logo: LinkedInLogo, href: 'https://www.linkedin.com/company/farmlands-trading-society-ltd/?originalSubdomain=nz' },
];
</script>
