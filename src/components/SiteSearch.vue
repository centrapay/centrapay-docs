<template>
  <button
    class="flex flex-row h-10 items-center gap-3 overflow-hidden rounded-none border-outline-opaque bg-surface-primary p-0 text-left ring-0 focus:outline-hidden focus:ring-0 md:mr-4 md:w-64 md:rounded-lg md:border md:px-4 md:pr-0 md:shadow-xs"
    @click="openCommandPalette"
    @pointerenter="warmSearchIndex"
    @focus="warmSearchIndex"
  >
    <SearchLogo class="size-6 md:size-4" />
    <span class="hidden flex-auto text-content-tertiary md:flex">Search</span>
    <kbd
      class="hidden h-full items-center justify-center bg-surface-secondary px-3 font-sans text-sm font-medium leading-5 text-content-secondary md:flex"
    >
      {{ shortcutHint }}
    </kbd>
  </button>

  <CommandPalette
    v-if="isOpen"
    @close="closeCommandPalette"
  />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import SearchLogo from '../components/icons/Search.vue';
import CommandPalette from '../components/CommandPalette.vue';
import { loadSearchIndex } from '../utils/searchIndex.js';

const isOpen = ref(false);
const isApplePlatform = ref(false);

const shortcutHint = computed(() => (isApplePlatform.value ? '⌘K' : 'Ctrl K'));

onMounted(() => {
  isApplePlatform.value = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
  window.addEventListener('keydown', onKeyDown);
});
onUnmounted(() => window.removeEventListener('keydown', onKeyDown));

// Building the index takes a moment, so start it as soon as there is a hint the
// user is heading for search rather than waiting until the palette is open.
function warmSearchIndex() {
  loadSearchIndex().catch(() => {});
}

// `/` is a plain character, so it must not act as a shortcut while the user is
// typing — including in the palette's own search box.
function isTypingTarget(target) {
  if (!target || target.isContentEditable) {
    return Boolean(target);
  }
  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}

function onKeyDown(event) {
  if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    toggleCommandPalette();
    return;
  }
  if (event.key === '/' && !isOpen.value && !isTypingTarget(event.target)) {
    event.preventDefault();
    openCommandPalette();
  }
}

function openCommandPalette() {
  warmSearchIndex();
  isOpen.value = true;
}

function closeCommandPalette() {
  isOpen.value = false;
}

function toggleCommandPalette() {
  if (isOpen.value) {
    closeCommandPalette();
    return;
  }
  openCommandPalette();
}
</script>
