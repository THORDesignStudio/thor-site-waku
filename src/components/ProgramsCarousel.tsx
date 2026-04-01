'use client';

import {
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
  useEffect,
} from 'react';
import { useAtom } from 'jotai';
import { useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { programs, type Program } from '../data/programs';
import { ProgramDrawer } from './ProgramDrawer';
import { RING_RADIUS, activeProgramIndexAtom } from '../atoms/siteAtoms';
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
// Carousel Controls Component
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
        aria-label="Previous program"
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </button>
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`${buttonBase} ${canGoNext ? buttonEnabled : buttonDisabled}`}
        aria-label="Next program"
      >
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

// Generate keyframes by sampling the same circle formula used for items
// This guarantees the planet follows the exact same path
const R = RING_RADIUS;

function orbitPosition(angleDeg: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  const x = 50 + R * Math.sin(angleRad);
  const y = 50 - R * Math.cos(angleRad);
  return { x, y };
}

// Sample 21 points along the half-circle (270° to 90°, going through 0° at top)
// 270° = left, 0° = top, 90° = right
// More points = smoother arc, less wobble
const keyframeAngles: number[] = [];
const keyframePercents: number[] = [];
for (let i = 0; i <= 20; i++) {
  keyframePercents.push(i * 5); // 0, 5, 10, ... 100
  // Angle goes from 270° to 90° (through 360/0°)
  // That's a 180° arc: 270 → 360 → 90
  const angle = 270 + (i * 180) / 20; // 270 to 450, then normalize
  keyframeAngles.push(angle >= 360 ? angle - 360 : angle);
}

const orbitKeyframes = `
  @keyframes orbit-half-circle {
    ${keyframeAngles
      .map((angle, i) => {
        const pos = orbitPosition(angle);
        return `${keyframePercents[i]}% { left: ${pos.x}%; top: ${pos.y}%; }`;
      })
      .join('\n    ')}
  }
`;

// ============================================================================
// Constants
// ============================================================================

// Fixed angles around the carousel for each item
// Half-circle arc with 0° at left, 180° at right, curving upward
// Items at user-specified: 30°, 60°, 90°, 120°, 150°
// Converted to code's coordinate system (0° at top, clockwise): 300°, 330°, 0°, 30°, 60°
const ITEM_ANGLES = [270, 315, 0, 45, 90];
const ITEM_COUNT = 5;

const CONTAINER_SIZE = 'min(90vw, 90vh)';

// Card dimensions (fixed to avoid transitioning to 'auto')
const THUMBNAIL_SIZE = 'clamp(100px, 10vmin, 150px)';
const CARD_WIDTH = '380px';
const CARD_HEIGHT = '440px';

// Parallax layers - ordered back-to-front (lowest z-index first)
// Higher number file = further back = slower parallax
// speed: how fast the layer moves relative to scroll (higher = faster)
// offset: initial Y position shift (negative = start higher)
const PARALLAX_LAYERS = [
  {
    src: '/images/space-scene/THOR_Space_0003_Front-Clouds.png',
    speed: 0.02,
    offset: 0,
  },
  {
    src: '/images/space-scene/THOR_Space_0002_Nebula.png',
    speed: 0.05,
    offset: 0,
  },
  {
    src: '/images/space-scene/THOR_Space_0001_Blue-Nebula.png',
    speed: 0.08,
    offset: 0,
  },
  {
    src: '/images/space-scene/THOR_Space_0000_Stars.png',
    speed: 0.13,
    offset: -150,
  },
];

// ============================================================================
// Types
// ============================================================================

interface ItemPosition {
  x: number;
  y: number;
}

// ============================================================================
// Space Parallax Background
// ============================================================================

interface SpaceParallaxBackgroundProps {
  parallaxRef: React.RefObject<HTMLDivElement | null>;
}

