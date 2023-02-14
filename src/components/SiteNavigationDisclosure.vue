<template>
  <Disclosure
    v-if="navigationItem.children.length"
    as="div"
  >
    <DisclosureButton
      class="group mt-2 w-full flex items-center pl-3 pr-1 py-2 space-x-3 text-left rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
      :class="currentNavPath.startsWith(navigationItem.to) ? 'bg-gray-100' : ''"
      @click="toggleDisclosure"
    >
      <component
        :is="disclosureIcon"
        class="icon-md flex-shrink-0 text-content-tertiary group-hover:text-content-secondary"
        aria-hidden="true"
      />
      <span class="flex-1 text-content-primary text-base leading-5 font-medium">{{ navigationItem.title }}</span>
      <DisclosureArrowRight :class="[open ? 'text-gray-400 rotate-90' : 'text-gray-300', 'ml-3 icon-md flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400']" />
    </DisclosureButton>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-show="open">
        <DisclosurePanel static>
          <div
            v-for="firstChild in navigationItem.children"
            :key="firstChild.title"
          >
            <a
              :href="firstChild.to"
              class="group mt-2 flex w-full items-center rounded-md py-2 pl-3 pr-2 text-sm font-medium text-content-secondary hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
              :class="path == firstChild.to ? 'bg-gray-100 text-content-primary hover:bg-gray-200' : ''"
              @click="$emit('link-clicked')"
            >
              {{ firstChild.title }}
            </a>
            <div v-if="firstChild.children">
              <div
                v-for="secondChild in firstChild.children"
                :key="secondChild.title"
              >
                <a
                  :href="secondChild.to"
                  class="group mt-2 flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
                  :class="path == secondChild.to ? 'bg-gray-100 text-content-primary hover:bg-gray-200' : ''"
                  @click="$emit('link-clicked')"
                >
                  {{ secondChild.title }}
                </a>
              </div>
            </div>
          </div>
        </DisclosurePanel>
      </div>
    </transition>
  </Disclosure>
  <a
    v-else
    target="_blank"
    :href="navigationItem.to"
    class="group mt-2 w-full flex items-center pl-3 pr-1 py-2 space-x-3 text-left rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
  >
    <component
      :is="disclosureIcon"
      class="icon-md flex-shrink-0 text-content-tertiary group-hover:text-content-secondary"
      aria-hidden="true"
    />
    <span class="flex-1 text-content-primary text-base leading-5 font-medium">{{ navigationItem.title }}</span>
  </a>
</template>

<script setup>
import { ref, computed, watch, defineAsyncComponent } from 'vue';
import DisclosureArrowRight from './icons/DisclosureArrowRight.vue';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';

const props = defineProps({
  path: { type: String, required: false, default: '' },
  navigation: { type: Object, required: true },
  navigationItem: { type: Object, required: true },
});

const emit = defineEmits([ 'link-clicked' ]);

const disclosureIcon = defineAsyncComponent(() => import(`./icons/${props.navigationItem.icon}.vue`));
const currentNavPath = computed(() => {
  const path = props.path;
  const strippedPath = path.endsWith('/') ? path.slice(0, -1) : path;
  return props.navigation.pathToActiveNav[strippedPath] || strippedPath;
});

function toggleDisclosure() {
  const title = props.navigationItem.title;
  const itemExists = localStorage.getItem(title);
  if (itemExists) {
    localStorage.removeItem(title);
    open.value = false;
  } else {
    localStorage.setItem(title, true);
    open.value = true;
  }
}

function isOpen() {
  const title = props.navigationItem.title;
  if (currentNavPath.value.startsWith(props.navigationItem.to)) {
    localStorage.setItem(title, true);
  }
  return localStorage.getItem(title);
}
const open = ref(isOpen());
</script>
