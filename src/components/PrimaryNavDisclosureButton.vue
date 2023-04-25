<template>
  <DisclosureButton
    class="group mt-2 w-full flex items-center pr-1 py-2 space-x-3 text-left rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
    :class="{ 'bg-gray-100': selected }"
  >
    <component
      :is="disclosureIcon"
      class="icon-md flex-shrink-0 text-content-tertiary group-hover:text-content-secondary"
      aria-hidden="true"
    />
    <div class="flex-1">
      <span class="text-sm">{{ navigationItem.title }}</span>
      <div class="leading-none">
        <span class="text-content-tertiary text-xs">{{ navigationItem.subTitle }}</span>
      </div>
    </div>
    <Carat :class="[open ? 'text-gray-400 rotate-90' : 'text-gray-300', 'ml-3 icon-md flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400']" />
  </DisclosureButton>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import { DisclosureButton } from '@headlessui/vue';
import Carat from './icons/Carat.vue';

const props = defineProps({
  navigationItem: { type: Object, required: true },
  open: { type: Boolean, required: true },
  selected: { type: Boolean, required: true },
});

const disclosureIcon = defineAsyncComponent(() => import(`./icons/${props.navigationItem.icon}.vue`));
</script>
