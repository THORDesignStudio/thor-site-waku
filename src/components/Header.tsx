'use client';

import { Link } from 'waku';
import { useState, useRef, useCallback } from 'react';
import { useAtom } from 'jotai';
import { isContactModalOpenAtom } from '../atoms/contactAtoms';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useTurnstile } from '../hooks/useTurnstile';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useAtom(isContactModalOpenAtom);

  // Form state
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
  useLockBodyScroll(isContactOpen);
  useEscapeKey(() => setIsContactOpen(false), isContactOpen);
  useTurnstile({
    isActive: isContactOpen,
    containerRef: turnstileContainerRef,
    onTokenChange: setTurnstileToken,
  });

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openContactForm = () => {
    setIsContactOpen(true);
    setIsMenuOpen(false);
  };

  const closeContactForm = () => {
    setIsContactOpen(false);
    // Reset form after a delay to let animation complete
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('idle');
      setTurnstileToken(null);
    }, 600);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      alert('Please complete the security check.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/contact', {
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
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 py-6 px-fluid-6"
        id="header"
      >
        <nav
          className={`
            flex flex-col bg-night/80 hover:bg-night/97 transition-all
            rounded-4xl p-2 shadow-lg max-w-6xl w-full mx-auto border-2 border-white/60
            backface-visible will-change-scroll
            ${isMenuOpen ? 'max-sm:rounded-3xl max-sm:bg-night/97' : ''}
            ${isContactOpen ? 'bg-night/97' : ''}
          `}
          style={{
            transitionDuration: 'var(--spring-bounce-duration)',
            transitionTimingFunction: 'var(--spring-bounce)',
          }}
          id="menu"
        >
          {/* Nav Container */}
          <div
            className="flex items-center justify-between w-full relative"
            id="nav-container"
          >
            <Link
              to="/"
              className="flex items-center pl-6 transition-all duration-300"
              onClick={() => {
                if (isContactOpen) {
                  closeContactForm();
                }
                handleLinkClick();
              }}
            >
              <img
                src="/images/THOR_logo_WHITE.svg"
                alt="THOR Studio"
                className="h-6 md:h-7 w-auto"
              />
            </Link>

            {/* Desktop navigation - hidden when contact form open */}
            <div
              id="desktop-nav"
              className={`
                hidden sm:flex items-center gap-6 lg:gap-8 pl-8
                transition-all duration-300 ease-out
                ${isContactOpen ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}
              `}
            >
              <Link
                to="/about"
                onClick={handleLinkClick}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/case-studies"
                onClick={handleLinkClick}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                Case Studies
              </Link>
              <button
                onClick={openContactForm}
                className="px-6 md:px-8 py-3 md:py-4 bg-pink text-white text-sm font-extrabold rounded-full transition-colors shadow-lg whitespace-nowrap uppercase cursor-pointer"
              >
                Work With Us
              </button>
            </div>

            {/* Close button - absolute when closed, relative when open */}
            <button
              onClick={closeContactForm}
              className={`
                flex items-center justify-center rounded-full
                hover:bg-white/10 transition-all duration-300 ease-out overflow-hidden
                ${isContactOpen
                  ? 'relative opacity-100 pointer-events-auto w-12 h-12 mr-2'
                  : 'absolute opacity-0 pointer-events-none w-0 h-0'}
              `}
              aria-label="Close contact form"
              id="close-contact-form-button"
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

            {/* Hamburger button - mobile only, hidden when contact form open */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`
                sm:hidden flex items-center justify-center w-12 h-12 mr-2 rounded-full
                hover:bg-white/10 transition-colors
                ${isContactOpen ? 'hidden' : ''}
              `}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <span className="relative w-6 h-5 flex flex-col justify-between">
                <span
                  className={`absolute left-0 right-0 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${
                    isMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                  }`}
                  style={{ transitionTimingFunction: 'var(--ease-out-back)' }}
                />
                <span
                  className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-white rounded-full transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 scale-x-0' : ''
                  }`}
                  style={{ transitionTimingFunction: 'var(--ease-out-back)' }}
                />
                <span
                  className={`absolute left-0 right-0 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${
                    isMenuOpen
                      ? 'bottom-1/2 translate-y-1/2 -rotate-45'
                      : 'bottom-0'
                  }`}
                  style={{ transitionTimingFunction: 'var(--ease-out-back)' }}
                />
              </span>
            </button>
          </div>

          {/* Contact Form - Unified for Desktop and Mobile */}
          <div
            className={`
              overflow-hidden transition-all
              ${isContactOpen ? 'max-h-[600px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}
            `}
            style={{
              transitionDuration: 'var(--spring-bounce-duration)',
              transitionTimingFunction: 'var(--spring-bounce)',
            }}
          >
            <div
              className={`
                px-4 sm:px-8 pb-8 transition-all duration-300 ease-out
                ${isContactOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
              style={{ transitionDelay: isContactOpen ? '150ms' : '0ms' }}
            >
              <h1 className="block font-sans font-extrabold text-fluid-2xl sm:text-fluid-3xl text-cream tracking-tight">
                Work with us
              </h1>

              <p className="font-sans font-light text-fluid-lg sm:text-fluid-xl text-cream mt-2 sm:mt-fluid-2 leading-normal">
                Contact John and Colby to talk about your new project.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 sm:mt-fluid-4 space-y-4 sm:space-y-fluid-4 max-w-xl">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-sans text-sm text-cream mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
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
                    htmlFor="contact-email"
                    className="block font-sans text-sm text-cream mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
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
                    htmlFor="contact-message"
                    className="block font-sans text-sm text-cream mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
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

          {/* Mobile navigation menu - hidden when contact form is open */}
          <div
            className={`
              sm:hidden overflow-hidden transition-all
              ${isMenuOpen && !isContactOpen ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}
            `}
            style={{
              transitionDuration: 'var(--spring-bounce-duration)',
              transitionTimingFunction: 'var(--spring-bounce)',
            }}
          >
            <div className="flex flex-col items-center gap-4 pb-4">
              <Link
                to="/about"
                onClick={handleLinkClick}
                className="text-base font-medium text-white/90 hover:text-white transition-colors py-2"
              >
                About Us
              </Link>
              <Link
                to="/case-studies"
                onClick={handleLinkClick}
                className="text-base font-medium text-white/90 hover:text-white transition-colors py-2"
              >
                Case Studies
              </Link>
              <button
                onClick={openContactForm}
                className="px-8 py-4 bg-pink text-white text-sm font-extrabold rounded-full transition-colors shadow-lg whitespace-nowrap uppercase mt-2 cursor-pointer"
              >
                Work With Us
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
