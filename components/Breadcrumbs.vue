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
            :to="page._path"
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
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

watch(() => route.path, async () => {
  const path = route.path;
  crumbs.value = await getBreadcrumbs(path);
});

function flatten(data){
  return data.reduce(function(result,next){
    result.push(next);
    if(next.children){
      result = result.concat(flatten(next.children));
      next.children = [];
    }
    return result;
  },[]);
}

async function getBreadcrumbs(path) {
  const breadcrumbs = await fetchContentNavigation(path);
  const pathLength = path.startsWith('/')
    ? path.substring(1).split('/').length
    : path.split('/').length;
  return flatten(breadcrumbs).slice(0, pathLength);;
}

const crumbs = ref(await getBreadcrumbs(route.path));
</script>
