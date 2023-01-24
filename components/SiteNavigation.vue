<template>
  <div>
    <div
      v-for="item in navigation"
      :key="item.title"
    >
      <Disclosure
        v-if="item.children"
        v-slot="{ open }"
        as="div"
        :default-open="currentPath.startsWith(item.path)"
      >
        <DisclosureButton
          class="group mt-2 w-full flex items-center pl-2 pr-1 py-2 space-x-2 text-left rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
          :class="currentPath.startsWith(item.path) ? 'bg-gray-100' : ''"
        >
          <component
            :is="item.icon"
            class="icon-md flex-shrink-0 text-content-tertiary group-hover:text-content-secondary"
            aria-hidden="true"
          />
          <span class="flex-1 text-content-primary text-base leading-5 font-medium">{{ item.title }}</span>
          <disclosure-arrow-right :class="[open ? 'text-gray-400 rotate-90' : 'text-gray-300', 'ml-3 icon-md flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400']" />
        </DisclosureButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-out"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <DisclosurePanel>
            <div
              v-for="firstChild in item.children"
              :key="firstChild.title"
            >
              <NuxtLink
                :to="firstChild.path"
                class="group mt-2 flex w-full items-center rounded-md py-2 pl-6 pr-2 text-sm font-medium text-content-secondary hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
                @click="$emit('link-clicked')"
              >
                {{ firstChild.title }}
              </NuxtLink>
              <div v-if="firstChild.children">
                <div
                  v-for="secondChild in firstChild.children"
                  :key="secondChild.title"
                >
                  <NuxtLink
                    :to="secondChild.path"
                    class="group mt-2 flex w-full items-center rounded-md py-2 pl-8 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
                    @click="$emit('link-clicked')"
                  >
                    {{ secondChild.title }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </DisclosurePanel>
        </transition>
      </Disclosure>
      <NuxtLink
        v-else
        target="_blank"
        :to="item.path"
        class="group mt-2 w-full flex items-center pl-2 pr-1 py-2 space-x-2 text-left rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
      >
        <component
          :is="item.icon"
          class="icon-md flex-shrink-0 text-content-tertiary group-hover:text-content-secondary"
          aria-hidden="true"
        />
        <span class="flex-1 text-content-primary text-base leading-5 font-medium">{{ item.title }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';

emits: ['link-clicked' ];

const config = useRuntimeConfig();
// TODO Make the navigation dynamically pick up all the pages in content folder
const navigation = [
  {
    title: 'Reference',
    path: '/reference',
    icon: 'receipt',
    children: [
      {
        title: 'Merchant Integrations',
        path: '/guides/merchant-integrations',
        children: [
          {
            title: 'Merchant Payment Conditions',
            path: '/guides/merchant-payment-conditions',
          }
        ]
      }
    ]
  },
  {
    title: 'Connections',
    path: '/connections',
    icon: 'connections',
    children: [
      {
        title: 'Farmlands',
        path: '/connections/farmlands',
        children: [
          {
            title: 'Farmlands POS Integration Guide',
            path: '/guides/farmlands-pos-integration',
          }
        ]
      }
    ]
  },
  {
    title: 'API',
    path: config.baseUrl + '/api',
    icon: 'settings',
  }
];

const urlToActiveNav = {
  '/guides/farmlands-pos-integration': '/connections/farmlands/farmlands-pos-integration',
  '/guides/merchant-payment-conditions': '/reference/merchant-integrations/merchant-payment-conditions',
};
const route = useRoute();

const currentPath = computed(() => {
  const path = route.path.endsWith('/') ? route.path.slice(0, -1) : route.path;
  return urlToActiveNav[path] || path;
});
</script>

<style scoped>
.router-link-active {
  @apply
    bg-gray-50
    text-content-primary
  ;
}
</style>
