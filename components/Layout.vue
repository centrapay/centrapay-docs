<template>
  <div class="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
    <div class="hidden lg:relative lg:block lg:flex-none">
      <div class="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
      <div class="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto py-16 pl-0.5">
        <div class="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block " />
        <div class="absolute top-28 bottom-0 right-0 hidden w-px bg-slate-800 dark:block" />
        <Navigation
          :navigation="navigation"
          class="w-64 pr-8 xl:w-72 xl:pr-16"
        />
      </div>
    </div>
    <div
      class="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16"
    >
      <article>
        <header
          :v-if="title || section"
          class="mb-9 space-y-1"
        >
          <p
            v-if="section"
            class="font-display text-sm font-medium text-sky-500"
          >
            {{ section.title }}
          </p>
          <h1
            v-if="title"
            class="font-display text-3xl tracking-tight text-slate-900 dark:text-white"
          >
            {{ title }}
          </h1>
        </header>
        <slot />
      </article>
      <dl
        class="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800"
      >
        <div v-if="previousPage">
          <dt
            class="font-display text-sm font-medium text-slate-900 dark:text-white"
          >
            Previous
          </dt>
          <dd class="mt-1">
            <NuxtLink
              :href="previousPage._path"
              class="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
            >
              <span aria-hidden="true">&larr;</span> {{ previousPage.title }}
            </NuxtLink>
          </dd>
        </div>

        <div
          v-if="nextPage"
          class="ml-auto text-right"
        >
          <dt
            class="font-display text-sm font-medium text-slate-900 dark:text-white"
          >
            Next
          </dt>
          <dd class="mt-1">
            <NuxtLink
              :href="nextPage._path"
              class="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
            >
              {{ nextPage.title }} <span aria-hidden="true">&rarr;</span>
            </NuxtLink>
          </dd>
        </div>
      </dl>
    </div>
    <div class="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
      <nav
        aria-labelledby="on-this-page-title"
        class="w-56"
      >
        <div v-if="tableOfContents.length > 0">
          <h2
            id="on-this-page-title"
            class="font-display text-sm font-medium text-slate-900 dark:text-white"
          >
            On this page
          </h2>

          <ol
            role="list"
            class="mt-4 space-y-3 text-sm"
          >
            <li
              v-for="group of tableOfContents"
              :key="group.id"
            >
              <h3>
                <NuxtLink
                  :href="'#' + group.id"
                  class="font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                >
                  {{ group.text }}
                </NuxtLink>
              </h3>

              <ol
                v-if="group.children && group.children.length > 0"
                role="list"
                class="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
              >
                <li
                  v-for="child of group.children"
                  :key="child.id"
                >
                  <NuxtLink
                    :href="'#' + child.id"
                    class="text-sky-500' : 'hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {{ child.text }}
                  </NuxtLink>
                </li>
              </ol>
            </li>
          </ol>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
const { title, tableOfContents } = defineProps({
  title: { type: String, required: true },
  tableOfContents: { type: Array, required: true },
});
const router = useRouter();
const { path } = useRoute();
const isHomePage = path === '/';
const navigation = await fetchContentNavigation();
const allLinks = navigation.flatMap((section) => section.children);
const linkIndex = allLinks.findIndex((link) => link._path === path);
const previousPage = allLinks[linkIndex - 1];
const nextPage = allLinks[linkIndex + 1];
const section = navigation.find((s) =>
  s.children.find((child) => child._path === path)
);
</script>
