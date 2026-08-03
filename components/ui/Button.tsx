import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'gold';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-medium tracking-wide rounded-full transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-saffron';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-saffron text-white hover:bg-brand-saffron-dark shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5',
  secondary:
    'bg-brand-maroon text-white hover:bg-brand-maroon-deep shadow-soft hover:-translate-y-0.5',
  outline:
    'border-2 border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white',
  ghost: 'text-brand-maroon hover:bg-brand-maroon/5',
  whatsapp:
    'bg-brand-saffron text-white hover:bg-brand-saffron-dark shadow-soft hover:-translate-y-0.5',
  gold:
    'bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-maroon-deep shadow-gold-glow hover:-translate-y-0.5',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
};

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = Props &
  ComponentPropsWithoutRef<'button'> & { href?: undefined };
type LinkProps = Props & { href: string; target?: string; rel?: string };

export default function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props;
  const cls = cn(base, variants[variant], sizes[size], className);

  if ('href' in rest && rest.href) {
    const { href, target, rel } = rest as LinkProps;
    const isExternal = href.startsWith('http') || href.startsWith('//');
    if (isExternal && !href.includes('wa.me')) {
      return (
        <a
          href={href}
          target={target ?? '_blank'}
          rel={rel ?? 'noopener noreferrer'}
          className={cls}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href.includes('wa.me') ? '/contact' : href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonProps)}>
      {children}
    </button>
  );
}
