<template>
  <nav class="space-y-1 px-2">
    <ul role="menubar">
      <div
        v-for="item in navigation.items"
        :key="item.title"
      >
        <PrimarySidebarDisclosure
          v-if="item.children?.length"
          :navigation-item="item"
          :path="path"
        />
        <PageLinks
          v-else
          :navigation-item="item"
          :path="path"
          :level="1"
        />
      </div>

      <!-- FIXME: Remove this section when API docs migration is finished -->
      <li>
        <a
          :href="`${baseUrl}/api`"
          class="group mt-2 w-full flex items-center pl-3 pr-1 py-2 space-x-3 text-left rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
        >
          <Settings
            class="icon-md flex-shrink-0 text-content-tertiary group-hover:text-content-secondary"
            aria-hidden="true"
          />
          <div class="flex-1">
            <span class="text-sm">API</span>
            <div class="leading-none">
              <span class="text-content-secondary text-xs">For developers</span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import PrimarySidebarDisclosure from './PrimarySidebarDisclosure.vue';
import PageLinks from './PageLinks.vue';
import Settings from './icons/Settings.vue';

const props = defineProps({
  path: { type: [String, undefined], required: false, default: '' },
  navigation: { type: Object, required: true },
  baseUrl: { type: String, required: true },
});
</script>
