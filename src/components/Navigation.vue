<template>
  <nav
    ref="root"
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
            <template v-if="navigationChild.children?.length && !navigationChild.path">
              <li class="px-4 pb-1 pt-3 text-xs font-semibold text-content-tertiary">
                {{ navigationChild.title }}
              </li>
              <div
                v-for="subChild in navigationChild.children"
                :key="subChild.title"
              >
                <li
                  role="presentation"
                  class="group rounded-md"
                  :class="isActive(subChild) && !hasActiveHeading(subChild) ? 'bg-surface-tertiary-hover' : 'hover:bg-surface-tertiary'"
                >
                  <a
                    role="menuitem"
                    class="block py-2 pl-6 text-xs text-content-tertiary"
                    :aria-current="isActive(subChild) ? 'page' : undefined"
                    :href="subChild.path"
                  >
                    {{ subChild.title }}
                  </a>
                </li>
                <div v-if="showHeadingsFor(subChild)">
                  <li
                    v-for="navigationGrandchild in subChild.headings"
                    :key="navigationGrandchild.title"
                    role="presentation"
                    class="group rounded-md"
                    :class="isActiveHeading(subChild, navigationGrandchild) ? 'bg-surface-tertiary-hover' : 'hover:bg-surface-secondary'"
                  >
                    <a
                      role="menuitem"
                      class="block py-2 pl-8 text-xs text-content-tertiary"
                      :aria-current="isActiveHeading(subChild, navigationGrandchild) ? 'location' : undefined"
                      :href="`${subChild.path}#${navigationGrandchild.slug}`"
                    >
                      {{ navigationGrandchild.text }}
                    </a>
                  </li>
                </div>
              </div>
            </template>
            <template v-else>
              <li
                role="presentation"
                class="group rounded-md"
                :class="isActive(navigationChild) && !hasActiveHeading(navigationChild) ? 'bg-surface-tertiary-hover' : 'hover:bg-surface-tertiary'"
              >
                <a
                  role="menuitem"
                  class="block py-2 pl-4 text-xs text-content-tertiary"
                  :aria-current="isActive(navigationChild) ? 'page' : undefined"
                  :href="navigationChild.path"
                >
                  {{ navigationChild.title }}
                </a>
              </li>
              <div v-if="showHeadingsFor(navigationChild)">
                <li
                  v-for="navigationGrandchild in navigationChild.headings"
                  :key="navigationGrandchild.title"
                  role="presentation"
                  class="group rounded-md"
                  :class="isActiveHeading(navigationChild, navigationGrandchild) ? 'bg-surface-tertiary-hover' : 'hover:bg-surface-secondary'"
                >
                  <a
                    role="menuitem"
                    class="block py-2 pl-6 text-xs text-content-tertiary"
                    :aria-current="isActiveHeading(navigationChild, navigationGrandchild) ? 'location' : undefined"
                    :href="`${navigationChild.path}#${navigationGrandchild.slug}`"
                  >
                    {{ navigationGrandchild.text }}
                  </a>
                </li>
              </div>
            </template>
          </div>
        </div>
      </div>
    </ul>
  </nav>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
  path: { type: [String, undefined], required: false, default: undefined },
  navigation: { type: Object, required: true },
  showHeadings: { type: Boolean, required: false, default: true },
});

// The heading of the current page that the reader has scrolled to.
const activeSlug = ref('');

function findItem(items) {
  for (const item of items || []) {
    if (item.path && item.path === props.path) {
      return item;
    }
    const found = findItem(item.children);
    if (found) {
      return found;
    }
  }
}

const currentHeadings = findItem(props.navigation.items)?.headings || [];

function hashSlug() {
  return decodeURIComponent(window.location.hash.slice(1));
}

// The active heading is the last one scrolled past the top fifth of the window. At the bottom
// of the page the last headings can never get that high, so prefer the one in the URL there.
function updateActiveSlug() {
  const threshold = window.innerHeight * 0.2;
  let slug = '';
  for (const heading of currentHeadings) {
    const element = document.getElementById(heading.slug);
    if (element && element.getBoundingClientRect().top <= threshold) {
      slug = heading.slug;
    }
  }
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom && currentHeadings.some(heading => heading.slug === hashSlug())) {
    slug = hashSlug();
  }
  activeSlug.value = slug;
}

let scrollFrame = null;
function onScroll() {
  if (scrollFrame === null) {
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = null;
      updateActiveSlug();
    });
  }
}

function onHashChange() {
  activeSlug.value = hashSlug();
}

const root = ref(null);

function scrollParent(element) {
  let parent = element?.parentElement;
  while (parent && !['auto', 'scroll'].includes(getComputedStyle(parent).overflowY)) {
    parent = parent.parentElement;
  }
  return parent;
}

// Keep the active heading's link visible in the sidebar as the page scrolls.
watch(activeSlug, async () => {
  await nextTick();
  const link = root.value?.querySelector('[aria-current="location"]');
  const scroller = scrollParent(link);
  if (!link || !scroller) {
    return;
  }
  const linkRect = link.getBoundingClientRect();
  const scrollerRect = scroller.getBoundingClientRect();
  if (linkRect.top < scrollerRect.top) {
    scroller.scrollTop -= scrollerRect.top - linkRect.top;
  } else if (linkRect.bottom > scrollerRect.bottom) {
    scroller.scrollTop += linkRect.bottom - scrollerRect.bottom;
  }
});

onMounted(() => {
  if (!currentHeadings.length) {
    return;
  }
  updateActiveSlug();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('hashchange', onHashChange);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('hashchange', onHashChange);
  cancelAnimationFrame(scrollFrame);
});

function isActive(item) {
  return props.path === item.path;
}

function hasHeadings(item) {
  return props.showHeadings && item.headings?.length > 0;
}

function showHeadingsFor(item) {
  return hasHeadings(item) && isActive(item);
}

function isActiveHeading(item, heading) {
  return isActive(item) && activeSlug.value === heading.slug;
}

function hasActiveHeading(item) {
  return showHeadingsFor(item) && item.headings.some(heading => isActiveHeading(item, heading));
}
</script>
