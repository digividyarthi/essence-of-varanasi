'use client';

import { useState } from 'react';
import { tours } from '@/lib/tours';
import { whatsappLink, brand } from '@/lib/site';
import { cn } from '@/lib/cn';
import { IconWhatsApp, IconCheck, IconArrow } from '@/components/ui/icons';

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
  const [sent, setSent] = useState(false);

  const update = (k: keyof typeof form, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const buildMessage = () =>
    `Namaste! I'd like to enquire about a trip.%0A%0A` +
    `Name: ${form.firstName} ${form.lastName}%0A` +
    `Email: ${form.email}%0A` +
    `Phone: ${form.phone}%0A` +
    `Travel date: ${form.date || 'flexible'}%0A` +
    `Interested in: ${form.tour || 'general enquiry'}%0A` +
    `Message: ${form.message}`;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to Hotel/Tour CRM backend database
    try {
      fetch('/api/bookings.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guest_name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone,
          check_in: form.date || null,
          room_type: form.tour || 'General Enquiry',
          special_requests: form.message,
          source_page: typeof window !== 'undefined' ? window.location.pathname : '/contact',
        }),
      }).catch(() => {});
    } catch (_) {}

    window.open(whatsappLink(decodeURIComponent(buildMessage())), '_blank');
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-brand-gold/40 bg-brand-cream p-10 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-saffron text-white">
          <IconCheck width={32} height={32} />
        </span>
        <h3 className="mt-5 font-serif text-2xl text-brand-maroon">Thank you!</h3>
        <p className="mt-3 text-brand-ink/70">
          We have opened WhatsApp with your details pre-filled. Hit send there and we will
          reply within a few hours. Prefer email? Write to us at{' '}
          <a href={`mailto:${brand.email}`} className="text-brand-saffron-dark underline">
            {brand.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-medium text-brand-maroon underline hover:text-brand-saffron-dark"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const fieldCls =
    'h-12 w-full rounded-xl border border-brand-line bg-white px-4 text-sm text-brand-ink placeholder:text-brand-muted/60 focus:border-brand-saffron focus:outline-none focus:ring-2 focus:ring-brand-saffron/20 transition-colors';

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-muted">
            First name
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
            Last name
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
            Email
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
            Phone / WhatsApp
          </label>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className={fieldCls}
            placeholder="+91 ..."
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-muted">
            Travel date
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
            Interested in
          </label>
          <select
            value={form.tour}
            onChange={(e) => update('tour', e.target.value)}
            className={fieldCls}
          >
            <option value="">General enquiry</option>
            {tours.map((t) => (
              <option key={t.slug} value={t.title}>
                {t.title}
              </option>
            ))}
            <option value="Custom itinerary">Custom itinerary</option>
            <option value="Vehicle hire">Vehicle hire only</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-muted">
          Your message
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className={cn(fieldCls, 'h-auto py-3')}
          placeholder="Tell us about your group, your interests, and anything we should know..."
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-base font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#1ebe5b]"
      >
        <IconWhatsApp width={20} height={20} /> Send via WhatsApp
        <IconArrow width={18} height={18} />
      </button>
      <p className="text-center text-xs text-brand-muted">
        We typically reply within a few hours. Your details are never shared.
      </p>
    </form>
  );
}
