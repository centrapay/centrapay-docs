<template>
  <button
    class="flex items-center md:w-80 md:mr-4 text-left space-x-3 py-0 px-0 md:px-4 md:pr-0 h-10 bg-white md:border border-gray-300 focus:outline-none ring-0 focus:ring-0 md:shadow-sm rounded-none md:rounded-lg overflow-hidden"
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


