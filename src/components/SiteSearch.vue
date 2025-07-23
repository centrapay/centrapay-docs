<template>
  <button
    class="flex flex-row h-10 items-center gap-3 overflow-hidden rounded-none border-gray-300 bg-white p-0 text-left ring-0 focus:outline-hidden focus:ring-0 md:mr-4 md:w-64 md:rounded-lg md:border md:px-4 md:pr-0 md:shadow-xs"
    @click="openCommandPalette"
  >
    <SearchLogo class="size-6 md:size-4" />
    <span class="hidden flex-auto text-gray-500 md:flex">Search</span>
    <kbd
      class="hidden aspect-square h-full items-center justify-center bg-gray-50 font-sans text-sm font-medium leading-5 text-gray-700 md:flex"
    >
      <abbr
        title="Command"
        class="no-underline"
      >/
      </abbr>
    </kbd>
  </button>

  <CommandPalette
    v-if="isOpen"
    @close="closeCommandPalette"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import SearchLogo from '../components/icons/Search.vue';
import CommandPalette from '../components/CommandPalette.vue';

const isOpen = ref(false);

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


