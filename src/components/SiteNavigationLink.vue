<template>
  <div :class="{ 'border-l-2 border-brand-accent': selected }">
    <a
      :href="navigationItem.href || navigationItem.path"
      class="group mt-2 w-full flex items-center pl-12 pr-1 py-2 space-x-3 text-left rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
      :class="{ 'bg-gray-100': selected }"
    >
      <span
        role="menuitem"
        class="flex-1 leading-5 font-medium"
        :class="{
          'text-black': selected,
          'text-md text-content-tertiary': level === 1,
          'text-sm text-content-tertiary': level === 2,
          'text-xs text-content-secondary': level === 3,
        }"
      >
        {{ navigationItem.title }}
      </span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  path: { type: [String, undefined], required: false, default: '' },
  navigationItem: { type: Object, required: true },
  level: { type: Number, required: true },
});

const selected = computed(() => {
  return props.path === props.navigationItem.path;
});
</script>
