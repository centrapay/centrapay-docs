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
useHead({
  titleTemplate: (titleChunk) => titleChunk === 'Centrapay Docs' ? titleChunk : `${titleChunk} - Centrapay Docs`,
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
    {
      innerHTML: `
        (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3333046,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `,
      type: 'text/javascript',
      charset: 'utf-8',
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
