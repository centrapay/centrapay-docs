<template>
  <footer class="bg-surface-tertiary">
    <div class="mx-auto desktop-gutters px-6 py-8 md:flex md:items-center md:justify-between lg:px-8">
      <div class="flex space-x-6 md:order-2">
        <a
          v-for="item in socials"
          :key="item.name"
          :href="item.link"
          target="_blank"
          class="text-interactive-secondary hover:text-interactive-secondary-hover"
        >
          <span class="sr-only">{{ item.name }}</span>
          <component
            :is="item.logo"
            class="inline-block w-5 h-5"
            aria-hidden="true"
          />
        </a>
      </div>
      <p class="mt-8 text-xs leading-5 text-content-primary md:order-1 md:mt-0">
        {{ `&#169; ${year} Centrapay - All rights reserved.` }}
      </p>
    </div>
  </footer>
</template>

<script setup>
import TwitterLogo from '../components/icons/TwitterLogo.vue';
import LinkedInLogo from '../components/icons/LinkedInLogo.vue';
import GithubLogo from '../components/icons/GithubLogo.vue';

const year = new Date().getFullYear();

const socials = [
  {
    name: 'Twitter',
    link: 'https://twitter.com/centrapay',
    logo: TwitterLogo,
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/company/centrapay',
    logo: LinkedInLogo,
  },
  {
    name: 'GitHub',
    link: 'https://github.com/centrapay',
    logo: GithubLogo,
  }
];
</script>
