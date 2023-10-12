<template>
  <div>
    <div :class="{ 'border-l-2 border-brand-accent': selected && !navigationItem.headings.length }">
      <a
        :href="href"
        class="group mt-2 w-full flex items-center pl-12 pr-1 py-2 space-x-3 text-left rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
        :class="{ 'bg-gray-100': selected && !navigationItem.headings.length }"
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
    <ul
      v-for="heading in navigationItem.headings"
      v-show="selected"
      :key="heading.text"
    >
      <li
        class="border-l-2 transition delay-200 duration-1000 ease-in-out"
        :class="visibleHeadingIds.includes(heading.slug) ?
          'border-brand-accent bg-gray-50' :
          'border-interactive-tertiary'"
      >
        <a
          :href="`#${heading.slug}`"
          class="text-xs text-content-secondary hover:text-content-primary group w-full flex items-center pl-16 pr-1 py-2 space-x-3 text-left rounded-md focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
        >
          {{ heading.text }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

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

const visibleHeadingIds = ref([]);
let observer = null;

onMounted(() => {
  const observerOptions = {
    threshold: 0,
  };

  observer = new IntersectionObserver(contentSections => {
    contentSections.forEach(contentSection => {
      const headingId = contentSection.target.firstElementChild.id;
      if (contentSection.isIntersecting) {
        visibleHeadingIds.value.push(headingId);
      } else {
        const index = visibleHeadingIds.value.indexOf(headingId);
        if (index > -1) {
          visibleHeadingIds.value.splice(index, 1);
        }
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('section:has(h2:first-child)');
  sections.forEach(contentSection => {
    observer.observe(contentSection);
  });
});

onUnmounted(() => {
  observer.disconnect();
});
</script>
