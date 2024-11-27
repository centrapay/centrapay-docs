<template>
  <a
    :href="props.href"
    :target="isExternalLink ? '_blank' : '_self'"
    class="not-prose inline-flex items-center justify-center font-medium text-interactive-primary underline hover:text-interactive-secondary-hover"
  >
    <slot />
  </a>
</template>

<script setup>
const props = defineProps({
  href: {
    type: String,
    default: ''
  },
});

const isExternalLink = (!props.href.startsWith('/') && !props.href.startsWith('#'));
</script>
