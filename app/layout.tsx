import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import ScrollToTop from '@/components/ScrollToTop';
import { brand } from '@/lib/site';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  keywords: [
    'Varanasi tours',
    'Kashi Vishwanath darshan',
    'Ganga Aarti tour',
    'Sarnath day tour',
    'Ayodhya Ram Mandir tour',
    'Prayagraj Sangam',
    'spiritual tours India',
    'Varanasi travel operator',
    '3 star category hotel Varanasi',
  ],
  authors: [{ name: brand.name }],
  creator: brand.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: brand.url,
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    siteName: brand.name,
    images: [
      {
        url: '/images/og/og.jpg',
        width: 1200,
        height: 630,
        alt: brand.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    images: ['/images/og/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: '9vzZAzy5uGXEjefcezpwN_SPFVdHL42EtN6xqABtQrc',
  },
};

export const viewport: Viewport = {
  themeColor: '#6B1F2E',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFAB />
        <ScrollToTop />
      </body>
    </html>
  );
}
