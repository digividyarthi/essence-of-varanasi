import Image from 'next/image';
import Button from '@/components/ui/Button';
import { whatsappLink } from '@/lib/site';
import { IconWhatsApp, IconArrow, IconPhone } from '@/components/ui/icons';
import { MandalaMotif } from '@/components/ui/icons';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-brand-maroon">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/aarti.webp"
          alt="Ganga Aarti at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand-maroon-deep/85" />
      </div>

      <MandalaMotif className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 text-brand-gold opacity-[0.08]" />

      <div className="container-x relative z-10 py-24 text-center md:py-32">
        <p className="eyebrow-gold mb-5 justify-center">
          <span className="block h-px w-8 bg-current opacity-70" />
          Your journey begins here
        </p>
        <h2 className="heading-xl text-white text-balance mx-auto max-w-3xl">
          Ready for your <span className="font-serif italic text-brand-saffron">spiritual</span> journey?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">
          Tell us your dates, your dream, and your pace. Within 24 hours, you will have a
          tailored itinerary in your inbox — no obligation, no cost.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button
            href={whatsappLink("Namaste! I'd like a tailored itinerary for my Varanasi trip.")}
            variant="whatsapp"
            size="lg"
          >
            <IconWhatsApp width={20} height={20} /> Chat on WhatsApp
          </Button>
          <Button href="/contact" variant="primary" size="lg">
            Get a Free Quote <IconArrow width={18} height={18} />
          </Button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-white/60">
          <IconPhone width={16} height={16} />
          Or call us directly — we love a good conversation.
        </div>
      </div>

      {/* Gold bottom border */}
      <div className="relative z-10 h-1 w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
    </section>
  );
}
