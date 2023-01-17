<template>
  <div>
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
              <div class="flex flex-shrink-0 items-center px-4">
                <centrapay-logo class="text-brand-accent" />
              </div>
              <div class="mt-6 h-0 flex-1 overflow-y-auto">
                <nav class="space-y-1 px-2">
                  <div class="pt-1 pb-4">
                    <NuxtLink
                      v-for="item in topBarNavigation"
                      :key="item.name"
                      :href="item.href"
                      target="_blank"
                      class="text-content-primary group flex items-center px-2 py-2 text-base font-medium rounded-md"
                    >
                      {{ item.name }}
                    </NuxtLink>
                  </div>
                  <NuxtLink
                    v-for="item in navigation"
                    :key="item.title"
                    :href="item._path"
                    class="text-content-primary group flex items-center px-2 py-2 text-base font-medium rounded-md"
                  >
                    <!-- <component
                      :is="item.icon"
                      class="text-content-tertiary mr-4 flex-shrink-0 icon-sm"
                      aria-hidden="true"
                    /> -->
                    <span class="text-content-secondary text-base leading-6 font-medium">{{ item.title }}</span>
                  </NuxtLink>
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

    <div class="fixed bg-white inset-x-0 z-10 flex h-20 flex-shrink-0 shadow">
      <!-- FIXME: This should be a button -->
      <div
        type="button"
        class="flex items-center px-4 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring md:hidden"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <navigation-menu class="text-content-tertiary" />
      </div>
      <div class="hidden md:flex md:flex-1 md:justify-between md:py-3">
        <div class="ml-4 flex items-center md:ml-6">
          <NuxtLink
            href="/"
            class="flex items-center justify-center rounded-full h-14 w-14 bg-static-black"
          >
            <centrapay-logo class="text-content-on-color icon-2xl" />
          </NuxtLink>
          <div class="flex flex-row space-x-1 ml-7">
            <NuxtLink
              v-for="item in topBarNavigation"
              :key="item.name"
              :href="item.href"
              target="_blank"
              class="text-gray-600 text-sm leading-5 font-medium px-3 py-2 rounded-lg hover:bg-gray-200 hover:text-content-primary"
              :class="item.current ? 'bg-gray-100': ''"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:fixed md:h-full md:inset-y-20 md:flex md:w-64 md:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white">
        <div class="mt-5 flex flex-grow flex-col">
          <nav
            class="flex-1 space-y-1 bg-white px-2"
            aria-label="Sidebar"
          >
            <div
              v-for="item in navigation"
              :key="item.title"
            >
              <Disclosure
                as="div"
                class="space-y-1"
              >
                <DisclosureButton
                  class="group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 ring-focus-ring"
                  :class="true ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
                  @click="setCurrentPath(item._path)"
                >
                  <!-- <component
                    :is="item.icon"
                    class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  /> -->
                  <span class="flex-1">{{ item.title }}</span>
                </DisclosureButton>
                <div v-show="currentPath.startsWith(item._path)">
                  <DisclosurePanel
                    static
                    class="space-y-1"
                  >
                    <div
                      v-for="firstChild in item.children"
                      :key="firstChild.title"
                    >
                      <DisclosureButton
                        as="a"
                        :href="firstChild._path"
                        class="group flex w-full items-center rounded-md py-2 pl-6 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {{ firstChild.title }}
                      </DisclosureButton>
                      <div v-if="firstChild.children">
                        <div
                          v-for="secondChild in firstChild.children"
                          :key="secondChild.title"
                        >
                          <DisclosureButton
                            as="a"
                            :href="secondChild._path"
                            class="group flex w-full items-center rounded-md py-2 pl-8 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          >
                            {{ secondChild.title }}
                          </DisclosureButton>
                        </div>
                      </div>
                    </div>
                  </DisclosurePanel>
                </div>
              </Disclosure>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <main class="pt-20 md:pl-64">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
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
const currentPath = ref(page.value._path);

function setCurrentPath(val) {
  currentPath.value = val;
}
</script>
