<template>
  <div class="flex flex-col overflow-hidden shadow-xl rounded-lg">
    <div class="flex-shrink-0">
      <img
        class="h-48 w-full object-cover"
        :src="imageSrc"
        alt=""
      >
    </div>
    <div class="flex flex-1 flex-col justify-between bg-white p-6">
      <div class="flex-1">
        <p class="text-lg leading-6 font-medium">
          {{ title }}
        </p>
        <p class="mt-3 text-sm leading-5 font-normal text-content-secondary">
          {{ description }}
        </p>
      </div>
      <NuxtLink
        v-if="link.text"
        :to="link.url"
        class="mt-6 flex items-center btn rounded-md bg-interactive-primary text-content-inverse-primary shadow-md justify-center"
      >
        {{ link.text }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  imageSrc: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: {
    type: Object,
    default: undefined,
    validator(object) {
      return object.text && object.url;
    },
  }
});
</script>
