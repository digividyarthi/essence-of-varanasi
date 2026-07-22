import SectionHeading from '@/components/ui/SectionHeading';
import {
  IconCompass,
  IconHeart,
  IconCar,
  IconClock,
  IconSparkles,
  IconShield,
} from '@/components/ui/icons';

const reasons = [
  {
    icon: IconCompass,
    title: 'Expert local guides',
    body: 'Licensed, multilingual, and born in the lanes they walk. Not scripted — storytellers.',
  },
  {
    icon: IconSparkles,
    title: 'Curated itineraries',
    body: 'Refined over a thousand departures. Slow where it matters, brisk where it should be.',
  },
  {
    icon: IconCar,
    title: 'Luxury transport',
    body: 'Spotless, modern, air-conditioned. From a couple to a coach — we have the right vehicle.',
  },
  {
    icon: IconClock,
    title: '24/7 concierge',
    body: 'A dedicated host on WhatsApp from the moment you land to the moment you leave.',
  },
  {
    icon: IconHeart,
    title: 'Boutique & personal',
    body: 'Family-run, never a volume operation. We know your name, your diet, your pace.',
  },
  {
    icon: IconShield,
    title: 'Trusted & insured',
    body: 'Fully licensed operator with transparent pricing and no hidden costs — ever.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Why Travellers Choose Us"
          title={
            <>
              The difference is in the <span className="accent-italic">details</span>
            </>
          }
          description="Six promises we keep on every single journey — not in a brochure, but in the way your day actually unfolds."
          className="mx-auto"
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-brand-line bg-brand-line sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group bg-white p-8 transition-colors hover:bg-brand-cream"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-saffron/10 text-brand-saffron-dark transition-all group-hover:scale-110 group-hover:bg-brand-saffron group-hover:text-white">
                <Icon width={26} height={26} />
              </span>
              <h3 className="mt-5 font-serif text-xl text-brand-maroon">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
