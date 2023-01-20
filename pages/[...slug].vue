<template>
  <main>
    <Layout>
      <ContentDoc />
    </Layout>
  </main>
</template>

<script setup>
const { page } = useContent();
// FIXME remove second expression once farmlands partner page has been moved to markdown
const pageExists = page.value._file || page.value._path === '/connections/farmlands' || page.value._path === '/';
if (!pageExists) {
  throw createError({ statusCode: 404, statusMessage: 'Not Found' });
}
</script>
