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
    price: 149,
    priceUnit: 'per person',
    heroImage:
      '/images/tours/varanasi-spiritual.webp',
    cardImage:
      '/images/tours/varanasi-spiritual.webp',
    summary:
      'From sunrise on the Ganges to the evening aarti — every essential layer of Varanasi in a single, well-paced day with a private guide and a chauffeured vehicle.',
    highlights: [
      'Private sunrise boat ride on the Ganges',
      'Walking the 84 ghats with a local guide',
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
          '07:00 — Walk the iconic ghats — Manikarnika, Dashashwamedh, Assi',
          '08:30 — Traditional breakfast of kachori-sabzi, jalebi, masala chai',
          '09:30 — Kashi Vishwanath Temple darshan via the new corridor',
          '11:00 — Drive to Sarnath (10 km) — Dhamek Stupa, museum, Deer Park',
          '14:00 — Lunch at a heritage haveli in the old city',
          '15:30 — Banaras Hindu University, Bharat Kala Bhavan museum',
          '17:30 — Sunset at Assi Ghat',
          '18:30 — Reserved front-row view of the Dashashwamedh Ganga Aarti',
          '20:30 — Drop-off at your hotel',
        ],
        meals: 'Breakfast · Lunch · Tea',
      },
    ],
    inclusions: [
      'Private air-conditioned vehicle & driver',
      'English-speaking licensed guide',
      'Wooden boat ride tickets',
      'Reserved Ganga Aarti seating',
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
    price: 379,
    priceUnit: 'per person',
    heroImage: '/images/scenes/varanasi-river.webp',
    cardImage: '/images/scenes/varanasi-river.webp',
    summary:
      'A slower, richer immersion. Two full days let you sit with the city, take cooking lessons, eat where locals eat, and stay in a heritage haveli.',
    highlights: [
      'Heritage haveli stay in the old city',
      'Private boat ride at sunrise',
      'Cooking class — learn the Banarasi thali',
      'Weavers\' quarter & silk factory visit',
      'Sarnath + Ramnagar Fort day-trip',
      'Both Aartis — morning & evening',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & first aarti',
        activities: [
          'Pick-up from airport / station',
          'Check-in at a restored 19th-century haveli',
          'Walking tour of Vishwanath lanes',
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
          '07:00 — Breakfast at a 100-year-old lassi shop',
          '08:30 — Kashi Vishwanath darshan',
          '10:30 — Drive to Sarnath — full guided tour',
          '14:00 — Traditional thali lunch',
          '15:30 — Banarasi silk weaving workshop',
          '17:30 — Return to hotel',
          '19:00 — Classical music recital (optional, seasonal)',
        ],
        meals: 'Breakfast · Lunch',
      },
    ],
    inclusions: [
      '1 night heritage haveli',
      'All transfers',
      'Guides & entry tickets',
      'Cooking class',
      'Two meals',
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
    price: 559,
    priceUnit: 'per person',
    heroImage: '/images/scenes/varanasi-assi.webp',
    cardImage: '/images/scenes/varanasi-assi.webp',
    summary:
      'Our signature city-deep package. Three days lets us slow it down, weave in artisan visits, a yoga session on the ghats, and a quiet evening of classical music.',
    highlights: [
      'Yoga session with a senior teacher at sunrise',
      'Heritage haveli stay',
      'Private classical Rudra Veena recital',
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
          'Walking tour of Vishwanath lanes',
          'Sunset Aarti with reserved seats',
          'Welcome dinner at a rooftop overlooking the ghats',
        ],
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Sunrise · Temples · Silk',
        activities: [
          '05:00 Sunrise yoga at the ghats',
          '06:30 Private boat ride',
          '08:00 Breakfast',
          '09:30 Kashi Vishwanath + Kaal Bhairav',
          '12:00 Banarasi silk weavers\' quarter',
          '14:00 Lunch + rest',
          '17:00 Walking the southern ghats',
          '19:00 Classical Rudra Veena recital',
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
      '2 nights heritage haveli',
      'Private guide',
      'All transfers',
      'Yoga, cooking, weaving sessions',
      'Tickets & Aarti seating',
      'Daily breakfast',
    ],
    exclusions: ['Flights / trains', 'Personal expenses', 'Travel insurance'],
    bestSeason: 'October — March',
    groupSize: '2 — 8 guests',
    rating: 5.0,
    reviewCount: 94,
  },

  // ─── 5-Day Varanasi Spiritual ────────────────────────────
  {
    slug: 'varanasi-spiritual',
    title: 'Varanasi Spiritual Tour',
    duration: '5 Days / 4 Nights',
    days: 5,
    category: 'spiritual',
    destinations: ['varanasi', 'sarnath'],
    price: 899,
    priceUnit: 'per person',
    heroImage:
      '/images/tours/varanasi-spiritual.webp',
    cardImage:
      '/images/tours/varanasi-spiritual.webp',
    summary:
      'Our most-loved transformative journey — five days of sunrise meditation, mantra, music, and the slow absorption of the world\'s most ancient living city.',
    highlights: [
      '4 nights in a riverside heritage haveli',
      'Daily sunrise meditation & yoga',
      'Vedic fire ceremony (havan) at sunset',
      'Private Rudra Veena & tabla recital',
      'Day trips to Sarnath & Ramnagar Fort',
      'Cooking, weaving & block-printing workshops',
      'Personal pandit & concierge',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival · Welcome Aarti',
        activities: [
          'Airport / station pick-up',
          'Check-in at heritage haveli',
          'Welcome chai on the rooftop',
          'Walking orientation of nearby ghats',
          'Reserved Aarti seating + dinner',
        ],
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Sunrise · Vishwanath · Weavers',
        activities: [
          '05:00 Sunrise yoga',
          '06:30 Private boat',
          '08:30 Breakfast',
          '10:00 Kashi Vishwanath darshan',
          '13:00 Lunch at a riverside Bengali restaurant',
          '15:00 Banarasi silk workshop',
          '18:00 Havan (Vedic fire ceremony)',
          '19:30 Dinner',
        ],
        meals: 'Breakfast · Lunch · Dinner',
      },
      {
        day: 3,
        title: 'Sarnath',
        activities: [
          'Full day in Sarnath � guided',
          'Meditation at the Bodhi sapling',
          'Lunch at a Tibetan monastery',
          'Museum visit',
          'Evening free for rest / spa',
        ],
        meals: 'Breakfast · Lunch · Dinner',
      },
      {
        day: 4,
        title: 'Ramnagar Fort · Classical Music',
        activities: [
          'Morning at Ramnagar Fort & museum',
          'Lunch on the boat',
          'Afternoon free',
          '19:00 Private classical recital (Rudra Veena, tabla)',
        ],
        meals: 'Breakfast · Lunch · Dinner',
      },
      {
        day: 5,
        title: 'Departure',
        activities: [
          'Sunrise boat at dawn',
          'Slow breakfast',
          '11:00 Final blessings with resident pandit',
          'Drop to airport / station',
        ],
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      '4 nights heritage haveli (river view)',
      'Daily yoga',
      'All transfers & guides',
      'Tickets, Aarti seating, ceremonies',
      'All meals',
    ],
    exclusions: ['Flights / trains', 'Personal shopping', 'Travel insurance'],
    bestSeason: 'October — March',
    groupSize: '2 — 8 guests',
    rating: 4.9,
    reviewCount: 76,
  },

  // ─── 4-Day Ayodhya ───────────────────────────────────────
  {
    slug: 'ayodhya-heritage',
    title: 'Ayodhya Heritage Tour',
    duration: '4 Days / 3 Nights',
    days: 4,
    category: 'pilgrimage',
    destinations: ['ayodhya', 'varanasi'],
    price: 749,
    priceUnit: 'per person',
    heroImage:
      '/images/tours/ayodhya-heritage.webp',
    cardImage:
      '/images/tours/ayodhya-heritage.webp',
    summary:
      'A combined Ayodhya + Varanasi circuit — Ram Mandir darshan, the Saryu Aarti, and the spiritual depth of Kashi, with comfortable overnight transfers.',
    highlights: [
      'VIP Ram Mandir darshan',
      'Saryu River evening Aarti',
      'Hanuman Garhi & Kanak Bhawan',
      'One full day in Varanasi',
      'Reserved Ganga Aarti seating',
      'Premium hotel stay',
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
          'Dinner on a rooftop',
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
      '3 nights premium hotel',
      'All transfers',
      'VIP darshan arrangements',
      'Guides',
      'Daily breakfast',
    ],
    exclusions: ['Flights / trains', 'Personal shopping', 'Travel insurance'],
    bestSeason: 'October — March · Ram Navami',
    groupSize: '2 — 14 guests',
    rating: 4.8,
    reviewCount: 142,
  },

  // ─── 3-Day Gaya ──────────────────────────────────────────
  {
    slug: 'gaya-pilgrimage',
    title: 'Gaya Pilgrimage Tour',
    duration: '3 Days / 2 Nights',
    days: 3,
    category: 'pilgrimage',
    destinations: ['gaya', 'bodh-gaya'],
    price: 599,
    priceUnit: 'per person',
    heroImage:
      '/images/tours/gaya-pilgrimage.webp',
    cardImage:
      '/images/tours/gaya-pilgrimage.webp',
    summary:
      'Pind Daan at the sacred Falgu river and the enlightenment seat of the Buddha — the two most moving pilgrimage sites in eastern India.',
    highlights: [
      'Pind Daan ceremony with our pandit',
      'Vishnupad Temple',
      'Mahabodhi Temple (UNESCO)',
      'The Bodhi Tree',
      'Falgu river meditation',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Varanasi → Gaya',
        activities: [
          'Morning flight / drive to Gaya',
          'Check-in',
          'Vishnupad Temple & Falgu river visit',
          'Evening pind daan briefing with pandit',
        ],
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Pind Daan · Bodh Gaya',
        activities: [
          'Sunrise pind daan at Falgu',
          'Drive to Bodh Gaya',
          'Mahabodhi Temple darshan',
          'Meditation under the Bodhi tree',
          'Visit international monasteries',
        ],
        meals: 'Breakfast · Dinner',
      },
      {
        day: 3,
        title: 'Return',
        activities: [
          'Morning Mangla Gauri temple',
          'Lunch',
          'Drive / fly back to Varanasi',
        ],
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      '2 nights hotel',
      'Pandit for pind daan',
      'All transfers',
      'Guides',
      'Daily breakfast',
    ],
    exclusions: ['Flights / trains', 'Personal shopping', 'Travel insurance'],
    bestSeason: 'October — March',
    groupSize: '2 — 12 guests',
    rating: 4.9,
    reviewCount: 58,
  },

  // ─── 3-Day Prayagraj ─────────────────────────────────────
  {
    slug: 'prayagraj-tour',
    title: 'Prayagraj Tour',
    duration: '3 Days / 2 Nights',
    days: 3,
    category: 'pilgrimage',
    destinations: ['prayagraj', 'varanasi'],
    price: 599,
    priceUnit: 'per person',
    heroImage:
      '/images/tours/prayagraj.webp',
    cardImage:
      '/images/tours/prayagraj.webp',
    summary:
      'Triveni Sangam, Kumbh Mela ground, and the layered history of Prayagraj — paired with an unhurried Varanasi day for contrast.',
    highlights: [
      'Triveni Sangam boat ride at sunrise',
      'Akhileshwar & Akbar\'s Fort',
      'Anand Bhawan (Nehru family home)',
      'One full day in Varanasi',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Varanasi → Prayagraj',
        activities: [
          'Morning drive to Prayagraj (~4 hrs)',
          'Triveni Sangam visit',
          'Evening Sangam Aarti',
          'Dinner at a riverside guesthouse',
        ],
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Prayagraj sightseeing',
        activities: [
          'Anand Bhawan',
          'Akbar\'s Fort',
          'Akhileshwar Temple',
          'Local lunch',
          'Evening free',
        ],
        meals: 'Breakfast · Lunch · Dinner',
      },
      {
        day: 3,
        title: 'Return to Varanasi',
        activities: [
          'Sunrise boat at Sangam',
          'Drive back to Varanasi',
          'Drop',
        ],
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      '2 nights hotel',
      'All transfers',
      'Guides',
      'Boat ride tickets',
      'Daily breakfast',
    ],
    exclusions: ['Flights / trains', 'Personal shopping', 'Travel insurance'],
    bestSeason: 'October — March · Magh Mela',
    groupSize: '2 — 12 guests',
    rating: 4.8,
    reviewCount: 41,
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
