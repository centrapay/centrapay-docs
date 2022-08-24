<template>
  <NuxtLink
    class="card w-full p-2 rounded-xl shadow-sm border border-color-outline-transparent cursor-pointer hover:bg-interactive-tertiary-hover hover:shadow-md focus:ring-1 focus:ring-offset-2 focus:ring-focus-ring"
    :to="props.link"
  >
    <div class="p-2 space-y-2">
      <component
        :is="currentIcon"
        class="w-6 h-6 fill-brand-accent stroke-brand-accent"
      />
      <div class="type-subtitle-1">
        {{ props.title }}
      </div>
      <p class="type-caption-2">
        {{ props.description }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  iconName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
});
const currentIcon = defineAsyncComponent(() => import(`~/components/icons/${props.iconName}.vue`));
</script>
