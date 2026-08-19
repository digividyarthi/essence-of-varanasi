# Essence of Varanasi — Website

A boutique, multi-page marketing site for **Essence of Varanasi**, a family-run pilgrimage
and cultural tour operator in Varanasi, India. Redesigned and rebuilt from the ground up,
inspired by (and intended to surpass) the warm, boutique feel of [yattri.com](https://yattri.com/).

## Stack

- **Next.js 14** (App Router, static export–friendly)
- **TypeScript** (strict)
- **Tailwind CSS** with a custom brand palette
- **next/font** — Fraunces (serif headings) + Inter (body), zero layout shift
- **next/image** — automatic WebP/AVIF + responsive srcset

## Brand palette

| Token | Hex | Use |
|---|---|---|
| `brand-saffron` | `#F4A024` | Primary CTAs, accents |
| `brand-maroon` | `#6B1F2E` | Headings, dark sections, footer |
| `brand-gold` | `#C9A961` | Premium accents, dividers |
| `brand-cream` | `#FBF6EC` | Section backgrounds |
| `brand-ink` | `#1F1A18` | Body text |

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero carousel, trust strip, about, featured tours, destinations, fleet, why-choose-us, testimonials, inspiration, hotels, FAQ, final CTA |
| `/about` | Founder story, animated stats, values, milestone timeline |
| `/tours` | All tours with category filter pills |
| `/tours/[slug]` | Tour detail — hero, sticky booking bar, overview, day-by-day itinerary accordion, inclusions/exclusions, destinations, related tours |
| `/destinations` | Editorial alternating layout of all 6 destinations |
| `/destinations/[slug]` | Destination detail — about, attractions grid, travel tips, tours to this destination |
| `/fleet` | Three vehicles with alternating layouts + features |
| `/gallery` | Masonry gallery with category filter + lightbox (keyboard nav) |
| `/contact` | Contact form (opens WhatsApp prefilled) + contact info + map |
| `/faq` | Searchable, categorised FAQ accordion |
| `/sitemap.xml` | Auto-generated |
| `/robots.txt` | Auto-generated |

## Data layer

All content lives in typed data files under `lib/` — edit these to update the site:

- `lib/site.ts` — brand, contact, nav, social, WhatsApp helpers
- `lib/tours.ts` — 7 tour packages with full itineraries
- `lib/destinations.ts` — 6 sacred cities
- `lib/testimonials.ts` — 6 guest reviews
- `lib/faq.ts` — 13 FAQs across 4 categories
- `lib/fleet.ts` — 3 vehicles
- `lib/gallery.ts` — gallery image set
- `lib/posts.ts` — blog/inspiration teasers

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
```

## Images

- **From the original site** (logo, tour heroes, fleet, testimonials, gallery guests):
  downloaded into `public/images/`.
- **Hero slides & destination heroes**: sourced from Unsplash, downloaded locally.
- All images served via `next/image` for automatic optimisation.

To swap an image, drop a file in the matching `public/images/<subdir>/` folder and update
the path in the relevant `lib/*.ts` file.

## WhatsApp integration

Every CTA deep-links to `https://wa.me/918004764122` with a context-aware prefilled
message (per page / per tour / per vehicle). Update the number in `lib/site.ts` → `brand.whatsapp`.

## Contact form

The contact form (`components/ContactForm.tsx`) currently opens WhatsApp with the form
details prefilled — no backend required. To wire up real email delivery, replace the
`onSubmit` handler with a POST to Formspree, Resend, or a `/api/contact` route. The TODO
is marked in the component.

## SEO

- Per-page metadata via `generateMetadata`
- Open Graph + Twitter cards
- Schema.org `TravelAgency` on home, `TouristTrip` on tour detail pages
- Auto sitemap + robots
- Semantic HTML, alt text on every image

## Out of scope (future)

- CMS (Sanity / MDX) — the `lib/*.ts` files are the swap point
- Payment gateway / live booking
- Multilingual (Hindi/English) via `next-intl`
- Analytics (Plausible/GA)
