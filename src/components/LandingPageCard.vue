<template>
  <a
    class="card w-full p-2 rounded-xl shadow-sm border border-color-outline-transparent cursor-pointer hover:bg-interactive-tertiary-hover hover:shadow-md focus:ring-1 focus:ring-offset-2 focus:ring-focus-ring"
    :href="props.link"
  >
    <div class="p-2 space-y-2">
      <component
        :is="props.icon"
        class="w-6 h-6 fill-brand-accent stroke-brand-accent"
      />
      <h2 class="type-headline-4">
        {{ props.title }}
      </h2>
      <p class="text-content-tertiary">
        {{ props.description }}
      </p>
    </div>
  </a>
</template>

<script setup>
const props = defineProps({
  icon: { type: Object, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
});
</script>
