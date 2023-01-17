<template>
  <div>
    <div
      v-for="item in navigation"
      :key="item.title"
    >
      <Disclosure
        as="div"
        class="space-y-1"
        :default-open="currentPath.startsWith(item._path)"
      >
        <DisclosureButton
          class="group w-full flex items-center pl-2 pr-1 py-2 text-left text-content-primary text-base leading-6 font-medium rounded-md hover:bg-gray-200"
          :class="currentPath.startsWith(item._path) ? 'bg-gray-100' : ''"
        >
          <span class="flex-1">{{ item.title }}</span>
        </DisclosureButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-out"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <DisclosurePanel
            class="space-y-1"
          >
            <div
              v-for="firstChild in item.children"
              :key="firstChild.title"
            >
              <NuxtLink
                :href="firstChild._path"
                class="group flex w-full items-center rounded-md py-2 pl-6 pr-2 text-sm font-medium text-content-secondary hover:bg-gray-200 hover:text-gray-900"
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
                    class="group flex w-full items-center rounded-md py-2 pl-8 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-gray-900"
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
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';

const { page, navigation } = useContent();
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
