<template>
  <div class="not-prose my-5 flex p-5 space-x-5 bg-surface-secondary rounded-lg">
    <InformationCircle class="inline-block h-5 w-5 text-content-secondary w-6 h-6" />
    <blockquote class="text-content-tertiary m-0 text-sm leading-5 font-normal flex-1">
      <slot />
    </blockquote>
  </div>
</template>

<script setup>
import InformationCircle from './icons/InformationCircle.vue';
</script>
