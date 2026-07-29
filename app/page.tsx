import HeroCarousel from '@/components/home/HeroCarousel';
import TrustStrip from '@/components/home/TrustStrip';
import AboutPreview from '@/components/home/AboutPreview';
import FeaturedTours from '@/components/home/FeaturedTours';
import DestinationsShowcase from '@/components/home/DestinationsShowcase';
import PremiumFleet from '@/components/home/PremiumFleet';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import InspirationGrid from '@/components/home/InspirationGrid';
import HotelStrip from '@/components/home/HotelStrip';
import FAQAccordion from '@/components/home/FAQAccordion';
import FinalCTA from '@/components/home/FinalCTA';
import { brand } from '@/lib/site';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: brand.name,
    description: brand.description,
    url: brand.url,
    email: brand.email,
    telephone: brand.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: brand.address,
      addressLocality: 'Varanasi',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    areaServed: ['Varanasi', 'Sarnath', 'Ayodhya', 'Prayagraj'],
    priceRange: '$$',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroCarousel />
      <TrustStrip />
      <AboutPreview />
      <FeaturedTours />
      <DestinationsShowcase />
      <PremiumFleet />
      <WhyChooseUs />
      <TestimonialsCarousel />
      <InspirationGrid />
      <HotelStrip />
      <FAQAccordion />
      <FinalCTA />
    </>
  );
}
