<template>
  <div
    class="my-8 rounded-lg"
    :class="props.language === 'mermaid' ? 'border border-outline-opaque bg-surface-secondary' : ''"
  >
    <div
      v-if="props.language === 'mermaid'"
      id="mermaid-graph"
    />
    <div
      v-else
      class="border border-outline-opaque rounded-xl overflow-hidden"
    >
      <div class="flex w-full justify-between items-center border-b border-outline-opaque rounded-xl rounded-b-none bg-surface-secondary text-content-secondary shadow-sm py-2 px-4">
        <span class="truncate type-body-3">
          {{ props.filename || 'Example' }}
        </span>
        <div
          role="button"
          :aria-pressed="copied"
          class="cursor-pointer icon-sm text-content-tertiary"
        >
          <p class="sr-only">
            Copy to clipboard
          </p>
          <transition
            enter-active-class="transition duration-200 delay-200 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="transform opacity-100"
            leave-active-class="transition duration-200 ease-out"
            leave-from-class="transform opacity-100"
            leave-to-class="transform opacity-0"
          >
            <icons-checkmark v-if="copied == true" />
            <icons-clipboard
              v-else
              @click="copyCode"
            />
          </transition>
        </div>
      </div>
      <div
        ref="code"
        class="max-h-96 overflow-y-auto"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import mermaid from 'mermaid';

const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: ''
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array,
    default: () => []
  }
});

const copied = ref(false);
const code = ref(null);
const copyCode = () => {
  navigator.clipboard.writeText(code.value.innerText);
  copied.value = true;
  window.setTimeout(() => {
    copied.value = false;
  }, 2000);
};

onMounted(() => {
  if (props.language === 'mermaid' && props.code) {
    const parentNode = document.getElementById('mermaid-graph');
    const mermaidContainer = document.createElement('div');
    mermaidContainer.innerHTML = props.code;
    parentNode.replaceWith(mermaidContainer);
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        mainBkg: '#F8F8F8',
        actorBkg: '#F8F8F8',
        primaryColor: '#F8F8F8',
        primaryTextColor: '#232323',
        primaryBorderColor: '#D1D5DB',
        secondaryColor: '#232323',
        noteBkgColor: '#232323',
        noteTextColor: '#F8F8F8',
        labelBoxBkgColor: '#FFFFFF',
      },
      sequence: {
        diagramMarginY: 50,
      }
    });
    mermaid.init(undefined, mermaidContainer);
  }
});
</script>

<style>
pre code .line {
  display: block;
  min-height: 1rem;
}

pre {
  @apply
    mb-0
  ;
}
</style>
