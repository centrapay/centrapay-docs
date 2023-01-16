<template>
  <div>
    <div
      v-for="item in navigation"
      :key="item.title"
    >
      <Disclosure
        v-slot="{ open }"
        as="div"
        :default-open="currentPath.startsWith(item._path)"
      >
        <DisclosureButton
          class="group mt-2 w-full flex items-center pl-2 pr-1 py-2 text-left text-content-primary text-base leading-6 font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
          :class="currentPath.startsWith(item._path) ? 'bg-gray-100' : ''"
        >
          <component
            :is="item.icon"
            class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          <span class="flex-1">{{ item.title }}</span>
          <disclosure-arrow-right :class="[open ? 'text-gray-400 rotate-90' : 'text-gray-300', 'ml-3 icon-md flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400']" />
        </DisclosureButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-out"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <DisclosurePanel>
            <div
              v-for="firstChild in item.children"
              :key="firstChild.title"
            >
              <NuxtLink
                :href="firstChild._path"
                class="group mt-2 flex w-full items-center rounded-md py-2 pl-6 pr-2 text-sm font-medium text-content-secondary hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
                @click="$emit('link-clicked')"
              >
                {{ firstChild.title }}
              </NuxtLink>
              <div v-if="firstChild.children">
                <div
                  v-for="secondChild in firstChild.children"
                  :key="secondChild.title"
                >
                  <NuxtLink
                    :href="secondChild._path"
                    class="group mt-2 flex w-full items-center rounded-md py-2 pl-8 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
                    @click="$emit('link-clicked')"
                  >
                    {{ secondChild.title }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </DisclosurePanel>
        </transition>
      </Disclosure>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';

emits: ['link-clicked' ];

const { navigation } = useContent();
const route = useRoute();
const currentPath = computed(() => route.path);
</script>

<style scoped>
.router-link-active {
  @apply
    bg-gray-50
    text-content-primary
  ;
}
</style>
