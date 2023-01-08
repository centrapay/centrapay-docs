<template>
  <div
    class="prose max-w-none
    prose-h2:border-t prose-h2:pt-12 prose-h2:scroll-mt-20 prose-h2:lg:scroll-mt-12
    prose-h3:pt-8 prose-h3:scroll-mt-24 prose-h3:lg:scroll-mt-16
    "
  >
    <Header />
    <NuxtPage />
  </div>
</template>

<style scoped>
.prose :where(h2 > a, h3 > a) {
  @apply
    no-underline
  ;
}
</style>
