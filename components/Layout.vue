<template>
  <div>
    <div class="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
      <div class="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
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
          <div class="prose max-w-none">
            <slot />
          </div>
        </article>
      </div>
      <div class="hidden xl:sticky border-none xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:py-16 xl:pr-6">
        <nav
          aria-labelledby="on-this-page-title"
          class="w-56"
        >
          <h2
            v-if="toc && toc.links"
            id="on-this-page-title"
            class="font-display text-sm font-medium text-slate-900"
          >
            On this page
          </h2>
          <ol class="mt-4 space-y-3 text-sm">
            <li
              v-for="contentSection in toc.links"
              :key="contentSection.id"
            >
              <h3>
                <NuxtLink
                  :href="`#${contentSection.id}`"
                  :class="isActive(contentSection) ? 'text-brand-accent' : 'font-normal text-slate-500 hover:text-slate-700'"
                >
                  {{ contentSection.text }}
                </NuxtLink>
              </h3>
              <ol
                v-if="contentSection.children?.length > 0"
                class="mt-2 space-y-3 pl-5 text-slate-500"
              >
                <li
                  v-for="subSection in contentSection.children"
                  :key="subSection.id"
                >
                  <NuxtLink
                    :href="`#${subSection.id}`"
                    :class="isActive(subSection) ? 'text-brand-accent' : 'hover:text-slate-600'"
                  >
                    {{ subSection.text }}
                  </NuxtLink>
                </li>
              </ol>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';

const { path } = useRoute();
const contentPath = path.endsWith('/') ? path.slice(0, -1) : path;
const contentDirectory = await queryContent().where({ _path: contentPath }).findOne();
const title = contentDirectory.title;
const navigation = await fetchContentNavigation();
const section = navigation.find((s) =>
  s.children.find((child) => child._path === contentPath)
);
const { toc } = useContent();
let headings = reactive();
let currentSection = ref();

function onScroll() {
  let top = window.scrollY;
  let current = headings[0].id;
  for (let heading of headings) {
    if (top >= heading.top) {
      current = heading.id;
    } else {
      break;
    }
  }
  currentSection.value = current;
}

function getHeadings(tableOfContents) {
  return tableOfContents
    .flatMap((node) => [node.id, ...node.children?.map((child) => child.id) || [] ])
    .map((id) => {
      let el = document.getElementById(id);
      if (!el) {return;};
      let style = window.getComputedStyle(el);
      let scrollMt = parseFloat(style.scrollMarginTop);
      let top = window.scrollY + el.getBoundingClientRect().top - scrollMt;
      return { id, top };
    });
}

onMounted(() => {
  const tableOfContents = toc.value.links;
  if (tableOfContents.length === 0) {
    return;
  };
  headings = getHeadings(tableOfContents);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll, { passive: true });
});

function isActive(contentSection) {
  if (contentSection.id === currentSection.value) {
    return true;
  }
  if (!contentSection.children) {
    return false;
  }
  return contentSection.children.findIndex(isActive) > -1;
}
</script>

<style>
html {
  @apply
    scroll-smooth;
}
</style>
