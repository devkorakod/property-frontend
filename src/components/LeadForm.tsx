'use client';

import { useState } from 'react';
import { submitLead } from '@/lib/api';
import type { Locale } from '@/lib/locale';
import { t } from '@/lib/i18n';

export function LeadForm({ propertyId, source = 'general_form', locale = 'th' }: {
  propertyId?: string; source?: string; locale?: Locale;
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = new FormData(e.currentTarget);
    try {
      const result = await submitLead({
        source,
        propertyId,
        name: String(form.get('name') || ''),
        phone: String(form.get('phone') || ''),
        email: String(form.get('email') || '') || undefined,
        intent: String(form.get('intent') || 'buy'),
        message: String(form.get('message') || '') || undefined,
        preferredChannel: String(form.get('preferredChannel') || 'phone'),
        preferredTime: 'anytime',
        consentAccepted: true,
        pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        website: String(form.get('website') || ''),
      });
      setMessage(result.message[locale] ?? result.message.th);
      setStatus('done');
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus('error');
      setMessage(t(locale, 'leadForm_error'));
    }
  }

  if (status === 'done') {
    return <p className="text-red-bright font-thai-display text-lg py-8">{message}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* honeypot กันบอท — ผู้ใช้จริงมองไม่เห็นและไม่ได้ tab ผ่าน ถ้ามีค่าคือบอท */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
             className="absolute -left-[9999px] w-px h-px opacity-0" />
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="name" required placeholder={t(locale, 'leadForm_namePlaceholder')}
               className="bg-transparent border border-white/20 px-3 py-3 text-sm focus:border-red outline-none" />
        <input name="phone" required placeholder={t(locale, 'leadForm_phonePlaceholder')}
               className="bg-transparent border border-white/20 px-3 py-3 text-sm focus:border-red outline-none" />
      </div>
      <input name="email" type="email" placeholder={t(locale, 'leadForm_emailPlaceholder')}
             className="w-full bg-transparent border border-white/20 px-3 py-3 text-sm focus:border-red outline-none" />
      <select name="intent" className="w-full bg-ink border border-white/20 px-3 py-3 text-sm focus:border-red outline-none">
        <option value="buy">{t(locale, 'leadForm_intent_buy')}</option>
        <option value="rent">{t(locale, 'leadForm_intent_rent')}</option>
        <option value="sell">{t(locale, 'leadForm_intent_sell')}</option>
        <option value="invest">{t(locale, 'leadForm_intent_invest')}</option>
      </select>
      <textarea name="message" rows={3} placeholder={t(locale, 'leadForm_messagePlaceholder')}
                className="w-full bg-transparent border border-white/20 px-3 py-3 text-sm focus:border-red outline-none" />
      <button type="submit" disabled={status === 'sending'}
              className="w-full bg-red hover:bg-red-bright text-white uppercase tracking-[.16em] text-xs py-3.5 transition-colors disabled:opacity-60">
        {status === 'sending' ? t(locale, 'leadForm_sending') : t(locale, 'leadForm_submit')}
      </button>
      {status === 'error' && <p className="text-red-bright text-sm">{message}</p>}
    </form>
  );
}
