<template>
  <a
    :href="props.href"
    :target="isExternalLink ? '_blank' : '_self'"
    class="not-prose underline font-medium inline-flex justify-center items-center text-interactive-primary hover:text-interactive-secondary-hover"
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
