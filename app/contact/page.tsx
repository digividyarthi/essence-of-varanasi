import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { brand, whatsappLink, social } from '@/lib/site';
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconClock,
  IconWhatsApp,
  IconInstagram,
  IconFacebook,
  IconYouTube,
  IconCompass,
} from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Essence of Varanasi. Plan your spiritual journey, ask a question, or book a custom pilgrimage.',
  alternates: { canonical: '/contact' },
};

const socialIcon: Record<string, (p: any) => JSX.Element> = {
  instagram: IconInstagram,
  facebook: IconFacebook,
  youtube: IconYouTube,
  tripadvisor: IconCompass,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title={
          <>
            Let's plan your <span className="font-serif italic text-brand-saffron">journey</span>
          </>
        }
        description="Have a question about our spiritual tours or want to book a custom pilgrimage? Reach out — we love a good conversation."
        image="/images/hero/aarti.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-soft sm:p-8">
              <h2 className="font-serif text-2xl text-brand-maroon">Send us a message</h2>
              <p className="mt-1 text-sm text-brand-muted">
                Fill in the form and we will respond personally, usually within a few hours.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Contact info */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-brand-line bg-white p-6">
              <h3 className="font-serif text-lg text-brand-maroon">Reach us directly</h3>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-saffron/10 text-brand-saffron-dark">
                    <IconPhone width={18} height={18} />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-brand-muted">Phone</div>
                    <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="font-medium text-brand-maroon hover:text-brand-saffron-dark">
                      {brand.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-saffron/10 text-brand-saffron-dark">
                    <IconMail width={18} height={18} />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-brand-muted">Email</div>
                    <a href={`mailto:${brand.email}`} className="font-medium text-brand-maroon hover:text-brand-saffron-dark">
                      {brand.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-saffron/10 text-brand-saffron-dark">
                    <IconMapPin width={18} height={18} />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-brand-muted">Office</div>
                    <p className="font-medium text-brand-maroon">{brand.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-saffron/10 text-brand-saffron-dark">
                    <IconClock width={18} height={18} />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-brand-muted">Hours</div>
                    <p className="font-medium text-brand-maroon">Daily · 6 AM – 10 PM IST</p>
                  </div>
                </li>
              </ul>

              <a
                href={whatsappLink("Namaste! I'd like to enquire about your tours.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-medium text-white hover:bg-[#1ebe5b] transition-colors"
              >
                <IconWhatsApp width={18} height={18} /> Message on WhatsApp
              </a>
            </div>

            {/* Social */}
            <div className="rounded-2xl border border-brand-line bg-white p-6">
              <h3 className="font-serif text-lg text-brand-maroon">Follow our journey</h3>
              <div className="mt-4 flex gap-3">
                {social.map((s) => {
                  const Icon = socialIcon[s.icon] ?? IconInstagram;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-brand-line text-brand-maroon transition-colors hover:border-brand-saffron hover:bg-brand-saffron hover:text-white"
                    >
                      <Icon width={18} height={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-brand-line shadow-soft">
              <iframe
                title="Map of Varanasi"
                src="https://www.openstreetmap.org/export/embed.html?bbox=83.005%2C25.305%2C83.025%2C25.320&amp;layer=mapnik&amp;marker=25.3125%2C83.015"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
