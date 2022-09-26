<template>
  <main>
    <Layout
      :title="title"
      :table-of-contents="tableOfContents"
    >
      <ContentDoc />
    </Layout>
  </main>
</template>

<script setup>
const { path } = useRoute();
const contentPath = path.endsWith('/') ? path.slice(0, -1) : path;
const contentDirectory = await queryContent().where({ _path: contentPath }).findOne();
const title = contentDirectory.title;
const tableOfContents = contentDirectory.body.toc.links;
</script>
