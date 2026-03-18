'use client';

import { useMemo, useState } from 'react';
import { testimonials } from '../data/testimonials';

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

  return (
    <section className="min-h-[100vh] bg-linear-to-b from-cream to-cream-dark px-fluid-6 py-fluid-12 text-night font-sans">
      <h2 className="mb-fluid-10 leading-none">
        <span className="block font-sans text-fluid-8xl font-extrabold uppercase tracking-tight">
          Testimonials
        </span>
      </h2>

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
                  {isExpanded ? 'Expanded testimonial from ' : 'Expand testimonial from '}
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
                  isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-80'
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
