<template>
  <nav class="">
    <header class="toc-header">
      <div class="font-display text-sm font-medium text-slate-900 dark:text-white">
        On this page
      </div>
    </header>
    <ul class="toc-links">
      <li
        v-for="link of flattenLinks(links)"
        :key="link.id"
        :class="`toc-link _${link.depth}`"
      >
        <a :href="`#${link.id}`">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  links: {
    type: Array,
    default: () => []
  }
});

const flattenLinks = (links) => {
  let flattenedLinks = links
    .map((link) => {
      let linkArray = [ link ];
      if (link.children) {
        let flattenedChildren = flattenLinks(link.children);
        linkArray = [link, ...flattenedChildren];
      }
      return linkArray;
    })
    .flat(1);
  return flattenedLinks;
};
</script>

<style scoped>
.toc {
  @apply p-4 bg-slate-50 border border-slate-200 rounded-lg;
  @apply max-h-[calc(100vh-6rem)] overflow-auto;
}

.toc-header {
  @apply pb-2 mb-2 border-b border-slate-200;
}

.toc-links {
  @apply flex flex-col gap-2 px-2;
}

.toc-link {
  @apply font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300;
}

.toc-link._3 {
  @apply space-y-3 pl-5;
}

.toc-link._4 {
  @apply space-y-3 pl-10;
}

.toc-link._undefined {
  @apply pl-8;
}
</style>
