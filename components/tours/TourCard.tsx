import Image from 'next/image';
import Link from 'next/link';
import type { Tour } from '@/lib/tours';
import { cn } from '@/lib/cn';
import Pill from '@/components/ui/Pill';
import {
  IconClock,
  IconArrowUpRight,
  IconStar,
  IconUsers,
  IconCalendar,
} from '@/components/ui/icons';

type Props = {
  tour: Tour;
  className?: string;
  showPrice?: boolean;
};

export default function TourCard({ tour, className, showPrice = true }: Props) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-brand-line shadow-soft card-hover',
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={tour.cardImage}
          alt={tour.title}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-deep/40 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Pill variant="saffron" size="sm">
            <IconClock width={12} height={12} /> {tour.duration}
          </Pill>
        </div>
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-maroon backdrop-blur">
          <IconStar width={12} height={12} className="text-brand-saffron" />
          {tour.rating.toFixed(1)}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl text-brand-maroon leading-snug">
          {tour.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-ink/70">
          {tour.summary}
        </p>

        {/* Meta row */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-brand-muted">
          <span className="inline-flex items-center gap-1.5">
            <IconUsers width={14} height={14} /> {tour.groupSize}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconCalendar width={14} height={14} /> {tour.bestSeason}
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-brand-line pt-4">
          {showPrice ? (
            <div>
              <div className="text-[11px] uppercase tracking-wider text-brand-muted">From</div>
              <div className="font-serif text-2xl text-brand-maroon">
                ${tour.price}
                <span className="ml-1 text-xs font-sans font-normal text-brand-muted">
                  / {tour.priceUnit}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-sm text-brand-muted">{tour.duration}</div>
          )}
          <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-saffron-dark transition-all group-hover:gap-2">
            Explore <IconArrowUpRight width={16} height={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
