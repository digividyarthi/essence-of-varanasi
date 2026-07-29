export type Testimonial = {
  name: string;
  role: string;
  location: string;
  photo: string;
  quote: string;
  tour: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Mrs. Isha',
    role: 'Designer',
    location: 'Mumbai, India',
    photo: '/images/testimonials/isha.jpg',
    quote:
      'The spiritual depth and comfort of our Varanasi tour exceeded all expectations. Every morning began with a private boat on the Ganges, every evening with tea on a centuries-old rooftop. Truly a life-changing experience.',
    tour: '3-Day Varanasi',
    rating: 5,
  },
  {
    name: 'Mr. Rahul',
    role: 'Businessman',
    location: 'Delhi, India',
    photo: '/images/testimonials/rahul.jpg',
    quote:
      'Professional guides and impeccable service. From airport pickup to reserved Aarti seating, we felt like we were part of a sacred journey from start to finish. The hotel stay was unforgettable.',
    tour: '2-Day Varanasi',
    rating: 5,
  },
  {
    name: 'Mrs. Diya',
    role: 'HR Professional',
    location: 'Bengaluru, India',
    photo: '/images/testimonials/diya.png',
    quote:
      'Affordable pricing without compromising on luxury. The tempo traveller was spotless, the drivers were incredibly friendly, and the team anticipated every detail — even temple dress for our group.',
    tour: '1-Day Varanasi',
    rating: 5,
  },
  {
    name: 'James & Linda',
    role: 'Retired Teachers',
    location: 'Toronto, Canada',
    photo: '/images/scenes/portrait-man-1.webp',
    quote:
      'We came for the Ganga Aarti and stayed for the warmth. Our guide Ravi treated us like family. The Ayodhya extension was the highlight — Ram Mandir at sunrise was something we will never forget.',
    tour: '4-Day Ayodhya Heritage',
    rating: 5,
  },
  {
    name: 'Akiko Tanaka',
    role: 'Photographer',
    location: 'Kyoto, Japan',
    photo: '/images/scenes/portrait-woman-1.webp',
    quote:
      'I have travelled the world photographing rituals, and the Essence of Varanasi team gave me access I could never have arranged on my own. They understood the art of being present without intruding.',
    tour: '3-Day Varanasi',
    rating: 5,
  },
  {
    name: 'The Mehta Family',
    role: 'Multi-generational',
    location: 'London, UK',
    photo: '/images/scenes/portrait-woman-2.webp',
    quote:
      'Travelling with our three generations could have been chaotic. Instead, every step was anticipated — a wheel-chair-accessible route for my mother, gentle walks for our children, and stories that kept us all spellbound.',
    tour: 'Custom 7-Day Pilgrimage',
    rating: 5,
  },
];
