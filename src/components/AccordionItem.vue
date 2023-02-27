<template>
  <div>
    <div class="flex flex-row space-x-4">
      <slot name="title" />
      <button
        class="focus:ring-0"
        @click="toggleDescription()"
      >
        <ChevronDown :class="[showDescription && 'rotate-180']" />
      </button>
    </div>
    <slot
      v-if="showDescription"
      name="description"
    />
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
