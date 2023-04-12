<template>
  <div
    class="not-prose grid md:gap-6 md:gap-12 md:flex-row pt-4 pb-16 space-y-6 md:space-y-0"
    :class="columns[cols]"
  >
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  cols: { type: String, required: true },
});

const columns = {
  '1': 'md:grid-cols-1',
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-3',
};
</script>
