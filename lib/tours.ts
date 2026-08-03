import type { Destination } from './destinations';

export type TourCategory = 'day-trip' | 'short' | 'pilgrimage' | 'spiritual';

export type ItineraryDay = {
  day: number;
  title: string;
  activities: string[];
  meals?: string;
};

export type Tour = {
  slug: string;
  title: string;
  duration: string;
  days: number;
  category: TourCategory;
  destinations: string[]; // destination slugs
  price: number;
  priceUnit: string;
  heroImage: string;
  cardImage: string;
  summary: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  bestSeason: string;
  groupSize: string;
  rating: number;
  reviewCount: number;
};

export const tours: Tour[] = [
  // ─── 1 Day ───────────────────────────────────────────────
  {
    slug: '1-day-varanasi',
    title: 'The Ultimate 1 Day in Varanasi',
    duration: '1 Day',
    days: 1,
    category: 'day-trip',
    destinations: ['varanasi', 'sarnath'],
    price: 70,
    priceUnit: 'per person',
    heroImage:
      '/images/tours/varanasi-spiritual.webp',
    cardImage:
      '/images/tours/varanasi-spiritual.webp',
    summary:
      'From sunrise on the Ganges to the evening aarti — every essential layer of Varanasi in a single, well-paced day with a private guide and a chauffeured vehicle. ₹6,000 ($70) per person.',
    highlights: [
      'Private sunrise boat ride on the Ganges',
      'Heritage walking by street with a local guide',
      'Kashi Vishwanath Corridor darshan',
      'Sarnath — the Buddha\'s first sermon',
      'Reserved seating for the evening Ganga Aarti',
      'Door-to-door chauffeur-driven transport',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Sunrise to Aarti',
        activities: [
          '04:45 — Pick-up from your hotel',
          '05:15 — Private wooden boat ride on the Ganges at sunrise',
          '07:00 — Walk the iconic ghats — Manikarnika, Dashashwamedh, Kashi Vishwanath corridor area',
          '08:30 — Traditional Breakfast',
          '09:30 — Kashi Vishwanath Temple darshan via the new corridor',
          '11:00 — Drive to Sarnath (10 km) — Dhamek Stupa, museum',
          '14:00 — Lunch',
          '15:30 — Banaras Hindu University, Sankat Mochan Mandir, Durga Mata Mandir',
          '18:30 — Reserved front-row view of the Dashashwamedh Ganga Aarti',
          '20:30 — Drop-off at your hotel',
        ],
        meals: 'Breakfast · Lunch · Tea',
      },
    ],
    inclusions: [
      'Private air-conditioned vehicle & driver',
      'English-speaking licensed guide',
      'Wooden boat ride tickets (Sunrise boat ride)',
      'Reserved Ganga Aarti seating',
      'Kashi Vishwanath Corridor darshan',
      'Sarnath guided tour & entry tickets',
      'Hotel pickup and drop',
      'Mineral water & wifi on-board',
    ],
    exclusions: ['Flights / train tickets', 'Personal shopping', 'Tips & gratuities'],
    bestSeason: 'October — March',
    groupSize: '2 — 12 guests',
    rating: 4.9,
    reviewCount: 312,
  },

  // ─── 2 Days ──────────────────────────────────────────────
  {
    slug: '2-days-varanasi',
    title: 'The Ultimate 2 Days in Varanasi',
    duration: '2 Days / 1 Night',
    days: 2,
    category: 'day-trip',
    destinations: ['varanasi', 'sarnath'],
    price: 120,
    priceUnit: 'per person',
    heroImage: '/images/scenes/varanasi-river.webp',
    cardImage: '/images/scenes/varanasi-river.webp',
    summary:
      'A slower, richer immersion. Two full days let you sit with the city, eat where locals eat, and stay in a 3 star category hotel with breakfast.',
    highlights: [
      '3 star category hotel with breakfast stay in Varanasi',
      'Private boat ride at sunrise',
      'Weavers\' quarter & silk factory visit',
      'Sarnath (Buddhist place) day trip',
      'Both Aartis — morning & evening',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & first aarti',
        activities: [
          'Pick-up from airport / station',
          'Check-in at a 3 star category hotel with breakfast',
          'City tour (Durga Mandir, Sankat Mochan, BHU - Shri Vishwanath Temple)',
          'Sunset on the ghats',
          'Reserved Dashashwamedh Aarti seating',
          'Dinner of Banarasi street food, curated',
        ],
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Sunrise, Sarnath & silk',
        activities: [
          '04:30 — Sunrise boat ride on the Ganges',
          '07:00 — Shri Kashi Vishwanath and Mata Annapurna darshan',
          '08:30 — Breakfast at hotel',
          '10:30 — Drive to Sarnath (Buddhist place) — full guided tour',
          '14:00 — Traditional thali lunch',
          '15:30 — Banarasi silk weaving workshop',
          '17:30 — Return to hotel',
        ],
        meals: 'Breakfast · Lunch',
      },
    ],
    inclusions: [
      '1 night 3 star category hotel with breakfast',
      'Private air-conditioned vehicle & driver',
      'English-speaking licensed guide',
      'Wooden boat ride tickets (Sunrise boat ride)',
      'Reserved Ganga Aarti seating',
      'Kashi Vishwanath Corridor darshan',
      'Sarnath (Buddhist place) day trip & entry',
      'Weavers\' quarter & silk factory tour',
      'Hotel pickup and drop / All transfers',
      'Mineral water & wifi on-board',
    ],
    exclusions: ['Flights / trains', 'Personal shopping', 'Travel insurance'],
    bestSeason: 'October — March',
    groupSize: '2 — 10 guests',
    rating: 4.9,
    reviewCount: 187,
  },

  // ─── 3 Days ──────────────────────────────────────────────
  {
    slug: '3-days-varanasi',
    title: 'The Ultimate 3 Days in Varanasi',
    duration: '3 Days / 2 Nights',
    days: 3,
    category: 'spiritual',
    destinations: ['varanasi', 'sarnath'],
    price: 170,
    priceUnit: 'per person',
    heroImage: '/images/scenes/varanasi-assi.webp',
    cardImage: '/images/scenes/varanasi-assi.webp',
    summary:
      'Our signature city-deep package. Three days lets us slow it down, weave in artisan visits, a yoga session on the ghats, and a quiet evening of classical music.',
    highlights: [
      '3 star category hotel with breakfast stay',
      'Banarasi silk weaving workshop',
      'Sarnath at golden hour',
      'Both Aartis',
      'Personal concierge throughout',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival · Kashi',
        activities: [
          'Pick-up, check-in, fresh lime soda welcome',
          'City tour (Durga Mandir, Sankat Mochan, BHU - Shri Vishwanath Temple)',
          'Sunset Aarti with reserved seats',
        ],
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Sunrise · Temples · Silk',
        activities: [
          '05:00 — Sunrise at the ghats with private boat ride',
          '07:00 — Shri Kashi Vishwanath, Mata Annapurna And Kaal Bhairav darshan',
          '09:00 — Breakfast at Hotel',
          '12:00 — Banarasi silk weavers\' quarter',
          '14:00 — Lunch + rest',
          '17:00 — Walking tour of Northern part of city',
        ],
        meals: 'Breakfast · Lunch · Tea',
      },
      {
        day: 3,
        title: 'Sarnath · Departure',
        activities: [
          '08:00 Breakfast',
          '09:00 Drive to Sarnath',
          'Full guided visit — Dhamek, museum, monasteries',
          '14:00 Lunch in Sarnath',
          '16:00 Drop to airport / station',
        ],
        meals: 'Breakfast · Lunch',
      },
    ],
    inclusions: [
      '2 nights 3 star category hotel with breakfast',
      'Private air-conditioned vehicle & driver',
      'English-speaking licensed guide',
      'Wooden boat ride tickets (Sunrise boat ride)',
      'Reserved Ganga Aarti seating',
      'Kashi Vishwanath Corridor darshan',
      'Sarnath (Buddhist place) day trip & entry',
      'Weavers\' quarter & silk factory tour',
      'Hotel pickup and drop / All transfers',
      'Mineral water & wifi on-board',
    ],
    exclusions: ['Flights / trains', 'Personal expenses', 'Travel insurance'],
    bestSeason: 'October — March',
    groupSize: '2 — 8 guests',
    rating: 5.0,
    reviewCount: 94,
  },

  // ─── 4-Day Ayodhya ───────────────────────────────────────
  {
    slug: 'ayodhya-heritage',
    title: 'Ayodhya Heritage Tour',
    duration: '4 Days / 3 Nights',
    days: 4,
    category: 'pilgrimage',
    destinations: ['ayodhya', 'varanasi'],
    price: 220,
    priceUnit: 'per person',
    heroImage:
      '/images/tours/ayodhya-heritage.webp',
    cardImage:
      '/images/tours/ayodhya-heritage.webp',
    summary:
      'A combined Ayodhya + Varanasi circuit — Ram Mandir darshan, the Saryu Aarti, and the spiritual depth of Kashi, with comfortable private AC transfers. ₹18,500 ($220) per person.',
    highlights: [
      'VIP Ram Mandir darshan',
      'Saryu River evening Aarti',
      'Hanuman Garhi & Kanak Bhawan',
      'One full day in Varanasi',
      'Reserved Ganga Aarti seating',
      '3 star category hotel with breakfast stay',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Varanasi → Ayodhya',
        activities: [
          'Morning pick-up from your Varanasi hotel',
          'Drive to Ayodhya (~4–5 hrs)',
          'Check-in',
          'Evening Saryu Aarti',
          'Dinner',
        ],
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Ram Mandir',
        activities: [
          'Pre-dawn darshan booking',
          'Ram Janmabhoomi visit',
          'Hanuman Garhi',
          'Kanak Bhawan',
          'Nageshwarnath Temple',
          'Ramlila cultural show (evening)',
        ],
        meals: 'Breakfast · Dinner',
      },
      {
        day: 3,
        title: 'Return to Varanasi · Aarti',
        activities: [
          'Late breakfast',
          'Drive back to Varanasi',
          'Reserved Dashashwamedh Ganga Aarti',
        ],
        meals: 'Breakfast · Dinner',
      },
      {
        day: 4,
        title: 'Varanasi · Departure',
        activities: [
          'Sunrise boat ride',
          'Kashi Vishwanath',
          'Drop to airport / station',
        ],
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      '3 nights 3 star category hotel with breakfast',
      'Private air-conditioned vehicle & driver',
      'English-speaking licensed guide',
      'Wooden boat ride tickets (Sunrise boat ride)',
      'Reserved Ganga Aarti seating',
      'VIP Ram Mandir darshan arrangements',
      'Saryu River evening Aarti',
      'Kashi Vishwanath Corridor darshan',
      'Hotel pickup and drop / All transfers',
      'Mineral water & wifi on-board',
    ],
    exclusions: ['Flights / trains', 'Personal shopping', 'Travel insurance'],
    bestSeason: 'October — March · Ram Navami',
    groupSize: '2 — 14 guests',
    rating: 4.8,
    reviewCount: 142,
  },
];

export const findTour = (slug: string) => tours.find((t) => t.slug === slug);

export const toursForDestination = (destSlug: string) =>
  tours.filter((t) => t.destinations.includes(destSlug));

export const relatedTours = (slug: string, limit = 3) => {
  const current = findTour(slug);
  if (!current) return tours.slice(0, limit);
  return tours
    .filter((t) => t.slug !== slug)
    .sort(
      (a, b) =>
        b.destinations.filter((d) => current.destinations.includes(d)).length -
        a.destinations.filter((d) => current.destinations.includes(d)).length,
    )
    .slice(0, limit);
};

export const tourCategories: { key: TourCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All Tours' },
  { key: 'day-trip', label: 'Day Trips' },
  { key: 'short', label: 'Short Tours' },
  { key: 'spiritual', label: 'Spiritual' },
  { key: 'pilgrimage', label: 'Pilgrimage' },
];
