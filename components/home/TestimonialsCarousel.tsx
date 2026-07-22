'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { testimonials } from '@/lib/testimonials';
import { cn } from '@/lib/cn';
import {
  IconQuote,
  IconStar,
  IconChevronLeft,
  IconChevronRight,
} from '@/components/ui/icons';

export default function TestimonialsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('[data-card]') as HTMLElement | null;
    if (!card) return;
    track.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: 'smooth' });
  };

  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll('[data-card]')) as HTMLElement[];
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let dist = Infinity;
    cards.forEach((c, i) => {
      const center = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(center - trackCenter);
      if (d < dist) { dist = d; closest = i; }
    });
    setActive(closest);
  }, []);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollByCard(1);
      }
    }, 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section bg-cream-radial bg-brand-cream">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">
              <span className="block h-px w-8 bg-current opacity-60" />
              Guest Stories
            </p>
            <h2 className="heading-lg text-balance">
              What our travellers <span className="accent-italic">remember</span>
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-brand-line bg-white text-brand-maroon hover:bg-brand-cream"
            >
              <IconChevronLeft width={20} height={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-brand-line bg-white text-brand-maroon hover:bg-brand-cream"
            >
              <IconChevronRight width={20} height={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={updateActive}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 sm:px-8 lg:px-12 pb-4"
      >
        {testimonials.map((t, i) => (
          <article
            key={t.name}
            data-card
            className={cn(
              'snap-start shrink-0 w-[85vw] sm:w-[420px] rounded-2xl border bg-white p-7 shadow-soft transition-all duration-500',
              active === i ? 'border-brand-gold/40 shadow-soft-lg' : 'border-brand-line opacity-80',
            )}
          >
            <IconQuote width={40} height={40} className="text-brand-gold/40" />
            <div className="mt-2 flex">
              {[...Array(t.rating)].map((_, j) => (
                <IconStar key={j} width={16} height={16} className="text-brand-saffron" />
              ))}
            </div>
            <p className="mt-4 font-serif text-lg leading-relaxed text-brand-ink">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-4 border-t border-brand-line pt-5">
              <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-brand-gold/40">
                <Image src={t.photo} alt={t.name} fill sizes="48px" className="object-cover" />
              </div>
              <div>
                <div className="font-medium text-brand-maroon">{t.name}</div>
                <div className="text-xs text-brand-muted">
                  {t.role} · {t.location}
                </div>
              </div>
              <div className="ml-auto rounded-full bg-brand-cream px-3 py-1 text-xs text-brand-maroon">
                {t.tour}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Dots */}
      <div className="container-x mt-2 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              active === i ? 'w-8 bg-brand-saffron' : 'w-2 bg-brand-line',
            )}
          />
        ))}
      </div>
    </section>
  );
}
