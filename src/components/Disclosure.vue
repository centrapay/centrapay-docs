<template>
  <Disclosure>
    <DisclosureButton
      class="flex w-full flex-row justify-between px-0 my-2 focus:ring-1 ring-offset-8 rounded-md type-subtitle-2"
      style="text-align:left"
      @click="open = !open"
    >
      {{ title }}
      <ChevronDown :class="[open && 'rotate-180', 'h-6 w-6 flex-none']" />
    </DisclosureButton>
    <DisclosurePanel class="mr-6 mb-2">
      <slot />
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import ChevronDown from './icons/ChevronDown.vue';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';

export default {
  components: {
    ChevronDown,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },

  props: {
    title: { type: String, required: true },
  },

  data() {
    return {
      open: false,
    };
  },
};
</script>
