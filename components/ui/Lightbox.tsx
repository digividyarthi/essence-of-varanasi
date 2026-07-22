'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';

type Props = {
  images: { src: string; alt: string }[];
  open: boolean;
  initialIndex?: number;
  onClose: () => void;
};

export default function Lightbox({ images, open, initialIndex = 0, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);
  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, prev, next]);

  if (!open || !images.length) return null;

  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-maroon-deep/95 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Previous"
        className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Next"
        className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <figure
        className="relative max-h-[85vh] w-full max-w-5xl px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-contain"
            quality={90}
          />
        </div>
        <figcaption className={cn('mt-4 text-center text-sm text-white/70')}>
          {current.alt} <span className="ml-2 text-white/40">{index + 1} / {images.length}</span>
        </figcaption>
      </figure>
    </div>
  );
}
