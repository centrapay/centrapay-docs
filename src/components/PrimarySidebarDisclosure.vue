<template>
  <Disclosure
    v-slot="{ open }"
    as="div"
    :default-open="defaultOpen"
  >
    <DisclosureButton
      class="btn group mt-2 w-full flex items-center pr-1 py-2 space-x-3 text-left rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
      :class="{ 'bg-gray-100': disclosureSelected }"
    >
      <component
        :is="disclosureIcon"
        class="icon-md flex-shrink-0 text-content-tertiary group-hover:text-content-secondary"
        aria-hidden="true"
      />
      <div class="flex-1">
        <li
          role="menuitem"
          class="text-sm"
        >
          {{ navigationItem.title }}
        </li>
        <div class="leading-none">
          <span class="text-content-secondary text-xs">{{ navigationItem.subTitle }}</span>
        </div>
      </div>
      <Carat :class="[open ? 'text-gray-400 rotate-90' : 'text-gray-300', 'ml-3 icon-md flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400']" />
    </DisclosureButton>
    <DisclosureTransition>
      <div v-show="open">
        <DisclosurePanel
          static
          as="ul"
          role="menu"
        >
          <li
            v-for="navigationChild in navigationItem.children"
            :key="navigationChild.title"
            role="menuitem"
          >
            <SecondarySidebarDisclosure
              v-if="navigationChild.children?.length"
              :navigation-item="navigationChild"
              :path="path"
            />
            <PageLinks
              v-else
              :navigation-item="navigationChild"
              :path="path"
              :primary="true"
              :level="2"
            />
          </li>
        </DisclosurePanel>
      </div>
    </DisclosureTransition>
  </Disclosure>
</template>

<script setup>
import { defineAsyncComponent, ref, computed } from 'vue';
import { DisclosureButton,   Disclosure,
  DisclosurePanel, } from '@headlessui/vue';
import Carat from './icons/Carat.vue';
import SecondarySidebarDisclosure from './SecondarySidebarDisclosure.vue';
import DisclosureTransition from './DisclosureTransition.vue';
import containsPagePath from '../utils/containsPagePath';
import PageLinks from './PageLinks.vue';

const props = defineProps({
  navigationItem: { type: Object, required: true },
  path: { type: [String, undefined], required: false, default: '' },
});

const disclosureIcon = defineAsyncComponent(() => import(`./icons/${props.navigationItem.icon}.vue`));

const disclosureSelected = computed(() => {
  return containsPagePath({
    navigationItem: props.navigationItem,
    path: props.path
  });
});
const defaultOpen = ref(true);
</script>
