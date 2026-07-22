'use client';

import { useMemo, useState } from 'react';
import { faqs, faqCategories, type FaqCategory } from '@/lib/faq';
import { cn } from '@/lib/cn';
import { IconChevronDown, IconCross } from '@/components/ui/icons';

export default function FAQExplorer() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<FaqCategory | 'All'>('All');
  const [open, setOpen] = useState<number | null>(0);

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      const matchesCat = cat === 'All' || f.category === cat;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, cat]);

  return (
    <div>
      {/* Search */}
      <div className="mx-auto max-w-xl">
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            className="h-14 w-full rounded-full border border-brand-line bg-white px-5 pl-12 text-sm text-brand-ink placeholder:text-brand-muted/60 focus:border-brand-saffron focus:outline-none focus:ring-2 focus:ring-brand-saffron/20"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted"
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </div>

        {/* Category pills */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => setCat('All')}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-all',
              cat === 'All' ? 'bg-brand-maroon text-white shadow-soft' : 'border border-brand-line bg-white text-brand-maroon hover:border-brand-maroon/40',
            )}
          >
            All
          </button>
          {faqCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all',
                cat === c ? 'bg-brand-maroon text-white shadow-soft' : 'border border-brand-line bg-white text-brand-maroon hover:border-brand-maroon/40',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-brand-line rounded-2xl border border-brand-line bg-white">
          {filtered.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <div>
                    <span className="mr-2 rounded-full bg-brand-cream px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-maroon">
                      {f.category}
                    </span>
                    <span className="font-serif text-lg text-brand-maroon">{f.q}</span>
                  </div>
                  <IconChevronDown
                    width={20}
                    height={20}
                    className={cn(
                      'shrink-0 text-brand-saffron-dark transition-transform duration-300',
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
                    <p className="px-5 pb-5 text-sm leading-relaxed text-brand-ink/75">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center gap-3 text-brand-muted">
          <IconCross width={32} height={32} />
          <p>No results for &ldquo;{query}&rdquo;. Try another search, or WhatsApp us — we reply fast.</p>
        </div>
      )}
    </div>
  );
}
