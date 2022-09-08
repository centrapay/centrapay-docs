<template>
  <main class="flex mt-16">
    <div class="hidden xl:sticky xl:top-[4.5rem] xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
      <ContentNavigation v-slot="{ navigation }">
        <ul class="space-y-9">
          <li
            v-for="link of navigation"
            :key="link._path"
          >
            <h4 class="font-display font-medium text-slate-900 dark:text-white">
              {{ link.title }}
            </h4>
            <ul class="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200">
              <li
                v-for="child of link.children"
                :key="child._path"
                class="relative"
              >
                <div class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full font-semibold text-sky-500 before:bg-sky-500">
                  <NuxtLink
                    :to="child._path"
                  >
                    {{ child.title }}
                  </NuxtLink>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </ContentNavigation>
    </div>
    <ContentDoc class="px-16" />
    <Toc
      :links="links"
      class="w-36 min-w-fit max-w-sm hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6"
    />
  </main>
</template>

<script setup>
const { path } = useRoute();
const contentDirectory = await queryContent().where({ _path: path }).findOne();
const links = contentDirectory.body.toc.links;
</script>
