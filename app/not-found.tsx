import Link from 'next/link';
import Button from '@/components/ui/Button';
import { IconArrow, IconMapPin } from '@/components/ui/icons';
import { MandalaMotif } from '@/components/ui/icons';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-cream-radial bg-brand-cream">
      <MandalaMotif className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 text-brand-maroon opacity-[0.05]" />

      <div className="container-x relative z-10 text-center">
        <p className="font-serif text-[7rem] leading-none text-brand-saffron md:text-[10rem]">
          404
        </p>
        <h1 className="heading-md mt-2">This path has wandered off</h1>
        <p className="mx-auto mt-4 max-w-md text-brand-ink/70">
          Even the most seasoned traveller takes a wrong turn in the lanes of Kashi. Let us
          guide you back.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary" size="lg">
            <IconArrow width={18} height={18} /> Back to home
          </Button>
          <Button href="/tours" variant="outline" size="lg">
            <IconMapPin width={18} height={18} /> Browse tours
          </Button>
        </div>
      </div>
    </section>
  );
}
