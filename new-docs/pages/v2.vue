<template>
  <div>
    <h1>{{ name }}</h1>
    <button @click="routeToDocs">Old Docs</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Hello World',
    }
  },

  methods: {
    routeToDocs() {
      window.location = 'https://docs.centrapay.com';
    }
  },
}
</script>
