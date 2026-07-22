import SectionHeading from '@/components/ui/SectionHeading';
import { IconHotel, IconStar } from '@/components/ui/icons';

// Placeholder hotel partners — replace with real logos later
const partners = [
  { name: 'Taj Ganges', note: '5★ · Varanasi' },
  { name: 'BrijRama Palace', note: 'Heritage · on the ghats' },
  { name: 'Ramada', note: '4★ · Cantonment' },
  { name: 'Haveli Sita', note: 'Boutique · old city' },
  { name: 'The Amayara', note: 'Luxury · Ayodhya' },
  { name: 'Clarks', note: '4★ · Varanasi' },
];

export default function HotelStrip() {
  return (
    <section className="section-tight border-y border-brand-line bg-white">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Hospitality Partners"
          title={
            <>
              Stays we <span className="accent-italic">trust</span> with our guests
            </>
          }
          description="From a heritage haveli on the ghats to a five-star retreat — we have vetted rates at Varanasi's finest addresses."
          className="mx-auto"
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-brand-line bg-brand-cream/60 p-6 text-center transition-all hover:border-brand-gold/40 hover:bg-brand-cream"
            >
              <IconHotel width={28} height={28} className="text-brand-maroon transition-colors group-hover:text-brand-saffron-dark" />
              <div className="font-serif text-sm text-brand-maroon">{p.name}</div>
              <div className="text-[11px] text-brand-muted">{p.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
