import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import FinalCTA from '@/components/home/FinalCTA';
import { destinations } from '@/lib/destinations';
import { tours } from '@/lib/tours';
import SectionHeading from '@/components/ui/SectionHeading';
import { IconArrowUpRight, IconMapPin, IconChevronRight } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Destinations',
  description:
    'Four sacred destinations across northern India — Varanasi, Sarnath, Ayodhya and Prayagraj. Explore each with a local guide.',
  alternates: { canonical: '/destinations' },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title={
          <>
            Sacred cities of <span className="font-serif italic text-brand-saffron">northern India</span>
          </>
        }
        description="Each destination we host is a world of its own — a river, a temple, a story. Choose where to begin, and we will take care of the rest."
        image="/images/destinations/varanasi.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Destinations' }]}
      />

      <section className="section">
        <div className="container-x space-y-16">
          {destinations.map((d, i) => {
            const destTours = tours.filter((t) => t.destinations.includes(d.slug));
            const reversed = i % 2 === 1;
            return (
              <div
                key={d.slug}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={reversed ? 'lg:order-2' : ''}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-soft-lg">
                    <Image
                      src={d.cardImage}
                      alt={d.name}
                      fill
                      sizes="(min-width: 1024px) 640px, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-deep/40 to-transparent" />
                    <div className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-brand-maroon backdrop-blur">
                      <IconMapPin width={13} height={13} /> {d.state}
                    </div>
                  </div>
                </div>

                <div className={reversed ? 'lg:order-1' : ''}>
                  <p className="eyebrow mb-3">
                    <span className="block h-px w-8 bg-current opacity-60" />
                    {d.state.split(' · ')[0]}
                  </p>
                  <h2 className="heading-md text-balance">{d.name}</h2>
                  <p className="mt-2 font-serif italic text-lg text-brand-saffron-dark">{d.tagline}</p>
                  <p className="mt-5 text-brand-ink/75 leading-relaxed">{d.description}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {d.highlights.slice(0, 3).map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-brand-line bg-brand-cream/60 px-3 py-1 text-xs text-brand-maroon"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/destinations/${d.slug}`}
                      className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-maroon px-6 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-brand-maroon-deep"
                    >
                      Explore {d.name} <IconArrowUpRight width={16} height={16} />
                    </Link>
                    <span className="text-sm text-brand-muted">
                      {destTours.length} tour{destTours.length !== 1 ? 's' : ''} available
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
