<template>
  <Popover
    v-slot="{ open }"
    class="static isolate z-50 md:hidden"
  >
    <div class="py-5">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <PopoverButton class="flex items-center ring-focus-ring focus:outline-none focus:ring-2 focus:ring-inset">
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
      </div>
    </div>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <PopoverPanel class="absolute inset-x-0 inset-y-16 -z-10">
        <div class="relative size-auto bg-surface-primary">
          <div class="flex min-h-full w-full flex-1 overflow-y-scroll py-2">
            <nav
              class="w-full space-y-1 px-4"
              aria-label="Sidebar"
            >
              <ul role="menubar">
                <div
                  v-for="item in navigation.items"
                  :key="item.title"
                >
                  <PrimarySidebarDisclosure
                    v-if="item.children?.length"
                    :navigation-item="item"
                    :path="path"
                  />
                  <PageLinks
                    v-else
                    :navigation-item="item"
                    :path="path"
                    :level="1"
                  />
                </div>
              </ul>
            </nav>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
import CloseOutline from './icons/CloseOutline.vue';
import NavigationMenu from './icons/NavigationMenu.vue';
import PageLinks from './PageLinks.vue';
import PrimarySidebarDisclosure from './PrimarySidebarDisclosure.vue';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ref } from 'vue';

const props = defineProps({
  path: { type: [String, undefined], required: false, default: undefined },
  navigation: { type: Object, required: true },
});

let mainMenuOpen = ref(false);
</script>
