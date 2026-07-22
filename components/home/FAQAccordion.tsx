'use client';

import { useState } from 'react';
import Link from 'next/link';
import { faqs } from '@/lib/faq';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { IconChevronDown, IconArrow } from '@/components/ui/icons';

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const preview = faqs.slice(0, 6);

  return (
    <section className="section bg-cream-radial bg-brand-cream">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Good to Know"
            title={
              <>
                Questions, <span className="accent-italic">answered</span>
              </>
            }
            description="The most common things travellers ask before they arrive. For everything else, we are a WhatsApp message away."
          />
          <Button href="/faq" variant="outline" size="md" className="mt-6">
            See all FAQs <IconArrow width={16} height={16} />
          </Button>
        </div>

        <div className="lg:col-span-8">
          <div className="divide-y divide-brand-line rounded-2xl border border-brand-line bg-white">
            {preview.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg text-brand-maroon">{f.q}</span>
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
        </div>
      </div>
    </section>
  );
}
