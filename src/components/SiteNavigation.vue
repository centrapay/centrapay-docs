<template>
  <div>
    <div
      v-for="item in navigation.menu.children"
      :key="item.title"
    >
      <SiteNavigationDisclosure
        :path="props.path"
        :navigation="navigation"
        :navigation-item="item"
        @link-clicked="$emit('link-clicked')"
      />
    </div>
  </div>
</template>

<script setup>
import SiteNavigationDisclosure from './SiteNavigationDisclosure.vue';
import Receipt from './icons/Receipt.vue';
import Connections from './icons/Connections.vue';
import Settings from './icons/Settings.vue';

const props = defineProps({
  path: { type: [String, undefined], required: false, default: '' },
  navigation: { type: Object, required: true },
});

const emit = defineEmits([ 'link-clicked' ]);
</script>
