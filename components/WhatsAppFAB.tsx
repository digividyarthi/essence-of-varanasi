'use client';

import { useEffect, useState } from 'react';
import { whatsappLink, defaultWhatsAppMessage } from '@/lib/site';
import { IconWhatsApp } from '@/components/ui/icons';
import { cn } from '@/lib/cn';

export default function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={whatsappLink(defaultWhatsAppMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={cn(
        'group fixed bottom-6 right-6 z-50 flex items-center transition-all duration-500',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
      )}
    >
      <span className="pointer-events-none mr-3 max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-white px-0 py-2 text-sm font-medium text-brand-maroon shadow-soft transition-all duration-300 group-hover:max-w-[180px] group-hover:px-4">
        Chat with us
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-soft-lg transition-transform group-hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
        <IconWhatsApp width={28} height={28} className="relative" />
      </span>
    </a>
  );
}
