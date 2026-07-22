export type GalleryImage = {
  src: string;
  alt: string;
  category: 'Varanasi' | 'Ayodhya' | 'Gaya' | 'Prayagraj' | 'Fleet' | 'Guests';
  span?: 'wide' | 'tall' | 'normal';
};

export const galleryImages: GalleryImage[] = [
  { src: '/images/scenes/varanasi-ghats.webp', alt: 'Varanasi ghats at sunrise', category: 'Varanasi', span: 'wide' },
  { src: '/images/tours/varanasi-spiritual.webp', alt: 'The Ghats of Varanasi', category: 'Varanasi' },
  { src: '/images/scenes/varanasi-assi.webp', alt: 'Assi Ghat at golden hour', category: 'Varanasi', span: 'tall' },
  { src: '/images/scenes/varanasi-river.webp', alt: 'Evening on the Ganges', category: 'Varanasi' },
  { src: '/images/tours/ayodhya-heritage.webp', alt: 'Ram Mandir, Ayodhya', category: 'Ayodhya', span: 'wide' },
  { src: '/images/scenes/varanasi-river.webp', alt: 'Saryu riverbank', category: 'Ayodhya' },
  { src: '/images/tours/gaya-pilgrimage.webp', alt: 'Falgu river, Gaya', category: 'Gaya', span: 'tall' },
  { src: '/images/scenes/temple-thai.webp', alt: 'Vishnupad temple precinct', category: 'Gaya' },
  { src: '/images/tours/prayagraj.webp', alt: 'Triveni Sangam', category: 'Prayagraj' },
  { src: '/images/scenes/prayagraj-sangam.webp', alt: 'Confluence of the three rivers', category: 'Prayagraj' },
  { src: '/images/fleet/tempo.jpg', alt: 'Tempo Traveller exterior', category: 'Fleet' },
  { src: '/images/fleet/innova.jpg', alt: 'Toyota Innova SUV', category: 'Fleet' },
  { src: '/images/fleet/urbania.jpg', alt: 'Force Urbania', category: 'Fleet' },
  { src: '/images/gallery/guests-1.jpg', alt: 'Happy guests in Varanasi', category: 'Guests', span: 'wide' },
  { src: '/images/gallery/guests-2.jpg', alt: 'Guest portrait at sunrise', category: 'Guests' },
  { src: '/images/gallery/guests-3.png', alt: 'Sunset tour group on the river', category: 'Guests' },
  { src: '/images/scenes/india-taj.webp', alt: 'Travellers beyond Varanasi', category: 'Guests', span: 'tall' },
];
