import { cn } from '@/lib/cn';

type Props = {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'maroon' | 'saffron' | 'outline';
  className?: string;
  size?: 'sm' | 'md';
};

const variants = {
  default: 'bg-brand-cream text-brand-maroon border border-brand-line',
  gold: 'bg-brand-gold/15 text-brand-gold border border-brand-gold/30',
  maroon: 'bg-brand-maroon text-white',
  saffron: 'bg-brand-saffron/15 text-brand-saffron-dark border border-brand-saffron/30',
  outline: 'bg-transparent text-brand-maroon border border-brand-maroon/30',
};

const sizes = {
  sm: 'px-2.5 py-1 text-[10px]',
  md: 'px-3.5 py-1.5 text-xs',
};

export default function Pill({ children, variant = 'default', size = 'md', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-[0.12em]',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
