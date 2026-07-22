export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
};

export const posts: Post[] = [
  {
    slug: 'best-time-to-visit-varanasi',
    title: 'The best time to visit Varanasi',
    excerpt:
      'Beyond the obvious winter window — a month-by-month breakdown of festivals, weather, light and crowds for the discerning traveller.',
    image: '/images/scenes/varanasi-ghats.webp',
    category: 'Travel Guide',
    readTime: '6 min',
  },
  {
    slug: 'what-to-wear-for-ganga-aarti',
    title: 'What to wear for the Ganga Aarti',
    excerpt:
      'Modesty, comfort, colour — a quietly opinionated guide to dressing for an evening at the ghats without looking out of place.',
    image: '/images/scenes/varanasi-river.webp',
    category: 'Etiquette',
    readTime: '4 min',
  },
  {
    slug: 'varanasi-food-trail',
    title: 'The Varanasi food trail, with a local pandit',
    excerpt:
      'Seven stops, four classic thalis, two legendary lassi shops and one perfectly overrated place — a real walk through the city\'s best kitchens.',
    image: '/images/scenes/varanasi-assi.webp',
    category: 'Food',
    readTime: '8 min',
  },
];
