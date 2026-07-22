export type Vehicle = {
  name: string;
  slug: string;
  capacity: string;
  bestFor: string;
  image: string;
  features: string[];
};

export const fleet: Vehicle[] = [
  {
    name: 'Tempo Traveller',
    slug: 'tempo-traveller',
    capacity: '12 — 16 guests',
    bestFor: 'Families, groups, multi-day tours',
    image: '/images/fleet/tempo.jpg',
    features: [
      'Push-back reclining seats',
      'Individual reading lights & AC vents',
      'LCD screens',
      'Spacious luggage hold',
      'Mic for guided commentary',
    ],
  },
  {
    name: 'Toyota Innova',
    slug: 'innova-suv',
    capacity: '6 — 7 guests',
    bestFor: 'Small families, couples, premium comfort',
    image: '/images/fleet/innova.jpg',
    features: [
      'Captain seats in the second row',
      'Climate control',
      'Premium audio',
      'Generous boot for luggage',
      'Ideal for long highway drives',
    ],
  },
  {
    name: 'Force Urbania',
    slug: 'urbania',
    capacity: '13 — 17 guests',
    bestFor: 'Luxury groups, corporate retreats',
    image: '/images/fleet/urbania.jpg',
    features: [
      'Premium lounge seating',
      'Ambient lighting',
      'Onboard wifi',
      'Panoramic windows',
      'Top-tier for VIP movements',
    ],
  },
];
