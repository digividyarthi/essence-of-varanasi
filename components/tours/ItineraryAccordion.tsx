'use client';

import { useState } from 'react';
import type { ItineraryDay } from '@/lib/tours';
import { cn } from '@/lib/cn';
import { IconChevronDown, IconCheck } from '@/components/ui/icons';

export default function ItineraryAccordion({ days }: { days: ItineraryDay[] }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="space-y-4">
      {days.map((d) => {
        const isOpen = open === d.day;
        return (
          <div
            key={d.day}
            className={cn(
              'overflow-hidden rounded-2xl border transition-all',
              isOpen ? 'border-brand-gold/50 bg-white shadow-soft' : 'border-brand-line bg-white',
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : d.day)}
              className="flex w-full items-center gap-4 p-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-maroon font-serif text-lg text-white">
                {d.day}
              </span>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-wider text-brand-saffron-dark">
                  Day {d.day}
                </div>
                <div className="font-serif text-lg text-brand-maroon">{d.title}</div>
              </div>
              {d.meals && (
                <span className="hidden rounded-full bg-brand-cream px-3 py-1 text-xs text-brand-maroon sm:inline">
                  {d.meals}
                </span>
              )}
              <IconChevronDown
                width={22}
                height={22}
                className={cn(
                  'shrink-0 text-brand-maroon transition-transform duration-300',
                  isOpen && 'rotate-180',
                )}
              />
            </button>

            <div
              className={cn(
                'grid transition-all duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <ul className="space-y-2.5 border-t border-brand-line px-5 py-5 pl-[5.5rem]">
                  {d.activities.map((a, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-brand-ink/80">
                      <IconCheck width={15} height={15} className="mt-0.5 shrink-0 text-brand-saffron-dark" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
