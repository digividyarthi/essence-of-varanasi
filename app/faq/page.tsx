import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FAQExplorer from '@/components/FAQExplorer';
import FinalCTA from '@/components/home/FinalCTA';
import { whatsappLink } from '@/lib/site';
import Button from '@/components/ui/Button';
import { IconWhatsApp } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about our Varanasi tours, bookings, travel tips and payments. Everything you need to know before you travel.',
  alternates: { canonical: '/faq' },
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="Good to Know"
        title={
          <>
            Frequently asked <span className="font-serif italic text-brand-saffron">questions</span>
          </>
        }
        description="The most common things travellers ask before they arrive. Search, filter by topic, or just reach out — we are a WhatsApp message away."
        image="/images/hero/vishwanath.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
      />

      <section className="section">
        <div className="container-x">
          <FAQExplorer />
        </div>
      </section>

      {/* Still have questions */}
      <section className="section bg-cream-radial bg-brand-cream">
        <div className="container-x">
          <div className="mx-auto max-w-3xl rounded-3xl border border-brand-line bg-white p-8 text-center shadow-soft md:p-12">
            <h2 className="heading-md">Still have questions?</h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-ink/70">
              No question is too small. Our team is happy to help — whether it is about
              dietary needs, accessibility, festival dates, or the perfect pair of shoes for
              the ghats.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button
                href={whatsappLink("Hi! I have a question about your tours.")}
                variant="whatsapp"
                size="lg"
              >
                <IconWhatsApp width={20} height={20} /> Ask on WhatsApp
              </Button>
              <Button href="/contact" variant="primary" size="lg">
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
