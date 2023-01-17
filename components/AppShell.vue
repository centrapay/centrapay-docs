<template>
  <div class="min-h-full">
    <Disclosure
      v-slot="{ open }"
      as="nav"
      class="border-b border-gray-200 shadow-sm bg-white fixed z-10 w-full"
    >
      <div class="bg-white w-full pr-4 sm:pr-6 lg:pr-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="flex flex-shrink-0 items-center">
              <NuxtLink
                href="/"
                class="flex items-center justify-center h-16 w-16 bg-brand-primary"
              >
                <centrapay-logo class="text-content-on-color icon-2xl" />
              </NuxtLink>
            </div>
            <div class="hidden sm:-my-px sm:ml-6 sm:py-4 sm:flex sm:space-x-4">
              <NuxtLink
                v-for="item in topBarNavigation"
                :key="item.name"
                :href="item.href"
                target="_blank"
                class="text-content-secondary group flex items-center px-4 py-2 text-base leading-6 font-medium rounded-md focus:outline-none focus:ring-2 ring-focus-ring hover:bg-gray-200 hover:text-content-primary"
                :class="item.current ? 'bg-gray-100': ''"
                :aria-current="item.current ? 'page' : undefined"
              >
                {{ item.name }}
              </NuxtLink>
            </div>
          </div>
          <div class="-mr-2 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 ring-focus-ring focus:ring-offset-2">
              <span class="sr-only">Open main menu</span>
              <navigation-menu
                v-if="!open"
                aria-hidden="true"
                class="text-content-tertiary icon-lg"
              />
              <close-outline
                v-else
                aria-hidden="true"
                class="text-content-tertiary icon-lg"
              />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="fixed space-y-1 pt-2 pb-3 px-2">
          <SiteNavigation />
          <NuxtLink
            v-for="item in topBarNavigation"
            :key="item.name"
            :href="item.href"
            target="_blank"
            class="text-content-secondary group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md focus:outline-none focus:ring-2 ring-focus-ring hover:bg-gray-200 hover:text-content-primary"
            :class="item.current ? 'bg-gray-100': ''"
            :aria-current="item.current ? 'page' : undefined"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <!-- Static sidebar for desktop -->
    <div class="hidden border-t md:fixed md:h-full md:inset-y-16 md:flex md:w-64 md:flex-col">
      <div class="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white">
        <div class="mt-5 flex flex-grow flex-col">
          <nav
            class="flex-1 space-y-1 bg-white px-2"
            aria-label="Sidebar"
          >
            <SiteNavigation />
          </nav>
        </div>
      </div>
    </div>

    <main class="flex flex-col min-h-screen sm:pt-16 md:pl-64">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';

const topBarNavigation = [
  { name: 'Products', href: 'https://centrapay.com/', current: false },
  { name: 'Solutions', href: 'https://centrapay.com/', current: false },
  { name: 'Resources', href: 'https://centrapay.com/', current: false },
  { name: 'Pricing', href: 'https://centrapay.com/', current: false },
  { name: 'Docs', href: '/', current: true },
];

const sidebarOpen = ref(false);
const { page, navigation } = useContent();

const route = useRoute();
const currentPath = computed(() => route.path);
</script>

<style scoped>
.router-link-active {
  @apply
    bg-gray-50
    text-content-primary
  ;
}
</style>
