<template>
  <Disclosure
    v-slot="{ open }"
    as="div"
    :default-open="defaultOpen"
  >
    <DisclosureButton
      class="group mt-2 flex w-full items-center space-x-3 rounded-md py-2 pl-4 pr-1 text-left ring-focus-ring hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset"
      :class="{ 'bg-gray-100': disclosureSelected }"
    >
      <component
        :is="disclosureIcon"
        class="inline-block size-5 shrink-0 text-content-tertiary group-hover:text-content-secondary"
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
          <span class="text-xs text-content-secondary">{{ navigationItem.subTitle }}</span>
        </div>
      </div>
      <Carat :class="[open ? 'rotate-90 text-gray-400' : 'text-gray-300', 'ml-3 inline-block size-5 shrink-0 transition-colors duration-150 ease-in-out group-hover:text-gray-400']" />
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
