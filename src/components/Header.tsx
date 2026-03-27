'use client';

import { Link } from 'waku';
import { useState, useRef, useCallback } from 'react';
import { useAtom } from 'jotai';
import { isContactModalOpenAtom } from '../atoms/contactAtoms';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useTurnstile } from '../hooks/useTurnstile';
import { useDelayedState } from '../hooks/useDelayedState';
import { ContactForm } from './ContactForm';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useAtom(isContactModalOpenAtom);
  // Use delayed state for form visibility - adds 300ms delay when opening for animation
  const isFormVisible = useDelayedState(isContactOpen, 300);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);

  // Use extracted hooks - lock scroll and escape key when form is actually visible
  useLockBodyScroll(isFormVisible);
  useEscapeKey(() => closeContactForm(), isFormVisible);
  useTurnstile({
    isActive: isFormVisible,
    containerRef: turnstileContainerRef,
    onTokenChange: setTurnstileToken,
  });

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openContactForm = useCallback(() => {
    // Close mobile menu if open
    setIsMenuOpen(false);
    // Open contact form (useDelayedState handles the 300ms animation delay)
    setIsContactOpen(true);
  }, [setIsContactOpen]);

  const closeContactForm = useCallback(() => {
    // Close contact form (form immediately hides, nav fades in)
    setIsContactOpen(false);
    // Reset form after animation completes
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('idle');
      setTurnstileToken(null);
    }, 300);
  }, [setIsContactOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
            flex flex-col bg-night/97  transition-all
            rounded-4xl p-2 shadow-lg max-w-6xl w-full mx-auto border-2 border-white/60
            backface-visible will-change-scroll
            ${isMenuOpen ? 'max-sm:rounded-3xl bg-night/97' : ''}
            ${isContactOpen ? 'max-sm:rounded-3xl bg-night/97' : ''}
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
                className="px-8 py-4 bg-pink text-white text-sm font-extrabold rounded-full transition-colors shadow-lg whitespace-nowrap uppercase cursor-pointer"
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
                ${
                  isFormVisible
                    ? 'relative opacity-100 pointer-events-auto w-12 h-12 mr-2'
                    : 'absolute opacity-0 pointer-events-none w-0 h-0'
                }
              `}
              style={{
                transitionDelay: isFormVisible ? '0ms' : '15ms',
              }}
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
              onClick={() => {
                if (isContactOpen) {
                  setIsContactOpen(false);
                }
                setIsMenuOpen(!isMenuOpen);
              }}
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

          {/* Desktop Contact Form */}
          <ContactForm
            isVisible={isFormVisible}
            formData={formData}
            isSubmitting={isSubmitting}
            submitStatus={submitStatus}
            turnstileToken={turnstileToken}
            turnstileContainerRef={turnstileContainerRef}
            idPrefix="contact"
            variant="desktop"
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />

          {/* Mobile Contact Form */}
          <ContactForm
            isVisible={isFormVisible}
            formData={formData}
            isSubmitting={isSubmitting}
            submitStatus={submitStatus}
            turnstileToken={turnstileToken}
            turnstileContainerRef={turnstileContainerRef}
            idPrefix="mobile-contact"
            variant="mobile"
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />

          {/* Mobile navigation menu - standard collapse/expand behavior */}
          <div
            className={`
              sm:hidden overflow-hidden transition-all
              ${isMenuOpen ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}
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
