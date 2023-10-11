<template>
  <nav
    v-if="visibleHeadings && visibleHeadings.length"
    aria-labelledby="on-this-page-title"
    class="w-56"
  >
    <h2
      id="on-this-page-title"
      class="type-overline text-content-primary"
    >
      On this page
    </h2>
    <ol class="mt-4">
      <li
        v-for="heading in visibleHeadings"
        :key="heading.slug"
      >
        <a
          :href="`#${heading.slug}`"
          class="flex border-l-2 text-sm p-squish-2 truncate hover:text-content-primary hover:border-content-primary"
          :class="[
            visibleHeadingIds.includes(heading.slug) ?
              'text-content-primary border-brand-accent':
              'text-content-tertiary'
          ]"
        >
          <span
            :class="{
              'pl-4': heading.depth === 3,
              'font-bold': heading.depth === 2
            }"
          >
            {{ heading.text }}
          </span>
        </a>
      </li>
    </ol>
  </nav>
  <div
    v-else
    class="w-56"
  >
    <!-- Dummy element to force page content width to stay consistent when there is no TOC -->
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  headings: { type: Object, required: true },
});

const visibleHeadingIds = ref([]);
const visibleHeadings = props.headings.filter(heading => heading.depth <= 3);
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

  const sections = document.querySelectorAll('section');
  sections.forEach(contentSection => {
    observer.observe(contentSection);
  });
});

onUnmounted(() => {
  observer.disconnect();
});

</script>
