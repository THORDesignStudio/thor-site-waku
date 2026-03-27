'use client';

import { Link } from 'waku';
import { useState, useEffect } from 'react';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-20 py-6 px-fluid-6"
      id="header"
    >
      <nav
        className={`
          flex flex-col bg-night/80 hover:bg-night/97 transition-all
          rounded-4xl p-2 shadow-lg max-w-6xl w-full mx-auto border-2 border-white/60
          backface-visible will-change-scroll
          ${isOpen ? 'max-sm:rounded-3xl max-sm:bg-night/97' : ''}
        `}
        style={{
          transitionDuration: 'var(--spring-bounce-duration)',
          transitionTimingFunction: 'var(--spring-bounce)',
        }}
        id="menu"
      >
        <div className="flex items-center justify-between w-full">
          <Link
            to="/"
            className="flex items-center pl-6"
            onClick={handleLinkClick}
          >
            <img
              src="/images/THOR_logo_WHITE.svg"
              alt="THOR Studio"
              className="h-6 md:h-7 w-auto"
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden sm:flex items-center gap-6 lg:gap-8 pl-8">
            <Link
              to="/about"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/case-studies"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              Case Studies
            </Link>
            <Link
              to="/contact"
              className="px-6 md:px-8 py-3 md:py-4 bg-pink text-white text-sm font-extrabold rounded-full transition-colors shadow-lg whitespace-nowrap uppercase"
            >
              Work With Us
            </Link>
          </div>

          {/* Hamburger button - mobile only */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden flex items-center justify-center w-12 h-12 mr-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <span className="relative w-6 h-5 flex flex-col justify-between">
              <span
                className={`absolute left-0 right-0 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${
                  isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
                style={{ transitionTimingFunction: 'var(--ease-out-back)' }}
              />
              <span
                className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isOpen ? 'opacity-0 scale-x-0' : ''
                }`}
                style={{ transitionTimingFunction: 'var(--ease-out-back)' }}
              />
              <span
                className={`absolute left-0 right-0 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${
                  isOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0'
                }`}
                style={{ transitionTimingFunction: 'var(--ease-out-back)' }}
              />
            </span>
          </button>
        </div>

        {/* Mobile navigation */}
        <div
          className={`
            sm:hidden overflow-hidden transition-all
            ${isOpen ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}
          `}
          style={{
            transitionDuration: 'var(--spring-bounce-duration)',
            transitionTimingFunction: 'var(--spring-bounce)',
          }}
        >
          <div className="flex flex-col items-center gap-4 pb-4">
            <Link
              to="/capabilities"
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
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className="px-8 py-4 bg-pink text-white text-sm font-extrabold rounded-full transition-colors shadow-lg whitespace-nowrap uppercase mt-2"
            >
              Work With Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
