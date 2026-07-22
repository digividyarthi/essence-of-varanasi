import Image from 'next/image';
import Link from 'next/link';
import { destinations } from '@/lib/destinations';
import { tours } from '@/lib/tours';
import SectionHeading from '@/components/ui/SectionHeading';
import { IconArrowUpRight, IconMapPin } from '@/components/ui/icons';
import { cn } from '@/lib/cn';

// Editorial staggered grid — first card spans larger
const spans = [
  'lg:col-span-2 lg:row-span-2',
  '',
  '',
  '',
  '',
  'lg:col-span-2',
];

export default function DestinationsShowcase() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Destinations"
          title={
            <>
              Six sacred cities, <span className="accent-italic">one</span> journey
            </>
          }
          description="From the eternal ghats of Kashi to the enlightenment seat of Bodh Gaya — every destination we host has been walked by our team a thousand times."
          className="mx-auto"
        />

        <div className="mt-12 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => {
            const count = tours.filter((t) => t.destinations.includes(d.slug)).length;
            return (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className={cn(
                  'group relative overflow-hidden rounded-2xl shadow-soft',
                  spans[i] ?? '',
                )}
              >
                <Image
                  src={d.cardImage}
                  alt={d.name}
                  fill
                  sizes="(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-deep/90 via-brand-maroon-deep/20 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                    <IconMapPin width={11} height={11} /> {d.state.split(' · ')[0]}
                  </div>
                  <h3 className="mt-3 font-serif text-2xl text-white leading-tight">
                    {d.name}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-sm text-white/75">{d.tagline}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-white/70">
                      {count} tour{count !== 1 ? 's' : ''}
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-saffron text-white transition-all group-hover:gap-1">
                      <IconArrowUpRight width={16} height={16} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
