<template>
  <div class="prose-h3:scroll-mt-32 prose-h3:mt-2">
    <div
      v-if="img"
      class="flex items-center max-h-72 overflow-hidden"
    >
      <img
        :src="img"
        aria-hidden="true"
        class="object-cover m-0"
      >
    </div>
    <div class="relative mx-auto desktop-gutters flex justify-center">
      <div class="min-w-0 max-w-2xl flex-auto px-8 pb-16 pt-8 xl:pt-16 lg:max-w-none">
        <article>
          <header
            v-if="title || collectionName"
            class="mb-9 space-y-1"
          >
            <p
              v-if="collectionName"
              class="type-overline text-brand-accent"
            >
              {{ collectionName }}
            </p>
            <h1
              v-if="title"
              class="font-display text-3xl tracking-tight text-slate-900"
            >
              {{ title }}
            </h1>
          </header>
          <Prose>
            <slot />
          </Prose>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import Prose from '../components/Prose.vue';

const props = defineProps({
  collectionName: { type: String, required: true },
  headings: { type: Object, required: true },
  title: { type: String, required: true },
  img: { type: String, required: true },
});
</script>
