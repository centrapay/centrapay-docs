<template>
  <div>
    <div
      v-for="item in navigation.items"
      :key="item.title"
    >
      <SiteNavigationItem
        :path="props.path"
        :navigation-item="item"
        :primary="true"
      />
    </div>

    <!-- FIXME The API nav component below should move to the navigation config once it is on the main docs site -->
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
          <span class="text-content-tertiary text-xs">For developers</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup>
import SiteNavigationItem from './SiteNavigationItem.vue';
import Settings from './icons/Settings.vue';

const props = defineProps({
  path: { type: [String, undefined], required: false, default: '' },
  navigation: { type: Object, required: true },
  baseUrl: { type: String, required: true },
});

const emit = defineEmits([ 'link-clicked' ]);
</script>
