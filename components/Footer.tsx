'use client';

import Link from 'next/link';
import { useState } from 'react';
import { brand, nav, social, whatsappLink, defaultWhatsAppMessage } from '@/lib/site';
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconWhatsApp,
  IconInstagram,
  IconFacebook,
  IconYouTube,
  IconArrow,
  IconCompass,
} from '@/components/ui/icons';

const socialIcon: Record<string, (p: any) => JSX.Element> = {
  instagram: IconInstagram,
  facebook: IconFacebook,
  youtube: IconYouTube,
  tripadvisor: IconCompass,
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const year = 2026;

  // Flatten nav to find tour packages dropdown
  const tourPackages =
    nav.find((n) => n.label === 'Tour Packages')?.children ?? [];

  return (
    <footer className="relative bg-brand-maroon-deep text-white/80 overflow-hidden">
      {/* Decorative top gold rule */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

      {/* Watermark mandala */}
      <svg
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 text-brand-gold opacity-[0.05]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        aria-hidden
      >
        <circle cx="100" cy="100" r="48" />
        <circle cx="100" cy="100" r="72" strokeDasharray="2 6" />
        <circle cx="100" cy="100" r="92" strokeDasharray="1 8" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <path key={deg} d="M100 28 C 118 60, 118 140, 100 172" transform={`rotate(${deg} 100 100)`} />
        ))}
      </svg>

      <div className="container-x relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="font-serif text-2xl text-white">
              Essence of <span className="text-brand-saffron">Varanasi</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Boutique pilgrimage and cultural tours across Varanasi, Sarnath, Ayodhya,
              Gaya, Prayagraj and Bodh Gaya. Curated by locals, hosted with care.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {social.map((s) => {
                const Icon = socialIcon[s.icon] ?? IconInstagram;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-brand-gold hover:text-brand-gold"
                  >
                    <Icon width={18} height={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-base text-white">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.filter((n) => !('children' in n)).map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-white/65 hover:text-brand-gold transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour packages */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-base text-white">Tour Packages</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {tourPackages.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-white/65 hover:text-brand-gold transition-colors">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-base text-white">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <IconMapPin width={18} height={18} className="mt-0.5 shrink-0 text-brand-gold" />
                <span className="text-white/65">{brand.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <IconPhone width={18} height={18} className="shrink-0 text-brand-gold" />
                <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="text-white/65 hover:text-brand-gold">
                  {brand.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <IconMail width={18} height={18} className="shrink-0 text-brand-gold" />
                <a href={`mailto:${brand.email}`} className="text-white/65 hover:text-brand-gold">
                  {brand.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(defaultWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white hover:bg-[#1ebe5b] transition-colors"
                >
                  <IconWhatsApp width={16} height={16} /> WhatsApp us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-14 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="font-serif text-lg text-white">Receive our seasonal letter</h3>
            <p className="mt-1 text-sm text-white/60">
              Festival dates, new itineraries, and quiet travel notes — twice a year.
            </p>
          </div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `mailto:${brand.email}?subject=Newsletter signup&body=Please add ${email} to the seasonal letter.`;
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="h-11 flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-sm text-white placeholder:text-white/40 focus:border-brand-gold focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex h-11 items-center gap-1.5 rounded-full bg-brand-saffron px-5 text-sm font-medium text-white hover:bg-brand-saffron-dark transition-colors"
            >
              Subscribe <IconArrow width={16} height={16} />
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
          <p>
            © {year} {brand.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/faq" className="hover:text-brand-gold">FAQ</Link>
            <Link href="/contact" className="hover:text-brand-gold">Contact</Link>
            <span className="opacity-60">Designed with care in Varanasi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
