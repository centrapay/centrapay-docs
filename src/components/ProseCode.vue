<template>
  <div
    class="my-8 rounded-lg"
  >
    <div class="border border-outline-opaque rounded-xl overflow-hidden">
      <div class="flex w-full justify-between items-center border-b border-outline-opaque rounded-xl rounded-b-none bg-surface-secondary text-content-secondary shadow-sm py-2 px-4">
        <span class="truncate type-body-3">
          Example
        </span>
        <div
          role="button"
          :aria-pressed="copied"
          class="cursor-pointer icon-sm text-content-tertiary"
        >
          <p class="sr-only">
            Copy to clipboard
          </p>
          <transition
            enter-active-class="transition duration-200 delay-200 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="transform opacity-100"
            leave-active-class="transition duration-200 ease-out"
            leave-from-class="transform opacity-100"
            leave-to-class="transform opacity-0"
          >
            <Checkmark v-if="copied == true" />
            <Clipboard
              v-else
              @click="copyCode"
            />
          </transition>
        </div>
      </div>
      <pre
        ref="code"
        class="max-h-96 overflow-y-auto"
      >
        <slot />
      </pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Checkmark from './icons/Checkmark.vue';
import Clipboard from './icons/Clipboard.vue';

const copied = ref(false);
const code = ref(null);
const copyCode = () => {
  navigator.clipboard.writeText(code.value.innerText);
  copied.value = true;
  window.setTimeout(() => {
    copied.value = false;
  }, 2000);
};

</script>

<style>
pre code .line {
  display: block;
}

pre {
  @apply
    mb-0
  ;
}
</style>
