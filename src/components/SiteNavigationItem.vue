<template>
  <div>
    <div v-if="navigationItem.children?.length">
      <Disclosure as="div">
        <PrimaryNavDisclosureButton
          v-if="primary"
          :navigation-item="navigationItem"
          :open="open"
          :selected="disclosureSelected"
          @click="open = !open"
          @keydown.space="open = !open"
        />
        <SecondaryNavDisclosureButton
          v-else
          :navigation-item="navigationItem"
          :open="open"
          :selected="disclosureSelected"
          @click="open = !open"
          @keydown.space="open = !open"
        />
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-out"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div v-show="open">
            <DisclosurePanel static>
              <SiteNavigationItem
                v-for="item in navigationItem.children"
                :key="item.title"
                :path="props.path"
                :navigation-item="item"
              />
            </DisclosurePanel>
          </div>
        </transition>
      </Disclosure>
    </div>
    <div v-else>
      <SiteNavigationLink
        :navigation-item="navigationItem"
        :path="path"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SiteNavigationItem from './SiteNavigationItem.vue';
import SiteNavigationLink from './SiteNavigationLink.vue';
import PrimaryNavDisclosureButton from './PrimaryNavDisclosureButton.vue';
import SecondaryNavDisclosureButton from './SecondaryNavDisclosureButton.vue';
import {
  Disclosure,
  DisclosurePanel,
} from '@headlessui/vue';

const props = defineProps({
  path: { type: [String, undefined], required: false, default: '' },
  navigationItem: { type: Object, required: true },
  primary: { type: Boolean, default: false },
});

function containsPagePath({ navigationItem, path }) {
  return navigationItem.children?.some(c => {
    if (c.children?.length) {
      return containsPagePath({ navigationItem: c, path });
    }
    return c.path === path;
  });
};

const disclosureSelected = computed(() => {
  return containsPagePath({
    navigationItem: props.navigationItem,
    path: props.path
  });
});
const open = ref(props.primary || disclosureSelected.value);

</script>
