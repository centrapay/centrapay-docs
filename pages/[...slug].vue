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
const contentDirectory = await queryContent().where({ _path: path }).findOne();
const title = contentDirectory.title;
const tableOfContents = contentDirectory.body.toc.links;
</script>
