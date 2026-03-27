'use client';

import { Link } from 'waku';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { isContactModalOpenAtom } from '../atoms/contactAtoms';
import { ContactForm } from './ContactForm';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useAtom(isContactModalOpenAtom);

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
            className="flex items-center justify-between w-full"
            id="nav-container"
          >
            <Link
              to="/"
              className={`
                flex items-center pl-6 transition-all duration-300
                ${isContactOpen ? 'sm:pl-8' : ''}
              `}
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

            {/* Close button - always in DOM for animation, collapses when closed */}
            <button
              onClick={closeContactForm}
              className={`
                hidden sm:flex items-center justify-center rounded-full
                hover:bg-white/10 transition-all duration-300 ease-out overflow-hidden
                ${isContactOpen
                  ? 'opacity-100 pointer-events-auto w-12 h-12 mr-2'
                  : 'opacity-0 pointer-events-none w-0 h-0 mr-0'}
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

            {/* Hamburger button - mobile only */}
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

          {/* Desktop Contact Form */}
          <ContactForm
            isOpen={isContactOpen}
            onClose={closeContactForm}
            variant="desktop"
          />

          {/* Mobile navigation menu */}
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

      {/* Mobile Contact Form Modal */}
      <ContactForm
        isOpen={isContactOpen}
        onClose={closeContactForm}
        variant="mobile"
      />
    </>
  );
};
