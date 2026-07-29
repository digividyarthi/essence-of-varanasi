import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import GalleryGrid from '@/components/GalleryGrid';
import FinalCTA from '@/components/home/FinalCTA';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photos from our journeys across Varanasi, Sarnath, Ayodhya, and Prayagraj — the ghats, the aartis, the smiles.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Moments from the <span className="font-serif italic text-brand-saffron">ghats</span>
          </>
        }
        description="A small window into the journeys we host — the light at sunrise, the fire of the aarti, and the travellers who became friends."
        image="/images/hero/sunrise.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />

      <section className="section">
        <div className="container-x">
          <GalleryGrid />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
