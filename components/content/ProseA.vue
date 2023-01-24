<template>
  <NuxtLink
    :to="props.href"
    :target="isExternalLink ? '_blank' : '_self'"
    class="font-normal inline-flex justify-center items-center"
  >
    <span class="hover:underline"><slot /></span>
    <span v-if="isApiReferenceLink">&nbsp;</span>
    <span
      v-if="isApiReferenceLink"
      class="rounded-sm bg-content-tertiary h-3 w-6 inline-flex justify-center items-center"
    >
      <span class="text-content-inverse-primary text-[10px]">&nbsp;API&nbsp;</span>
    </span>
    <external-link
      v-else-if="isExternalLink"
      class="icon-sm h-3 w-6"
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

const isExternalLink = (!props.href.startsWith('/') && !props.href.startsWith('#') && !props.href.startsWith('https://docs.centrapay.com')) || isApiReferenceLink;
</script>
