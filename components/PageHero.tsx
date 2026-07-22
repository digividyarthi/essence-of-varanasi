import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { IconChevronRight } from '@/components/ui/icons';

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  image: string;
  crumbs?: Crumb[];
  align?: 'left' | 'center';
  tall?: boolean;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  crumbs,
  align = 'left',
  tall = false,
}: Props) {
  return (
    <section
      className={cn(
        'relative flex w-full items-end overflow-hidden bg-brand-maroon-deep',
        tall ? 'min-h-[70vh]' : 'min-h-[52vh]',
      )}
    >
      <Image
        src={image}
        alt={typeof title === 'string' ? title : 'Page hero'}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-deep via-brand-maroon-deep/60 to-brand-maroon-deep/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-maroon-deep/70 to-transparent" />

      <div className="container-x relative z-10 pb-14 pt-32 md:pb-20">
        <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
          {crumbs && crumbs.length > 0 && (
            <nav className="mb-5 flex items-center gap-1.5 text-xs text-white/70" aria-label="Breadcrumb">
              {crumbs.map((c, i) => (
                <span key={i} className="inline-flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-brand-gold transition-colors">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && (
                    <IconChevronRight width={13} height={13} className="opacity-50" />
                  )}
                </span>
              ))}
            </nav>
          )}

          {eyebrow && (
            <p className="eyebrow-gold mb-4 justify-start">
              <span className="block h-px w-8 bg-current opacity-70" />
              {eyebrow}
            </p>
          )}
          <h1 className="heading-lg text-white text-balance">{title}</h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg text-white/80 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </section>
  );
}
