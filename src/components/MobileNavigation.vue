<template>
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
</template>

<script setup>
import PrimarySidebarDisclosure from './PrimarySidebarDisclosure.vue';
import PageLinks from './PageLinks.vue';

const props = defineProps({
  path: { type: [String, undefined], required: false, default: '' },
  navigation: { type: Object, required: true },
});
</script>
