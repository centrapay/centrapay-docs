<template>
  <div>
    <button
      data-copy-button
      aria-labelledby="button-label"
      class="groups relative inline-block transition hover:scale-110 active:scale-100 active:transition-none focus:ring-0"
      @mouseover="buttonHover = true"
      @mouseleave="mouseleave"
      @click="clickHandler"
    >
      <span
        id="copy-button-label"
        hidden
      >
        Copy to clipboard
      </span>
      <Clipboard
        aria-hidden="true"
        :class="buttonActive ?
          'text-interactive-quaternary' :
          'text-content-inverse-tertiary hover:text-interactive-tertiary-hover'
        "
      />
      <div
        v-show="buttonHover"
        id="clipboard-tooltip"
        :class="buttonActive ?
          'bg-surface-positive text-content-inverse-primary' :
          'bg-interactive-tertiary-hover text-content-secondary'
        "
        class="type-caption-2 w-16 bg-surface-primary rounded-lg py-1 px-2 absolute z-10 group-hover:opacity-100 bottom-full -left-[15px] pointer-events-none"
      >
        {{ tooltipText }}
        <svg
          class="absolute h-2 w-full left-0 top-[98%] z-20"
          :class="buttonActive ? 'text-surface-positive' : 'text-interactive-tertiary-hover'"
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
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Clipboard from './icons/Clipboard.vue';

const initialTooltipText = 'Copy';
const tooltipText = ref(initialTooltipText);
const buttonActive = ref(false);
const buttonHover = ref(false);

function clickHandler() {
  buttonActive.value = true;
  tooltipText.value = 'Copied';
}

function mouseleave() {
  buttonHover.value = false;
  buttonActive.value = false;
  window.setTimeout(() => {
    tooltipText.value = initialTooltipText;
  }, 75);
}
</script>
