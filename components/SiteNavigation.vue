<template>
  <div>
    <div
      v-for="item in menu.children"
      :key="item.title"
    >
      <div v-if="item.children.length">
        <SiteNavigationDisclosure
          :navigation-item="item"
          @link-clicked="$emit('link-clicked')"
        />
      </div>
      <NuxtLink
        v-else
        target="_blank"
        :to="item.to"
        class="group mt-2 w-full flex items-center pl-3 pr-1 py-2 space-x-3 text-left rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
      >
        <component
          :is="item.icon"
          class="icon-md flex-shrink-0 text-content-tertiary group-hover:text-content-secondary"
          aria-hidden="true"
        />
        <span class="flex-1 text-content-primary text-base leading-5 font-medium">{{ item.title }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import Navigation from '../utils/Navigation';
const emit = defineEmits([ 'link-clicked' ]);

const menu = Navigation.getMenu();
</script>
