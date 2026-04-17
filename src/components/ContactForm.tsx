'use client';

import { RefObject } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  isVisible: boolean;
  formData: FormData;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  turnstileToken: string | null;
  /** When null, Turnstile mounts on the other breakpoint’s form only. */
  turnstileContainerRef: RefObject<HTMLDivElement | null> | null;
  idPrefix?: string;
  variant: 'desktop' | 'mobile';
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const variantStyles = {
  desktop: {
    container: 'hidden sm:block',
    content: 'px-4 sm:px-8 sm:pb-8 pb-4 transition-all duration-300 ease-out',
    title: 'text-fluid-2xl sm:text-fluid-3xl',
    description: 'text-fluid-lg sm:text-fluid-xl mt-2 sm:mt-fluid-2',
    form: 'mt-6 sm:mt-fluid-4 space-y-4 sm:space-y-fluid-4',
    buttonDisabled: 'disabled:opacity-80',
  },
  mobile: {
    container: 'sm:hidden',
    content: 'px-4 pb-4',
    title: 'text-fluid-2xl',
    description: 'text-fluid-lg mt-2',
    form: 'mt-6 space-y-4',
    buttonDisabled: 'disabled:opacity-50',
  },
};

export const ContactForm = ({
  isVisible,
  formData,
  isSubmitting,
  submitStatus,
  turnstileToken,
  turnstileContainerRef,
  idPrefix = 'contact',
  variant,
  onInputChange,
  onSubmit,
}: ContactFormProps) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={`
        ${styles.container} overflow-hidden transition-all
        ${isVisible ? 'max-h-[2000px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}
      `}
      style={{
        transitionDuration: 'var(--spring-bounce-duration)',
        transitionTimingFunction: 'var(--spring-bounce)',
      }}
    >
      <div
        className={`
          ${styles.content}
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
        style={{
          transitionDelay: isVisible ? '150ms' : '50ms',
        }}
      >
        <h1 className={`block font-sans font-extrabold ${styles.title} text-cream tracking-tight`}>
          Work with us
        </h1>

        <p className={`font-sans font-light ${styles.description} text-cream leading-normal`}>
          Contact John and Colby to talk about your new project.
        </p>

        <form onSubmit={onSubmit} className={`${styles.form} max-w-xl`}>
          <div>
            <label
              htmlFor={`${idPrefix}-name`}
              className="block font-sans text-sm text-cream mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id={`${idPrefix}-name`}
              name="name"
              value={formData.name}
              onChange={onInputChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream/60 transition-colors text-base"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor={`${idPrefix}-email`}
              className="block font-sans text-sm text-cream mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id={`${idPrefix}-email`}
              name="email"
              value={formData.email}
              onChange={onInputChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream/60 transition-colors text-base"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor={`${idPrefix}-message`}
              className="block font-sans text-sm text-cream mb-2"
            >
              Message
            </label>
            <textarea
              id={`${idPrefix}-message`}
              name="message"
              value={formData.message}
              onChange={onInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream/60 transition-colors resize-none text-base"
              placeholder="Tell us about your project..."
            />
          </div>

          <div>
            <span className="block font-sans text-sm text-cream mb-2">
              Security check
            </span>
            <div
              className={`
                rounded-lg border border-white/30 bg-white/[0.07] px-3 py-3
                shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
                ${isVisible ? '' : 'opacity-0'}
              `}
            >
              <div
                ref={turnstileContainerRef ?? undefined}
                className={`flex w-full items-center justify-center sm:justify-start ${isVisible ? 'min-h-[68px]' : 'min-h-0 overflow-hidden'}`}
              />
            </div>
          </div>

          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {submitStatus === 'success' && 'Message sent successfully. We will be in touch soon.'}
            {submitStatus === 'error' && 'Error sending message. Please try again.'}
          </div>

          {submitStatus === 'success' && (
            <div className="p-4 bg-green-500/20 border border-green-500/40 rounded-lg text-cream text-center text-sm" role="status">
              Thank you! We&apos;ll be in touch soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-lg text-cream text-center text-sm" role="alert">
              Something went wrong. Please try again.
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !turnstileToken}
            className={`px-8 py-4 bg-pink text-white font-extrabold rounded-full transition-all duration-300 shadow-lg uppercase tracking-wide hover:bg-pink-light disabled:cursor-not-allowed text-sm ${styles.buttonDisabled}`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};
