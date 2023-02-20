<template>
  <div class="min-h-full">
    <TransitionRoot
      as="template"
      :show="mainMenuOpen"
    >
      <Dialog
        as="div"
        class="relative md:hidden"
      >
        <div class="fixed inset-x-0 inset-y-0 pt-16 flex min-h-full">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-150 transform"
            enter-from="-translate-y-full"
            enter-to="translate-y-0"
            leave="transition ease-in-out duration-150 transform"
            leave-from="translate-y-0"
            leave-to="-translate-y-full"
          >
            <DialogPanel class="relative flex w-full flex-1 flex-col bg-surface-primary">
              <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <nav class="space-y-1 px-2">
                  <SiteNavigation
                    :path="props.path"
                    :navigation="navigation"
                    @link-clicked="mainMenuOpen = false"
                  />
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="fixed bg-white inset-x-0 z-10 flex h-16 flex-shrink-0 shadow">
      <div class="flex w-full justify-between">
        <div class="flex items-center">
          <a
            href="/"
            class="flex items-center justify-center h-16 w-16 bg-brand-primary focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
            @click="mainMenuOpen = false"
          >
            <span class="sr-only">Go to home page</span>
            <CentrapayLogo class="text-content-on-color icon-2xl" />
          </a>
          <div class="flex flex-row space-x-1 ml-7">
            <a
              href="/"
              target="_self"
              class="text-gray-600 text-sm leading-5 font-medium px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 hover:text-content-primary focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
              @click="mainMenuOpen = false"
            >
              Docs
            </a>
          </div>
        </div>
        <button
          class="flex items-center pr-6 md:hidden focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
          @click="mainMenuOpen = !mainMenuOpen"
        >
          <span class="sr-only">Open Main Menu</span>
          <NavigationMenu
            v-if="!mainMenuOpen"
            class="block h-6 w-6 text-content-tertiary"
            aria-hidden="true"
          />
          <CloseOutline
            v-else
            class="block h-6 w-6 text-content-tertiary"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:fixed md:h-full md:inset-y-16 md:flex md:w-64 xl:w-80 md:flex-col">
      <div class="flex flex-grow flex-col overflow-y-auto pt-5 border-r border-gray-200 bg-white">
        <div class="flex flex-grow flex-col">
          <nav
            class="flex-1 space-y-1 bg-white px-2"
            aria-label="Sidebar"
          >
            <SiteNavigation
              :path="props.path"
              :navigation="navigation"
            />
          </nav>
        </div>
      </div>
    </div>

    <main class="flex flex-col min-h-screen pt-16 md:pl-64 xl:pl-80">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CentrapayLogo from '../components/icons/CentrapayLogo.vue';
import CloseOutline from '../components/icons/CloseOutline.vue';
import NavigationMenu from '../components/icons/NavigationMenu.vue';
import SiteNavigation from '../components/SiteNavigation.vue';
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

const props = defineProps({
  path: { type: [String, undefined], required: false, default: undefined },
  navigation: { type: Object, required: true },
});

const mainMenuOpen = ref(false);
</script>
