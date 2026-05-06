<template>
  <Popover
    v-slot="{ open }"
    class="static isolate z-50 md:hidden"
  >
    <PopoverButton class="flex items-center p-2 ring-focus-ring focus:outline-hidden focus:ring-2 focus:ring-inset">
      <NavigationMenu
        v-if="!open"
        class="block size-6 text-content-tertiary"
        aria-hidden="true"
      />
      <CloseOutline
        v-else
        class="block size-6 text-content-tertiary"
        aria-hidden="true"
      />
    </PopoverButton>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <PopoverPanel class="absolute inset-x-0 inset-y-16 -z-10">
        <div class="relative max-h-[calc(100vh-64px)] w-full flex-1 overflow-y-scroll border-t border-gray-200 bg-surface-primary pb-4 pt-2">
          <div class="flex flex-col gap-1 border-b border-gray-200 px-4 pb-4 pt-2">
            <a
              href="/"
              class="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-content-primary"
            >Guides</a>
            <a
              href="/api/introduction"
              class="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-content-primary"
            >API Reference</a>
            <a
              href="/guides/merchant-introduction"
              class="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-content-primary"
            >Merchant Services</a>
          </div>
          <Navigation
            :path="path"
            :navigation="navigation"
          />
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
import CloseOutline from './icons/CloseOutline.vue';
import NavigationMenu from './icons/NavigationMenu.vue';
import Navigation from './Navigation.vue';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

const props = defineProps({
  path: { type: [String, undefined], required: false, default: undefined },
  navigation: { type: Object, required: true },
});
</script>
