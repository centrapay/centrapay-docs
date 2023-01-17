<template>
  <div class="flex flex-col min-h-screen">
    <AppShell>
      <NuxtPage />
      <button
        type="button"
        class="btn-tertiary fixed right-6 bottom-6 border rounded-full shadow-lg flex justify-center w-16 h-16"
        @click="openFreshWorksWidget"
      >
        <messages-bubble-double
          class="icon-lg"
          aria-hidden="true"
        />
      </button>
      <Footer class="mt-auto" />
    </AppShell>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
nuxtApp.hook('page:finish', () => {
  window.scrollTo({
    top: 0,
    behavior: 'instant',
  });
});

useHead({
  script: [
    {
      innerHTML: `
        window.fwSettings={
        'widget_id':51000002960
        };
        !function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}()
      `,
      type: 'text/javascript',
      charset: 'utf-8'
    },
    {
      src: 'https://aus-widget.freshworks.com/widgets/51000002960.js',
      defer: true,
      async: true,
      type: 'text/javascript',
    },
  ],
});
onMounted(() => {
  window.FreshworksWidget('hide', 'launcher');
});

function openFreshWorksWidget() {
  window.FreshworksWidget('open');
}
</script>
