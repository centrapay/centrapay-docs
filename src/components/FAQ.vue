<template>
  <div style="border-bottom-width:1px">
    <Disclosure :title="title">
      <slot />
    </Disclosure>
  </div>
</template>

<script>
import Disclosure from './Disclosure.vue';

export default {
  components: {
    Disclosure,
  },

  props: {
    title: { type: String, required: true },
  },
};
</script>
