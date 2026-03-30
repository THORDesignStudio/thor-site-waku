'use client';

import { useState, useCallback, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { capabilities, type Capability } from '../data/capabilities';
import { CapabilityDrawer } from './CapabilityDrawer';
import { useLenisScrollTrigger } from '../hooks/useLenisScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CapabilitiesHomePageSection() {
  const [activeCapability, setActiveCapability] = useState<Capability | null>(
    null
  );
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const capabilityRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Use shared hook for Lenis-ScrollTrigger sync
  useLenisScrollTrigger(sectionRef);

  const handleOpenCapability = useCallback((capability: Capability) => {
    setActiveCapability(capability);
  }, []);

  const handleCloseCapability = useCallback(() => {
    setActiveCapability(null);
  }, []);

  // Set up scroll-triggered animations for each capability
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate section header (title and subtitle)
      const headerEl = headerRef.current;
      if (headerEl) {
        const sectionTitle = headerEl.querySelector('.section-title');
        const sectionSubtitle = headerEl.querySelector('.section-subtitle');

        // Set initial state with GSAP
        gsap.set(sectionTitle, { opacity: 0, y: 30 });
        gsap.set(sectionSubtitle, { opacity: 0, y: 30 });

        ScrollTrigger.create({
          trigger: headerEl,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(sectionTitle, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
            });
            gsap.to(sectionSubtitle, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.2,
              ease: 'power2.out',
            });
          },
          onLeaveBack: () => {
            gsap.to(sectionTitle, {
              opacity: 0,
              y: 30,
              duration: 0.5,
              ease: 'power2.out',
            });
            gsap.to(sectionSubtitle, {
              opacity: 0,
              y: 30,
              duration: 0.5,
              ease: 'power2.out',
            });
          },
        });
      }

      // Animate each capability row
      capabilityRefs.current.forEach((el) => {
        if (!el) return;

        const titleEl = el.querySelector('.capability-title');
        const dekEl = el.querySelector('.capability-dek');
        const arrowEl = el.querySelector('.capability-arrow');

        // Animate title from outline (transparent) to filled (cream)
        ScrollTrigger.create({
          trigger: el,
          start: 'top 40%',
          onEnter: () => {
            gsap.to(titleEl, {
              color: '#faf5f2', // cream color
              duration: 0.8,
              ease: 'power2.out',
            });
            gsap.to(arrowEl, {
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
            });
            gsap.to(dekEl, {
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
            });
          },
          onLeaveBack: () => {
            gsap.to(titleEl, {
              color: 'transparent',
              duration: 0.5,
              ease: 'power2.out',
            });
            gsap.to(arrowEl, {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.out',
            });
            gsap.to(dekEl, {
              opacity: 0.3,
              duration: 0.5,
              ease: 'power2.out',
            });
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const capabilityItems = capabilities.capabilities;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-fluid-16"
      style={{
        background:
          'linear-gradient(to bottom, var(--color-night) 0%, var(--color-night-blue) 50%, var(--color-night) 100%)',
      }}
    >
      {/* Content layer */}
      <div className="relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="w-full mx-auto px-fluid-6 mb-fluid-12">
          <h1 className="leading-none">
            <span className="section-title block font-sans font-extrabold text-fluid-8xl text-cream tracking-tight text-center">
              Capabilities
            </span>
            <p className="section-subtitle font-sans font-light text-fluid-2xl text-cream mt-fluid-2 leading-normal text-center">
              THOR Digital is a studio that offers a wide array of capabilities
              to our clients.
            </p>
          </h1>
        </div>

        {/* Capabilities List */}
        <div className="w-full max-w-[1400px] mx-auto px-fluid-6">
          {capabilityItems.map((capability, index) => (
            <button
              key={capability.slug}
              ref={(el) => {
                capabilityRefs.current[index] = el;
              }}
              onClick={() => handleOpenCapability(capability)}
              className="w-full text-left py-fluid-6 border-t border-dashed border-cream/40 first:border-t-0 group cursor-pointer"
            >
              <div className="flex items-center gap-fluid-4">
                <h3
                  className="capability-title heading-lg"
                  style={{
                    WebkitTextStroke: '1px var(--color-cream)',
                    color: 'transparent',
                  }}
                >
                  {capability.name}
                </h3>
                <button
                  type="button"
                  className="capability-arrow opacity-0 p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenCapability(capability);
                  }}
                  aria-label={`View ${capability.name} details`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              <p
                className="capability-dek body-lg text-cream mt-fluid-1"
                style={{ opacity: 0.3 }}
              >
                {capability.dek}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Capability Drawer */}
      {activeCapability && (
        <CapabilityDrawer
          capability={activeCapability}
          onClose={handleCloseCapability}
        />
      )}
    </section>
  );
}
