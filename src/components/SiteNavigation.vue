<template>
  <div
    id="sidebar"
    class="hidden md:fixed md:h-full md:flex md:w-64 xl:w-80 md:flex-col"
  >
    <div class="sidebar-content flex flex-grow flex-col mt-16 py-5 overflow-y-auto border-r border-gray-200 bg-white">
      <nav
        class="space-y-1 px-4"
        aria-label="Sidebar"
      >
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
        </ul>
      </nav>
    </div>
  </div>
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
