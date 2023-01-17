<template>
  <nav
    class="flex p-4"
    aria-label="Breadcrumb"
  >
    <ol
      role="list"
      class="flex items-center space-x-4"
    >
      <li>
        <div>
          <NuxtLink
            href="/"
            class="text-gray-400 hover:text-gray-500"
          >
            <home-icon
              class="icon-md flex-shrink-0 text-gray-400 hover:text-gray-500"
              aria-hidden="true"
            />
            <span class="sr-only">Home</span>
          </NuxtLink>
        </div>
      </li>
      <li
        v-for="page in crumbs"
        :key="page.title"
      >
        <div class="flex items-center">
          <chevron-right
            class="icon-md flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <NuxtLink
            :href="page.fullPath"
            class="capitalize ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            {{ page.title }}
          </NuxtLink>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const crumbs = computed(() => {
  const fullPath = route.path;
  if (fullPath == '/') {
    return;
  }

  const params = fullPath.startsWith('/')
    ? fullPath.substring(1).split('/')
    : fullPath.split('/');
  const breadcrumbs = [];
  let path = '';
  params.forEach( param => {
    path = `${path}/${param}`;
    const match = router.resolve(path);
    if (match.name !== null) {
      breadcrumbs.push({
        title: param.replace(/-/g, ' '),
        ...match,
      });
    }
  });
  return breadcrumbs;
});
</script>
