<template>
  <button
    type="button"
    aria-label="Search"
    aria-haspopup="dialog"
    aria-keyshortcuts="/"
    class="flex h-10 min-w-10 flex-row items-center justify-center gap-3 overflow-hidden rounded-none border-outline-opaque bg-surface-primary p-0 text-left transition-colors hover:bg-surface-secondary focus-visible:outline-2 focus-visible:outline-focus-ring md:mr-4 md:w-64 md:justify-start md:rounded-lg md:border md:px-4 md:pr-0 md:shadow-xs"
    @click="openCommandPalette"
    @pointerenter="warmSearchIndex"
    @focus="warmSearchIndex"
  >
    <SearchLogo
      class="size-6 shrink-0 md:size-4"
      aria-hidden="true"
    />
    <span
      class="hidden flex-auto text-content-tertiary md:flex"
      aria-hidden="true"
    >Search</span>
    <kbd
      aria-hidden="true"
      class="hidden h-full items-center justify-center bg-surface-secondary px-3 font-sans text-sm font-medium leading-5 text-content-secondary md:flex"
    >
      /
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
import { loadSearchIndex } from '../utils/searchIndex.js';

const isOpen = ref(false);

onMounted(() => {
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
  if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey && !isOpen.value && !isTypingTarget(event.target)) {
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
</script>
