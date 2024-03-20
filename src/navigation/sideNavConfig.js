const navigationItems = [
  {
    title: 'Reference',
    subTitle: 'Learn about core features',
    icon: 'Receipt',
    children: [
      { title: 'Centrapay Experiences' },
      { title: 'Digital Assets' },
      { title: 'Merchant Integrations' },
      { title: 'App Integrations' },
    ]
  },
  {
    title: 'Connections',
    subTitle: 'For our partners',
    icon: 'Connections',
    children: [
      { title: 'Farmlands' },
    ]
  },
  {
    title: 'API',
    subTitle: 'For developers',
    icon: 'Settings',
    children: [
      { title: 'Accounts', order: 7 },
      { title: 'Assets', order: 8 },
      { title: 'Bank Accounts', order: 9 },
      { title: 'Events', order: 11 },
      { title: 'Integrations', order: 12 },
      { title: 'Loyalty Programs', order: 14 },
      { title: 'Merchants', order: 16 },
      { title: 'Payment Requests', order: 17 },
      { title: 'Scanned Codes', order: 20 },
    ]
  },
];

export default navigationItems;
