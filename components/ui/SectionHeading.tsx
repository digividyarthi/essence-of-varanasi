import { cn } from '@/lib/cn';

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark' | 'cream';
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  className,
}: Props) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const eyebrowCls =
    tone === 'dark' ? 'text-brand-gold' : 'text-brand-saffron-dark';
  const titleCls = tone === 'dark' ? 'text-white' : 'text-brand-maroon';
  const descCls = tone === 'dark' ? 'text-white/75' : 'text-brand-ink/70';

  return (
    <header className={cn('max-w-2xl', alignCls, className)}>
      {eyebrow && (
        <p className={cn('eyebrow mb-4', eyebrowCls)}>
          <span className="block h-px w-8 bg-current opacity-60" />
          {eyebrow}
        </p>
      )}
      <h2 className={cn('heading-lg text-balance', titleCls)}>{title}</h2>
      {description && (
        <p className={cn('mt-5 text-lg leading-relaxed', descCls)}>{description}</p>
      )}
    </header>
  );
}
