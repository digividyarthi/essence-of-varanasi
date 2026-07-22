import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { tours, findTour, relatedTours } from '@/lib/tours';
import { destinations } from '@/lib/destinations';
import { brand, whatsappLink } from '@/lib/site';
import ItineraryAccordion from '@/components/tours/ItineraryAccordion';
import TourCard from '@/components/tours/TourCard';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import Pill from '@/components/ui/Pill';
import {
  IconClock,
  IconUsers,
  IconCalendar,
  IconStar,
  IconCheck,
  IconCross,
  IconWhatsApp,
  IconArrow,
  IconMapPin,
  IconChevronRight,
} from '@/components/ui/icons';

export async function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tour = findTour(params.slug);
  if (!tour) return { title: 'Tour not found' };
  return {
    title: tour.title,
    description: tour.summary,
    alternates: { canonical: `/tours/${tour.slug}` },
    openGraph: {
      title: `${tour.title} · ${brand.name}`,
      description: tour.summary,
      images: [{ url: tour.heroImage, width: 1200, height: 630 }],
    },
  };
}

export default function TourDetailPage({ params }: { params: { slug: string } }) {
  const tour = findTour(params.slug);
  if (!tour) notFound();

  const related = relatedTours(tour.slug, 3);
  const tourDestinations = tour.destinations
    .map((slug) => destinations.find((d) => d.slug === slug))
    .filter(Boolean) as typeof destinations;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.summary,
    image: tour.heroImage,
    offers: {
      '@type': 'Offer',
      price: tour.price,
      priceCurrency: 'USD',
    },
    provider: { '@type': 'TravelAgency', name: brand.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative flex min-h-[64vh] items-end overflow-hidden bg-brand-maroon-deep">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-deep via-brand-maroon-deep/55 to-brand-maroon-deep/20" />

        <div className="container-x relative z-10 pb-16 pt-32">
          <nav className="mb-5 flex items-center gap-1.5 text-xs text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-gold">Home</Link>
            <IconChevronRight width={13} height={13} className="opacity-50" />
            <Link href="/tours" className="hover:text-brand-gold">Tour Packages</Link>
            <IconChevronRight width={13} height={13} className="opacity-50" />
            <span className="text-white">{tour.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2.5">
            <Pill variant="saffron" size="md"><IconClock width={13} height={13} /> {tour.duration}</Pill>
            <Pill variant="gold" size="md"><IconUsers width={13} height={13} /> {tour.groupSize}</Pill>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
              <IconStar width={13} height={13} className="text-brand-saffron" />
              {tour.rating.toFixed(1)} · {tour.reviewCount} reviews
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl heading-lg text-white text-balance">{tour.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{tour.summary}</p>
        </div>
      </section>

      {/* Sticky booking bar */}
      <BookingBar tour={tour} />

      {/* Body */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          {/* Main column */}
          <div className="lg:col-span-8 space-y-14">
            {/* Overview */}
            <div>
              <SectionHeading
                eyebrow="Overview"
                title="What this journey includes"
              />
              <p className="mt-5 text-lg leading-relaxed text-brand-ink/80">
                {tour.summary} Over {tour.days} {tour.days === 1 ? 'day' : 'days'}, you will be
                accompanied by a licensed local guide, chauffeured in an air-conditioned
                vehicle, and looked after by a dedicated host who is on WhatsApp throughout.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {tour.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-start gap-3 rounded-xl border border-brand-line bg-brand-cream/50 p-4"
                  >
                    <IconCheck width={18} height={18} className="mt-0.5 shrink-0 text-brand-saffron-dark" />
                    <span className="text-sm text-brand-ink/85">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <SectionHeading
                eyebrow="Day by Day"
                title="Your itinerary, hour by hour"
              />
              <p className="mt-5 text-brand-ink/70">
                A guideline pace — we adjust to your energy, the weather, and the
                unexpected beauty of the city.
              </p>
              <div className="mt-8">
                <ItineraryAccordion days={tour.itinerary} />
              </div>
            </div>

            {/* Inclusions / Exclusions */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-brand-line bg-white p-6">
                <h3 className="font-serif text-xl text-brand-maroon">What's included</h3>
                <ul className="mt-4 space-y-3">
                  {tour.inclusions.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-sm text-brand-ink/80">
                      <IconCheck width={16} height={16} className="mt-0.5 shrink-0 text-green-600" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-brand-line bg-white p-6">
                <h3 className="font-serif text-xl text-brand-maroon">Not included</h3>
                <ul className="mt-4 space-y-3">
                  {tour.exclusions.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-sm text-brand-ink/80">
                      <IconCross width={16} height={16} className="mt-0.5 shrink-0 text-brand-maroon" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Destinations on this tour */}
            {tourDestinations.length > 0 && (
              <div>
                <SectionHeading
                  eyebrow="On this journey"
                  title="Destinations you'll visit"
                />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {tourDestinations.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/destinations/${d.slug}`}
                      className="group flex items-center gap-4 rounded-2xl border border-brand-line bg-white p-4 transition-all hover:border-brand-gold/40 hover:shadow-soft"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                        <Image src={d.cardImage} alt={d.name} fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="font-serif text-lg text-brand-maroon">{d.name}</div>
                        <div className="text-xs text-brand-muted">{d.tagline}</div>
                      </div>
                      <IconMapPin width={18} height={18} className="text-brand-saffron-dark" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Price card */}
              <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-soft">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-brand-muted">Starting from</div>
                    <div className="font-serif text-4xl text-brand-maroon">
                      ${tour.price}
                      <span className="ml-1.5 text-sm font-sans font-normal text-brand-muted">
                        / {tour.priceUnit}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-brand-maroon">
                    <IconStar width={15} height={15} className="text-brand-saffron" />
                    {tour.rating.toFixed(1)}
                  </div>
                </div>

                <div className="mt-5 space-y-3 border-t border-brand-line pt-5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-brand-muted"><IconClock width={16} height={16} /> Duration</span>
                    <span className="font-medium text-brand-maroon">{tour.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-brand-muted"><IconUsers width={16} height={16} /> Group size</span>
                    <span className="font-medium text-brand-maroon">{tour.groupSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-brand-muted"><IconCalendar width={16} height={16} /> Best season</span>
                    <span className="font-medium text-brand-maroon">{tour.bestSeason}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2.5">
                  <Button
                    href={whatsappLink(`Namaste! I'd like to book the "${tour.title}" (${tour.duration}). Could you share availability and next steps?`)}
                    variant="whatsapp"
                    size="lg"
                    className="w-full"
                  >
                    <IconWhatsApp width={18} height={18} /> Book on WhatsApp
                  </Button>
                  <Button href="/contact" variant="primary" size="lg" className="w-full">
                    Enquire <IconArrow width={16} height={16} />
                  </Button>
                </div>

                <p className="mt-4 text-center text-xs text-brand-muted">
                  No payment until your itinerary is confirmed · Free cancellation up to 30 days
                </p>
              </div>

              {/* Help card */}
              <div className="rounded-2xl bg-brand-maroon p-6 text-white">
                <h3 className="font-serif text-lg">Need help choosing?</h3>
                <p className="mt-2 text-sm text-white/70">
                  Not sure if this tour suits your group? Tell us your dates and travel style — we'll tailor it.
                </p>
                <Button
                  href={whatsappLink("Hi! I'm comparing your tours and would like some advice.")}
                  variant="gold"
                  size="md"
                  className="mt-4 w-full"
                >
                  Talk to a planner
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related tours */}
      <section className="section bg-cream-radial bg-brand-cream">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="You May Also Like"
            title="More journeys to consider"
            className="mx-auto"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function BookingBar({ tour }: { tour: { title: string; price: number; duration: string } }) {
  return (
    <div className="sticky top-20 z-30 border-y border-brand-line bg-white/95 backdrop-blur-md shadow-soft">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate font-serif text-base text-brand-maroon">{tour.title}</div>
          <div className="text-xs text-brand-muted">{tour.duration}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <div className="text-[10px] uppercase tracking-wider text-brand-muted">From</div>
            <div className="font-serif text-xl text-brand-maroon">${tour.price}</div>
          </div>
          <Button
            href={whatsappLink(`I'd like to book "${tour.title}".`)}
            variant="whatsapp"
            size="md"
          >
            <IconWhatsApp width={16} height={16} /> Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
