'use client';

import { useState, useRef, useCallback } from 'react';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useTurnstile } from '../hooks/useTurnstile';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  variant: 'desktop' | 'mobile';
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm = ({ isOpen, onClose, variant }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);

  // Use extracted hooks
  useLockBodyScroll(variant === 'mobile' && isOpen);
  useEscapeKey(onClose, isOpen);
  useTurnstile({
    isActive: isOpen,
    containerRef: turnstileContainerRef,
    onTokenChange: setTurnstileToken,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = useCallback(() => {
    setFormData({ name: '', email: '', message: '' });
    setSubmitStatus('idle');
    setTurnstileToken(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      alert('Please complete the security check.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        resetForm();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDesktop = variant === 'desktop';

  // Desktop inline form
  if (isDesktop) {
    return (
      <div
        className={`
          hidden sm:block overflow-hidden transition-all
          ${isOpen ? 'max-h-[600px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}
        `}
        style={{
          transitionDuration: 'var(--spring-bounce-duration)',
          transitionTimingFunction: 'var(--spring-bounce)',
        }}
      >
        <div
          className={`
            px-8 pb-8 transition-all duration-300 ease-out
            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{ transitionDelay: isOpen ? '150ms' : '0ms' }}
        >
          <h1 className="block font-sans font-extrabold text-fluid-3xl text-cream tracking-tight">
            Work with us
          </h1>

          <p className="font-sans font-light text-fluid-xl text-cream mt-fluid-2 leading-normal">
            Contact John and Colby to talk about your new project.
          </p>

          <form onSubmit={handleSubmit} className="mt-fluid-4 space-y-fluid-4 max-w-xl">
            <div>
              <label
                htmlFor="header-name"
                className="block font-sans text-sm text-cream mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="header-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream/60 transition-colors text-base"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="header-email"
                className="block font-sans text-sm text-cream mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="header-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream/60 transition-colors text-base"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="header-message"
                className="block font-sans text-sm text-cream mb-2"
              >
                Message
              </label>
              <textarea
                id="header-message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream/60 transition-colors resize-none text-base"
                placeholder="Tell us about your project..."
              />
            </div>

            <div ref={turnstileContainerRef} className="min-h-[65px]" />

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-500/20 border border-green-500/40 rounded-lg text-cream text-center text-sm">
                Thank you! We&apos;ll be in touch soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-lg text-cream text-center text-sm">
                Something went wrong. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !turnstileToken}
              className="px-8 py-4 bg-pink text-white font-extrabold rounded-full transition-all duration-300 shadow-lg uppercase tracking-wide hover:bg-pink-light disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Mobile modal form
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 sm:hidden bg-night/95 flex items-start justify-center pt-24 px-4 pb-4">
      <div className="w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300"
          aria-label="Close contact form"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-cream"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="mt-8">
          <h1 className="block font-sans font-extrabold text-fluid-2xl text-cream tracking-tight">
            Work with us
          </h1>
          <p className="font-sans font-light text-fluid-lg text-cream mt-2 leading-normal">
            Contact John and Colby to talk about your new project.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="mobile-name" className="block font-sans text-sm text-cream mb-2">
                Name
              </label>
              <input
                type="text"
                id="mobile-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream/60"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="mobile-email" className="block font-sans text-sm text-cream mb-2">
                Email
              </label>
              <input
                type="email"
                id="mobile-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream/60"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="mobile-message" className="block font-sans text-sm text-cream mb-2">
                Message
              </label>
              <textarea
                id="mobile-message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream/60 resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <div ref={turnstileContainerRef} className="min-h-[65px]" />

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-500/20 border border-green-500/40 rounded-lg text-cream text-center text-sm">
                Thank you! We&apos;ll be in touch soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-lg text-cream text-center text-sm">
                Something went wrong. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !turnstileToken}
              className="w-full px-8 py-4 bg-pink text-white font-extrabold rounded-full transition-all duration-300 shadow-lg uppercase tracking-wide hover:bg-pink-light disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
