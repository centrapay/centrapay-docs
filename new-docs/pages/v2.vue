<template>
  <div>
    <h1
      class="bg-brand-secondary type-display"
    >
      {{ name }}
    </h1>
    <button
      class="btn-secondary"
      @click="routeToDocs"
    >
      Old Docs
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Hello World',
    };
  },

  methods: {
    routeToDocs() {
      window.location = 'https://docs.centrapay.com';
    }
  },
};
</script>
