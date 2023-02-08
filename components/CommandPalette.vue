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
          <div class="fixed inset-0 bg-black bg-opacity-50" />
        </TransitionChild>
        <div class="fixed inset-0 overflow-y-auto backdrop-blur-sm">
          <DialogPanel class="flex justify-center p-4 mt-[10vh] mx-auto max-w-xl">
            <Combobox v-model="selected">
              <div class="relative mt-1 w-full">
                <form class="flex items-center w-full p-squish-2 space-x-2 cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none text-sm">
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
                          <p class="block truncate">
                            {{ result.description }}
                          </p>
                          <div class="mt-2 truncate">
                            <template v-for="(step, idx) in result.path">
                              <!-- eslint-disable-next-line vue/require-v-for-key -->
                              <span
                                class="capitalize"
                                :class="{
                                  'text-gray-100': active,
                                  'text-gray-600': !active,
                                }"
                              >
                                {{ step }}
                              </span>
                              <!-- eslint-disable-next-line vue/require-v-for-key -->
                              <span
                                v-if="idx < result.path.length - 1"
                                :class="{
                                  'text-gray-100': active,
                                  'text-gray-600': !active,
                                }"
                              >
                                /
                              </span>
                            </template>
                          </div>
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

const data = [];
const router = useRouter();
const headingRegex = /(h1|h2|h3|h4|h5|h6)/;


const query = ref('');
const selected = ref(undefined);

const { isOpen } = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['close']);

const index = new Document({
  tokenize: 'full',
  document: {
    id: 'href',
    index: ['title', 'description'],
  },
});

function htmlObjToText(obj) {
  let txt = '';
  for (const child of obj?.children ?? []) {
    if (child.type === 'text') {
      txt += child.value;
    }
  }

  return txt;
}

function findAllHtmlSections(root) {
  const sections = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node.tag === 'section') {
      sections.push(node);
    }
    queue.push(...node.children ?? []);
  }
  return sections;
}

const results = computed(() => {
  if (query.value === '') {
    return [];
  }

  const searchResults = index.search(query.value);
  const uniqueHrefs = new Set(searchResults.map(r => r.result).flat());

  return Array.from(uniqueHrefs).map(href => data.find(item => item.href === href));
});

onMounted(async () => {
  const pages = await queryContent().find();

  // Extract frontmatter
  pages.forEach(page => data.push({
    href: page._path,
    title: page.title,
    description: page.description,
    path: `${page.nav.path}${page.nav.title ? `/${page.nav.title}` : ''}`.split('/')
  }));

  // Extract sections
  pages.forEach(page => findAllHtmlSections(page.body)
    .forEach(section => {
      const paragraph = section.children.find(child => child.tag === 'p');
      const heading = section.children.find(child => headingRegex.test(child.tag));

      data.push({
        title: htmlObjToText(heading),
        description: htmlObjToText(paragraph),
        href: `${page._path}#${heading.props.id}`,
        path: `${page.nav.path}${page.nav.title ? `/${page.nav.title}` : ''}`.split('/')
      });
    })
  );

  // Add frontmatter and sections to index
  data.forEach(d => index.add(d));
});

watch(selected, async () => {
  if (selected.value) {
    emit('close');
    await router.push(selected.value.href);
  }
});
</script>
