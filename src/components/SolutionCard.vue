<template>
  <div class="flex flex-col overflow-hidden shadow-xl rounded-lg">
    <div class="flex-shrink-0">
      <img
        class="h-48 w-full object-cover"
        :src="imageSrc"
        alt=""
      >
    </div>
    <div class="prose flex flex-1 flex-col justify-between bg-white p-6">
      <div class="flex-1">
        <h4 class="font-semibold">
          {{ title }}
        </h4>
        <p>
          {{ description }}
        </p>
      </div>
      <a
        v-if="link.text"
        :href="link.url"
        class="mt-6 flex items-center btn rounded-md bg-interactive-primary text-content-inverse-primary shadow-md justify-center hover:bg-interactive-secondary"
      >
        {{ link.text }}
      </a>
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
