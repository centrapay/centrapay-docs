<template>
  <Disclosure v-slot="{ open }">
    <DisclosureButton
      class="flex w-full flex-row text-left justify-between px-0 my-4 focus:ring-1 ring-offset-8 rounded-md type-subtitle-2"
    >
      {{ title }}
      <Carat :class="[open && 'rotate-90', 'ml-2 h-6 w-6 flex-none']" />
    </DisclosureButton>
    <DisclosureTransition>
      <DisclosurePanel class="mr-6 mb-2">
        <slot />
      </DisclosurePanel>
    </DisclosureTransition>
  </Disclosure>
</template>

<script setup>
import { ref } from 'vue';
import Carat from './icons/Carat.vue';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';
import DisclosureTransition from './DisclosureTransition.vue';

const props = defineProps({
  title: { type: String, required: true },
});
</script>
