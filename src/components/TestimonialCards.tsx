'use client';

import { useMemo, useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '../data/testimonials';
import { useLenisScrollTrigger } from '../hooks/useLenisScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pinkColors = [
  'bg-pink',
  'bg-pink-light',
  'bg-pink-flat',
  'bg-pink-dark',
] as const;

type PinkColor = (typeof pinkColors)[number];

// Deterministic hash function to assign colors based on organization name
// This ensures consistent colors between server and client, avoiding hydration mismatch
function getDeterministicColor(str: string, index: number): PinkColor {
  const combined = `${str}-${index}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  const colorIndex = Math.abs(hash) % pinkColors.length;
  return pinkColors[colorIndex]!;
}

export function TestimonialCards() {
  const displayTestimonials = useMemo(
    () =>
      testimonials.map((item, index) => ({
        key: `${item.organization}-${index}`,
        organization: item.organization,
        displayText: item.shortVersion.trim() || item.longVersion.trim(),
      })),
    []
  );

  // Assign colors deterministically based on organization name to avoid hydration mismatch
  const cardColors = useMemo(
    () =>
      displayTestimonials.map((item, index) =>
        getDeterministicColor(item.organization, index)
      ),
    [displayTestimonials]
  );

  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Use shared hook for Lenis-ScrollTrigger sync
  useLenisScrollTrigger(sectionRef);

  // Set up scroll-triggered animations for section header and background
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const sectionEl = sectionRef.current;
      const headerEl = headerRef.current;

      if (sectionEl && headerEl) {
        const sectionTitle = headerEl.querySelector('.section-title');
        const sectionSubtitle = headerEl.querySelector('.section-subtitle');

        // Set initial state
        gsap.set(sectionTitle, { opacity: 0, y: 30, color: '#18133e' }); // night
        gsap.set(sectionSubtitle, { opacity: 0, y: 30, color: '#18133e' }); // night
        gsap.set(sectionEl, { backgroundColor: '#faf5f2' }); // cream

        ScrollTrigger.create({
          trigger: headerEl,
          start: 'top 80%',
          onEnter: () => {
            // Animate header in
            gsap.to(sectionTitle, {
              opacity: 1,
              y: 0,
              color: '#faf5f2', // cream
              duration: 0.8,
              ease: 'power2.out',
            });
            gsap.to(sectionSubtitle, {
              opacity: 1,
              y: 0,
              color: '#faf5f2', // cream
              duration: 0.8,
              delay: 0.2,
              ease: 'power2.out',
            });
            // Animate background to night
            gsap.to(sectionEl, {
              backgroundColor: '#18133e', // night
              duration: 0.8,
              ease: 'power2.out',
            });
          },
          onLeaveBack: () => {
            // Animate header out
            gsap.to(sectionTitle, {
              opacity: 0,
              y: 30,
              color: '#18133e', // night
              duration: 0.5,
              ease: 'power2.out',
            });
            gsap.to(sectionSubtitle, {
              opacity: 0,
              y: 30,
              color: '#18133e', // night
              duration: 0.5,
              ease: 'power2.out',
            });
            // Animate background back to cream
            gsap.to(sectionEl, {
              backgroundColor: '#faf5f2', // cream
              duration: 0.5,
              ease: 'power2.out',
            });
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[100vh] px-fluid-6 py-fluid-12 font-sans"
    >
      <div ref={headerRef} className="mb-fluid-12">
        <h1 className="leading-none">
          <span className="section-title block font-sans font-extrabold text-fluid-8xl tracking-tight">
            Testimonials
          </span>
          <p className="section-subtitle font-sans font-light text-fluid-2xl pl-fluid-1 mt-fluid-2">
            Learn what it's like to partner with THOR.
          </p>
        </h1>
      </div>

      <div className="hidden min-h-[clamp(560px,72vh,840px)] gap-fluid-2 min-[1000px]:flex">
        {displayTestimonials.map((item, index) => {
          const isExpanded = expandedIndex === index;
          const panelId = `testimonial-desktop-panel-${index}`;
          const buttonId = `testimonial-desktop-trigger-${index}`;

          return (
            <article
              key={item.key}
              className={`relative overflow-hidden rounded-[1.1rem] border border-night/80 transition-[width] duration-[750ms] ease-[var(--ease-out-sine)] ${
                isExpanded
                  ? 'w-[65%] bg-cream/80 delay-0'
                  : 'w-[5%] bg-cream/80 delay-[225ms]'
              }`}
            >
              <div
                aria-hidden="true"
                className={`absolute inset-0 z-0 ${cardColors[index]} transition-opacity ease-[var(--ease-out-sine)] ${
                  isExpanded
                    ? 'opacity-100 duration-[390ms] delay-[750ms]'
                    : 'opacity-0 duration-[210ms] delay-0'
                }`}
              />

              <button
                id={buttonId}
                type="button"
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={() => setExpandedIndex(index)}
                className="absolute inset-0 z-20 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink"
              >
                <span className="sr-only">
                  {isExpanded
                    ? 'Expanded testimonial from '
                    : 'Expand testimonial from '}
                  {item.organization}
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!isExpanded}
                className={`absolute inset-0 z-10 flex flex-col justify-end gap-fluid-6 p-fluid-6 transition-[opacity,transform,color] ease-[var(--ease-out-sine)] ${
                  isExpanded
                    ? 'translate-x-0 opacity-100 text-cream duration-[360ms] delay-[750ms]'
                    : 'pointer-events-none translate-x-4 opacity-0 text-night duration-[270ms] delay-0'
                }`}
              >
                <p className="text-fluid-xl font-sans font-light italic leading-relaxed">
                  &ldquo;{item.displayText}&rdquo;
                </p>
                <p className="text-fluid-md font-sans font-extrabold uppercase tracking-wide">
                  {item.organization}
                </p>
              </div>

              <div
                aria-hidden="true"
                className={`absolute inset-0 z-10 flex items-end justify-center px-fluid-2 pb-fluid-5 transition-opacity duration-[375ms] ease-[var(--ease-out-sine)] ${
                  isExpanded
                    ? 'pointer-events-none opacity-0 delay-0'
                    : 'opacity-100 delay-[300ms]'
                }`}
              >
                <span
                  className="text-fluid-md font-sans font-extrabold uppercase tracking-wide"
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(180deg)',
                  }}
                >
                  {item.organization}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="flex flex-col gap-fluid-3 min-[1000px]:hidden">
        {displayTestimonials.map((item, index) => {
          const isExpanded = expandedIndex === index;
          const panelId = `testimonial-mobile-panel-${index}`;
          const buttonId = `testimonial-mobile-trigger-${index}`;

          return (
            <article
              key={item.key}
              className={`relative flex flex-col overflow-hidden rounded-[1.1rem] border border-night/80 bg-cream/80 transition-[min-height] duration-[750ms] ease-[var(--ease-out-sine)] ${
                isExpanded ? 'min-h-[35vh] justify-end' : 'min-h-0'
              }`}
            >
              {/* Pink background overlay - Step 2: fades in AFTER card grows */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 z-0 ${cardColors[index]} transition-opacity ease-[var(--ease-out-sine)] ${
                  isExpanded
                    ? 'opacity-100 duration-[390ms] delay-[750ms]'
                    : 'opacity-0 duration-[210ms] delay-0'
                }`}
              />

              <button
                id={buttonId}
                type="button"
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={() => setExpandedIndex(index)}
                className="relative z-10 flex w-full items-center justify-between gap-fluid-3 px-fluid-4 py-fluid-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-pink"
              >
                {/* Collapsed title - Step 1: fades out when expanding */}
                <span
                  className={`text-fluid-md font-sans font-extrabold uppercase tracking-wide text-night transition-opacity duration-[200ms] ease-[var(--ease-out-sine)] ${
                    isExpanded
                      ? 'opacity-0 delay-0'
                      : 'opacity-100 delay-[300ms]'
                  }`}
                >
                  {item.organization}
                </span>
              </button>

              {/* Content container - Step 3: fades in AFTER card is full size */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!isExpanded}
                className={`absolute bottom-0 left-0 right-0 z-10 p-fluid-4 transition-opacity ease-[var(--ease-out-sine)] ${
                  isExpanded
                    ? 'opacity-100 delay-[750ms] duration-[300ms]'
                    : 'opacity-0 delay-0 duration-[200ms] pointer-events-none'
                }`}
              >
                {/* Quote text - already in place, just fades in */}
                <p className="text-fluid-xl font-sans font-light italic leading-relaxed text-cream pb-fluid-4">
                  &ldquo;{item.displayText}&rdquo;
                </p>

                {/* Expanded title - fades in with content */}
                <p className="text-fluid-md font-sans font-extrabold uppercase tracking-wide text-cream">
                  {item.organization}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
