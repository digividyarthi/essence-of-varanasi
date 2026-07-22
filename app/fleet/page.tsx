import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import FinalCTA from '@/components/home/FinalCTA';
import { fleet } from '@/lib/fleet';
import { whatsappLink } from '@/lib/site';
import Button from '@/components/ui/Button';
import { IconCheck, IconUsers, IconWhatsApp, IconCar } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Premium Fleet',
  description:
    'Chauffeur-driven vehicles for every group size — Tempo Traveller, Toyota Innova, and Force Urbania. Spotless, modern, air-conditioned.',
  alternates: { canonical: '/fleet' },
};

export default function FleetPage() {
  return (
    <>
      <PageHero
        eyebrow="Premium Fleet"
        title={
          <>
            Travel in <span className="font-serif italic text-brand-saffron">comfort</span>,
            arrive in style
          </>
        }
        description="From intimate couples to extended families and corporate groups — every vehicle in our fleet is chauffeur-driven, spotless, and ready when you are."
        image="/images/fleet/innova.jpg"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Fleet' }]}
      />

      <section className="section">
        <div className="container-x space-y-16">
          {fleet.map((v, i) => {
            const reversed = i % 2 === 1;
            return (
              <div key={v.slug} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={reversed ? 'lg:order-2' : ''}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-soft-lg">
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      sizes="(min-width: 1024px) 640px, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-brand-maroon backdrop-blur">
                      <IconUsers width={13} height={13} /> {v.capacity}
                    </div>
                  </div>
                </div>

                <div className={reversed ? 'lg:order-1' : ''}>
                  <p className="eyebrow mb-3">
                    <span className="block h-px w-8 bg-current opacity-60" />
                    {v.bestFor}
                  </p>
                  <h2 className="heading-md">{v.name}</h2>
                  <p className="mt-4 text-brand-ink/75 leading-relaxed">
                    A reliable, comfortable choice for {v.bestFor.toLowerCase()}. Each vehicle
                    in our fleet is recent-model, fully insured, and driven by courteous,
                    English-speaking chauffeurs who know the region intimately.
                  </p>

                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {v.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-brand-ink/80">
                        <IconCheck width={16} height={16} className="mt-0.5 shrink-0 text-brand-saffron-dark" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button
                      href={whatsappLink(`Namaste! I'd like to enquire about hiring a ${v.name} (${v.capacity}).`)}
                      variant="whatsapp"
                      size="md"
                    >
                      <IconWhatsApp width={16} height={16} /> Enquire Now
                    </Button>
                    <Button href="/contact" variant="outline" size="md">
                      Get a quote
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why our fleet */}
      <section className="section bg-cream-radial bg-brand-cream">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { t: 'Recent models', b: 'Every vehicle is under five years old, with regular service intervals.' },
              { t: 'Vetted chauffeurs', b: 'Background-checked, English-speaking, and trained in hospitality.' },
              { t: 'Transparent pricing', b: 'Flat rates with no hidden fuel or toll surcharges — ever.' },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-brand-line bg-white p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-saffron/10 text-brand-saffron-dark">
                  <IconCar width={24} height={24} />
                </span>
                <h3 className="mt-4 font-serif text-lg text-brand-maroon">{x.t}</h3>
                <p className="mt-2 text-sm text-brand-ink/70">{x.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
