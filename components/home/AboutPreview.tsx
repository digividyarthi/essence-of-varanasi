import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { IconArrow, IconHeart } from '@/components/ui/icons';
import { MandalaMotif } from '@/components/ui/icons';

export default function AboutPreview() {
  return (
    <section className="section relative overflow-hidden">
      <MandalaMotif className="motif-corner -left-16 top-10 h-72 w-72" />
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Text */}
        <div>
          <p className="eyebrow mb-4">
            <span className="block h-px w-8 bg-current opacity-60" />
            Our Story
          </p>
          <h2 className="heading-lg text-balance">
            Born of the river.{' '}
            <span className="accent-italic">Hosted</span> like family.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-brand-ink/80">
            <p>
              We are a small, family-run team that has lived beside the Ganges for
              generations. <span className="accent-italic">Our</span> guides grew up in
              these lanes; our drivers know every shortcut; our pandits have prayed at
              these temples since they were children.
            </p>
            <p>
              We started Essence of Varanasi because travellers kept telling us the same
              thing — that a city this old, this layered, this sacred, deserves more than
              a rushed bus tour. It deserves a <span className="accent-italic">host</span>.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/about" variant="primary" size="lg">
              Read our story <IconArrow width={18} height={18} />
            </Button>
            <div className="flex items-center gap-2 text-sm text-brand-muted">
              <IconHeart width={18} height={18} className="text-brand-saffron" />
              Hosting travellers since 2014
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft-lg">
            <Image
              src="/images/about/founder.jpg"
              alt="Our founder welcoming a guest"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-deep/50 to-transparent" />
          </div>

          {/* Floating signature card */}
          <div className="absolute -bottom-6 -left-6 max-w-[260px] rounded-2xl border border-brand-line bg-white p-5 shadow-soft-lg">
            <div className="font-serif text-2xl italic text-brand-saffron-dark leading-none">
              &ldquo;Atithi Devo Bhava&rdquo;
            </div>
            <p className="mt-2 text-sm text-brand-muted">
              The guest is God. This is not a slogan for us — it is how we welcome every
              traveller.
            </p>
            <div className="mt-3 border-t border-brand-line pt-3">
              <div className="font-serif text-base text-brand-maroon">— The Essence Family</div>
            </div>
          </div>

          {/* Gold corner accent */}
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-tr-[2rem] border-r-2 border-t-2 border-brand-gold" />
        </div>
      </div>
    </section>
  );
}
