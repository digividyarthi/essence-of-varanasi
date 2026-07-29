// Single source of truth for site-wide config: brand, contact, nav, social.

export const brand = {
  name: 'Essence of Varanasi',
  shortName: 'Essence of Varanasi',
  tagline: 'Sacred journeys along the Ganges',
  description:
    'Boutique pilgrimage and cultural tours across Varanasi, Sarnath, Ayodhya, and Prayagraj. Curated by locals, hosted with care.',
  url: 'https://essenceofvaranasi.com',
  email: 'info@essenceofvaranasi.com',
  phone: '+91 97925 86352',
  whatsapp: '919792586352',
  address: 'Godowlia Crossing, Varanasi, Uttar Pradesh 221001, India',
  founded: 2014,
} as const;

export const whatsappLink = (message: string) =>
  `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`;

export const defaultWhatsAppMessage =
  "Namaste! I'd like to enquire about your tour packages in Varanasi.";

export const nav = [
  { label: 'Home', href: '/' },
  {
    label: 'Destinations',
    href: '/destinations',
    children: [
      { label: 'Varanasi', href: '/destinations/varanasi' },
      { label: 'Sarnath', href: '/destinations/sarnath' },
      { label: 'Ayodhya', href: '/destinations/ayodhya' },
      { label: 'Prayagraj', href: '/destinations/prayagraj' },
    ],
  },
  {
    label: 'Tour Packages',
    href: '/tours',
    children: [
      { label: '1 Day in Varanasi', href: '/tours/1-day-varanasi' },
      { label: '2 Days in Varanasi', href: '/tours/2-days-varanasi' },
      { label: '3 Days in Varanasi', href: '/tours/3-days-varanasi' },
      { label: '4-Day Ayodhya Heritage', href: '/tours/ayodhya-heritage' },
      { label: '3-Day Prayagraj', href: '/tours/prayagraj-tour' },
    ],
  },
  { label: 'Fleet', href: '/fleet' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const;

export const social = [
  { label: 'Instagram', href: 'https://instagram.com/essenceofvaranasi', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com/essenceofvaranasi', icon: 'facebook' },
  { label: 'YouTube', href: 'https://youtube.com/@essenceofvaranasi', icon: 'youtube' },
  { label: 'TripAdvisor', href: 'https://tripadvisor.com', icon: 'tripadvisor' },
] as const;
