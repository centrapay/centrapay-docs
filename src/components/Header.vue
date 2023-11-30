<template>
  <div>
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
                <MobileNavigation
                  :path="navPath"
                  :navigation="navigation"
                />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <CommandPalette
      v-if="isOpen"
      @close="closeCommandPalette"
    />

    <div class="fixed bg-white inset-x-0 z-10 flex h-16 flex-shrink-0 shadow">
      <div class="flex w-full justify-between items-center">
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

        <div class="flex items-center">
          <button
            class="btn flex items-center md:w-80 md:mr-4 text-left space-x-3 py-0 px-0 md:px-4 md:pr-0 h-10 bg-white md:border border-gray-300 focus:outline-none ring-0 focus:ring-0 md:shadow-sm rounded-none md:rounded-lg overflow-hidden"
            @click="openCommandPalette"
          >
            <SearchLogo class="w-6 h-6 md:w-4 md:h-4" />
            <span class="hidden md:flex flex-auto text-gray-500">Search</span>
            <kbd
              class="hidden md:flex items-center justify-center h-full aspect-square font-sans font-medium text-sm leading-5 bg-gray-50 text-gray-700"
            >
              <abbr
                title="Command"
                class="no-underline"
              >/
              </abbr>
            </kbd>
          </button>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import SearchLogo from '../components/icons/Search.vue';
import CentrapayLogo from '../components/icons/CentrapayLogo.vue';
import CloseOutline from '../components/icons/CloseOutline.vue';
import NavigationMenu from '../components/icons/NavigationMenu.vue';
import MobileNavigation from '../components/MobileNavigation.vue';
import CommandPalette from '../components/CommandPalette.vue';
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

const isOpen = ref(false);
const mainMenuOpen = ref(false);

const navPath = ref(props.path.endsWith('/') ? props.path.slice(0, -1) : props.path);

onMounted(() => window.addEventListener('keydown', onKeyDown));
onUnmounted(() => window.removeEventListener('keydown', onKeyDown));

function onKeyDown(event) {
  if (event.key === '/') {
    toggleCommandPalette();
    event.preventDefault();
  }
}
function openCommandPalette() {
  isOpen.value = true;
}

function closeCommandPalette() {
  isOpen.value = false;
}

function toggleCommandPalette() {
  isOpen.value = !isOpen.value;
}
</script>
