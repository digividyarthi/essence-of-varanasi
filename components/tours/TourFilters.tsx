'use client';

import { useMemo, useState } from 'react';
import { tours, tourCategories, type TourCategory } from '@/lib/tours';
import TourCard from '@/components/tours/TourCard';
import { cn } from '@/lib/cn';
import { IconCross } from '@/components/ui/icons';

type Filter = TourCategory | 'all';

export default function TourGrid() {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return tours;
    return tours.filter((t) => t.category === filter);
  }, [filter]);

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {tourCategories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setFilter(c.key)}
            className={cn(
              'rounded-full px-5 py-2.5 text-sm font-medium transition-all',
              filter === c.key
                ? 'bg-brand-maroon text-white shadow-soft'
                : 'border border-brand-line bg-white text-brand-maroon hover:border-brand-maroon/40',
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center gap-3 text-brand-muted">
          <IconCross width={32} height={32} />
          <p>No tours in this category yet — try another filter.</p>
        </div>
      )}
    </div>
  );
}
