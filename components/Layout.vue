<template>
  <div class="mx-auto max-w-7xl flex flex-col-reverse min-h-full lg:grid lg:grid-cols-5 lg:gap-8 lg:px-8">
    <div
      class="min-w-full max-w-2xl flex-auto px-4 py-3 lg:py-16 lg:max-w-prose lg:col-span-4"
    >
      <article>
        <header
          :v-if="title || section"
          class="mb-9 space-y-1"
        >
          <p
            v-if="section"
            class="text-brand-accent type-overline"
          >
            {{ section.title }}
          </p>
          <h1 v-if="title">
            {{ title }}
          </h1>
        </header>
        <slot />
      </article>
    </div>
    <nav
      class="prose-a:no-underline sticky top-[4.5rem] flex flex-col w-full bg-white drop-shadow-sm lg:max-h-page lg:self-start lg:bg-transparent lg:backdrop-blur-none lg:flex-none lg:overflow-y-auto lg:py-16 lg:col-span-1"
    >
      <button
        class="type-overline text-brand-accent py-3 gap-1 flex items-center focus:outline-none focus:ring-0 mb-0 lg:hidden"
        @click="showTocDropdown = !showTocDropdown"
      >
        On this page
        <div
          class="transition-transform duration-100"
          :class="showTocDropdown ? 'transform rotate-90' : 'transform rotate-0'"
        >
          <icons-carat />
        </div>
      </button>
      <div
        :class="showTocDropdown === false ? 'hidden' : ''"
        class="space-y-1 sm:space-y-2 mb-4 lg:mt-0 lg:block"
      >
        <p class="type-overline text-brand-accent hidden lg:block mt-0 mb-4 pl-6">
          On this page
        </p>
        <ol
          v-if="toc && toc.links"
          class="list-none p-0"
        >
          <div
            v-for="heading in toc.links"
            :key="heading.text"
          >
            <a
              :href="`#${heading.id}`"
              class="type-body-3 text-content-tertiary hover:underline hover:text-gray-900"
              @click="handleTocClick(heading.id)"
            >
              <li
                class="m-0 py-3 px-6 hover:bg-gray-50"
                :class="visibleHeadingId === heading.id ? 'bg-gray-100' : 'bg-transparent'"
              >
                {{ heading.text }}
              </li>
            </a>
            <ul
              v-if="heading.children && heading.children.length > 0"
              class="pl-0 m-0"
            >
              <a
                v-for="subHeading in heading.children"
                :key="subHeading.text"
                :href="`#${subHeading.id}`"
                class="type-body-3 text-content-tertiary hover:underline hover:text-gray-900"
                @click="handleTocClick(subHeading.id)"
              >
                <li
                  class="m-0 py-3 px-6 pl-10 list-none hover:bg-gray-50"
                  :class="visibleHeadingId === subHeading.id ? 'bg-gray-100' : 'bg-transparent'"
                >
                  {{ subHeading.text }}
                </li>
              </a>
            </ul>
          </div>
        </ol>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const { path } = useRoute();
const contentPath = path.endsWith('/') ? path.slice(0, -1) : path;
const contentDirectory = await queryContent().where({ _path: contentPath }).findOne();
const title = contentDirectory.title;
const navigation = await fetchContentNavigation();
const section = navigation.find((s) =>
  s.children.find((child) => child._path === contentPath)
);
const { toc } = useContent();
const showTocDropdown = ref(false);

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

  document
    .querySelectorAll('section')
    .forEach(contentSection => {
      observer.observe(contentSection);
    });
});

onUnmounted(() => {
  this.observer.disconnect();
});

const handleTocClick = (headingId) => {
  showTocDropdown.value = false;
  visibleHeadingId.value = headingId;
};
</script>

<style>
html {
  @apply
    scroll-smooth;
}
</style>
