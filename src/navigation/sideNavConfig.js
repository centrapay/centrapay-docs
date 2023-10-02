export default [
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
  import.meta.env.MODE === 'development' && {
    title: 'API',
    subTitle: 'For developers',
    icon: 'Settings',
    children: [
      { title: 'Getting Started' },
    ]
  },
];
