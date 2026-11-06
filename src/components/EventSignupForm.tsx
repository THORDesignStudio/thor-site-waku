'use client';

import { ChangeEvent, FormEvent, useRef, useState } from 'react';

import { useTurnstile } from '../hooks/useTurnstile';

type FormData = {
  fullName: string;
  role: string;
  email: string;
};

type SubmitStatus = 'idle' | 'success' | 'error';

const initialFormData: FormData = {
  fullName: '',
  role: '',
  email: '',
};

const inputClasses =
  'h-[76px] w-full rounded-2xl border border-white bg-[#392f56] px-5 font-sans text-fluid-xl text-white outline-none transition-colors placeholder:text-white/60 focus:border-[#f7c574] focus:ring-2 focus:ring-[#f7c574]/30';

export const EventSignupForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const { reset: resetTurnstile } = useTurnstile({
    isActive: submitStatus !== 'success',
    containerRef: turnstileContainerRef,
    onTokenChange: setTurnstileToken,
    action: 'event_signup',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (submitStatus !== 'idle') setSubmitStatus('idle');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!turnstileToken || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/event-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      if (!response.ok) throw new Error('Event signup failed');

      setFormData(initialFormData);
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      resetTurnstile();
      setIsSubmitting(false);
    }
  };

  return (
    <form className="mt-fluid-5 max-w-[736px]" onSubmit={handleSubmit}>
      <div
        inert={submitStatus === 'success'}
        aria-hidden={submitStatus === 'success'}
        className={`overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
          submitStatus === 'success'
            ? 'max-h-0 translate-y-2 opacity-0'
            : 'max-h-[600px] translate-y-0 opacity-100'
        }`}
      >
        <div className="space-y-[18px]">
          <div>
            <label className="sr-only" htmlFor="event-full-name">
              Full Name
            </label>
            <input
              className={inputClasses}
              id="event-full-name"
              name="fullName"
              type="text"
              autoComplete="name"
              maxLength={100}
              placeholder="Full Name"
              required
              disabled={isSubmitting}
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="event-role">
              Role
            </label>
            <input
              className={inputClasses}
              id="event-role"
              name="role"
              type="text"
              autoComplete="organization-title"
              maxLength={100}
              placeholder="Role"
              required
              disabled={isSubmitting}
              value={formData.role}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="event-email">
              Email
            </label>
            <input
              className={inputClasses}
              id="event-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              placeholder="your@email.com"
              required
              disabled={isSubmitting}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div
          className="mt-5 max-w-full overflow-hidden"
          aria-label="Security check"
        >
          <div
            ref={turnstileContainerRef}
            className="flex min-h-[68px] max-w-full items-center justify-start"
          />
        </div>

        <div
          className="mt-4 min-h-6 font-sans text-fluid-base text-[#f7c574]"
          aria-live="polite"
          aria-atomic="true"
        >
          {submitStatus === 'error' ? (
            <p role="alert">Something went wrong. Please try again.</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !turnstileToken}
          className="mt-5 min-h-[65px] min-w-[min(289px,100%)] cursor-pointer rounded-full bg-magenta px-8 font-sans text-xl font-extrabold uppercase tracking-[-0.02em] text-white transition-colors hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting…' : 'Submit Your Info'}
        </button>
      </div>

      <div
        id="event-signup-status"
        className={`overflow-hidden font-sans text-fluid-xl leading-relaxed text-white transition-[max-height,margin,opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
          submitStatus === 'success'
            ? 'mt-2 max-h-24 translate-y-0 opacity-100 delay-300'
            : 'mt-0 max-h-0 -translate-y-2 opacity-0'
        }`}
        aria-live="polite"
        aria-atomic="true"
      >
        {submitStatus === 'success' ? (
          <p role="status">
            Thank you! We&apos;ll be in touch with event details.
          </p>
        ) : null}
      </div>
    </form>
  );
};
