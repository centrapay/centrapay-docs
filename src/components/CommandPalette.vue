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
        <div class="fixed inset-0 bg-black bg-opacity-50" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto backdrop-blur-sm">
        <DialogPanel class="flex justify-center p-4 mt-[10vh] mx-auto max-w-3xl">
          <Combobox v-model="selected">
            <div class="relative mt-1 w-full">
              <form
                class="flex items-center w-full p-squish-2 space-x-2 cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none text-sm"
              >
                <label for="query-input">
                  <Search class="left-4 w-6" />
                </label>
                <ComboboxInput
                  id="query-input"
                  class="w-full border-none text-sm leading-5 text-gray-900 outline-none"
                  placeholder="Search..."
                  @change="query = $event.target.value"
                />
              </form>
              <TransitionRoot
                leave="transition ease-in duration-100"
                leave-from="opacity-100"
                leave-to="opacity-0"
                @after-leave="query = ''"
              >
                <ComboboxOptions
                  v-if="query !== ''"
                  class="absolute mt-1 max-h-[65vh] w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm"
                >
                  <div
                    v-if="results.length === 0"
                    class="relative cursor-default select-none py-2 px-4"
                  >
                    Nothing found.
                  </div>
                  <ComboboxOption
                    v-for="(result, resultIndex) in results"
                    :key="resultIndex"
                    v-slot="{ active }"
                    as="template"
                    :value="result"
                  >
                    <li
                      class="relative cursor-default select-none py-2 px-4"
                      :class="{
                        'bg-surface-secondary': active,
                      }"
                    >
                      <a
                        class="flex items-center space-x-4"
                        :href="result.href"
                      >
                        <div class="truncate w-full">
                          <span class="block truncate font-medium text-content-secondary">
                            {{ result.title }}
                          </span>
                          <p class="block truncate text-content-tertiary">
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
import { ref, watch, computed, onMounted } from 'vue';
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
import flexsearch from 'flexsearch/dist/flexsearch.bundle.min';

let data = {};
const index = new flexsearch.Document({
  tokenize: 'full',
  document: {
    id: 'id',
    index: ['title', 'description', 'href'],
  },
});

const query = ref('');
const selected = ref(undefined);

const { isOpen } = defineProps({
  isOpen: Boolean,
});
const emit = defineEmits(['close']);

const results = computed(() => {
  if (query.value === '') {
    return [];
  }
  const searchResults = index.search(query.value);
  const uniqueIds = Array.from(new Set(searchResults.map(r => r.result).flat()));
  return uniqueIds.map(id => data[id]);
});

onMounted(async () => {
  data = await (await fetch('/index-data.json')).json();
  Object.entries(data).forEach(([key, val]) => index.add({ id: key, ...val }));
});

watch(selected, () => {
  if (!selected.value) {
    return;
  }

  emit('close');
  window.location.href = selected.value.href;
});
</script>
