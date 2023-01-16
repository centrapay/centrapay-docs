<template>
  <footer class="bg-surface-inverse-secondary">
    <div class="mx-auto max-w-7xl px-6 py-8 md:flex md:items-center md:justify-between lg:px-8">
      <div class="flex space-x-6 md:order-2">
        <a
          v-for="item in socials"
          :key="item.name"
          :href="item.link"
          target="_blank"
          class="text-content-inverse-tertiary hover:text-gray-500"
        >
          <span class="sr-only">{{ item.name }}</span>
          <component
            :is="item.logo"
            class="icon-lg"
            aria-hidden="true"
          />
        </a>
      </div>
      <p class="mt-8 text-xs leading-5 text-content-inverse-tertiary md:order-1 md:mt-0">
        {{ `&copy; ${year} Centrapay - All rights reserved.` }}
      </p>
    </div>
  </footer>
</template>

<script setup>

const year = new Date().getFullYear();

const socials = [
  {
    name: 'Twitter',
    link: 'https://twitter.com/centrapay',
    logo: 'twitter-logo',
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/company/centrapay',
    logo: 'linked-in-logo',
  },
  {
    name: 'GitHub',
    link: 'https://github.com/centrapay',
    logo: 'github-logo',
  }
];
</script>
