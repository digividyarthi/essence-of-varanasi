import type { SVGProps } from 'react';

// Lightweight inline icon set — no icon library dependency.
// All icons inherit color via `currentColor` and stroke width 1.6 for elegance.

const s = (p: SVGProps<SVGSVGElement>) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...p,
});

export const IconArrow = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export const IconArrowUpRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M7 17L17 7M9 7h8v8" /></svg>
);

export const IconClock = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);

export const IconCalendar = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>
);

export const IconMapPin = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M12 21s-7-6.5-7-11a7 7 0 0114 0c0 4.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
);

export const IconPhone = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></svg>
);

export const IconMail = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);

export const IconCheck = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M5 12l5 5 9-11" /></svg>
);

export const IconCross = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>
);

export const IconStar = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)} fill="currentColor" stroke="none"><path d="M12 2l3 6.5 7 .9-5 4.9 1.3 7L12 18l-6.3 3.3L7 14.3 2 9.4l7-.9z" /></svg>
);

export const IconQuote = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)} fill="currentColor" stroke="none"><path d="M9 7c-2.8 0-5 2.2-5 5v5h6v-6H7c0-1.1.9-2 2-2zM19 7c-2.8 0-5 2.2-5 5v5h6v-6h-3c0-1.1.9-2 2-2z" /></svg>
);

export const IconChevronDown = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M6 9l6 6 6-6" /></svg>
);

export const IconChevronRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M9 6l6 6-6 6" /></svg>
);

export const IconChevronLeft = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M15 6l-6 6 6 6" /></svg>
);

export const IconWhatsApp = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s({ ...p, strokeWidth: 0 })} fill="currentColor" stroke="none">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.045zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export const IconInstagram = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>
);

export const IconFacebook = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
);

export const IconYouTube = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.42a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.37z" /><path d="M9.75 15.02V8.48l5.75 3.27-5.75 3.27z" fill="currentColor" /></svg>
);

export const IconCompass = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><circle cx="12" cy="12" r="9" /><path d="M16 8l-2 6-6 2 2-6z" /></svg>
);

export const IconShield = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
);

export const IconSparkles = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5zM19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" /></svg>
);

export const IconHeart = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 10-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 000-7.8z" /></svg>
);

export const IconUsers = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><circle cx="9" cy="8" r="3.5" /><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" /><path d="M16 4.5a3.5 3.5 0 010 7M22 20c0-2.5-1.5-4.5-4-5.5" /></svg>
);

export const IconGlobe = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" /></svg>
);

export const IconHotel = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M3 21V8l9-5 9 5v13" /><path d="M3 21h18M9 21v-6h6v6M9 11h.01M15 11h.01" /></svg>
);

export const IconCar = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M5 17h14M6 17l-2-5 2-5h12l2 5-2 5" /><circle cx="7.5" cy="17" r="1.5" /><circle cx="16.5" cy="17" r="1.5" /></svg>
);

export const IconUtensils = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M4 3v7a2 2 0 002 2v9M6 3v7M8 3v7M16 3v18M16 11c2 0 3-1 3-4s-1-4-3-4" /></svg>
);

export const IconMenu = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);

export const IconCamera = (p: SVGProps<SVGSVGElement>) => (
  <svg {...s(p)}><path d="M3 7h3l2-2h8l2 2h3a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z" /><circle cx="12" cy="13" r="3.5" /></svg>
);

// Decorative — Om symbol stylised as monoline
export const OmMotif = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" {...p}>
    <path d="M30 56c0-8 6-14 14-14 5 0 9 3 11 7 2-6 8-10 14-10 7 0 12 5 12 11 0 6-5 11-11 11-4 0-7-2-9-5" />
    <path d="M22 38c-4 6-4 14 2 19 7 7 18 5 22-3" />
    <circle cx="62" cy="32" r="3" fill="currentColor" stroke="none" />
    <path d="M66 28c3-4 9-4 12 0" />
  </svg>
);

// Decorative — lotus/mandala watermark
export const MandalaMotif = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={1.2} {...p}>
    <circle cx="100" cy="100" r="48" />
    <circle cx="100" cy="100" r="72" strokeDasharray="2 6" />
    <circle cx="100" cy="100" r="92" strokeDasharray="1 8" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <path key={deg} d="M100 28 C 118 60, 118 140, 100 172" transform={`rotate(${deg} 100 100)`} />
    ))}
    <circle cx="100" cy="100" r="16" />
  </svg>
);
