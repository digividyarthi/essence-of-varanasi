import { IconShield, IconUsers, IconClock, IconStar, IconCompass } from '@/components/ui/icons';

const items = [
  { icon: IconClock, label: '10+ Years', sub: 'On the ghats' },
  { icon: IconUsers, label: '1,000+ Guests', sub: 'Hosted with care' },
  { icon: IconCompass, label: 'Licensed Guides', sub: 'Local & multilingual' },
  { icon: IconShield, label: '24/7 Support', sub: 'Dedicated host' },
  { icon: IconStar, label: '4.9 / 5', sub: 'Across 500+ reviews' },
];

export default function TrustStrip() {
  return (
    <section className="relative z-10 -mt-12 px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-brand-line bg-white shadow-soft-lg">
        <div className="grid divide-y divide-brand-line sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-y-0">
          {items.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-saffron/10 text-brand-saffron-dark">
                <Icon width={22} height={22} />
              </span>
              <div className="leading-tight">
                <div className="font-serif text-lg text-brand-maroon">{label}</div>
                <div className="text-xs text-brand-muted">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
