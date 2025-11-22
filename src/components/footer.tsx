'use client';

import { WebGLShader } from './WebGLShader/WebGLShader';

export const Footer = () => {
  return (
    <>
      {/* Chat Button - Fixed Position */}
      <footer className="p-6 lg:fixed lg:bottom-0 lg:right-0 z-50">
        <div className="w-[50px] h-[50px] bg-night hover:bg-night/60 backdrop-blur-[5px] rounded-full p-[10px] flex items-center justify-center border-1 border-white hover:border-white/50 transition-all duration-300 ease-in-out hover:cursor-pointer hover:[box-shadow:0_0_30px_rgba(250,245,242,0.6),0_0_20px_rgba(250,245,242,0.5),0_0_10px_rgba(250,245,242,0.4)]">
          <img src="/images/chat.svg" alt="Chat" className="w-full h-full" />
        </div>
      </footer>

      {/* Footer Container */}
      <div className="relative w-full overflow-hidden h-[600px]">
        <div className="absolute inset-0 w-full h-full z-0">
          <WebGLShader
            minWidth={600}
            height={600}
            maintainHeight={0.8}
            seed={30005}
          />
        </div>

        <div className="relative z-10 container flex flex-col justify-between w-full h-full xl:flex-row gap-x-vw-12 gap-y-vw-12 lg:gap-y-vw-20 paragraph-md p-16 text-white max-w-8xl mx-auto">
          <div className="flex flex-col w-full gap-y-[2em] flex-1 justify-between">
            <img
              src="/images/THOR_logo_WHITE.svg"
              alt="THOR Digital and THOR Studio"
              className="max-w-[500px]"
            />
            <ul className="text-fluid-sm flex flex-col">
              <li>THOR Digital LLC • 2025</li>
              <li>
                The site is{' '}
                <a
                  href="https://github.com/THORDesignStudio/thor-site-waku"
                  className="underline"
                >
                  open source
                </a>{' '}
                and waiting for your contributions.
              </li>
            </ul>
          </div>
          <div className="xl:max-w-[max(700px,37vw)] grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-[2.33em] gap-[1.25em] font-sans md:gap-y-[2em]">
            {/* What */}
            <div>
              <span className="text-fluid-sm font-sans font-extrabold">
                What
              </span>
              <ul className="paragraph-md space-y-vw-2 mt-2">
                <li>
                  <a
                    className="inline-flex items-center whitespace-nowrap pointer-events-auto transition-all duration-300 ease-in-out hover:[text-shadow:0_0_30px_rgba(250,245,242,0.6),0_0_20px_rgba(250,245,242,0.5),0_0_10px_rgba(250,245,242,0.4)]"
                    id="footer-nav-home-link"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center whitespace-nowrap pointer-events-auto transition-all duration-300 ease-in-out hover:[text-shadow:0_0_30px_rgba(250,245,242,0.6),0_0_20px_rgba(250,245,242,0.5),0_0_10px_rgba(250,245,242,0.4)]"
                    id="footer-nav-about-link"
                    href="/about"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center whitespace-nowrap pointer-events-auto transition-all duration-300 ease-in-out hover:[text-shadow:0_0_30px_rgba(250,245,242,0.6),0_0_20px_rgba(250,245,242,0.5),0_0_10px_rgba(250,245,242,0.4)]"
                    id="footer-nav-capabilities-link"
                    href="/capabilities"
                  >
                    Capabilities
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center whitespace-nowrap pointer-events-auto transition-all duration-300 ease-in-out hover:[text-shadow:0_0_30px_rgba(250,245,242,0.6),0_0_20px_rgba(250,245,242,0.5),0_0_10px_rgba(250,245,242,0.4)]"
                    id="footer-nav-featured-work-link"
                    href="/featured-work"
                  >
                    Featured Work
                  </a>
                </li>
              </ul>
            </div>
            {/* How */}
            <div>
              <span className="text-fluid-sm font-sans font-extrabold">
                How
              </span>
              <ul className="paragraph-md space-y-vw-2 mt-2">
                <li>
                  <a
                    className="inline-flex items-center whitespace-nowrap pointer-events-auto transition-all duration-300 ease-in-out hover:[text-shadow:0_0_30px_rgba(250,245,242,0.6),0_0_20px_rgba(250,245,242,0.5),0_0_10px_rgba(250,245,242,0.4)]"
                    id="footer-nav-discovery-link"
                    href="/writing/discovery"
                  >
                    Discovery
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center whitespace-nowrap pointer-events-auto transition-all duration-300 ease-in-out hover:[text-shadow:0_0_30px_rgba(250,245,242,0.6),0_0_20px_rgba(250,245,242,0.5),0_0_10px_rgba(250,245,242,0.4)]"
                    id="footer-nav-architecture-link"
                    href="/writing/architecture"
                  >
                    Architecture
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center whitespace-nowrap pointer-events-auto transition-all duration-300 ease-in-out hover:[text-shadow:0_0_30px_rgba(250,245,242,0.6),0_0_20px_rgba(250,245,242,0.5),0_0_10px_rgba(250,245,242,0.4)]"
                    id="footer-nav-design-link"
                    href="/writing/design"
                  >
                    Design
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center whitespace-nowrap pointer-events-auto transition-all duration-300 ease-in-out hover:[text-shadow:0_0_30px_rgba(250,245,242,0.6),0_0_20px_rgba(250,245,242,0.5),0_0_10px_rgba(250,245,242,0.4)]"
                    id="footer-nav-development-link"
                    href="/writing/development"
                  >
                    Development
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center whitespace-nowrap pointer-events-auto transition-all duration-300 ease-in-out hover:[text-shadow:0_0_30px_rgba(250,245,242,0.6),0_0_20px_rgba(250,245,242,0.5),0_0_10px_rgba(250,245,242,0.4)]"
                    id="footer-nav-project-management-link"
                    href="/writing/project-management"
                  >
                    Project Management
                  </a>
                </li>
              </ul>
            </div>
            {/* Where */}
            <div>
              <span className="text-fluid-sm font-sans font-extrabold">
                Where
              </span>
              <ul className="paragraph-md space-y-vw-2 mt-2">
                <li>
                  <a
                    className="inline-flex items-center whitespace-nowrap pointer-events-auto transition-all duration-300 ease-in-out hover:[text-shadow:0_0_30px_rgba(250,245,242,0.6),0_0_20px_rgba(250,245,242,0.5),0_0_10px_rgba(250,245,242,0.4)]"
                    id="footer-nav-associations-link"
                    href="/verticals/associations"
                  >
                    Associations
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center whitespace-nowrap pointer-events-auto transition-all duration-300 ease-in-out hover:[text-shadow:0_0_30px_rgba(250,245,242,0.6),0_0_20px_rgba(250,245,242,0.5),0_0_10px_rgba(250,245,242,0.4)]"
                    id="footer-nav-engineering-link"
                    href="/verticals/engineering"
                  >
                    Engineering
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center whitespace-nowrap pointer-events-auto transition-all duration-300 ease-in-out hover:[text-shadow:0_0_30px_rgba(250,245,242,0.6),0_0_20px_rgba(250,245,242,0.5),0_0_10px_rgba(250,245,242,0.4)]"
                    id="footer-nav-outdoor-link"
                    href="/verticals/outdoor"
                  >
                    Outdoor
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
