export type FaqCategory = 'Tours' | 'Booking' | 'Travel' | 'Payments';

export type Faq = {
  q: string;
  a: string;
  category: FaqCategory;
};

export const faqs: Faq[] = [
  {
    category: 'Tours',
    q: 'What makes Essence of Varanasi different?',
    a: "We design every itinerary around local, family-run experiences — heritage haveli stays, resident pandits, and guides who have lived their whole lives in the lanes you'll walk. We are not a broker; we curate end-to-end with our own team on the ground.",
  },
  {
    category: 'Tours',
    q: 'Do you provide private guided tours?',
    a: 'Yes — every tour is private and fully escorted. Specialised options include the Sunrise Boat Ride Tour, Evening Ganga Aarti Experience, Sarnath Day Tour, Kashi Vishwanath Temple Tour, and our 1/2/3-Day Varanasi Guided Tours.',
  },
  {
    category: 'Tours',
    q: 'Can I customise my tour package?',
    a: 'Almost always, yes — duration, interests, budget, accessibility, dietary preferences, and spiritual or photographic focus. Tell us your travel style, and we will design a day-by-day plan within 24 hours.',
  },
  {
    category: 'Tours',
    q: 'Which are your most popular tours?',
    a: 'The Sunrise Boat Ride Tour, the Evening Ganga Aarti Experience, the Sarnath Day Tour, the Kashi Vishwanath Temple Tour, and our multi-day 1/2/3-Day Varanasi Guided Tours lead the list.',
  },
  {
    category: 'Booking',
    q: 'How far in advance should I book?',
    a: 'For individual tours, 7–14 days is usually sufficient. For peak season (October–March), Dev Diwali, and Holi, we recommend 60+ days, especially for heritage haveli stays which are limited.',
  },
  {
    category: 'Booking',
    q: 'What is your cancellation policy?',
    a: 'Full refund up to 30 days before arrival; 50% refund between 30 and 15 days; non-refundable within 14 days. We always suggest travel insurance and will help you claim if the unexpected happens.',
  },
  {
    category: 'Booking',
    q: 'Is airport pickup included?',
    a: 'Yes — airport, railway station, and hotel pickups are included in all packages. Vehicles are air-conditioned, well-maintained, and stocked with mineral water.',
  },
  {
    category: 'Travel',
    q: 'What is the best time to visit Varanasi?',
    a: 'October to March is the most pleasant, with cool mornings, mild days, and the clearest skies for the ghats. Winter can be foggy and atmospheric in its own right.',
  },
  {
    category: 'Travel',
    q: 'Do I need a visa for India?',
    a: 'Most nationalities require an Indian visa, easily applied for online as an e-Visa. We help you with the documentation letter if your consulate requires a host invitation.',
  },
  {
    category: 'Travel',
    q: 'What should I wear for temple visits?',
    a: 'Modest clothing that covers shoulders and knees. We provide light cotton scarves and shawls in our welcome kit for women and men entering temples where required.',
  },
  {
    category: 'Travel',
    q: 'Is Varanasi safe for families and solo travellers?',
    a: 'Yes — we have hosted solo travellers from over 40 countries, families with young children, and multi-generational groups. We assign a dedicated host to every booking who is on WhatsApp throughout your stay.',
  },
  {
    category: 'Payments',
    q: 'How do I pay?',
    a: 'Bank transfer in INR / USD / EUR / GBP; major credit cards via Stripe; or UPI for Indian guests. A 20% deposit secures the booking; the balance is due 30 days before arrival.',
  },
  {
    category: 'Payments',
    q: 'Are prices per person or per group?',
    a: 'Our published prices are per person on a twin-sharing basis. Private departures for any group size can be quoted directly via our custom planner.',
  },
];

export const faqCategories: FaqCategory[] = ['Tours', 'Booking', 'Travel', 'Payments'];
