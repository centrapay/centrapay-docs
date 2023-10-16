<template>
  <div>
    <button
      data-copy-button
      aria-labelledby="button-label"
      class="groups relative inline-block transition hover:scale-110 active:scale-100 active:transition-none focus:ring-0"
      @mouseover="buttonHover = true"
      @mouseleave="mouseleave"
      @click="tooltipText = 'Copied'"
    >
      <div>
        <span
          id="copy-button-label"
          hidden
        >
          Copy to clipboard
        </span>
        <Clipboard
          aria-hidden="true"
          class="text-content-inverse-tertiary hover:text-interactive-tertiary-hover active:text-interactive-quaternary"
        />
      </div>
      <Transition>
        <div
          v-show="buttonHover"
          class="type-caption-2 w-32 drop-shadow bg-surface-primary rounded-lg py-1 px-2 absolute z-10 group-hover:opacity-100 bottom-full -left-[47px] pointer-events-none"
        >
          {{ tooltipText }}
          <svg
            class="absolute text-surface-primary h-2 w-full left-0 top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xml:space="preserve"
          >
            <polygon
              class="fill-current"
              points="0,0 127.5,127.5 255,0"
            />
          </svg>
        </div>
        <!-- <span
          v-show="buttonHover"
          id="tooltip-hover"
          role="tooltip"
          class="bg-pink-500 absolute bottom-full -left-10 w-28"
        >
          {{ tooltipText }}
        </span> -->
      </Transition>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Clipboard from './icons/Clipboard.vue';

const initialTooltipText = 'Click to copy';
const tooltipText = ref(initialTooltipText);
const buttonHover = ref(false);

function mouseleave() {
  buttonHover.value = false;
  window.setTimeout(() => {
    tooltipText.value = initialTooltipText;
  }, 75);
}
</script>
