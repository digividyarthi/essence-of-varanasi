import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import FinalCTA from '@/components/home/FinalCTA';
import SectionHeading from '@/components/ui/SectionHeading';
import StatCounter from '@/components/ui/StatCounter';
import { IconHeart, IconCompass, IconShield, IconSparkles } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Essence of Varanasi is a family-run boutique tour operator. Meet the team, our values, and the story behind a decade on the ghats.',
  alternates: { canonical: '/about' },
};

const values = [
  { icon: IconHeart, t: 'Hospitality first', b: 'Atithi Devo Bhava — the guest is God. It is not marketing for us, it is how we were raised.' },
  { icon: IconCompass, t: 'Local & authentic', b: 'Every guide, driver, and pandit on our team grew up here. You see the city as we do.' },
  { icon: IconSparkles, t: 'Quietly curated', b: 'We refine every itinerary from real feedback — no copy-paste tours, ever.' },
  { icon: IconShield, t: 'Trust & transparency', b: 'Fully licensed, insured, with honest pricing and no hidden costs.' },
];

const milestones = [
  { year: '2014', title: 'The first guest', body: 'We host our first international traveller — a photographer from Kyoto who became a lifelong friend.' },
  { year: '2017', title: 'Heritage haveli', body: 'We restore a 19th-century haveli on the ghats to host guests who want to wake up to the Ganges.' },
  { year: '2020', title: 'The pandemic pivot', body: 'We keep every team member employed and retrain our guides — emerging leaner and kinder.' },
  { year: '2024', title: 'The Kashi Vishwanath Corridor', body: 'We become one of the first operators to offer seamless corridor darshan experiences.' },
  { year: '2026', title: '1,000 travellers & counting', body: 'We cross a thousand hosted guests across six sacred cities — without ever losing the personal touch.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={
          <>
            A family, a river,{' '}
            <span className="font-serif italic text-brand-saffron">a calling</span>
          </>
        }
        description="We are a small, family-run team that has lived beside the Ganges for generations. This is the story of how we came to host the world."
        image="/images/about/founder.jpg"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Founder story */}
      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft-lg">
              <Image
                src="/images/about/founder.jpg"
                alt="Our founder"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 max-w-[260px] rounded-2xl border border-brand-line bg-white p-5 shadow-soft-lg">
              <div className="font-serif text-xl text-brand-maroon">A note from our founder</div>
              <p className="mt-2 text-sm text-brand-muted">
                &ldquo;We do not sell tours. We share our home. That is the only difference that matters.&rdquo;
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Our Story"
              title={
                <>
                  How it <span className="accent-italic">began</span>
                </>
              }
            />
            <div className="mt-6 space-y-4 text-brand-ink/80 leading-relaxed">
              <p>
                A dozen years ago, a stranger from a far country stopped our founder on the
                ghats and asked, simply, <span className="accent-italic">&ldquo;will you show me your city?&rdquo;</span>
              </p>
              <p>
                He did. For three days. And when the traveller left, he left behind a note that
                said: <span className="accent-italic">&ldquo;I came as a tourist and leave as a friend.&rdquo;</span> That
                note still sits framed in our office.
              </p>
              <p>
                That is how Essence of Varanasi began — not as a business plan, but as a way of
                being. We have grown slowly and carefully since, but the spirit has never
                changed. Every guest is welcomed the way that first traveller was: as family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section bg-cream-radial bg-brand-cream">
        <div className="container-x">
          <div className="grid gap-8 text-center md:grid-cols-4">
            <StatCounter value={10} suffix="+" label="Years on the ghats" className="items-center" />
            <StatCounter value={1000} suffix="+" label="Travellers hosted" className="items-center" />
            <StatCounter value={6} label="Sacred cities" className="items-center" />
            <StatCounter value={40} suffix="+" label="Countries served" className="items-center" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="What We Believe"
            title="Four values, kept on every journey"
            className="mx-auto"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, t, b }) => (
              <div key={t} className="rounded-2xl border border-brand-line bg-white p-6 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-saffron/10 text-brand-saffron-dark">
                  <Icon width={26} height={26} />
                </span>
                <h3 className="mt-4 font-serif text-lg text-brand-maroon">{t}</h3>
                <p className="mt-2 text-sm text-brand-ink/70">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-cream-radial bg-brand-cream">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Milestones"
            title="A decade, in moments"
            className="mx-auto"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="relative border-l-2 border-brand-gold/40 pl-8">
              {milestones.map((m) => (
                <div key={m.year} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[41px] top-0 grid h-7 w-7 place-items-center rounded-full bg-brand-maroon text-[10px] font-semibold text-white ring-4 ring-brand-cream">
                  </span>
                  <div className="font-serif text-xl text-brand-saffron-dark">{m.year}</div>
                  <h3 className="mt-1 font-serif text-lg text-brand-maroon">{m.title}</h3>
                  <p className="mt-1 text-sm text-brand-ink/70">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
