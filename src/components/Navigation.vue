<template>
  <nav
    class="w-full px-2 pt-2"
    aria-label="Sidebar"
  >
    <ul role="menubar">
      <div
        v-for="item in navigation.items"
        :key="item.title"
      >
        <li class="type-overline px-4 font-bold">
          {{ item.title }}
        </li>
        <div
          v-if="item.children?.length"
          class="pb-4 pt-2"
        >
          <div
            v-for="navigationChild in item.children"
            :key="navigationChild.title"
            role="menuitem"
          >
            <li
              role="presentation"
              class="group rounded-md hover:bg-gray-100"
              :class="{ 'bg-gray-100': path === navigationChild.path}"
            >
              <a
                role="menuitem"
                class="block py-2 pl-4 text-xs text-gray-600"
                :href="navigationChild.path"
              >
                {{ navigationChild.title }}
              </a>
            </li>
            <div v-if="navigationChild.headings?.length && path === navigationChild.path">
              <li
                v-for="navigationGrandchild in navigationChild.headings"
                :key="navigationGrandchild.title"
                role="presentation"
                class="group rounded-md hover:bg-gray-50"
              >
                <a
                  role="menuitem"
                  class="block py-2 pl-6 text-xs text-gray-600"
                  :href="`${navigationChild.path}#${navigationGrandchild.slug}`"
                >
                  {{ navigationGrandchild.text }}
                </a>
              </li>
            </div>
          </div>
        </div>
      </div>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({
  path: { type: [String, undefined], required: false, default: undefined },
  navigation: { type: Object, required: true },
});
</script>
