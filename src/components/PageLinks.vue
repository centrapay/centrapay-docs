<template>
  <div>
    <div :class="{ 'border-l-2 border-brand-accent': selected }">
      <a
        :href="href"
        class="group mt-2 w-full flex items-center pl-12 pr-1 py-2 space-x-3 text-left rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
        :class="{ 'bg-gray-100': selected }"
      >
        <span
          role="menuitem"
          class="flex-1 leading-5 font-medium"
          :class="{
            'text-black': selected,
            'text-md text-content-tertiary': level === 1,
            'text-sm text-content-tertiary': level === 2,
            'text-xs text-content-secondary': level === 3,
          }"
        >
          {{ navigationItem.title }}
        </span>
      </a>
    </div>
    <DisclosureTransition>
      <ul
        v-for="heading in navigationItem.headings"
        v-show="selected"
        :key="heading.text"
      >
        <li>
          <a
            :href="`#${heading.slug}`"
            class="text-xs text-content-secondary group mt-2 w-full flex items-center pl-16 pr-1 py-2 space-x-3 text-left rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
            :class="{
              'bg-gray-50': visibleHeadingId === heading.slug,
            }"
            @click="handleHeadingClick(heading.slug)"
          >
            {{ heading.text }}
          </a>
        </li>
      </ul>
    </DisclosureTransition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import DisclosureTransition from './DisclosureTransition.vue';

const props = defineProps({
  path: { type: [String, undefined], required: false, default: '' },
  navigationItem: { type: Object, required: true },
  level: { type: Number, required: true },
});

const href = computed(() => {
  return props.navigationItem.href || props.navigationItem.path;
});

const selected = computed(() => {
  return props.path === props.navigationItem.path;
});

const visibleHeadingId = ref('');
let observer = null;

onMounted(() => {
  const observerOptions = {
    threshold: 0,
    rootMargin: '-20% 0px -80% 0px',
  };

  observer = new IntersectionObserver(contentSections => {
    contentSections.forEach(contentSection => {
      const headingId = contentSection.target.firstElementChild.id;
      if (contentSection.isIntersecting) {
        visibleHeadingId.value = headingId;
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('section:has(h2:first-child)');
  if (sections.length) {
    const firstHeadingId = sections[0].firstElementChild.id;
    visibleHeadingId.value = firstHeadingId;
  }
  sections.forEach(contentSection => {
    observer.observe(contentSection);
  });
});

onUnmounted(() => {
  observer.disconnect();
});

function handleHeadingClick(headingId) {
  visibleHeadingId.value = headingId;
};
</script>
