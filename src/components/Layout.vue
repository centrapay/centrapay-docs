<template>
  <div>
    <div
      v-if="props.img"
      class="flex items-center max-h-72 overflow-hidden"
    >
      <img
        :src="props.img"
        aria-hidden="true"
        class="object-cover m-0 w-full h-24 md:h-full"
      >
    </div>
    <div class="relative mx-auto desktop-gutters flex justify-center">
      <div class="min-w-0 max-w-2xl flex-auto px-8 pb-16 pt-8 xl:pt-16 lg:max-w-none">
        <article>
          <header
            v-if="props.title || collectionName"
            class="mb-9 space-y-1"
          >
            <p
              v-if="collectionName"
              class="type-overline text-brand-accent"
            >
              {{ collectionName }}
            </p>
            <h1
              v-if="props.title"
              class="font-display text-3xl tracking-tight text-slate-900"
            >
              {{ props.title }}
            </h1>
          </header>
          <Prose>
            <slot />
          </Prose>
        </article>
      </div>
      <div class="hidden xl:sticky border-none xl:top-[4.5rem] xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:py-16 xl:pr-6 overflow-y-auto">
        <nav
          v-if="props.headings && props.headings.length"
          aria-labelledby="on-this-page-title"
          class="w-56"
        >
          <h2
            id="on-this-page-title"
            class="type-overline text-brand-accent"
          >
            On this page
          </h2>
          <ol class="mt-4 text-sm">
            <li
              v-for="heading in headings"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Prose from '../components/Prose.vue';

const props = defineProps({
  collectionName: { type: String, required: true },
  headings: { type: Object, required: true },
  title: { type: String, required: true },
  img: { type: String, required: true },
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
