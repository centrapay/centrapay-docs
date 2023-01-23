<template>
  <div>
    <div
      v-if="imageSrc"
      class="flex items-center max-h-72 overflow-hidden"
    >
      <img
        :src="imageSrc"
        aria-hidden="true"
        class="object-cover m-0"
      >
    </div>
    <div class="relative mx-auto desktop-gutters flex justify-center">
      <div class="min-w-0 max-w-2xl flex-auto px-8 pb-16 pt-8 xl:pt-16 lg:max-w-none">
        <article>
          <header
            v-if="title || section"
            class="mb-9 space-y-1"
          >
            <p
              v-if="section"
              class="type-overline text-brand-accent"
            >
              {{ section.title }}
            </p>
            <h1
              v-if="title"
              class="font-display text-3xl tracking-tight text-slate-900"
            >
              {{ title }}
            </h1>
          </header>
          <Prose>
            <slot />
          </Prose>
        </article>
      </div>
      <div class="hidden xl:sticky border-none xl:top-[4.5rem] xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:py-16 xl:pr-6 overflow-y-auto">
        <nav
          v-if="toc && toc.links"
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
              v-for="contentSection in toc.links"
              :key="contentSection.id"
            >
              <NuxtLink
                :href="`#${contentSection.id}`"
                @click="handleTocClick(contentSection.id)"
              >
                <h3
                  class="border-l p-squish-2 hover:text-content-primary hover:border-content-primary hover:border-l-2"
                  :class="visibleHeadingId === contentSection.id ? 'text-content-primary border-brand-accent border-l-2': 'font-normal text-content-tertiary'"
                >
                  {{ contentSection.text }}
                </h3>
              </NuxtLink>
              <ol
                v-if="contentSection.children?.length > 0"
                class="mt-2 pl-5 text-content-primary"
              >
                <NuxtLink
                  v-for="subSection in contentSection.children"
                  :key="subSection.id"
                  :href="`#${subSection.id}`"
                  @click="handleTocClick(subSection.id)"
                >
                  <li
                    class="border-l p-squish-2 hover:text-content-primary hover:border-content-primary hover:border-l-2"
                    :class="visibleHeadingId === subSection.id ? 'text-content-primary border-brand-accent border-l-2' : 'text-content-tertiary font-normal'"
                  >
                    {{ subSection.text }}
                  </li>
                </NuxtLink>
              </ol>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const { path } = useRoute();
const contentPath = path.endsWith('/') ? path.slice(0, -1) : path;
const contentDirectory = await queryContent().where({ _path: contentPath }).findOne();
const imageSrc = contentDirectory.img;
const title = contentDirectory.title;
const navigation = await fetchContentNavigation();
const section = navigation.find((s) =>
  s.children.find((child) => child._path === contentPath)
);
const { toc } = useContent();

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

<style>
html {
  @apply
    scroll-smooth;
}
</style>
