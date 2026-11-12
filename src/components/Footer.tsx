'use client';

import { useState, useEffect } from 'react';
import { WebGLShader } from './WebGLShader/WebGLShader';
import { footerMenu } from '../data/menus';

const linkClassName =
  'inline-block pointer-events-auto rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-all duration-300 ease-in-out hover:[text-shadow:0_0_30px_rgba(250,245,242,0.6),0_0_20px_rgba(250,245,242,0.5),0_0_10px_rgba(250,245,242,0.4)]';

export const Footer = () => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS devices
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(isIOSDevice);
  }, []);

  return (
    <footer className="relative w-full overflow-hidden min-h-[40vh]">
      <div className="absolute inset-0 w-full h-full z-0">
        <WebGLShader minWidth={320} responsiveHeight={true} seed={30005} />
      </div>

      {/* iOS gradient overlays */}
      {isIOS && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-[30%] z-[5] pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, #18133e 0%, transparent 100%)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[30%] z-[5] pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, #18133e 0%, transparent 100%)',
            }}
          />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-[var(--layout-page)] px-fluid-6 pt-fluid-6 pb-fluid-6 font-sans text-white">
        <div className="grid items-start gap-fluid-10 xl:grid-cols-[minmax(220px,0.95fr)_2.6fr]">
          <div>
            <a
              href="/"
              aria-label="THOR home"
              className={`${linkClassName} block w-full max-w-[360px]`}
            >
              <img
                src="/images/THOR_logo_WHITE.svg"
                alt="THOR"
                className="block w-full h-auto"
              />
            </a>
            <p className="mt-7 text-[clamp(1rem,1.3vw,1.25rem)] font-extrabold uppercase leading-[1.6] tracking-[0.12em]">
              Design, development
              <br />
              and branding.
              <br />
              Austin, TX.
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href="https://www.instagram.com/thor_design_studio/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="THOR on Instagram"
                className="flex size-12 items-center justify-center rounded-full border-2 border-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/thor-design-studio-inc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="THOR on LinkedIn"
                className="flex size-12 items-center justify-center rounded-full border-2 border-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.06c.53-1 1.84-2.07 3.78-2.07 4.04 0 4.78 2.66 4.78 6.12v5.88h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75v5.29h-4V9.75Z" />
                </svg>
              </a>
            </div>
          </div>
          <nav
            aria-label="Footer"
            className="grid gap-8 sm:grid-cols-[0.8fr_1.25fr_1.15fr] lg:gap-10"
          >
            {footerMenu.sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-[clamp(0.8125rem,1.1vw,1rem)] font-extrabold uppercase leading-normal tracking-[0.12em]">
                  {section.url ? (
                    <a href={section.url} className={linkClassName}>
                      {section.title}
                    </a>
                  ) : (
                    section.title
                  )}
                </h2>
                <ul className="mt-4 space-y-3 text-[clamp(1rem,1.3vw,1.25rem)] leading-[1.5]">
                  {section.links.map((link) => (
                    <li key={link.url}>
                      <a
                        className={linkClassName}
                        id={`footer-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}-link`}
                        href={link.url}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-fluid-12 flex flex-col gap-3 border-t border-white/30 pt-fluid-6 text-[clamp(0.875rem,1.1vw,1rem)] sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <p className="shrink-0">
            THOR Digital LLC · {new Date().getFullYear()}
          </p>
          <p className="sm:text-right">
            The site is{' '}
            <a
              href="https://github.com/THORDesignStudio/thor-site-waku"
              className={`${linkClassName} underline underline-offset-2`}
            >
              open source
            </a>{' '}
            and waiting for your contributions.
          </p>
        </div>
      </div>
    </footer>
  );
};
