<template>
  <div
    class="card w-full p-2 rounded-xl shadow-sm border border-color-outline-transparent cursor-pointer hover:bg-interactive-tertiary-hover hover:shadow-md focus:ring-1 focus:ring-offset-2 focus:ring-focus-ring"
    @click="goToLink"
  >
    <div class="p-2 space-y-2">
      <component
        :is="currentIcon"
        class="w-6 h-6 fill-brand-accent stroke-brand-accent"
      />
      <h6>{{ title }}</h6>
      <p class="type-caption-2">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  props: {
    iconName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
  },

  setup(props) {
    const currentIcon = defineAsyncComponent(() => import(`~/components/icons/${props.iconName}.vue`));
    return {
      currentIcon
    };
  },

  methods: {
    goToLink() {
      window.location = this.link;
    },
  },
};
</script>
