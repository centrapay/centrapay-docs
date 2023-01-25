<template>
  <div>
    <div
      v-for="item in navigation"
      :key="item.title"
      class="px-2"
    >
      <div
        v-if="item.children"
      >
        <div
          class="flex items-center pl-4 pr-1 py-5 space-x-2 text-left"
        >
          <component
            :is="item.icon"
            class="icon-lg flex-shrink-0 text-content-tertiary"
            aria-hidden="true"
          />
          <span class="flex-1 text-content-primary type-caption-1 font-medium">{{ item.title }}</span>
        </div>
        <div
          v-for="firstChild in item.children"
          :key="firstChild.title"
          class="space-y-2"
        >
          <NuxtLink
            class="flex w-full rounded-md py-2 pl-4 pr-2 type-caption-2 font-medium text-interactive-primary hover:text-interactive-primary hover:bg-content-inverse-tertiary focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
            :to="firstChild.path"
            @click="$emit('link-clicked')"
          >
            {{ firstChild.title }}
          </NuxtLink>
          <div
            v-if="firstChild.children"
            class="space-y-1"
          >
            <NuxtLink
              v-for="secondChild in firstChild.children"
              :key="secondChild.title"
              class="flex w-full rounded-md py-2 pl-10 pr-2 type-caption-2 font-medium text-interactive-secondary hover:text-interactive-primary hover:bg-content-inverse-tertiary focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
              :to="secondChild.path"
              @click="$emit('link-clicked')"
            >
              {{ secondChild.title }}
            </NuxtLink>
          </div>
        </div>
      </div>
      <NuxtLink
        v-else
        target="_blank"
        :to="item.path"
        class="group flex items-center pl-4 pr-1 my-3 py-2 space-x-2 text-left"
      >
        <component
          :is="item.icon"
          class="icon-lg flex-shrink-0 text-content-tertiary group-hover:text-content-secondary"
          aria-hidden="true"
        />
        <span class="flex-1 text-content-primary type-caption-1 font-medium group-hover:text-content-secondary">{{ item.title }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

emits: ['link-clicked' ];

const config = useRuntimeConfig();
// TODO Make the navigation dynamically pick up all the pages in content folder
const navigation = [
  {
    title: 'Reference',
    path: '/reference',
    icon: 'receipt',
    children: [
      {
        title: 'Merchant Integrations',
        path: '/guides/point-of-sale',
        children: [
          {
            title: 'Point of Sale',
            path: '/guides/point-of-sale',
          },
          {
            title: 'Requesting Payment',
            path: '/guides/requesting-payment',
          },
          {
            title: 'QR Code Flow',
            path: '/guides/merchant-integration-qr-code-flow',
          },
          {
            title: 'Barcode Flow',
            path: '/guides/merchant-integration-barcode-flow',
          },
          {
            title: 'Merchant Integration Error Handling',
            path: '/guides/merchant-integration-error-handling',
          },
          {
            title: 'Transaction Reporting',
            path: '/guides/transaction-reporting',
          },
          {
            title: 'Initiating Refunds',
            path: '/guides/initiating-refunds',
          },
          {
            title: 'Payment Request Line Items',
            path: '/guides/payment-request-line-items',
          },
          {
            title: 'Merchant Payment Conditions',
            path: '/guides/merchant-payment-conditions',
          },
          {
            title: 'Requesting Pre Auth',
            path: '/guides/requesting-pre-auth',
          },
          {
            title: 'Patron Not Present',
            path: '/guides/patron-not-present',
          },
        ]
      }
    ]
  },
  {
    title: 'Connections',
    path: '/connections',
    icon: 'connections',
    children: [
      {
        title: 'Farmlands',
        path: '/connections/farmlands',
        children: [
          {
            title: 'Farmlands POS Integration Guide',
            path: '/guides/farmlands-pos-integration',
          }
        ]
      }
    ]
  },
  {
    title: 'API',
    path: config.baseUrl + '/api',
    icon: 'settings',
  }
];

const urlToActiveNav = {
  '/guides/farmlands-pos-integration': '/connections/farmlands/farmlands-pos-integration',
  '/guides/merchant-payment-conditions': '/reference/merchant-integrations/merchant-payment-conditions',
  '/guides/requesting-pre-auth': '/reference/merchant-integrations/requesting-pre-auth',
  '/guides/patron-not-present': '/reference/merchant-integrations/patron-not-present',
  '/guides/merchant-integration-error-handling': '/reference/merchant-integrations/merchant-integration-error-handling',
  '/guides/payment-request-line-items': '/reference/merchant-integrations/payment-request-line-items',
  '/guides/initiating-refunds': '/reference/merchant-integrations/initiating-refunds',
  '/guides/point-of-sale': '/reference/merchant-integrations/point-of-sale',
  '/guides/merchant-integration-qr-code-flow': '/reference/merchant-integrations/merchant-integration-qr-code-flow',
  '/guides/transaction-reporting': '/reference/merchant-integrations/transaction-reporting',
  '/guides/requesting-payment': '/reference/merchant-integrations/requesting-payment',
  '/guides/merchant-integration-barcode-flow': '/reference/merchant-integrations/merchant-integration-barcode-flow',
};
const route = useRoute();

const currentPath = computed(() => {
  const path = route.path.endsWith('/') ? route.path.slice(0, -1) : route.path;
  return urlToActiveNav[path] || path;
});
</script>

<style scoped>
.router-link-active {
  @apply
    text-content-primary
    bg-content-inverse-secondary
    hover:bg-content-inverse-tertiary
  ;
}
</style>
