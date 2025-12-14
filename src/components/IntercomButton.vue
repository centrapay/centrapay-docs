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
  created() {
    console.log('[IntercomButton] Component created, appId:', this.appId);
    console.log('[IntercomButton] Intercom import:', typeof Intercom);

    if (this.appId) {
      const intercomConfig = {
        app_id: this.appId,
        hide_default_launcher: true,
      };

      console.log('[IntercomButton] Initializing Intercom with config:', intercomConfig);
      try {
        Intercom(intercomConfig);
        console.log('[IntercomButton] Intercom() called successfully');
      } catch (error) {
        console.error('[IntercomButton] Error calling Intercom():', error);
      }
    } else {
      console.warn('[IntercomButton] No appId provided');
    }
  },
  mounted() {
    // Wait for Intercom to be ready after component is mounted
    this.waitForIntercom();
  },
  methods: {
    waitForIntercom() {
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds max
      const checkIntercom = () => {
        attempts++;
        console.log(`[IntercomButton] Checking for window.Intercom (attempt ${attempts})...`);
        console.log('[IntercomButton] window.Intercom:', typeof window.Intercom);
        console.log('[IntercomButton] window.Intercom value:', window.Intercom);

        if (window.Intercom && typeof window.Intercom === 'function') {
          this.intercomReady = true;
          console.log('[IntercomButton] Intercom is ready!');
        } else if (attempts < maxAttempts) {
          setTimeout(checkIntercom, 100);
        } else {
          console.error('[IntercomButton] Intercom failed to initialize after', maxAttempts, 'attempts');
        }
      };
      checkIntercom();
    },
    openIntercom() {
      console.log('[IntercomButton] ===== BUTTON CLICKED =====');
      console.log('[IntercomButton] window.Intercom:', typeof window.Intercom);
      console.log('[IntercomButton] window.Intercom value:', window.Intercom);
      console.log('[IntercomButton] intercomReady:', this.intercomReady);
      console.log('[IntercomButton] Full window object keys:', Object.keys(window).filter(k => k.toLowerCase().includes('intercom')));

      // Test if button click works at all
      alert('Button clicked! Check console for Intercom status.');

      if (window.Intercom && typeof window.Intercom === 'function') {
        console.log('[IntercomButton] Calling window.Intercom("show")...');
        try {
          window.Intercom('show');
          console.log('[IntercomButton] window.Intercom("show") called successfully');
        } catch (error) {
          console.error('[IntercomButton] Error calling window.Intercom("show"):', error);
        }
      } else {
        console.warn('[IntercomButton] window.Intercom is not available, retrying...');
        // Retry after a short delay if Intercom isn't ready yet
        setTimeout(() => {
          console.log('[IntercomButton] Retry - window.Intercom:', typeof window.Intercom);
          if (window.Intercom && typeof window.Intercom === 'function') {
            try {
              window.Intercom('show');
              console.log('[IntercomButton] Retry successful');
            } catch (error) {
              console.error('[IntercomButton] Retry error:', error);
            }
          } else {
            console.error('[IntercomButton] window.Intercom still not available after retry');
            console.error('[IntercomButton] This means Intercom SDK did not initialize properly');
          }
        }, 500);
      }
    },
  },
  data() {
    return {
      intercomReady: false,
    };
  },
};
</script>

