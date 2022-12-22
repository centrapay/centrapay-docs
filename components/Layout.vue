<template>
  <div class="prose mx-auto max-w-7xl flex flex-col-reverse min-h-full lg:grid lg:grid-cols-5 lg:gap-8 lg:px-8">
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
            class="text-brand-accent"
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
      class="sticky top-[4.5rem] flex flex-col w-full px-4 bg-white drop-shadow-sm lg:max-h-page lg:self-start lg:bg-transparent lg:backdrop-blur-none lg:flex-none lg:overflow-y-auto lg:py-16 lg:col-span-1"
    >
      <button
        class="px-0 py-3 gap-1 flex items-center focus:outline-none focus:ring-0 mb-0 lg:hidden"
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
        <p class="hidden lg:block mt-0 mb-4">
          On this page
        </p>
        <ol
          v-if="toc && toc.links"
          class="space-y-2 list-none p-0"
        >
          <li
            v-for="heading in toc.links"
            :key="heading.text"
            class="space-y-2 p-0"
          >
            <a
              :href="`#${heading.id}`"
              class="active:text-brand-accent no-underline"
              @click="showTocDropdown = false"
            >
              {{ heading.text }}
            </a>
            <ul
              v-if="heading.children && heading.children.length > 0"
              class="space-y-2 pl-4"
            >
              <li
                v-for="subHeading in heading.children"
                :key="subHeading.text"
              >
                <a
                  :href="`#${subHeading.id}`"
                  @click="showTocDropdown = false"
                >
                  {{ subHeading.text }}
                </a>
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </nav>
  </div>
</template>

<script setup>
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
</script>
