<template>
  <div>
    <button
      class="flex w-full flex-row justify-between px-0 my-2 focus:ring-1 ring-offset-8 rounded-md type-subtitle-2"
      style="text-align:left"
      @click="toggleDescription()"
    >
      <slot name="title" />
      <ChevronDown :class="[showDescription && 'rotate-180', 'h-6 w-6 flex-none']" />
    </button>
    <div class="mr-6 mb-2">
      <slot
        v-if="showDescription"
        name="description"
      />
    </div>
  </div>
</template>

<script>
import ChevronDown from './icons/ChevronDown.vue';

export default {
  components: {
    ChevronDown,
  },

  data() {
    return {
      showDescription: false,
    };
  },

  methods: {
    toggleDescription() {
      this.showDescription = !this.showDescription;
    },
  },
};
</script>
