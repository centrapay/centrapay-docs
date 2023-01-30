<template>
  <div>
    <div
      v-for="item in navigation"
      :key="item.title"
    >
      <div v-if="item.children">
        <SiteNavigationDisclosure
          :url-to-active-nav="urlToActiveNav"
          :navigation-item="item"
          @link-clicked="$emit('link-clicked')"
        />
      </div>
      <NuxtLink
        v-else
        target="_blank"
        :to="item.path"
        class="group mt-2 w-full flex items-center pl-3 pr-1 py-2 space-x-3 text-left rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset ring-focus-ring"
      >
        <component
          :is="item.icon"
          class="icon-md flex-shrink-0 text-content-tertiary group-hover:text-content-secondary"
          aria-hidden="true"
        />
        <span class="flex-1 text-content-primary text-base leading-5 font-medium">{{ item.title }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits([ 'link-clicked' ]);

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
            title: 'Error Handling',
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
            title: 'Line Items',
            path: '/guides/line-items',
          },
          {
            title: 'Payment Conditions',
            path: '/guides/payment-conditions',
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
            title: 'POS Integration Guide',
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
  '/guides/payment-conditions': '/reference/merchant-integrations/payment-conditions',
  '/guides/requesting-pre-auth': '/reference/merchant-integrations/requesting-pre-auth',
  '/guides/patron-not-present': '/reference/merchant-integrations/patron-not-present',
  '/guides/merchant-integration-error-handling': '/reference/merchant-integrations/merchant-integration-error-handling',
  '/guides/line-items': '/reference/merchant-integrations/line-items',
  '/guides/initiating-refunds': '/reference/merchant-integrations/initiating-refunds',
  '/guides/point-of-sale': '/reference/merchant-integrations/point-of-sale',
  '/guides/merchant-integration-qr-code-flow': '/reference/merchant-integrations/merchant-integration-qr-code-flow',
  '/guides/transaction-reporting': '/reference/merchant-integrations/transaction-reporting',
  '/guides/requesting-payment': '/reference/merchant-integrations/requesting-payment',
  '/guides/merchant-integration-barcode-flow': '/reference/merchant-integrations/merchant-integration-barcode-flow',
};
</script>
