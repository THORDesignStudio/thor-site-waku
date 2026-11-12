'use client';

import { RefObject } from 'react';
import { ContactFields } from './ContactFields';
import type { ContactFormData } from '../hooks/useContactForm';

interface ContactFormProps {
  isVisible: boolean;
  formData: ContactFormData;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  turnstileToken: string | null;
  /** When null, Turnstile mounts on the other breakpoint’s form only. */
  turnstileContainerRef: RefObject<HTMLDivElement | null> | null;
  idPrefix?: string;
  variant: 'desktop' | 'mobile';
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const variantStyles = {
  desktop: {
    container: 'hidden sm:block',
    content: 'px-4 sm:px-8 sm:pb-8 pb-4 transition-all duration-300 ease-out',
    scrollContainer:
      'max-h-[calc(100vh-200px)] overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    title: 'text-fluid-2xl sm:text-fluid-3xl',
    description: 'text-fluid-lg sm:text-fluid-xl mt-2 sm:mt-fluid-2',
    form: 'mt-6 sm:mt-fluid-4 space-y-4 sm:space-y-fluid-4',
    buttonDisabled: 'disabled:opacity-80',
  },
  mobile: {
    container: 'sm:hidden',
    content: 'px-4 pb-4',
    scrollContainer:
      'max-h-[calc(100vh-200px)] overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
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
      inert={!isVisible}
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
        {/* Scrollable inner container.
            `data-lenis-prevent` opts this region out of the Lenis root smooth-scroll
            hijack so wheel/touch events scroll the form natively instead of being
            swallowed by Lenis and redirected to the (locked) window. */}
        <div
          data-lenis-prevent
          className={isVisible ? styles.scrollContainer : 'overflow-hidden'}
        >
          <h2
            className={`block font-sans font-extrabold ${styles.title} text-white tracking-tight`}
          >
            Work with us
          </h2>

          <p
            className={`font-sans font-light ${styles.description} text-white leading-normal`}
          >
            Contact John and Colby to talk about your new project.
          </p>

          <form onSubmit={onSubmit} className={`${styles.form} max-w-xl`}>
            <ContactFields
              formData={formData}
              isSubmitting={isSubmitting}
              submitStatus={submitStatus}
              turnstileToken={turnstileToken}
              turnstileContainerRef={turnstileContainerRef}
              idPrefix={idPrefix}
              onInputChange={onInputChange}
              disabled={!isVisible}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
