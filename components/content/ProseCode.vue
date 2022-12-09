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
      class="relative p-4"
    >
      <slot />
    </div>
  </div>
</template>
