'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { nav, brand, whatsappLink, defaultWhatsAppMessage, social } from '@/lib/site';
import { cn } from '@/lib/cn';
import Button from '@/components/ui/Button';
import {
  IconChevronDown,
  IconPhone,
  IconMail,
  IconMenu,
  IconCross,
  IconWhatsApp,
  IconInstagram,
  IconFacebook,
  IconYouTube,
} from '@/components/ui/icons';

const socialIcon: Record<string, (p: any) => JSX.Element> = {
  instagram: IconInstagram,
  facebook: IconFacebook,
  youtube: IconYouTube,
};

export default function Navbar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);

  useEffect(() => {
    setDrawerOpen(false);
    setOpenDropdown(null);
    setMobileOpen(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <div className="sticky top-0 z-50 shadow-soft">
      {/* Utility top bar */}
      <div className="hidden lg:block bg-brand-maroon-deep text-white/90 border-b border-brand-maroon">
        <div className="container-x flex h-9 items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${brand.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 hover:text-brand-gold transition-colors"
            >
              <IconPhone width={14} height={14} /> {brand.phone}
            </a>
            <a
              href={`mailto:${brand.email}`}
              className="inline-flex items-center gap-2 hover:text-brand-gold transition-colors"
            >
              <IconMail width={14} height={14} /> {brand.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="opacity-75">Follow us</span>
            {social.map((s) => {
              const Icon = socialIcon[s.icon] ?? IconInstagram;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="hover:text-brand-gold transition-colors"
                >
                  <Icon width={15} height={15} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-brand-line">
        <nav className="container-x flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label={brand.name}>
            <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-brand-gold/60 shadow-sm">
              <Image
                src="/images/logo.png"
                alt={brand.name}
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </div>
            <div className="leading-tight">
              <div className="font-serif text-xl font-bold tracking-tight text-brand-maroon">
                Essence of <span className="text-brand-saffron">Varanasi</span>
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-muted">
                Sacred journeys · Since {brand.founded}
              </div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => 'children' in item && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors whitespace-nowrap',
                    isActive(item.href)
                      ? 'text-brand-saffron-dark bg-brand-cream font-bold'
                      : 'text-brand-ink hover:text-brand-maroon hover:bg-brand-cream/80',
                  )}
                >
                  {item.label}
                  {'children' in item && (
                    <IconChevronDown width={14} height={14} className="opacity-70" />
                  )}
                </Link>
                {'children' in item && item.children && (
                  <div
                    className={cn(
                      'absolute left-1/2 top-full -translate-x-1/2 pt-2 transition-all duration-200 z-50',
                      openDropdown === item.label
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-1',
                    )}
                  >
                    <div className="min-w-[230px] overflow-hidden rounded-2xl border border-brand-line bg-white p-2 shadow-soft-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-4 py-2.5 text-sm font-medium text-brand-ink hover:bg-brand-cream hover:text-brand-maroon transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* CTA Button + Mobile Menu Hamburger */}
          <div className="flex items-center gap-3">
            <Button
              href={whatsappLink(defaultWhatsAppMessage)}
              variant="primary"
              size="md"
              className="hidden sm:inline-flex"
            >
              <IconWhatsApp width={16} height={16} />
              Get a Free Quote
            </Button>
            <button
              type="button"
              className="lg:hidden grid h-11 w-11 place-items-center rounded-full text-brand-maroon hover:bg-brand-cream transition-colors"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              <IconMenu width={24} height={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile navigation drawer */}
      <div
        className={cn(
          'fixed inset-0 z-[60] lg:hidden transition-opacity duration-300',
          drawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible',
        )}
      >
        <div
          className="absolute inset-0 bg-brand-maroon-deep/60 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        />
        <aside
          className={cn(
            'absolute right-0 top-0 h-full w-[88%] max-w-md bg-brand-cream shadow-2xl transition-transform duration-300 flex flex-col',
            drawerOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex items-center justify-between border-b border-brand-line px-6 h-20 bg-white">
            <span className="font-serif text-lg font-bold text-brand-maroon">
              Essence of <span className="text-brand-saffron">Varanasi</span>
            </span>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full text-brand-maroon hover:bg-brand-cream-deep"
              aria-label="Close menu"
              onClick={() => setDrawerOpen(false)}
            >
              <IconCross width={22} height={22} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4">
            {nav.map((item) => (
              <div key={item.label} className="border-b border-brand-line/60">
                {'children' in item && item.children ? (
                  <>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-3 py-3.5 text-left text-base font-semibold text-brand-maroon"
                      onClick={() =>
                        setMobileOpen(mobileOpen === item.label ? null : item.label)
                      }
                    >
                      {item.label}
                      <IconChevronDown
                        width={18}
                        height={18}
                        className={cn(
                          'transition-transform',
                          mobileOpen === item.label && 'rotate-180 text-brand-saffron-dark',
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-300',
                        mobileOpen === item.label ? 'max-h-[400px] pb-2' : 'max-h-0',
                      )}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-7 py-2.5 text-sm font-medium text-brand-ink hover:text-brand-saffron-dark"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'block px-3 py-3.5 text-base font-semibold transition-colors',
                      isActive(item.href)
                        ? 'text-brand-saffron-dark'
                        : 'text-brand-maroon hover:text-brand-saffron-dark',
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="border-t border-brand-line p-5 space-y-3 bg-white">
            <Button
              href={whatsappLink(defaultWhatsAppMessage)}
              variant="primary"
              size="lg"
              className="w-full"
            >
              <IconWhatsApp width={18} height={18} />
              Get a Free Quote
            </Button>
            <a
              href={`tel:${brand.phone.replace(/\s/g, '')}`}
              className="flex items-center justify-center gap-2 text-sm font-medium text-brand-muted hover:text-brand-maroon"
            >
              <IconPhone width={15} height={15} /> {brand.phone}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
