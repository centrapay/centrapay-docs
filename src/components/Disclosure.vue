<template>
  <Disclosure>
    <DisclosureButton
      class="type-subtitle-2 my-4 flex w-full flex-row justify-between rounded-md px-0 text-left ring-offset-8 focus:ring-1"
      @click="open = !open"
    >
      {{ title }}
      <Carat :class="[open ? '-rotate-90' : 'rotate-90', 'ml-2 size-6 flex-none']" />
    </DisclosureButton>
    <DisclosurePanel class="mb-2 mr-6">
      <slot />
    </DisclosurePanel>
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

const props = defineProps({
  title: { type: String, required: true },
});

let open = ref(false);
</script>
