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
  </div>
</template>

<script setup>
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
