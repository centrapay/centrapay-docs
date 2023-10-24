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
      { title: 'Integrations', order: 11 },
      { title: 'Merchants', order: 14 },
      { title: 'Payment Requests', order: 15 },
      { title: 'Scanned Codes', order: 18 },
    ]
  },
];

export default navigationItems;
