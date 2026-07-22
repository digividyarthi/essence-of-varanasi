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
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);

  const isHome = pathname === '/';
  // On the home page we start transparent over the hero; everywhere else we are solid.
  const transparent = isHome && !scrolled && !drawerOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <div className={cn('relative z-50', transparent ? '' : 'shadow-soft')}>
      {/* Utility bar — desktop only */}
      <div
        className={cn(
          'hidden lg:block border-b transition-colors duration-300',
          transparent
            ? 'bg-transparent border-white/10 text-white/90'
            : 'bg-brand-maroon-deep text-white/85 border-brand-maroon',
        )}
      >
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 hover:text-brand-gold">
              <IconPhone width={14} height={14} /> {brand.phone}
            </a>
            <a href={`mailto:${brand.email}`} className="inline-flex items-center gap-2 hover:text-brand-gold">
              <IconMail width={14} height={14} /> {brand.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="opacity-70">Follow us</span>
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

      {/* Main bar */}
      <header
        className={cn(
          'sticky top-0 z-40 transition-all duration-300',
          transparent
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-md border-b border-brand-line',
        )}
      >
        <nav className="container-x flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label={brand.name}>
            <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-brand-gold/60">
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
              <div
                className={cn(
                  'font-serif text-lg font-medium tracking-tight transition-colors',
                  transparent ? 'text-white' : 'text-brand-maroon',
                )}
              >
                Essence of <span className="text-brand-saffron">Varanasi</span>
              </div>
              <div
                className={cn(
                  'text-[10px] uppercase tracking-[0.2em] transition-colors',
                  transparent ? 'text-white/70' : 'text-brand-muted',
                )}
              >
                Sacred journeys · Since {brand.founded}
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5">
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
                    'inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap',
                    transparent
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : 'text-brand-ink hover:text-brand-maroon hover:bg-brand-cream',
                    isActive(item.href) && (transparent ? 'text-brand-gold' : 'text-brand-saffron-dark'),
                  )}
                >
                  {item.label}
                  {'children' in item && <IconChevronDown width={14} height={14} className="opacity-70" />}
                </Link>
                {'children' in item && item.children && (
                  <div
                    className={cn(
                      'absolute left-1/2 top-full -translate-x-1/2 pt-2 transition-all duration-200',
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
                          className="block rounded-xl px-4 py-2.5 text-sm text-brand-ink hover:bg-brand-cream hover:text-brand-maroon transition-colors"
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

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
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
              className={cn(
                'lg:hidden grid h-11 w-11 place-items-center rounded-full transition-colors',
                transparent ? 'text-white hover:bg-white/10' : 'text-brand-maroon hover:bg-brand-cream',
              )}
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              <IconMenu width={24} height={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
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
            'absolute right-0 top-0 h-full w-[88%] max-w-md bg-cream-radial bg-brand-cream shadow-2xl transition-transform duration-300 flex flex-col',
            drawerOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex items-center justify-between border-b border-brand-line px-6 h-20">
            <span className="font-serif text-lg text-brand-maroon">
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

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {nav.map((item) => (
              <div key={item.label} className="border-b border-brand-line/60">
                {('children' in item && item.children) ? (
                  <>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-3 py-3.5 text-left text-base font-medium text-brand-maroon"
                      onClick={() => setMobileOpen(mobileOpen === item.label ? null : item.label)}
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
                          className="block px-7 py-2.5 text-sm text-brand-ink hover:text-brand-saffron-dark"
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
                      'block px-3 py-3.5 text-base font-medium transition-colors',
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

          <div className="border-t border-brand-line p-5 space-y-3">
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
              className="flex items-center justify-center gap-2 text-sm text-brand-muted"
            >
              <IconPhone width={15} height={15} /> {brand.phone}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
