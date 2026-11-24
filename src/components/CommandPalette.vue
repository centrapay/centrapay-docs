<template>
  <TransitionRoot
    appear
    :show="true"
    as="template"
  >
    <Dialog
      as="div"
      class="relative z-10"
      @close="$emit('close')"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto backdrop-blur-xs">
        <DialogPanel
          aria-label="Search the documentation"
          class="mx-auto mt-[6vh] flex max-w-3xl justify-center p-4 md:mt-[10vh]"
        >
          <Combobox v-model="selected">
            <div class="relative mt-1 w-full">
              <form
                class="flex w-full flex-row items-center gap-3 overflow-hidden rounded-lg bg-surface-primary px-4 py-3 text-left shadow-md focus-within:outline-2 focus-within:outline-focus-ring"
                role="search"
                @submit.prevent
              >
                <label
                  for="query-input"
                  class="shrink-0"
                >
                  <span class="sr-only">Search</span>
                  <Search
                    class="size-5 text-content-tertiary"
                    aria-hidden="true"
                  />
                </label>
                <!-- 16px text stops iOS Safari zooming the page when the input is focused. -->
                <ComboboxInput
                  id="query-input"
                  class="min-w-0 flex-1 border-none bg-transparent text-base leading-6 text-content-primary outline-hidden placeholder:text-content-tertiary"
                  placeholder="Search..."
                  autocomplete="off"
                  spellcheck="false"
                  @change="query = $event.target.value"
                />
                <kbd
                  aria-hidden="true"
                  class="hidden shrink-0 rounded-sm bg-surface-secondary px-2 py-0.5 font-sans text-xs font-medium text-content-secondary md:block"
                >
                  Esc
                </kbd>
              </form>
              <p
                class="sr-only"
                role="status"
              >
                {{ statusMessage }}
              </p>
              <TransitionRoot
                leave="transition ease-in duration-100"
                leave-from="opacity-100"
                leave-to="opacity-0"
                @after-leave="query = ''"
              >
                <ComboboxOptions
                  v-if="query !== ''"
                  aria-label="Search results"
                  class="absolute mt-2 max-h-[65vh] w-full overflow-auto rounded-lg bg-surface-primary py-2 text-sm shadow-lg ring-1 ring-outline-opaque focus:outline-hidden"
                >
                  <div
                    v-if="isLoading"
                    class="relative cursor-default select-none px-4 py-3 text-content-tertiary"
                  >
                    Loading search&hellip;
                  </div>
                  <div
                    v-else-if="results.length === 0"
                    class="relative cursor-default select-none px-4 py-3 text-content-secondary"
                  >
                    No results for &ldquo;{{ query }}&rdquo;.
                  </div>
                  <ComboboxOption
                    v-for="(result, resultIndex) in results"
                    :key="resultIndex"
                    v-slot="{ active }"
                    as="template"
                    :value="result"
                  >
                    <li
                      class="relative cursor-pointer select-none px-4 py-3"
                      :class="{
                        'bg-surface-secondary': active,
                      }"
                    >
                      <a
                        class="flex flex-row items-center gap-4 outline-hidden"
                        :href="result.href"
                      >
                        <div class="w-full truncate">
                          <span class="flex items-center gap-2 font-medium text-content-secondary">
                            <span class="truncate">{{ result.title }}</span>
                            <span
                              v-if="result.deprecated"
                              class="type-caption-2 shrink-0 rounded-full border border-outline-opaque bg-red-800 px-2 py-0.5 text-content-on-color"
                            >
                              deprecated
                            </span>
                          </span>
                          <p
                            v-if="result.snippet"
                            class="block truncate text-content-tertiary"
                          >
                            {{ result.snippet.prefix }}<mark class="bg-transparent font-semibold text-content-secondary">{{ result.snippet.match }}</mark>{{ result.snippet.suffix }}
                          </p>
                          <p
                            v-else
                            class="block truncate text-content-tertiary"
                          >
                            {{ result.description }}
                          </p>
                          <div class="mt-2 truncate text-content-tertiary">
                            <template v-for="(step, idx) in result.path">
                              <!-- eslint-disable-next-line vue/require-v-for-key -->
                              <span
                                class="capitalize"
                              >
                                {{ step }}
                              </span>
                              <!-- eslint-disable-next-line vue/require-v-for-key -->
                              <span
                                v-if="idx < result.path.length - 1"
                              >
                                /
                              </span>
                            </template>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ComboboxOption>
                </ComboboxOptions>
              </TransitionRoot>
            </div>
          </Combobox>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, shallowRef, watch, computed, onMounted } from 'vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/vue';
import Search from './icons/Search.vue';
import { loadSearchIndex, searchSite } from '../utils/searchIndex.js';

const query = ref('');
const selected = ref(undefined);
// shallowRef keeps Vue from making the FlexSearch index deeply reactive, which
// would be expensive and serves no purpose.
const searchIndex = shallowRef(null);

const emit = defineEmits(['close']);

const isLoading = computed(() => !searchIndex.value);

const results = computed(() => {
  if (!searchIndex.value) {
    return [];
  }
  return searchSite(searchIndex.value, query.value);
});

// Announced to screen readers, since the visible results list changes silently.
const statusMessage = computed(() => {
  if (query.value === '' || isLoading.value) {
    return '';
  }
  const count = results.value.length;
  return count === 0 ? 'No results' : `${count} ${count === 1 ? 'result' : 'results'}`;
});

onMounted(async () => {
  searchIndex.value = await loadSearchIndex();
});

watch(selected, () => {
  if (!selected.value) {
    return;
  }

  emit('close');
  window.location.href = selected.value.href;
});
</script>
