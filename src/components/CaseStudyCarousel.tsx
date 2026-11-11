'use client';

import {
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
  useState,
  useMemo,
  type ReactNode,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { caseStudies, type CaseStudy } from '../data/case-studies';
import { getPublishedCaseStudies } from '../data/site-content';
import { getCaseStudyTopics } from '../data/case-study-topics';
import { useLenisScrollTrigger } from '../hooks/useLenisScrollTrigger';

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
// Case Study Card
// ============================================================================

interface CaseStudyCardProps {
  study: CaseStudy;
}

function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <article className="flex flex-col pt-[var(--spacing-fluid-4)]">
      {/* Card Image */}
      <div
        className="aspect-video w-full overflow-hidden rounded-2xl"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <img
          src={study.images.cardHorizontal}
          alt={study.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Card Content */}
      <div className="pt-[var(--spacing-fluid-4)] flex flex-col gap-[var(--spacing-fluid-1)]">
        {/* Subtitle - vertical */}
        <p className="type-eyebrow">{getCaseStudyTopics(study)[0]}</p>

        {/* Title */}
        <h3 className="type-card-title text-navy">{study.name}</h3>

        {/* Description / Dek */}
        <p className="type-card-summary">{study.dek}</p>

        {/* Read More Link */}
        <div className="pt-fluid-2">
          <a
            href={`/case-studies/${study.slug}`}
            aria-label={`Read ${study.name} case study`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-magenta text-white rounded-full hover:opacity-80 hover:-translate-y-1 transition-all duration-300 ease-out text-fluid-sm font-extrabold uppercase"
          >
            Read More
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

// ============================================================================
// Carousel Controls
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
    'w-10 h-10 rounded-full border-2 border-magenta flex items-center justify-center transition-all duration-200';
  const buttonEnabled =
    'text-magenta hover:bg-magenta hover:text-white cursor-pointer';
  const buttonDisabled = 'text-magenta/30 border-magenta/30 cursor-not-allowed';

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onPrev}
        disabled={!canGoPrev}
        className={`${buttonBase} ${canGoPrev ? buttonEnabled : buttonDisabled}`}
        aria-label={`Previous case study (showing ${currentIndex + 1} of ${total})`}
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
        aria-label={`Next case study (showing ${currentIndex + 1} of ${total})`}
      >
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

interface CaseStudyCarouselProps {
  studies?: CaseStudy[];
  header?: ReactNode;
  label?: string;
}

export function CaseStudyCarousel({
  studies: providedStudies,
  header,
  label = 'Case Studies Carousel',
}: CaseStudyCarouselProps = {}) {
  const studies = useMemo(
    () =>
      getPublishedCaseStudies(
        providedStudies ?? caseStudies.caseStudies
      ).filter((study) => providedStudies !== undefined || study.featured),
    [providedStudies]
  );
  // Selection belongs to this carousel, so curated pages cannot change the
  // homepage's index or inherit an out-of-range selection from it.
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Use shared hook for Lenis-ScrollTrigger sync
  useLenisScrollTrigger(sectionRef);

  // Set up scroll-triggered animations for section header
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const headerEl = headerRef.current;
        if (!headerEl) return;
        const targets = headerEl.querySelectorAll(
          '.section-title, .section-subtitle'
        );
        if (!targets.length) return;
        gsap.set(targets, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: headerEl,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: 'power2.out',
            });
          },
          onLeaveBack: () => {
            gsap.to(targets, {
              opacity: 0,
              y: 30,
              duration: 0.5,
              ease: 'power2.out',
            });
          },
        });
      }, sectionRef);
      return () => {
        const targets = headerRef.current?.querySelectorAll(
          '.section-title, .section-subtitle'
        );
        if (targets) gsap.killTweensOf(targets);
        ctx.revert();
        if (targets) gsap.set(targets, { clearProps: 'opacity,transform' });
      };
    });
    return () => media.revert();
  }, []);

  // Calculate which slide is most visible based on scroll position
  const calculateActiveSlide = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return 0;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
    if (scrollWidth <= clientWidth || scrollLeft < 2) return 0;
    if (scrollWidth - clientWidth - scrollLeft < 2)
      return Math.max(0, slideRefs.current.length - 1);

    const left = scrollContainer.getBoundingClientRect().left;
    let active = 0;
    let nearest = Infinity;
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const distance = Math.abs(slide.getBoundingClientRect().left - left);
      if (distance < nearest) {
        nearest = distance;
        active = index;
      }
    });
    return active;
  }, []);

  // Handle scroll events (for user-initiated scrolls)
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Wait for scroll to settle (scrollend detection)
      scrollTimeoutRef.current = setTimeout(() => {
        // Only update if this was a user scroll, not programmatic
        if (!isProgrammaticScroll.current) {
          const newIndex = calculateActiveSlide();
          setActiveIndex(newIndex);
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
  }, [calculateActiveSlide]);

  // Scroll to a specific slide
  const scrollToSlide = useCallback((index: number) => {
    const slide = slideRefs.current[index];
    const scrollContainer = scrollContainerRef.current;
    if (slide && scrollContainer) {
      // Calculate position relative to container
      const containerRect = scrollContainer.getBoundingClientRect();
      const slideRect = slide.getBoundingClientRect();
      const relativeOffset =
        slideRect.left - containerRect.left + scrollContainer.scrollLeft;

      const destination = Math.max(
        0,
        Math.min(
          relativeOffset,
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        )
      );
      if (Math.abs(destination - scrollContainer.scrollLeft) < 1) return;
      isProgrammaticScroll.current = true;
      scrollContainer.scrollTo({
        left: destination,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
    }
  }, []);

  // Handle sidebar/button selection - single source of truth
  const handleSelectIndex = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, studies.length - 1));
      setActiveIndex(clampedIndex);
      scrollToSlide(clampedIndex);
    },
    [scrollToSlide, studies.length]
  );

  // Navigation handlers
  const goToPrev = useCallback(() => {
    handleSelectIndex(activeIndex - 1);
  }, [activeIndex, handleSelectIndex]);

  const goToNext = useCallback(() => {
    handleSelectIndex(activeIndex + 1);
  }, [activeIndex, handleSelectIndex]);

  // Keyboard navigation for carousel
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    scrollContainer.addEventListener('keydown', handleKeyDown);
    return () => scrollContainer.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-fluid-12 px-fluid-6"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      {/* Section Title */}
      <div ref={headerRef} className="mb-fluid-12">
        {header ?? (
          <>
            <h2 className="section-title block font-sans font-extrabold text-fluid-6xl sm:text-fluid-8xl text-navy tracking-tight leading-none">
              Case Studies
            </h2>
            <p className="section-subtitle font-sans font-light text-fluid-2xl text-navy pl-fluid-1 mt-fluid-2">
              See how THOR delivered for our clients.
            </p>
          </>
        )}
      </div>

      <div data-reveal className="min-w-0">
        {/* Controls - Above carousel on desktop, below on mobile */}
        <div className="hidden lg:flex justify-start">
          <CarouselControls
            onPrev={goToPrev}
            onNext={goToNext}
            canGoPrev={activeIndex > 0}
            canGoNext={activeIndex < studies.length - 1}
            currentIndex={activeIndex}
            total={studies.length}
          />
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-[var(--spacing-fluid-3)] overflow-x-auto scroll-smooth snap-x snap-mandatory pr-[var(--spacing-fluid-6)]"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          tabIndex={0}
          role="region"
          aria-label={`Case study slides (${studies.length} total)`}
        >
          {studies.map((study, index) => (
            <div
              key={study.slug}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              className="shrink-0 snap-start w-[85vw] sm:w-[clamp(450px,35vw,650px)]"
              role="group"
              aria-label={`Case study ${index + 1} of ${studies.length}: ${study.name}`}
            >
              <CaseStudyCard study={study} />
            </div>
          ))}
        </div>

        {/* Mobile Controls - Below carousel */}
        <div className="lg:hidden flex justify-center mt-[var(--spacing-fluid-6)]">
          <CarouselControls
            onPrev={goToPrev}
            onNext={goToNext}
            canGoPrev={activeIndex > 0}
            canGoNext={activeIndex < studies.length - 1}
            currentIndex={activeIndex}
            total={studies.length}
          />
        </div>
      </div>
    </section>
  );
}
