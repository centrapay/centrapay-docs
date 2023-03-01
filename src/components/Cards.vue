<template>

<div class="not-prose flex flex-col md:flex-row pt-4 md:space-x-6 lg:space-x-12 pb-16 space-y-6 md:space-y-0">
<span
  v-for="card in cards">
  <Card
    class="h-full max-w-l"
    :title=card.title
    :link=card.link
    :description=card.description
    :imageSrc=card.imageSrc
  />
</span>
</div>
</template>

<script setup>
import Card from './Card.vue';
import Prose from './Prose.vue';

const props=defineProps({
  cards: { type: Array, required: true },
  });
</script>
