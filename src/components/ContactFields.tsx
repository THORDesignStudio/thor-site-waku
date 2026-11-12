'use client';

import { useEffect, useRef, type ChangeEvent, type RefObject } from 'react';
import type { ContactFormData } from '../hooks/useContactForm';

export interface ContactFieldsProps {
  formData: ContactFormData;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  turnstileToken: string | null;
  turnstileContainerRef: RefObject<HTMLDivElement | null> | null;
  idPrefix: string;
  onInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  appearance?: 'light' | 'dark';
  disabled?: boolean;
}

export function ContactFields({
  formData,
  isSubmitting,
  submitStatus,
  turnstileToken,
  turnstileContainerRef,
  idPrefix,
  onInputChange,
  appearance = 'dark',
  disabled = false,
}: ContactFieldsProps) {
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (submitStatus !== 'idle' && resultRef.current?.getClientRects().length)
      resultRef.current.focus({ preventScroll: true });
  }, [submitStatus]);
  const inputClass = `w-full rounded-lg border px-4 py-3 text-base outline-none transition-colors focus:ring-2 focus:ring-magenta/30 disabled:opacity-70 ${appearance === 'light' ? 'border-divider bg-white text-navy placeholder:text-ink/50 focus:border-magenta' : 'border-white/30 bg-white/10 text-white placeholder:text-white/50 focus:border-white/60'}`;
  return (
    <>
      <fieldset disabled={disabled || isSubmitting} className="space-y-fluid-4">
        {(['name', 'email'] as const).map((field) => (
          <div key={field}>
            <label
              htmlFor={`${idPrefix}-${field}`}
              className="mb-2 block text-sm font-semibold"
            >
              {field === 'name' ? 'Name' : 'Email'}
            </label>
            <input
              id={`${idPrefix}-${field}`}
              name={field}
              type={field === 'email' ? 'email' : 'text'}
              autoComplete={field}
              value={formData[field]}
              onChange={onInputChange}
              required
              className={inputClass}
              placeholder={field === 'name' ? 'Your name' : 'your@email.com'}
            />
          </div>
        ))}
        <div>
          <label
            htmlFor={`${idPrefix}-message`}
            className="mb-2 block text-sm font-semibold"
          >
            Message
          </label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            value={formData.message}
            onChange={onInputChange}
            required
            rows={5}
            className={`${inputClass} resize-y`}
            placeholder="Tell us about your project…"
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">Security check</p>
          <div
            className={`max-w-full overflow-hidden rounded-lg border p-3 ${appearance === 'light' ? 'border-divider bg-navy' : 'border-white/30 bg-white/[0.07]'}`}
          >
            <div
              ref={turnstileContainerRef ?? undefined}
              className="flex min-h-[68px] w-full max-w-full items-center justify-center sm:justify-start"
            />
          </div>
        </div>
      </fieldset>
      {submitStatus !== 'idle' && (
        <div
          ref={resultRef}
          id={`${idPrefix}-result`}
          tabIndex={-1}
          role={submitStatus === 'success' ? 'status' : 'alert'}
          className={`rounded-lg border p-4 text-sm focus:outline-2 focus:outline-offset-2 focus:outline-magenta ${submitStatus === 'success' ? 'border-green-500/40 bg-green-500/15' : 'border-red-500/40 bg-red-500/15'}`}
        >
          {submitStatus === 'success'
            ? 'Thank you! We’ll be in touch soon.'
            : 'Something went wrong. Please complete the security check and try again.'}
        </div>
      )}
      <button
        type="submit"
        disabled={disabled || isSubmitting || !turnstileToken}
        className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>
    </>
  );
}
