<template>
  <Disclosure
    v-slot="{ open }"
    as="div"
    :default-open="defaultOpen"
  >
    <DisclosureButton
      class="group mt-2 w-full flex items-center pr-1 py-2 space-x-3 text-left rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
      :class="{ 'bg-gray-100': disclosureSelected }"
    >
      <Carat :class="[open ? 'text-gray-400 rotate-90' : 'text-gray-300', 'icon-md flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400']" />
      <span
        class="flex-1 text-content-tertiary leading-5 text-sm font-medium"
        :class="{ 'text-black': open }"
      >
        {{ navigationItem.title }}
      </span>
    </DisclosureButton>
    <DisclosureTransition>
      <div v-show="open">
        <DisclosurePanel
          static
          as="ul"
          role="menu"
        >
          <PageLinks
            v-for="item in navigationItem.children"
            :key="item.title"
            :path="props.path"
            :navigation-item="item"
            :level="3"
          />
        </DisclosurePanel>
      </div>
    </DisclosureTransition>
  </Disclosure>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import Carat from './icons/Carat.vue';
import DisclosureTransition from './DisclosureTransition.vue';
import containsPagePath from '../utils/containsPagePath';
import PageLinks from './PageLinks.vue';

const props = defineProps({
  navigationItem: { type: Object, required: true },
  path: { type: [String, undefined], required: false, default: '' },
});

const disclosureSelected = computed(() => {
  return containsPagePath({
    navigationItem: props.navigationItem,
    path: props.path
  });
});
const defaultOpen = ref(disclosureSelected.value);
</script>
