import Image from 'next/image';
import Link from 'next/link';
import { fleet } from '@/lib/fleet';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { IconCheck, IconUsers, IconArrow, IconCar } from '@/components/ui/icons';
import { whatsappLink } from '@/lib/site';

export default function PremiumFleet() {
  return (
    <section className="section bg-brand-maroon-deep text-white relative overflow-hidden">
      {/* Decorative gold rule top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

      <div className="container-x">
        <SectionHeading
          align="center"
          tone="dark"
          eyebrow="Premium Fleet"
          title={
            <>
              Travel in <span className="font-serif italic text-brand-saffron">comfort</span>,
              arrive in style
            </>
          }
          description="Spotless, modern, chauffeur-driven vehicles for every group size — from intimate couples to extended families and corporate retreats."
          className="mx-auto"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {fleet.map((v) => (
            <div
              key={v.slug}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur transition-all hover:bg-white/[0.07] hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  sizes="(min-width: 768px) 400px, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-deep/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                  <IconUsers width={14} height={14} /> {v.capacity}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-2xl text-white">{v.name}</h3>
                <p className="mt-1 text-sm text-white/60">{v.bestFor}</p>

                <ul className="mt-5 space-y-2.5">
                  {v.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/80">
                      <IconCheck width={16} height={16} className="mt-0.5 shrink-0 text-brand-gold" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <a
                    href={whatsappLink(`Namaste! I'd like to enquire about hiring a ${v.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-brand-saffron px-5 text-sm font-medium text-white hover:bg-brand-saffron-dark transition-colors"
                  >
                    Enquire Now
                  </a>
                  <Link
                    href="/fleet"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                    aria-label="View all vehicles"
                  >
                    <IconArrow width={18} height={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/fleet" variant="gold" size="md">
            <IconCar width={18} height={18} /> Explore the full fleet
          </Button>
        </div>
      </div>
    </section>
  );
}
