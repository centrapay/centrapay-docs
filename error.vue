<template>
  <main
    class="flex flex-col justify-center items-center min-h-screen w-full"
  >
    <div class="space-y-1 flex flex-col items-center">
      <span class="type-body-2 text-brand-accent">404</span>
      <h1 class="type-headline-3">
        Page not found
      </h1>
      <span class="type-body-2 text-center">Please check the URL in the address bar and try again.</span>
    </div>
    <div class="flex mt-8 space-x-2 h-12 w-35">
      <NuxtLink
        class="btn-primary rounded-md h-full flex items-center px-4"
        to="/"
      >
        <span class="type-caption-2 text-content-inverse-primary">Go Back Home</span>
      </NuxtLink>
      <a
        class="btn-tertiary rounded-md border h-full flex items-center px-4"
        href="mailto:integrations@centrapay.com"
      >
        <span class="type-caption-2 text-content-tertiary">Contact Support</span>
      </a>
    </div>
  </main>
</template>
