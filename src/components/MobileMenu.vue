<template>
  <button
    class="btn flex items-center pr-6 md:hidden focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
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
  <TransitionRoot
    as="template"
    :show="mainMenuOpen"
  >
    <Dialog
      as="div"
      class="relative"
    >
      <div class="fixed inset-x-0 inset-y-16 flex min-h-full">
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
              <nav
                class="space-y-1 px-4"
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
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import CloseOutline from './icons/CloseOutline.vue';
import NavigationMenu from './icons/NavigationMenu.vue';
import PageLinks from './PageLinks.vue';
import PrimarySidebarDisclosure from './PrimarySidebarDisclosure.vue';
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { ref } from 'vue';

const props = defineProps({
  path: { type: [String, undefined], required: false, default: undefined },
  navigation: { type: Object, required: true },
});

let mainMenuOpen = ref(false);
</script>
