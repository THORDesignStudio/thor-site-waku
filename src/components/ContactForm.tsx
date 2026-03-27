'use client';

import { useAtom } from 'jotai';
import { useState, useEffect, useRef, useCallback } from 'react';
import { isContactModalOpenAtom } from '../atoms/contactAtoms';

// Extend Window interface for Turnstile
declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: (errorCode: string) => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact' | 'flexible';
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string | undefined;
    };
    onloadTurnstileCallback?: () => void;
  }
}

export function ContactForm() {
  const [isOpen, setIsOpen] = useAtom(isContactModalOpenAtom);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, setIsOpen]);

  // Initialize Turnstile when modal opens
  const initTurnstile = useCallback(() => {
    if (!window.turnstile || !turnstileContainerRef.current) return;

    // Clean up existing widget if any
    if (turnstileWidgetId.current) {
      window.turnstile.remove(turnstileWidgetId.current);
    }

    const siteKey = import.meta.env.VITE_CF_TURNSTILE_SITE_KEY;
    if (!siteKey) {
      console.error('Turnstile site key not found');
      return;
    }

    turnstileWidgetId.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: siteKey,
      theme: 'dark',
      size: 'normal',
      callback: (token: string) => {
        setTurnstileToken(token);
      },
      'error-callback': () => {
        setTurnstileToken(null);
      },
      'expired-callback': () => {
        setTurnstileToken(null);
      },
    });
  }, []);

  // Load Turnstile script and initialize
  useEffect(() => {
    if (!isOpen) {
      // Cleanup when modal closes
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
      setTurnstileToken(null);
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector('script[data-turnstile]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.setAttribute('data-turnstile', 'true');
      script.onload = initTurnstile;
      document.head.appendChild(script);
    } else if (window.turnstile) {
      // Script exists and loaded
      initTurnstile();
    } else {
      // Script exists but not loaded yet, wait for it
      const checkInterval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(checkInterval);
          initTurnstile();
        }
      }, 100);

      // Cleanup interval after 10 seconds if script never loads
      setTimeout(() => clearInterval(checkInterval), 10000);
    }
  }, [isOpen, initTurnstile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      alert('Please complete the security check.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Replace with your actual API endpoint
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
        setFormData({ name: '', email: '', message: '' });
        setTurnstileToken(null);
        // Reset Turnstile
        if (turnstileWidgetId.current && window.turnstile) {
          window.turnstile.reset(turnstileWidgetId.current);
        }
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setIsOpen(false);
    setSubmitStatus('idle');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-night/80 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transitionDuration: 'var(--spring-bounce-duration)',
          transitionTimingFunction: 'var(--spring-bounce)',
        }}
      />

      {/* Modal Container */}
      <div
        className={`
          relative w-full max-w-2xl max-h-[90vh] overflow-y-auto
          bg-night/80 backdrop-blur-sm rounded-4xl p-8 sm:p-12
          border-2 border-white/60 shadow-2xl
          transition-all
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
        `}
        style={{
          transitionDuration: 'var(--spring-bounce-duration)',
          transitionTimingFunction: 'var(--spring-bounce)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300 ease-in-out hover:[box-shadow:0_0_30px_rgba(250,245,242,0.6),0_0_20px_rgba(250,245,242,0.5),0_0_10px_rgba(250,245,242,0.4)]"
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

        {/* Title */}
        <h1 className="block font-sans font-extrabold text-fluid-4xl text-cream tracking-tight pr-12">
          Work with us
        </h1>

        {/* Subtitle */}
        <p className="font-sans font-light text-fluid-2xl text-cream mt-fluid-2 leading-normal">
          Contact John and Colby to talk about your new project.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-fluid-6 space-y-fluid-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block font-sans text-fluid-base text-cream mb-fluid-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream/60 transition-colors"
              placeholder="Your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block font-sans text-fluid-base text-cream mb-fluid-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream/60 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block font-sans text-fluid-base text-cream mb-fluid-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream/60 transition-colors resize-none"
              placeholder="Tell us about your project..."
            />
          </div>

          {/* Turnstile Widget */}
          <div ref={turnstileContainerRef} className="min-h-[65px]" />

          {/* Submit Status Messages */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-500/20 border border-green-500/40 rounded-lg text-cream text-center">
              Thank you! We&apos;ll be in touch soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-lg text-cream text-center">
              Something went wrong. Please try again.
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !turnstileToken}
            className="w-full sm:w-auto px-8 py-4 bg-pink text-white font-extrabold rounded-full transition-all duration-300 shadow-lg uppercase tracking-wide hover:bg-pink-light disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
