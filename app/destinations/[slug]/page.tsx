import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { destinations, findDestination } from '@/lib/destinations';
import { toursForDestination } from '@/lib/tours';
import { brand, whatsappLink } from '@/lib/site';
import PageHero from '@/components/PageHero';
import TourCard from '@/components/tours/TourCard';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import FinalCTA from '@/components/home/FinalCTA';
import {
  IconMapPin,
  IconCalendar,
  IconCheck,
  IconArrow,
  IconWhatsApp,
  IconChevronRight,
} from '@/components/ui/icons';

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const d = findDestination(params.slug);
  if (!d) return { title: 'Destination not found' };
  return {
    title: `${d.name} — ${d.tagline}`,
    description: d.description,
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: {
      title: `${d.name} · ${brand.name}`,
      description: d.description,
      images: [{ url: d.heroImage, width: 1200, height: 630 }],
    },
  };
}

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const d = findDestination(params.slug);
  if (!d) notFound();

  const destTours = toursForDestination(d.slug);

  return (
    <>
      <PageHero
        eyebrow={d.state}
        title={d.name}
        description={d.tagline}
        image={d.heroImage}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Destinations', href: '/destinations' },
          { label: d.name },
        ]}
        tall
      />

      {/* Intro */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading eyebrow="About" title={`Welcome to ${d.name}`} />
            <p className="mt-5 text-lg leading-relaxed text-brand-ink/80">{d.description}</p>

            <h3 className="mt-10 font-serif text-xl text-brand-maroon">Highlights</h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {d.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-brand-ink/80">
                  <IconCheck width={16} height={16} className="mt-0.5 shrink-0 text-brand-saffron-dark" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-soft">
              <h3 className="font-serif text-lg text-brand-maroon">Quick facts</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-brand-line pb-3">
                  <dt className="inline-flex items-center gap-2 text-brand-muted"><IconMapPin width={16} height={16} /> Location</dt>
                  <dd className="font-medium text-brand-maroon">{d.state}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-brand-line pb-3">
                  <dt className="inline-flex items-center gap-2 text-brand-muted"><IconCalendar width={16} height={16} /> Best time</dt>
                  <dd className="font-medium text-brand-maroon text-right">{d.bestTime}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-brand-muted">Tours available</dt>
                  <dd className="font-medium text-brand-maroon">{destTours.length}</dd>
                </div>
              </dl>
              <Button
                href={whatsappLink(`Namaste! I'm planning a trip to ${d.name}. Can you help?`)}
                variant="whatsapp"
                size="md"
                className="mt-5 w-full"
              >
                <IconWhatsApp width={16} height={16} /> Plan my {d.name} trip
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {/* Attractions */}
      <section className="section bg-cream-radial bg-brand-cream">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Top Attractions"
            title="What you'll see in the city"
            className="mx-auto"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {d.attractions.map((a) => (
              <div
                key={a.name}
                className="group relative overflow-hidden rounded-2xl shadow-soft"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={a.image}
                    alt={a.name}
                    fill
                    sizes="(min-width: 1024px) 400px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-deep/85 to-transparent" />
                  <div className="absolute bottom-0 p-5">
                    <h3 className="font-serif text-xl text-white">{a.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel tips */}
      <section className="section">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Local Knowledge"
                title="Travel tips from your hosts"
                description="Small things that make a big difference — learned over years of guiding guests through this city."
              />
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-4">
                {d.travelTips.map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 rounded-2xl border border-brand-line bg-white p-5"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-saffron/10 font-serif text-brand-saffron-dark">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-brand-ink/80 pt-1">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tours to this destination */}
      {destTours.length > 0 && (
        <section className="section bg-cream-radial bg-brand-cream">
          <div className="container-x">
            <SectionHeading
              align="center"
              eyebrow={`Tours to ${d.name}`}
              title="Journeys that include this destination"
              className="mx-auto"
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destTours.map((t) => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCTA />
    </>
  );
}
