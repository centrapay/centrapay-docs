<template>
  <button
    id="intercom-button"
    type="button"
    class="fixed bottom-6 right-6 z-50 flex size-16 items-center justify-center rounded-full border border-gray-200 bg-interactive-quaternary shadow-lg hover:bg-interactive-quaternary-hover active:bg-interactive-quaternary-active"
    @click="openIntercom"
  >
    <span class="sr-only">Open support widget</span>
    <MessagesBubbleDouble
      class="inline-block size-5 text-content-on-color"
      aria-hidden="true"
    />
  </button>
</template>

<script>
import Intercom from '@intercom/messenger-js-sdk';
import MessagesBubbleDouble from './icons/MessagesBubbleDouble.vue';

export default {
  name: 'IntercomButton',
  components: {
    MessagesBubbleDouble,
  },
  props: {
    appId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    if (this.appId) {
      Intercom({
        app_id: this.appId,
        hide_default_launcher: true,
      });
    }
  },
  methods: {
    openIntercom() {
      if (window.Intercom && typeof window.Intercom === 'function') {
        window.Intercom('show');
      }
    },
  },
};
</script>

