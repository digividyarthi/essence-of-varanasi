'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { galleryImages } from '@/lib/gallery';
import Lightbox from '@/components/ui/Lightbox';
import { cn } from '@/lib/cn';
import { IconCamera } from '@/components/ui/icons';

const categories = ['All', 'Varanasi', 'Ayodhya', 'Prayagraj', 'Fleet', 'Guests'] as const;

export default function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof categories)[number]>('All');
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

  const filtered = useMemo(
    () => (filter === 'All' ? galleryImages : galleryImages.filter((g) => g.category === filter)),
    [filter],
  );

  const openLightbox = (index: number) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox((s) => ({ ...s, open: false }));

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={cn(
              'rounded-full px-5 py-2.5 text-sm font-medium transition-all',
              filter === c
                ? 'bg-brand-maroon text-white shadow-soft'
                : 'border border-brand-line bg-white text-brand-maroon hover:border-brand-maroon/40',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Masonry via CSS columns */}
      <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {filtered.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={() => openLightbox(i)}
            className="group relative block w-full overflow-hidden rounded-2xl shadow-soft"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={img.span === 'tall' ? 1100 : img.span === 'wide' ? 600 : 800}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-deep/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 text-left opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-sm text-white">{img.alt}</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur">
                <IconCamera width={16} height={16} />
              </span>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={filtered.map((g) => ({ src: g.src, alt: g.alt }))}
        open={lightbox.open}
        initialIndex={lightbox.index}
        onClose={closeLightbox}
      />
    </div>
  );
}
