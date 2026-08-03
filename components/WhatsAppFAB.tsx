'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IconArrow } from '@/components/ui/icons';
import { cn } from '@/lib/cn';

export default function BookTourFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <Link
      href="/contact"
      aria-label="Book a Tour or Get Free Quote"
      className={cn(
        'group fixed bottom-6 right-6 z-50 flex items-center transition-all duration-500',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
      )}
    >
      <span className="pointer-events-none mr-3 max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-white px-0 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-maroon shadow-soft transition-all duration-300 group-hover:max-w-[180px] group-hover:px-4">
        Book a Tour
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-brand-saffron text-white shadow-soft-lg transition-transform group-hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-brand-saffron opacity-30" />
        <IconArrow width={22} height={22} className="relative transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
