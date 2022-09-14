<template>
  <nav class="text-base lg:text-sm">
    <ul
      role="list"
      class="space-y-9"
    >
      <li
        v-for="section in props.navigation"
        :key="section.title"
      >
        <h5 class="font-display text-sm font-bold text-slate-900 dark:text-white">
          {{ section.title }}
        </h5>
        <ul
          role="list"
          class="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200"
        >
          <li
            v-for="child in section.children"
            :key="child._path"
            class="relative"
          >
            <NuxtLink
              :to="child._path"
              class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full"
              :class="child._path === path ? 'font-semibold text-brand-accent before:bg-brand-accent' : 'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'"
            >
              {{ child.title }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({
  navigation: { type: Array, required: true }
});
const { path } = useRoute();
</script>
