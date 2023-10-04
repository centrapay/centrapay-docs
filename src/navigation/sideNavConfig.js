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
];

if (import.meta.env.MODE === 'development') {
  navigationItems.push({
    title: 'API',
    subTitle: 'For developers',
    icon: 'Settings',
  });
}

export default navigationItems;
