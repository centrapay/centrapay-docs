<template>
  <div class="min-h-full">
    <TransitionRoot
      as="template"
      :show="sidebarOpen"
    >
      <Dialog
        as="div"
        class="relative z-40 md:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-surface-primary pt-5 pb-4">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <!-- FIXME: This should be a button -->
                  <div
                    type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <close-outline class="text-content-on-color" />
                  </div>
                </div>
              </TransitionChild>
              <div class="h-0 flex-1 overflow-y-auto">
                <nav class="space-y-1 px-2">
                  <div class="pt-1 pb-4">
                    <SiteNavigation @link-clicked="sidebarOpen = false" />
                    <a
                      v-for="item in externalNavigation"
                      :key="item.name"
                      :href="item.href"
                      target="_blank"
                      class="group mt-2 w-full flex items-center pl-2 pr-1 py-2 text-left text-content-primary text-base leading-6 font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
                      :class="item.current ? 'bg-gray-50 text-content-primary': ''"
                      @click="sidebarOpen = false"
                    >
                      {{ item.name }}
                    </a>
                  </div>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div
            class="w-14 flex-shrink-0"
            aria-hidden="true"
          >
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="fixed bg-white inset-x-0 z-10 flex h-16 flex-shrink-0 shadow">
      <div class="flex w-full justify-between md:hidden">
        <!-- FIXME: This should be a button -->
        <div
          type="button"
          class="flex items-center pl-6 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
          @click="sidebarOpen = true"
        >
          <div>
            <span class="sr-only">Open sidebar</span>
            <navigation-menu class="text-content-tertiary" />
          </div>
        </div>
        <NuxtLink
          href="/"
          class="flex items-center justify-center h-16 w-16 bg-brand-primary focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
        >
          <centrapay-logo class="text-content-on-color icon-2xl" />
        </NuxtLink>
      </div>
      <div class="hidden md:flex md:flex-1 md:justify-between md:py-3">
        <div class="flex items-center">
          <NuxtLink
            href="/"
            class="flex items-center justify-center h-16 w-16 bg-brand-primary focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
          >
            <centrapay-logo class="text-content-on-color icon-2xl" />
          </NuxtLink>
          <div class="flex flex-row space-x-1 ml-7">
            <a
              v-for="item in externalNavigation"
              :key="item.name"
              :href="item.href"
              target="_blank"
              class="text-gray-600 text-sm leading-5 font-medium px-3 py-2 rounded-lg hover:bg-gray-200 hover:text-content-primary focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
              :class="item.current ? 'bg-gray-100': ''"
            >
              {{ item.name }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Static sidebar for desktop -->
    <div class="hidden border-t md:fixed md:h-full md:inset-y-16 md:flex md:w-64 md:flex-col">
      <div class="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white">
        <div class="flex flex-grow flex-col">
          <nav
            class="flex-1 space-y-1 bg-white px-2"
            aria-label="Sidebar"
          >
            <SiteNavigation />
          </nav>
        </div>
      </div>
    </div>

    <main class="flex flex-col min-h-screen pt-16 md:pl-64">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

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

const externalNavigation = [
  { name: 'Products', href: 'https://centrapay.com/', current: false },
  { name: 'Solutions', href: 'https://centrapay.com/', current: false },
  { name: 'Resources', href: 'https://centrapay.com/', current: false },
  { name: 'Pricing', href: 'https://centrapay.com/', current: false },
  { name: 'Docs', href: '/', current: true },
];

const sidebarOpen = ref(false);
</script>
