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
    <ol class="mt-4 text-sm">
      <li
        v-for="heading in visibleHeadings"
        :key="heading.slug"
        :class="heading.depth === 3 ? 'pl-5' : ''"
      >
        <a
          :href="`#${heading.slug}`"
          @click="handleTocClick(heading.slug)"
        >
          <h3
            class="border-l-2 p-squish-2 hover:text-content-primary hover:border-content-primary"
            :class="[
              visibleHeadingId === heading.slug ? 'text-content-primary border-brand-accent': 'font-normal text-content-tertiary',
              heading.depth === 3 ? 'pl-5' : ''
            ]"
          >
            {{ heading.text }}
          </h3>
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
