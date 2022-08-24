<template>
  <div class="w-full p-4 shadow-md">
    <div class="desktop-gutters flex items-center justify-center space-x-2">
      <centrapay-logo class="w-12 h-12 fill-brand-accent" />
      <span class="hidden md:block type-headline-3">Centrapay Docs</span>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
const CentrapayLogo = defineAsyncComponent(() => import('./icons/CentrapayLogo.vue'));
</script>
