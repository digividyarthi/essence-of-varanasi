import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import TourFilters from '@/components/tours/TourFilters';
import FinalCTA from '@/components/home/FinalCTA';
import { brand } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Tour Packages',
  description:
    'Curated Varanasi tour packages — 1, 2 and 3-day city tours, 5-day spiritual journeys, and pilgrimage circuits to Ayodhya, Gaya, Prayagraj and Bodh Gaya.',
  alternates: { canonical: '/tours' },
};

export default function ToursPage() {
  return (
    <>
      <PageHero
        eyebrow="Tour Packages"
        title={
          <>
            Find the journey that <span className="font-serif italic text-brand-saffron">fits</span> you
          </>
        }
        description="From a single unforgettable day to a five-day spiritual immersion — every itinerary is private, guided, and shaped around your pace."
        image="/images/hero/vishwanath.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Tour Packages' }]}
      />

      <section className="section">
        <div className="container-x">
          <TourFilters />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
