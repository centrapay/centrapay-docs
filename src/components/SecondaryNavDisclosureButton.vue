<template>
  <DisclosureButton
    class="group mt-2 w-full flex items-center pr-1 py-2 space-x-3 text-left rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
    :class="{ 'bg-gray-100': selected }"
  >
    <Carat :class="[open ? 'text-gray-400 rotate-90' : 'text-gray-300', 'icon-md flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400']" />
    <span
      class="flex-1 text-content-tertiary leading-5 text-sm font-medium"
      :class="{ 'text-black': open }"
    >
      {{ navigationItem.title }}
    </span>
  </DisclosureButton>
</template>

<script setup>
import { DisclosureButton } from '@headlessui/vue';
import Carat from './icons/Carat.vue';

const props = defineProps({
  navigationItem: { type: Object, required: true },
  open: { type: Boolean, required: true },
  selected: { type: Boolean, required: true },
});

</script>
