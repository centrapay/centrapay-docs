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
        :key="heading.id"
      >
        <a
          :href="`#${heading.id}`"
          class="flex truncate border-l-2 text-sm p-squish-2 hover:border-content-primary hover:text-content-primary"
          :class="[
            visibleHeadingId === heading.id ?
              'border-brand-accent text-content-primary':
              'text-content-tertiary'
          ]"
          @click="handleTocClick(heading.id)"
        >
          <span
            :class="{
              'pl-4': heading.depth === 3,
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

const visibleHeadingId = ref('');
const visibleHeadings = props.headings.filter(heading => heading.depth <= 3);
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

  const sections = document.querySelectorAll('section');
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

function handleTocClick (headingId) {
  visibleHeadingId.value = headingId;
};

</script>