function SpaceParallaxBackground({
  parallaxRef,
}: SpaceParallaxBackgroundProps) {
  return (
    <div ref={parallaxRef} className="space-parallax">
      {/* Gradient background layer */}
      <div className="space-parallax__gradient" />

      {/* Image layers - rendered in array order (back to front) */}
      {PARALLAX_LAYERS.map((layer, i) => (
        <div
          key={layer.src}
          className="space-parallax__layer"
          data-parallax-speed={layer.speed}
          data-parallax-offset={layer.offset}
          style={{
            zIndex: i + 1,
            backgroundImage: `url(${layer.src})`,
            // Initial transform, will be updated via CSS custom properties
            transform: `translate3d(0, ${layer.offset}px, 0)`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// Position Calculator
// ============================================================================

function getItemPosition(index: number): ItemPosition {
  const angleDegrees = ITEM_ANGLES[index] ?? 0;
  const angleRadians = (angleDegrees * Math.PI) / 180;

  // Position on circle centered at (50%, 50%)
  // At 0°: top center
  // At 90°: right
  // At 180°: bottom center
  // At 270°: left
  const x = 50 + RING_RADIUS * Math.sin(angleRadians);
  const y = 50 - RING_RADIUS * Math.cos(angleRadians);

  return { x, y };
}

// ============================================================================
// Component
// ============================================================================

export function ProgramsCarousel() {
  // null means no item is active - all on the outer circle
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Track which program drawer is open (null = none)
  const [drawerProgram, setDrawerProgram] = useState<Program | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Mobile carousel refs and state
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useAtom(activeProgramIndexAtom);

  // Use shared hook for Lenis-ScrollTrigger sync
  const lenis = useLenis();

  // Direct DOM manipulation for parallax to avoid React re-renders
  useEffect(() => {
    if (!lenis || !parallaxRef.current) return;

    const parallaxLayers = parallaxRef.current.querySelectorAll(
      '.space-parallax__layer'
    );

    const scrollHandler = ({ scroll }: { scroll: number }) => {
      // Update CSS custom properties directly - no React state changes
      parallaxLayers.forEach((layer) => {
        const speed = parseFloat(
          layer.getAttribute('data-parallax-speed') || '0'
        );
        const offset = parseFloat(
          layer.getAttribute('data-parallax-offset') || '0'
        );
        const y = offset + scroll * speed;
        (layer as HTMLElement).style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };

    lenis.on('scroll', scrollHandler);
    return () => {
      lenis.off('scroll', scrollHandler);
    };
  }, [lenis]);

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

  const items = programs.programs;

  // Navigation handlers for mobile
  const goToPrevMobile = useCallback(() => {
    const newIndex = Math.max(0, activeMobileIndex - 1);
    setActiveMobileIndex(newIndex);
    scrollToSlide(newIndex);
  }, [activeMobileIndex, setActiveMobileIndex, scrollToSlide]);

  const goToNextMobile = useCallback(() => {
    const newIndex = Math.min(items.length - 1, activeMobileIndex + 1);
    setActiveMobileIndex(newIndex);
    scrollToSlide(newIndex);
  }, [activeMobileIndex, items.length, setActiveMobileIndex, scrollToSlide]);

  // --------------------------------------------------------------------------
  // Navigation handlers
  // --------------------------------------------------------------------------

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % ITEM_COUNT;
    });
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return ITEM_COUNT - 1;
      return (prev - 1 + ITEM_COUNT) % ITEM_COUNT;
    });
  }, []);

  const goToIndex = useCallback((index: number) => {
    // Toggle: if clicking the active item, deselect it; otherwise select it
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  const openProgramDrawer = useCallback(
    (program: Program, e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent card toggle when clicking the button
      setDrawerProgram(program);
    },
    []
  );

  const closeDrawer = useCallback(() => {
    setDrawerProgram(null);
  }, []);

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between"
    >
      {/* Space parallax background */}
      <SpaceParallaxBackground parallaxRef={parallaxRef} />

      {/* Section Title and Navigation - positioned at top, floats over parallax */}
      <div
        ref={headerRef}
        className="relative z-10 pt-fluid-12 px-fluid-6 text-center"
      >
        <h1 className="leading-none">
          <span className="section-title block font-sans font-extrabold text-fluid-6xl sm:text-fluid-8xl text-cream tracking-tight">
            Programs
          </span>
          <p className="section-subtitle font-sans font-light text-fluid-2xl text-cream mt-fluid-2 leading-normal">
            THOR offers five programs to help organizations grow.
          </p>
        </h1>

        {/* Navigation arrows - below title (desktop only) */}
        <div className="hidden sm:flex items-center justify-center gap-4 my-fluid-6">
          <button
            onClick={goToPrev}
            className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-pink"
            aria-label="Previous program"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-pink"
            aria-label="Next program"
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
      </div>

      {/* Desktop Orbit Container - hidden on mobile */}
      <div className="hidden sm:block relative z-10 self-center"
        style={{
          width: CONTAINER_SIZE,
          aspectRatio: '1 / 1',
        }}
      >
        {/* Inject dynamic keyframes for planet animation */}
        <style dangerouslySetInnerHTML={{ __html: orbitKeyframes }} />

        {/* Half-circle ring (decorative) - z-index 1 */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: `${RING_RADIUS * 2}%`,
            height: `${RING_RADIUS}%`,
            left: `${50 - RING_RADIUS}%`,
            top: `${50 - RING_RADIUS}%`,
            borderTop: '1px dashed rgba(255, 255, 255, 0.4)',
            borderLeft: '1px dashed rgba(255, 255, 255, 0.4)',
            borderRight: '1px dashed rgba(255, 255, 255, 0.4)',
            borderBottom: 'none',
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
            zIndex: 1,
          }}
        />

        {/* Orbiting planet - z-index 2 (above arc z-index 1, below items z-index 3+) */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            position: 'absolute',
            width: '30px',
            height: '30px',
            transform: 'translate(-50%, -50%)',
            background:
              'linear-gradient(135deg, var(--color-pink) 0%, var(--color-spicy-purple) 100%)',
            boxShadow: '0 0 20px rgba(234, 43, 111, 0.8)',
            animation: 'orbit-half-circle 24s linear infinite',
            zIndex: 2,
          }}
        />

        {/* Thumbnails / Cards */}
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const position = getItemPosition(index);

          return (
            <div
              key={item.name}
              className="absolute text-left"
              style={{
                left: `${isActive ? 50 : position.x}%`,
                top: `${isActive ? 30 : position.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isActive ? 10 : 3,
                willChange: 'left, top',
                transitionProperty: 'left, top, z-index',
                transitionDuration: 'var(--spring-common-duration)',
                transitionTimingFunction: 'var(--spring-common)',
              }}
            >
              {/* Card header thumbnail - positioned outside the clipped container */}
              <div
                className="absolute left-1/2 z-10"
                style={{
                  width: THUMBNAIL_SIZE,
                  height: THUMBNAIL_SIZE,
                  // When active: centered, straddling top edge
                  // When inactive: centered in the middle of the thumbnail circle
                  top: isActive ? 0 : '50%',
                  transform: isActive
                    ? 'translateX(-50%) translateY(-50%)'
                    : 'translateX(-50%) translateY(-50%)',
                  opacity: isActive ? 1 : 0,
                  pointerEvents: 'none',
                  borderRadius: '50%',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'var(--color-cream)',
                  transitionProperty: 'opacity, top',
                  transitionDuration: 'var(--spring-common-duration)',
                  transitionTimingFunction: 'var(--spring-common)',
                  transitionDelay: isActive ? '100ms' : '0ms',
                }}
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-contain p-[12%]"
                  style={{
                    filter: 'grayscale(0.3)',
                  }}
                />
              </div>

              {/* Container transitions from circle to card */}
              <div
                className="relative overflow-hidden bg-white"
                style={{
                  width: isActive ? CARD_WIDTH : THUMBNAIL_SIZE,
                  height: isActive ? CARD_HEIGHT : THUMBNAIL_SIZE,
                  borderRadius: isActive ? '10px' : '50%',
                  boxShadow: isActive
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  // GPU acceleration hint
                  willChange: 'width, height, border-radius, box-shadow',
                  // Spring easing for shape morphing
                  transitionProperty:
                    'width, height, border-radius, box-shadow',
                  transitionDuration: 'var(--spring-common-duration)',
                  transitionTimingFunction: 'var(--spring-common)',
                }}
              >
                {/* Thumbnail state - always rendered, fades out when active */}
                <button
                  className="absolute inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2"
                  onClick={() => goToIndex(index)}
                  aria-label={`View ${item.name}`}
                  style={{
                    opacity: isActive ? 0 : 1,
                    pointerEvents: isActive ? 'none' : 'auto',
                    transitionProperty: 'opacity',
                    transitionDuration: '400ms',
                    transitionTimingFunction: 'var(--ease-out-cubic)',
                    transitionDelay: isActive ? '0ms' : '150ms',
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: item.backgroundColor,
                      opacity: 0.15,
                    }}
                  />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-[13%]"
                    style={{
                      filter: 'grayscale(0.2)',
                    }}
                  />
                </button>

                {/* Card content - always rendered, fades in when active */}
                <div
                  className="absolute inset-0"
                  style={{
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                    transitionProperty: 'opacity',
                    transitionDuration: '500ms',
                    transitionTimingFunction: 'var(--ease-out-cubic)',
                    transitionDelay: isActive ? '500ms' : '0ms',
                  }}
                >
                  <button
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-night/10 hover:bg-night/20 transition-colors cursor-pointer"
                    aria-label="Close"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(null);
                    }}
                  >
                    <svg
                      className="w-4 h-4 text-night"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  {/* Card content - starts below the thumbnail overlap */}
                  <div
                    className="h-full flex flex-col"
                    style={{
                      paddingTop: 'calc(clamp(50px, 8vmin, 80px) / 2 + 5px)',
                      paddingLeft: 'var(--spacing-fluid-4)',
                      paddingRight: 'var(--spacing-fluid-4)',
                      paddingBottom: 'var(--spacing-fluid-4)',
                    }}
                  >
                    {/* Title centered below thumbnail */}
                    <h3 className="text-fluid-xl heading-sm font-semibold text-night leading-tight text-center mt-fluid-5 mb-fluid-2">
                      {item.name}
                    </h3>

                    {/* Dek */}
                    <p className="text-fluid-base text-center text-night/80 body-md mb-fluid-3">
                      {item.dek}
                    </p>

                    {/* Description */}
                    <p className="text-fluid-sm text-night/60 leading-relaxed flex-1">
                      {item.description}
                    </p>

                    {/* Learn More button */}
                    <div className="mt-fluid-3 text-center">
                      <button
                        // onClick={(e) => openProgramDrawer(item, e)}
                        className="px-6 py-2 bg-pink text-white rounded-full hover:bg-pink-dark transition-colors text-fluid-sm font-medium"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title below the thumbnail - only visible when NOT active */}
              <div
                className="absolute left-1/2 top-full mt-4 -translate-x-1/2 w-max max-w-[150px] pointer-events-none"
                style={{
                  opacity: isActive ? 0 : 1,
                  transition: 'opacity 300ms var(--ease-out-cubic)',
                  // Delay fade-in when closing the card, but fade-out immediately when opening
                  transitionDelay: isActive ? '0ms' : '400ms',
                }}
              >
                <h3 className="text-fluid-md font-light text-cream leading-tight text-center tracking-wider">
                  {item.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Carousel - shown only on small screens */}
      <div className="sm:hidden flex flex-col gap-fluid-6 z-10 px-fluid-4 pb-fluid-8">
        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-fluid-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pr-fluid-6"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.name}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              className="shrink-0 snap-start w-[calc(100vw-2*var(--spacing-fluid-4))]"
            >
              {/* Static Program Card - always in "opened" state */}
              <article className="relative bg-white rounded-[10px] shadow-lg">
                {/* Card content */}
                <div className="p-fluid-6 flex flex-col">
                  <h3 className="text-fluid-2xl font-display text-night text-center mb-fluid-2">
                    {item.name}
                  </h3>
                  <p className="text-lg font-sans text-center text-night/80 mb-fluid-3">
                    {item.dek}
                  </p>
                  <p className="text-lg font-sans text-night/60 leading-relaxed flex-1">
                    {item.description}
                  </p>
                  <div className="mt-fluid-4 text-center">
                    <button
                      onClick={(e) => openProgramDrawer(item, e)}
                      className="px-6 py-2 bg-pink text-white rounded-full hover:bg-pink-dark transition-colors text-fluid-sm font-medium"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex justify-center">
          <CarouselControls
            onPrev={goToPrevMobile}
            onNext={goToNextMobile}
            canGoPrev={activeMobileIndex > 0}
            canGoNext={activeMobileIndex < items.length - 1}
          />
        </div>
      </div>

      {/* Program Drawer - opens when Learn More is clicked */}
      {drawerProgram && (
        <ProgramDrawer program={drawerProgram} onClose={closeDrawer} />
      )}
    </section>
  );
}
