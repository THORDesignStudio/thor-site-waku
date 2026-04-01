'use client';

import { useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { useAtom } from 'jotai';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { activeCaseStudyIndexAtom } from '../atoms/siteAtoms';
import { caseStudies, type CaseStudy } from '../data/case-studies';
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
        className="aspect-video w-full overflow-hidden rounded-[10px]"
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
        <p className="text-fluid-xs text-night/50 uppercase tracking-widest font-bold">
          {study.verticals[0]}
        </p>

        {/* Title */}
        <h3 className="text-fluid-2xl font-extrabold uppercase text-night leading-tight tracking-wide">
          {study.name}
        </h3>

        {/* Description / Dek */}
        <p className="text-fluid-base font-light text-night leading-relaxed">
          {study.dek}
        </p>

        {/* Read More Link */}
        <div className="pt-fluid-2">
          <a
            href={`/case-studies/${study.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-pink text-white rounded-full hover:bg-pink-dark hover:-translate-y-1 transition-all duration-300 ease-out text-fluid-sm font-extrabold uppercase"
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
// Sidebar Component
// ============================================================================

interface SidebarProps {
  studies: CaseStudy[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}

function Sidebar({ studies, activeIndex, onSelectIndex }: SidebarProps) {
  return (
    <aside className="shrink-0 lg:w-[280px]">
      {/* Section Title */}
      <h2 className="text-fluid-xl font-extrabold uppercase text-night mb-[var(--spacing-fluid-4)] tracking-wide">
        Select Work
      </h2>

      {/* Desktop: List */}
      <nav className="hidden lg:block">
        <ul className="flex flex-col gap-[var(--spacing-fluid-2)]">
          {studies.map((study, index) => {
            const isActive = index === activeIndex;
            const number = String(index + 1).padStart(2, '0');
            return (
              <li key={study.slug}>
                <button
                  onClick={() => onSelectIndex(index)}
                  className={`
                    w-full text-left text-fluid-base transition-all duration-300 hover:cursor-pointer
                    ${isActive ? 'font-bold text-night' : ' hover:text-night/80'}
                  `}
                >
                  {study.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile: Dropdown */}
      <div className="lg:hidden">
        <select
          value={activeIndex}
          onChange={(e) => onSelectIndex(Number(e.target.value))}
          className="w-full px-4 py-3 bg-white border border-night/20 rounded-lg text-fluid-base font-light text-night focus:outline-none focus:ring-2 focus:ring-pink"
        >
          {studies.map((study, index) => {
            const number = String(index + 1).padStart(2, '0');
            return (
              <option key={study.slug} value={index}>
                {number} {study.name}
              </option>
            );
          })}
        </select>
      </div>
    </aside>
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
}

function CarouselControls({
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
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
        aria-label="Previous slide"
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </button>
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`${buttonBase} ${canGoNext ? buttonEnabled : buttonDisabled}`}
        aria-label="Next slide"
      >
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function CaseStudyCarousel() {
  const studies = caseStudies.caseStudies.filter((study) => study.featured);
  const [activeIndex, setActiveIndex] = useAtom(activeCaseStudyIndexAtom);
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
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Calculate which slide is most visible based on scroll position
  const calculateActiveSlide = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return 0;

    const scrollLeft = scrollContainer.scrollLeft;

    // Find which slide the scroll position has passed (or is at)
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

    // +1 offset to fix the off-by-one issue, clamped to array bounds
    const correctedIdx = Math.min(activeIdx + 1, slideRefs.current.length - 1);

    // But if we're at the very start, keep it at 0
    if (scrollLeft < 10) return 0;

    return correctedIdx;
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
      isProgrammaticScroll.current = true;

      // Calculate position relative to container
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


  return (
    <section ref={sectionRef} className="bg-cream py-fluid-12 px-fluid-6 ">
      {/* Section Title */}
      <div ref={headerRef} className="mb-fluid-12">
        <h1 className="leading-none">
          <span className="section-title block font-sans font-extrabold text-fluid-6xl sm:text-fluid-8xl text-night tracking-tight">
            Case Studies
          </span>
          <p className="section-subtitle font-sans font-light text-fluid-2xl text-night pl-fluid-1 mt-fluid-2">
            See how THOR delivered for our clients.
          </p>
        </h1>
      </div>

      {/* Desktop Layout: Sidebar + Carousel */}
      <div className="flex flex-col lg:flex-row gap-fluid-8">
        {/* Sidebar */}
        <Sidebar
          studies={studies}
          activeIndex={activeIndex}
          onSelectIndex={handleSelectIndex}
        />

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {/* Controls - Above carousel on desktop, below on mobile */}
          <div className="hidden lg:flex justify-start">
            <CarouselControls
              onPrev={goToPrev}
              onNext={goToNext}
              canGoPrev={activeIndex > 0}
              canGoNext={activeIndex < studies.length - 1}
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
          >
            {studies.map((study, index) => (
              <div
                key={study.slug}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                className="shrink-0 snap-start"
                style={{
                  width: 'clamp(450px, 35vw, 650px)',
                }}
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
            />
          </div>
        </div>
      </div>
    </section>
  );
}
