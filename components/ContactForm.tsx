'use client';

import { useState } from 'react';
import { tours } from '@/lib/tours';
import { brand } from '@/lib/site';
import { cn } from '@/lib/cn';
import { IconCheck, IconArrow } from '@/components/ui/icons';

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+977', country: 'Nepal', flag: '🇳🇵' },
  { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
];

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    tour: '',
    message: '',
  });
  const [countryCode, setCountryCode] = useState('+91');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const update = (k: keyof typeof form, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const fullPhone = form.phone.startsWith('+') ? form.phone : `${countryCode} ${form.phone}`.trim();

    try {
      const res = await fetch('/api/bookings.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guest_name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: fullPhone,
          check_in: form.date || null,
          room_type: form.tour || 'General Tour Inquiry',
          special_requests: form.message,
          source_page: typeof window !== 'undefined' ? window.location.pathname : '/contact',
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setSent(true);
      } else {
        const err = data.errors ? Object.values(data.errors).join(' ') : (data.error || 'Failed to submit inquiry.');
        setErrorMsg(err);
      }
    } catch (_) {
      setErrorMsg('Network error. Please check your internet connection or try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-brand-gold/40 bg-brand-cream p-10 text-center shadow-soft">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-saffron text-white shadow-soft">
          <IconCheck width={32} height={32} />
        </span>
        <h3 className="mt-5 font-serif text-2xl text-brand-maroon">Tour Inquiry Received!</h3>
        <p className="mt-3 text-brand-ink/80 leading-relaxed max-w-md mx-auto">
          Thank you, <strong>{form.firstName}</strong>! Your travel inquiry has been saved in our CRM system. Our travel specialist will review your details and contact you shortly via phone or email.
        </p>
        <div className="mt-6 pt-4 border-t border-brand-line/60 text-xs text-brand-muted">
          Need immediate assistance? Email us directly at{' '}
          <a href={`mailto:${brand.email}`} className="text-brand-saffron-dark font-semibold underline">
            {brand.email}
          </a>
        </div>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setForm({ firstName: '', lastName: '', email: '', phone: '', date: '', tour: '', message: '' });
          }}
          className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-maroon underline hover:text-brand-saffron-dark"
        >
          Submit another tour inquiry →
        </button>
      </div>
    );
  }

  const fieldCls =
    'h-12 w-full rounded-xl border border-brand-line bg-white px-4 text-sm text-brand-ink placeholder:text-brand-muted/60 focus:border-brand-saffron focus:outline-none focus:ring-2 focus:ring-brand-saffron/20 transition-colors';

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {errorMsg && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-muted">
            First name *
          </label>
          <input
            required
            type="text"
            value={form.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className={fieldCls}
            placeholder="Aarav"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-muted">
            Last name *
          </label>
          <input
            required
            type="text"
            value={form.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            className={fieldCls}
            placeholder="Sharma"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-muted">
            Email address *
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className={fieldCls}
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-muted">
            Phone / Mobile (with Country Code) *
          </label>
          <div className="flex gap-2">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="h-12 w-32 shrink-0 rounded-xl border border-brand-line bg-white px-2 text-xs font-semibold text-brand-ink focus:border-brand-saffron focus:outline-none"
              aria-label="Select Country Code"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code + c.country} value={c.code}>
                  {c.flag} {c.code} ({c.country})
                </option>
              ))}
            </select>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className={fieldCls}
              placeholder="9876543210"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-muted">
            Preferred Travel Date
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => update('date', e.target.value)}
            className={fieldCls}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-muted">
            Interested Package / Service
          </label>
          <select
            value={form.tour}
            onChange={(e) => update('tour', e.target.value)}
            className={fieldCls}
          >
            <option value="">General Tour Inquiry</option>
            {tours.map((t) => (
              <option key={t.slug} value={t.title}>
                {t.title}
              </option>
            ))}
            <option value="Sunrise Boat Ride & Ghat Walk">Sunrise Boat Ride & Ghat Walk</option>
            <option value="Custom Itinerary">Custom Itinerary</option>
            <option value="Vehicle Hire">Vehicle Hire Only</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-muted">
          Your message / Special requirements *
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className={cn(fieldCls, 'h-auto py-3')}
          placeholder="Tell us about your travel plans, group size, or specific requirements..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-maroon px-6 text-base font-medium text-white shadow-soft transition-all hover:bg-brand-maroon-deep hover:-translate-y-0.5 disabled:opacity-50"
      >
        {loading ? 'Submitting Inquiry...' : 'Submit Tour Booking Inquiry'}
        {!loading && <IconArrow width={18} height={18} />}
      </button>
      <p className="text-center text-xs text-brand-muted">
        Your inquiry is sent directly to our Essence CRM system. Details are strictly private.
      </p>
    </form>
  );
}
