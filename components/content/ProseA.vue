<template>
  <NuxtLink
    :to="props.href"
    :target="isExternalLink ? '_blank' : '_self'"
    class="no-underline hover:no-underline inline-flex justify-center items-center"
  >
    <span class="hover:underline"><slot /></span>
    <span v-if="isExternalLink || isApiReferenceLink">&nbsp;</span>
    <span
      v-if="isApiReferenceLink"
      class="rounded-sm bg-interactive-quaternary h-3 w-6 inline-flex justify-center items-center"
    >
      <span class="text-content-inverse-primary text-[10px]">&nbsp;API&nbsp;</span>
    </span>
    <external-link
      v-else-if="isExternalLink"
      class="icon-md mb-1"
    />
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  href: {
    type: String,
    default: ''
  },
});

const isApiReferenceLink = props.href.startsWith('https://docs.centrapay.com/api');

const isExternalLink = !props.href.startsWith('https://docs.centrapay.com');
</script>
