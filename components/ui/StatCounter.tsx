'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
  duration?: number;
};

export default function StatCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  className,
  duration = 1800,
}: Props) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const t = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
              setN(Math.round(eased * value));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className={cn('flex flex-col', className)}>
      <div className="font-serif text-display-md font-medium text-brand-maroon leading-none">
        {prefix}
        {n.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-3 text-sm uppercase tracking-[0.18em] text-brand-muted">{label}</div>
    </div>
  );
}
