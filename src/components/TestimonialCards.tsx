'use client';

import { useMemo, useState, useRef, useLayoutEffect } from 'react';
import { useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '../data/testimonials';

gsap.registerPlugin(ScrollTrigger);

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

  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Set up scroll-triggered animations for section header and background
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    // Sync Lenis with GSAP ScrollTrigger
    const lenisScrollHandler = () => ScrollTrigger.update();
    lenis?.on('scroll', lenisScrollHandler);

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
      lenis?.off('scroll', lenisScrollHandler);
      ctx.revert();
    };
  }, [lenis]);

  return (
    <section ref={sectionRef} className="min-h-[100vh] px-fluid-6 py-fluid-12 font-sans">
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

      <div className="hidden min-h-[clamp(560px,72vh,840px)] gap-fluid-2 md:flex">
        {displayTestimonials.map((item, index) => {
          const isExpanded = expandedIndex === index;
          const panelId = `testimonial-desktop-panel-${index}`;
          const buttonId = `testimonial-desktop-trigger-${index}`;

          return (
            <article
              key={item.key}
              className={`relative min-w-[5rem] overflow-hidden rounded-[1.1rem] border border-night/80 bg-cream/30 transition-[flex-basis,flex-grow] duration-[750ms] ease-[var(--ease-out-cubic)] ${
                isExpanded
                  ? 'grow basis-[min(62vw,72rem)] delay-0'
                  : 'basis-[5rem] shrink-0 delay-[225ms]'
              }`}
            >
              <div
                aria-hidden="true"
                className={`absolute inset-0 z-0 bg-pink-flat transition-opacity ease-[var(--ease-out-cubic)] ${
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
                className={`absolute inset-0 z-10 flex flex-col justify-end gap-fluid-6 p-fluid-6 transition-[opacity,transform,color] ease-[var(--ease-out-cubic)] ${
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
                className={`absolute inset-0 z-10 flex items-end justify-center px-fluid-2 pb-fluid-5 transition-opacity duration-[375ms] ease-[var(--ease-out-cubic)] ${
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

      <div className="flex flex-col gap-fluid-3 md:hidden">
        {displayTestimonials.map((item, index) => {
          const isExpanded = expandedIndex === index;
          const panelId = `testimonial-mobile-panel-${index}`;
          const buttonId = `testimonial-mobile-trigger-${index}`;

          return (
            <article
              key={item.key}
              className="relative min-h-[50vh] overflow-hidden rounded-[1.1rem] border border-night/80 bg-cream/30"
            >
              <div
                aria-hidden="true"
                className={`absolute inset-0 z-0 bg-pink-flat transition-opacity ease-[var(--ease-out-cubic)] ${
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
                className={`relative z-10 flex w-full items-center justify-between gap-fluid-3 px-fluid-4 py-fluid-4 text-left transition-colors ease-[var(--ease-out-cubic)] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink ${
                  isExpanded
                    ? 'text-cream duration-[390ms] delay-[750ms]'
                    : 'text-night duration-[210ms] delay-0'
                }`}
              >
                <span className="text-fluid-md font-sans font-extrabold uppercase tracking-wide">
                  {item.organization}
                </span>
              </button>

              <div
                className={`relative z-10 grid overflow-hidden px-fluid-4 transition-[grid-template-rows,opacity,color] duration-[750ms] ease-[var(--ease-out-cubic)] ${
                  isExpanded
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-80'
                }`}
              >
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isExpanded}
                  className="overflow-hidden"
                >
                  <p
                    className={`pb-fluid-4 text-fluid-xl font-sans font-light italic leading-relaxed transition-colors ease-[var(--ease-out-cubic)] ${
                      isExpanded
                        ? 'text-cream duration-[390ms] delay-[750ms]'
                        : 'text-night duration-[210ms] delay-0'
                    }`}
                  >
                    &ldquo;{item.displayText}&rdquo;
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
