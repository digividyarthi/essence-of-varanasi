'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { whatsappLink } from '@/lib/site';
import { IconChevronLeft, IconChevronRight, IconArrow, IconWhatsApp, IconStar } from '@/components/ui/icons';

type Slide = {
  image: string;
  eyebrow: string;
  title: string;
  highlight: string;
  sub: string;
  href: string;
  cta: string;
};

const slides: Slide[] = [
  {
    image: '/images/hero/sunrise.webp',
    eyebrow: 'Sunrise on the Ganges',
    title: 'Where every dawn',
    highlight: 'is a prayer',
    sub: 'Private boat rides at first light, the ghats waking in golden silence.',
    href: '/tours/1-day-varanasi',
    cta: 'Plan a sunrise tour',
  },
  {
    image: '/images/hero/aarti.webp',
    eyebrow: 'Evening Ganga Aarti',
    title: 'A river of fire,',
    highlight: 'a sky of stars',
    sub: 'Reserved seating for the most moving ceremony in all of India.',
    href: '/tours/2-days-varanasi',
    cta: 'Reserve your seat',
  },
  {
    image: '/images/hero/vishwanath.webp',
    eyebrow: 'Kashi Vishwanath Corridor',
    title: 'The eternal city,',
    highlight: 'reborn in light',
    sub: 'Walk the new Kashi Vishwanath Corridor with a resident pandit.',
    href: '/tours/3-days-varanasi',
    cta: 'Darshan tours',
  },
  {
    image: '/images/hero/sarnath.webp',
    eyebrow: 'Sarnath · Buddhist Circuit',
    title: 'Where the Buddha',
    highlight: 'first taught',
    sub: 'A contemplative half-day at the deer park where dharma began.',
    href: '/destinations/sarnath',
    cta: 'Explore Sarnath',
  },
  {
    image: '/images/hero/ayodhya.webp',
    eyebrow: 'Ayodhya · Ram Mandir',
    title: 'The birthplace',
    highlight: 'of Lord Ram',
    sub: 'VIP darshan and the evening Saryu Aarti, in a single circuit.',
    href: '/tours/ayodhya-heritage',
    cta: 'Ayodhya circuit',
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(next, 6500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [next, paused]);

  return (
    <section
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-brand-maroon-deep"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured experiences"
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            i === index ? 'opacity-100 z-10' : 'opacity-0 z-0',
          )}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.image}
            alt={slide.eyebrow}
            fill
            sizes="100vw"
            priority={i === 0}
            className={cn(
              'object-cover',
              i === index && 'animate-ken-burns',
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-maroon-deep/85 via-brand-maroon-deep/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-deep/70 via-transparent to-brand-maroon-deep/20" />
        </div>
      ))}

      {/* Content */}
      <div className="container-x relative z-20 flex h-full flex-col justify-center">
        <div className="max-w-2xl pt-20">
          {slides.map((slide, i) => (
            <div
              key={slide.title}
              className={cn(
                'transition-all duration-700',
                i === index ? 'block opacity-100' : 'hidden opacity-0',
              )}
            >
              <p className="eyebrow-gold mb-5 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <span className="block h-px w-10 bg-current opacity-70" />
                {slide.eyebrow}
              </p>
              <h1 className="heading-xl text-white text-balance animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                {slide.title}{' '}
                <span className="font-serif italic text-brand-saffron">{slide.highlight}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg md:text-xl text-white/80 leading-relaxed animate-fade-in-up" style={{ animationDelay: '350ms' }}>
                {slide.sub}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                <Link
                  href={slide.href}
                  className="inline-flex h-14 items-center gap-2 rounded-full bg-brand-saffron px-8 text-base font-medium text-white shadow-soft-lg transition-all hover:-translate-y-0.5 hover:bg-brand-saffron-dark"
                >
                  {slide.cta} <IconArrow width={18} height={18} />
                </Link>
                <a
                  href={whatsappLink(`Namaste! I'm interested in the "${slide.eyebrow}" experience. Could you share details?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 text-base font-medium text-white backdrop-blur transition-all hover:bg-white/15"
                >
                  <IconWhatsApp width={18} height={18} /> Enquire on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rating chip */}
      <div className="absolute right-6 top-28 z-20 hidden lg:flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md border border-white/15">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <IconStar key={i} width={14} height={14} className="text-brand-saffron" />
          ))}
        </div>
        <span className="font-semibold">4.9</span>
        <span className="opacity-70">· 1,000+ travellers</span>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container-x flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-500',
                  i === index ? 'w-10 bg-brand-saffron' : 'w-3 bg-white/40 hover:bg-white/70',
                )}
              />
            ))}
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/15"
            >
              <IconChevronLeft width={20} height={20} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/15"
            >
              <IconChevronRight width={20} height={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 lg:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-12 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}
