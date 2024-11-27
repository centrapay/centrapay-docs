<template>
  <div class="not-prose my-5 flex space-x-5 rounded-lg bg-surface-secondary p-5">
    <InformationCircle class="inline-block size-6 text-content-secondary" />
    <blockquote class="m-0 flex-1 text-sm font-normal leading-5 text-content-tertiary">
      <slot />
    </blockquote>
  </div>
</template>

<script setup>
import InformationCircle from './icons/InformationCircle.vue';
</script>
