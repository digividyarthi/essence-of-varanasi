import Link from 'next/link';
import { tours } from '@/lib/tours';
import TourCard from '@/components/tours/TourCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { IconArrow } from '@/components/ui/icons';

export default function FeaturedTours() {
  // Show featured tours across categories
  const featured = [
    '1-day-varanasi',
    '2-days-varanasi',
    '3-days-varanasi',
    'ayodhya-heritage',
  ]
    .map((slug) => tours.find((t) => t.slug === slug))
    .filter(Boolean) as typeof tours;

  return (
    <section className="section bg-cream-radial bg-brand-cream">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Featured Journeys"
            title={
              <>
                Itineraries, <span className="accent-italic">curated</span> by heart
              </>
            }
            description="Each route is honed over hundreds of departures — refined, flexible, and quietly luxurious. Choose a signature, or let us tailor one to you."
            className="max-w-2xl"
          />
          <Button href="/tours" variant="outline" size="md" className="shrink-0">
            View all tours <IconArrow width={16} height={16} />
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
