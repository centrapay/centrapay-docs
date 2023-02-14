<template>
  <a
    :href="props.href"
    :target="isExternalLink ? '_blank' : '_self'"
    class="group inline-flex justify-center items-center text-interactive-secondary hover:text-interactive-secondary-hover"
  >
    <span class="underline"><slot /></span>
    <span v-if="isApiReferenceLink">&nbsp;</span>
    <span
      v-if="isApiReferenceLink"
      class="rounded-sm bg-interactive-secondary group-hover:bg-interactive-secondary-hover h-3 w-6 inline-flex justify-center items-center"
    >
      <span class="text-content-inverse-primary text-[10px]">&nbsp;API&nbsp;</span>
    </span>
    <ExternalLink
      v-else-if="isExternalLink"
      class="icon-sm h-3 w-6"
    />
  </a>
</template>

<script setup>
import ExternalLink from './icons/ExternalLink.vue';
const props = defineProps({
  href: {
    type: String,
    default: ''
  },
});

const isApiReferenceLink = props.href.startsWith('https://docs.centrapay.com/api');

const isExternalLink = (!props.href.startsWith('/') && !props.href.startsWith('#') && !props.href.startsWith('https://docs.centrapay.com')) || isApiReferenceLink;
</script>
