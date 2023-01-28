<template>
  <ClientOnly>
    <TransitionRoot
      appear
      :show="isOpen"
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
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>
        <div class="fixed inset-0 overflow-y-auto">
          <DialogPanel class="flex justify-center p-4 mt-[15vh] mx-auto max-w-xl">
            <Combobox v-model="selected">
              <div class="relative mt-1 w-full">
                <div
                  class="relative flex items-center w-full p-squish-2 space-x-2 cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
                >
                  <Search class="w-6 flex-grow" />
                  <ComboboxInput
                    class="w-full border-none text-sm leading-5 text-gray-900 outline-none"
                    placeholder="Search..."
                    @change="query = $event.target.value"
                  />
                </div>
                <TransitionRoot
                  leave="transition ease-in duration-100"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
                  @after-leave="query = ''"
                >
                  <ComboboxOptions
                    v-if="query !== ''"
                    class="absolute mt-1 max-h-[65vh] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <div
                      v-if="results.length === 0"
                      class="relative cursor-default select-none py-2 px-4 text-gray-700"
                    >
                      Nothing found.
                    </div>
                    <ComboboxOption
                      v-for="result in results"
                      :key="result.href"
                      v-slot="{ active }"
                      as="template"
                      :value="result"
                    >
                      <li
                        class="relative cursor-default select-none py-2 px-4"
                        :class="{
                          'bg-teal-600 text-white': active,
                          'text-gray-900': !active,
                        }"
                      >
                        <NuxtLink :to="result.href">
                          <span class="block truncate font-semibold">
                            {{ result.title }}
                          </span>
                          <p class="block line-clamp-2">
                            {{ result.description }}
                          </p>
                        </NuxtLink>
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
  </ClientOnly>
</template>

<script setup>
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
import Document from 'flexsearch/src/document';

let sections = [];
const index = new Document({
  tokenize: 'forward',
  document: {
    id: 'href',
    index: ['title', 'description'],
  },
});

const router = useRouter();

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
  const hrefs = new Set(searchResults.map(r => r.result).flat());

  return Array.from(hrefs).map(href => {
    const section = sections.find(_section => _section.href === href);
    return {
      href,
      title: section.title,
      description: section.description,
    };
  });
});

onMounted(async () => {
  sections = (await import('../assets/js/data.json')).default;
  sections.forEach(section => index.add(section));
});

watch(selected, async () => {
  if (selected.value) {
    emit('close');
    await router.push(selected.value.href);
  }
});
</script>
