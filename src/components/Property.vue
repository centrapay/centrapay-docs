<template>
  <li class="m-0 px-0 py-4 first:pt-0 last:pb-0">
    <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
      <dt class="sr-only">
        Name
      </dt>
      <dd>
        <code>{{ name }}</code>
      </dd>
      <dt
        v-if="type"
        class="sr-only"
      >
        Type
      </dt>
      <div v-if="type">
        <dd
          v-if="dataTypes.includes(type)"
          class="font-mono text-xs text-zinc-400 dark:text-zinc-500"
        >
          <a :href="'/api/data-types#' + type">{{ type }}</a>
        </dd>
        <dd
          v-else
          class="font-mono text-xs text-zinc-400 dark:text-zinc-500"
        >
          {{ type }}
        </dd>
      </div>
      <dt class="sr-only">
        Description
      </dt>
      <dd class="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        <slot />
      </dd>
    </dl>
  </li>
</template>

<script setup>
const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, default: undefined },
});
const dataTypes = [ 'Timestamp', 'BigNumber', 'Monetary', 'CRN', 'Location', 'PhoneNumber' ];
</script>
