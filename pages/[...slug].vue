<template>
  <main class="flex">
    <ContentDoc class="px-16" />
    <Toc :links="flattened" class="w-36 min-w-fit max-w-sm hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6" />
  </main>
</template>

<script setup>
const flattenLinks = (links) => {
  let _links = links
    .map((link) => {
      let _link = [link];
      if (link.children) {
        // recursively flatten children links
        let flattened = flattenLinks(link.children);
        _link = [link, ...flattened];
      }
      return _link;
    })
    .flat(1);
  return _links;
};
// const contentDirectory = await fetchContentNavigation();
const { path } = useRoute();
const contentDirectory = await queryContent().where({ _path: path }).findOne();
const flattened = contentDirectory.body.toc.links;
console.log(JSON.stringify(flattened, null, 2));
</script>
