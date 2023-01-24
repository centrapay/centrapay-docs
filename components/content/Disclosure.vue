<template>
  <div class="w-full pt-2">
    <div class="mx-auto w-full rounded-2xl bg-white">
      <Disclosure v-slot="{ open }">
        <DisclosureButton
          class="flex w-full justify-between rounded-lg prose-p:m-2 bg-gray-100 px-4 py-2 text-left text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
          :class="open && 'rounded-b-none'"
        >
          <slot name="heading" />
          <disclosure-arrow-right :class="[open ? 'text-gray-400 rotate-90' : 'text-gray-300', 'ml-3 icon-md flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400']" />
        </DisclosureButton>
        <DisclosurePanel class="rounded-b-md p-4 text-sm text-gray-500 bg-gray-100 space-y-2">
          <ContentSlot :use="$slots.content" />
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';
</script>
