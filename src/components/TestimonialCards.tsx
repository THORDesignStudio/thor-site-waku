'use client';

import { useMemo, useState, useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '../data/testimonials';
import { useLenisScrollTrigger } from '../hooks/useLenisScrollTrigger';
import { activeTestimonialIndexAtom } from '../atoms/siteAtoms';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// Arrow Icons
// ============================================================================

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

// ============================================================================
// Carousel Controls Component
// ============================================================================

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  currentIndex: number;
  total: number;
}

function CarouselControls({
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
  currentIndex,
  total,
}: CarouselControlsProps) {
  const buttonBase =
    'w-10 h-10 rounded-full border-2 border-pink flex items-center justify-center transition-all duration-200';
  const buttonEnabled =
    'text-pink hover:bg-pink hover:text-white cursor-pointer';
  const buttonDisabled = 'text-pink/30 border-pink/30 cursor-not-allowed';

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onPrev}
        disabled={!canGoPrev}
        className={`${buttonBase} ${canGoPrev ? buttonEnabled : buttonDisabled}`}
        aria-label={`Previous testimonial (showing ${currentIndex + 1} of ${total})`}
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </button>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {total}
      </span>
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`${buttonBase} ${canGoNext ? buttonEnabled : buttonDisabled}`}
        aria-label={`Next testimonial (showing ${currentIndex + 1} of ${total})`}
      >
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

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

  // Desktop: expanding panels use local state
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  // Mobile: carousel uses Jotai atom
  const [activeMobileIndex, setActiveMobileIndex] = useAtom(activeTestimonialIndexAtom);

  // Refs for desktop section animations
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Refs for mobile carousel
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // ============================================================================
  // Mobile Carousel Logic
  // ============================================================================

  // Calculate which slide is most visible based on scroll position
  const calculateActiveSlide = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return 0;

    const scrollLeft = scrollContainer.scrollLeft;
    let activeIdx = 0;

    for (let i = 0; i < slideRefs.current.length; i++) {
      const slide = slideRefs.current[i];
      if (!slide) continue;

      if (scrollLeft >= slide.offsetLeft - 50) {
        activeIdx = i;
      } else {
        break;
      }
    }

    const correctedIdx = Math.min(activeIdx + 1, slideRefs.current.length - 1);
    if (scrollLeft < 10) return 0;

    return correctedIdx;
  }, []);

  // Handle scroll events for mobile carousel
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (!isProgrammaticScroll.current) {
          const newIndex = calculateActiveSlide();
          setActiveMobileIndex(newIndex);
        }
        isProgrammaticScroll.current = false;
      }, 150);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [calculateActiveSlide, setActiveMobileIndex]);

  // Scroll to a specific slide on mobile
  const scrollToSlide = useCallback((index: number) => {
    const slide = slideRefs.current[index];
    const scrollContainer = scrollContainerRef.current;
    if (slide && scrollContainer) {
      isProgrammaticScroll.current = true;

      const containerRect = scrollContainer.getBoundingClientRect();
      const slideRect = slide.getBoundingClientRect();
      const relativeOffset =
        slideRect.left - containerRect.left + scrollContainer.scrollLeft;

      scrollContainer.scrollTo({
        left: relativeOffset,
        behavior: 'smooth',
      });
    }
  }, []);

  // Navigation handlers for mobile
  const goToPrev = useCallback(() => {
    const newIndex = Math.max(0, activeMobileIndex - 1);
    setActiveMobileIndex(newIndex);
    scrollToSlide(newIndex);
  }, [activeMobileIndex, setActiveMobileIndex, scrollToSlide]);

  const goToNext = useCallback(() => {
    const newIndex = Math.min(displayTestimonials.length - 1, activeMobileIndex + 1);
    setActiveMobileIndex(newIndex);
    scrollToSlide(newIndex);
  }, [activeMobileIndex, displayTestimonials.length, setActiveMobileIndex, scrollToSlide]);

  // Keyboard navigation for desktop panels
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle when focus is within the section
      if (!section.contains(document.activeElement)) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setExpandedIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setExpandedIndex((prev) => Math.min(displayTestimonials.length - 1, prev + 1));
      }
    };

    section.addEventListener('keydown', handleKeyDown);
    return () => section.removeEventListener('keydown', handleKeyDown);
  }, [displayTestimonials.length, setExpandedIndex]);

  return (
    <section
      ref={sectionRef}
      className="min-h-[100vh] px-fluid-6 py-fluid-12 font-sans"
      role="region"
      aria-roledescription="testimonial gallery"
      aria-label="Client Testimonials"
      tabIndex={0}
    >
      <div ref={headerRef} className="mb-fluid-12">
        <h1 className="leading-none">
          <span className="section-title block font-sans font-extrabold text-fluid-6xl sm:text-fluid-8xl tracking-tight">
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
                  className="text-fluid-md font-sans font-extrabold uppercase tracking-wide text-night"
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

      {/* Mobile Carousel */}
      <div 
        className="flex flex-col gap-fluid-6 min-[1000px]:hidden"
        role="tabpanel"
        aria-label={`Testimonial slides (${displayTestimonials.length} total)`}
      >
        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-fluid-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pr-fluid-6"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          tabIndex={0}
        >
          {displayTestimonials.map((item, index) => (
            <div
              key={item.key}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              className="shrink-0 snap-start w-[85vw]"
              role="group"
              aria-label={`Testimonial ${index + 1} of ${displayTestimonials.length}: ${item.organization}`}
            >
              <article className="relative flex flex-col overflow-hidden rounded-[1.1rem] border border-night/80 bg-cream/80 min-h-[400px]">
                {/* Pink background overlay - always visible on mobile carousel */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 z-0 ${cardColors[index]} opacity-100`}
                />

                {/* Content container - always visible */}
                <div className="relative z-10 flex flex-col justify-end h-full p-fluid-6">
                  {/* Quote text */}
                  <p className="text-fluid-xl font-sans font-light italic leading-relaxed text-cream pb-fluid-4">
                    &ldquo;{item.displayText}&rdquo;
                  </p>

                  {/* Organization name */}
                  <p className="text-fluid-md font-sans font-extrabold uppercase tracking-wide text-cream">
                    {item.organization}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Mobile Controls */}
        <div className="flex justify-center">
          <CarouselControls
            onPrev={goToPrev}
            onNext={goToNext}
            canGoPrev={activeMobileIndex > 0}
            canGoNext={activeMobileIndex < displayTestimonials.length - 1}
            currentIndex={activeMobileIndex}
            total={displayTestimonials.length}
          />
        </div>
      </div>
    </section>
  );
}
