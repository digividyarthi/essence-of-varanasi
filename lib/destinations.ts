export type Destination = {
  slug: string;
  name: string;
  state: string;
  tagline: string;
  description: string;
  heroImage: string;
  cardImage: string;
  highlights: string[];
  bestTime: string;
  attractions: { name: string; image: string }[];
  travelTips: string[];
};

export const destinations: Destination[] = [
  {
    slug: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    tagline: 'The city of light, on the sacred Ganges',
    description:
      'Varanasi — also known as Kashi — is one of the oldest continuously inhabited cities in the world. For centuries, seekers, saints and travellers have been drawn here by the river, the rituals, and the unfathomable sense of time.',
    heroImage: '/images/destinations/varanasi-hero.webp',
    cardImage: '/images/destinations/varanasi.webp',
    highlights: [
      'Sunrise boat ride on the Ganges',
      'Evening Ganga Aarti at Dashashwamedh Ghat',
      'Kashi Vishwanath Corridor darshan',
      'Sarnath — where Buddha first taught',
      'Walking the 84 ghats at dawn',
    ],
    bestTime: 'October to March',
    attractions: [
      { name: 'Dashashwamedh Ghat', image: '/images/scenes/varanasi-ghats.webp' },
      { name: 'Kashi Vishwanath Temple', image: '/images/scenes/varanasi-river.webp' },
      { name: 'Manikarnika Ghat', image: '/images/scenes/varanasi-assi.webp' },
      { name: 'Assi Ghat', image: '/images/scenes/varanasi-aarti.webp' },
    ],
    travelTips: [
      'Dress modestly — shoulders and knees covered for temple visits.',
      'Carry a small torch for the narrow lanes of the old city after dusk.',
      'Pre-book boat rides through your host to avoid inflated on-the-spot prices.',
      'Holi, Dev Diwali and Mahashivratri are extraordinary but book 6 months ahead.',
    ],
  },
  {
    slug: 'sarnath',
    name: 'Sarnath',
    state: 'Uttar Pradesh · 10 km from Varanasi',
    tagline: 'Where the Buddha first turned the wheel of dharma',
    description:
      'A short, leafy drive from the noise of Varanasi, Sarnath is quiet, contemplative and profoundly moving. The deer park where Siddhartha Gautama gave his first sermon remains a place of pilgrimage for Buddhists worldwide — and a wonderful counterpoint to the city.',
    heroImage: '/images/destinations/sarnath-hero.webp',
    cardImage: '/images/destinations/sarnath.webp',
    highlights: [
      "Dhamek Stupa — marks the Buddha's first sermon",
      'Chaukhandi Stupa',
      'Archaeological Museum (closed Mondays)',
      'Mulagandha Kuti Vihara',
      'Deer Park at golden hour',
    ],
    bestTime: 'October to March',
    attractions: [
      { name: 'Dhamek Stupa', image: '/images/scenes/sarnath-stupa-ruins.webp' },
      { name: 'Chaukhandi Stupa', image: '/images/destinations/sarnath.webp' },
      { name: 'Thai Temple', image: '/images/scenes/buddha-golden.webp' },
    ],
    travelTips: [
      'Half a day is sufficient — pairs perfectly with a Varanasi morning boat ride.',
      'Photography is restricted inside the main museum.',
      'Wear comfortable shoes; the grounds are expansive.',
    ],
  },
  {
    slug: 'ayodhya',
    name: 'Ayodhya',
    state: 'Uttar Pradesh',
    tagline: 'The birthplace of Lord Ram',
    description:
      'On the banks of the Saryu, Ayodhya is one of the seven sacred cities of Hinduism. The newly-built Ram Mandir has transformed pilgrimage here, while older shrines, ghats, and the legendary Kanak Bhawan retain their quiet, age-old charm.',
    heroImage: '/images/destinations/ayodhya-hero.webp',
    cardImage: '/images/destinations/ayodhya.webp',
    highlights: [
      'Ram Janmabhoomi Mandir',
      'Hanuman Garhi',
      'Kanak Bhawan',
      'Saryu River Aarti',
      'Nageshwarnath Temple',
    ],
    bestTime: 'October to March · Ram Navami',
    attractions: [
      { name: 'Ram Mandir', image: '/images/scenes/ayodhya-ram-deity.webp' },
      { name: 'Hanuman Garhi', image: '/images/destinations/ayodhya.webp' },
      { name: 'Saryu Ghat', image: '/images/scenes/ayodhya-ghats.webp' },
    ],
    travelTips: [
      'Ram Mandir has a free darshan queue and a paid quick-access queue — we arrange both.',
      'Lockers for mobile phones and cameras are mandatory at the temple.',
      'Weekdays are considerably calmer than weekends.',
    ],
  },
  {
    slug: 'prayagraj',
    name: 'Prayagraj',
    state: 'Uttar Pradesh',
    tagline: 'The confluence of three rivers',
    description:
      'Formerly Allahabad, Prayagraj sits at the sacred Triveni Sangam — the meeting of the Ganges, Yamuna and mythical Saraswati. Every twelve years, the Kumbh Mela draws the largest religious gathering on earth.',
    heroImage: '/images/destinations/prayagraj-hero.webp',
    cardImage: '/images/destinations/prayagraj.webp',
    highlights: [
      "Triveni Sangam bath",
      "Akhileshwar Temple & Akbar's Fort",
      'Mankameshwar Temple',
      'Anand Bhawan (Nehru family home)',
      'Kumbh Mela ground',
    ],
    bestTime: 'October to March · Magh Mela (Jan-Feb)',
    attractions: [
      { name: 'Triveni Sangam', image: '/images/scenes/prayagraj-sangam-boats.webp' },
      { name: 'Anand Bhawan', image: '/images/scenes/anand-bhawan.webp' },
    ],
    travelTips: [
      'Boat ride to the confluence is best at sunrise — water is calmer and the light is otherworldly.',
      'For Magh Mela, accommodation is tight — book 60+ days in advance.',
    ],
  },
  {
    slug: 'gaya',
    name: 'Gaya',
    state: 'Bihar',
    tagline: 'The land of pind daan for ancestors',
    description:
      "Gaya is one of Hinduism's holiest sites — particularly for pind daan, the ritual offering for departed ancestors performed on the banks of the Falgu river. The surrounding hills host the ancient Mangla Gauri temple and the Vishnupad temple.",
    heroImage: '/images/destinations/gaya-hero.webp',
    cardImage: '/images/destinations/gaya.webp',
    highlights: [
      'Vishnupad Temple',
      'Falgu River pind daan',
      'Mangla Gauri temple',
      'Pretshila Hill',
    ],
    bestTime: 'October to March',
    attractions: [
      { name: 'Vishnupad Temple', image: '/images/destinations/gaya.webp' },
      { name: 'Falgu River', image: '/images/scenes/buddha-golden.webp' },
    ],
    travelTips: [
      'Pind daan can only be performed at this exact site — arrange a pandit through us in advance.',
      'Combine with Bodh Gaya for a 2-3 day pilgrimage circuit.',
    ],
  },
  {
    slug: 'bodh-gaya',
    name: 'Bodh Gaya',
    state: 'Bihar',
    tagline: 'Where the Buddha attained enlightenment',
    description:
      'Under the Bodhi tree here, Siddhartha became the Buddha over 2,500 years ago. The Mahabodhi Temple — a UNESCO World Heritage Site — and monasteries built by Buddhist communities from across Asia make Bodh Gaya a profoundly peaceful, world-shrine.',
    heroImage: '/images/destinations/bodh-gaya-hero.webp',
    cardImage: '/images/destinations/bodh-gaya.webp',
    highlights: [
      'Mahabodhi Temple (UNESCO)',
      'The Bodhi Tree',
      'Great Buddha Statue (80 ft)',
      'International monasteries — Thai, Tibetan, Japanese',
    ],
    bestTime: 'October to March · Buddha Purnima',
    attractions: [
      { name: 'Mahabodhi Temple', image: '/images/scenes/mahabodhi-alt.webp' },
      { name: 'Great Buddha Statue', image: '/images/scenes/bodh-gaya-buddha-statue.webp' },
      { name: 'Thai Monastery', image: '/images/scenes/temple-buddhist.webp' },
    ],
    travelTips: [
      'Closed on certain Buddhist holidays — check calendar.',
      'Monasteries welcome visitors for meditation; ask us to arrange an introduction.',
    ],
  },
];

export const findDestination = (slug: string) =>
  destinations.find((d) => d.slug === slug);