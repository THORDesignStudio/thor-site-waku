'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import './FlipbookCarousel.css';

export interface FlipbookCarouselSlide {
  src: string;
  label: string;
  slug: string;
}

interface FlipbookCarouselProps {
  slides: FlipbookCarouselSlide[];
}

const ENABLE_DEBUG_CONTROLS = false;

const CONFIG = {
  // How far cards translate on X axis when fully to the side
  xOffsetRight: 51, // percentage - where incoming cards wait (right side)
  xOffsetLeft: 51, // percentage - where outgoing cards end up (left side)
  // Z-depth for cards at their side positions (reduced for less perspective size change)
  zDepthBack: 120, // pixels - depth for cards behind (outgoing)
  zDepthFront: 30, // pixels - depth for incoming cards (shallower, stays in front)
  // Y-rotation for angled cards at side position
  yRotation: 25, // degrees
  // Parallax factor for inner card movement
  parallaxFactor: 3, // percentage per scroll unit
  // How many cards to show on each side
  visibleCards: 2,
  // Additional z-depth per stacked card (for cards waiting on right)
  stackDepth: 60, // pixels
  // DEBUG: Set to true to test 2D-only transforms (diagnose if 3D is the issue)
  use2DOnly: false,
};

interface CardTransform {
  transform: string;
  opacity: number;
  visibility: boolean;
  zIndex: number;
  innerTransform: string;
}

// Easing functions
function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

function calculateCardTransform(
  cardIndex: number,
  scrollProgress: number,
  totalCards: number
): CardTransform {
  // scrollProgress is 0 to (totalCards - 1)
  // offset: negative = card has passed (to the left), positive = upcoming (to the right)
  const offset = cardIndex - scrollProgress;
  const absOffset = Math.abs(offset);

  const opacity = 1; // Always 100% opaque
  let visibility = absOffset <= CONFIG.visibleCards + 1;
  let zIndex = 0;
  let transform: string;
  let innerTransform: string;

  // ALWAYS calculate transforms for ALL cards (even hidden ones)
  // This prevents the "transition to none" flicker that causes the ghost card issue
  //
  // KEY INSIGHT: Cards should move APART during transition, never overlap
  // At offset 0: card is at CENTER (x = 0)
  // At offset between 0 and 1: card moves AWAY from center to its side
  // At offset 1+: card is at its final side position
  const t = Math.min(absOffset, 1);

  let x: number;
  let z: number;
  let rotation: number;

  if (absOffset < 0.5) {
    // Card is in the "active zone" - transitioning through center
    // Map 0-0.5 to 0-1 for the movement to side position
    const activeT = absOffset * 2; // 0 at center, 1 at side
    const easedActiveT = easeOutQuad(activeT);

    // X: Move from center (0) to side position (±51%)
    x =
      offset >= 0
        ? easedActiveT * CONFIG.xOffsetRight
        : -easedActiveT * CONFIG.xOffsetLeft;

    // Z: Stay shallow in active zone
    z = easedActiveT * CONFIG.zDepthFront;

    // Rotation
    rotation =
      offset >= 0
        ? -easedActiveT * CONFIG.yRotation
        : easedActiveT * CONFIG.yRotation;

    // Z-index: Active cards are in front
    zIndex = 100;
  } else {
    // Card is at its side position (waiting or passed)
    // absOffset 0.5 to 1+

    // X: Stay at side position
    x = offset >= 0 ? CONFIG.xOffsetRight : -CONFIG.xOffsetLeft;

    // Z: Cards further from center go deeper
    const sideT = Math.min(absOffset - 0.5, 0.5) * 2; // 0 at 0.5 offset, 1 at 1.0 offset
    const depthBase =
      CONFIG.zDepthFront + sideT * (CONFIG.zDepthBack - CONFIG.zDepthFront);
    const stackExtra = Math.max(0, absOffset - 1) * CONFIG.stackDepth;
    z = depthBase + stackExtra;

    // Rotation: Full rotation at side
    rotation = offset >= 0 ? -CONFIG.yRotation : CONFIG.yRotation;

    // Z-index: Side cards are behind active cards
    zIndex = Math.round(50 - absOffset * 5);
  }

  // 2D mode for debugging iOS performance
  if (CONFIG.use2DOnly) {
    // Simple 2D: just translateX and scale for depth illusion
    const scale = 1 - absOffset * 0.15; // Cards get smaller as they move away
    transform = `translateX(${x}%) scale(${Math.max(0.5, scale)})`;
  } else {
    transform = `translateX(${x}%) translateZ(${-z}px) rotateY(${rotation}deg)`;
  }

  // Parallax for inner content
  const parallax =
    offset >= 0 ? -t * CONFIG.parallaxFactor : t * CONFIG.parallaxFactor;
  innerTransform = `translateX(${parallax}%)`;

  return { transform, opacity, visibility, zIndex, innerTransform };
}

export default function FlipbookCarousel({ slides }: FlipbookCarouselProps) {
  const slideCount = slides.length;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollDriverRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  // Debug mode - press 'D' to toggle, then use '[' and ']' to step
  const [debugMode, setDebugMode] = useState(false);
  const [debugDisplayProgress, setDebugDisplayProgress] = useState(0);
  const [manualProgress, setManualProgress] = useState(0);

  // Drag-to-scroll state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Progress tracking - using refs to avoid re-renders during animation
  const lastProgress = useRef(0);
  const scrollProgressRef = useRef(0);
  const isVisibleRef = useRef(true);
  const framesSinceLastChange = useRef(0);

  // Cached DOM references - avoid querySelectorAll on every frame
  const cardRefs = useRef<
    Array<{ card: HTMLElement; inner: HTMLElement | null }>
  >([]);

  // RAF loop reference for cleanup
  const rafId = useRef<number>(0);
  const isRunning = useRef(false);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  // Update transforms based on current scroll position
  // Optimized per Vercel React best practices:
  // - Batch DOM updates via cssText (js-batch-dom-css)
  // - Cache property access in loops (js-cache-property-access)
  // - Returns boolean indicating if any transforms were applied
  const updateTransforms = useCallback(() => {
    const scrollContainer = scrollDriverRef.current;
    if (!scrollContainer) return false;

    // Cache property access outside loop
    const scrollLeft = scrollContainer.scrollLeft;
    const scrollWidth =
      scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const totalSlides = slideCount;

    if (scrollWidth <= 0 || totalSlides <= 0) return false;

    const progress = (scrollLeft / scrollWidth) * (totalSlides - 1);

    // Skip if progress hasn't changed meaningfully
    const lastProg = lastProgress.current;
    if (Math.abs(progress - lastProg) < 0.0005) return false;
    lastProgress.current = progress;
    scrollProgressRef.current = progress;

    // Apply transforms using cached DOM refs
    const cachedCards = cardRefs.current;
    const cardCount = cachedCards.length;

    for (let i = 0; i < cardCount; i++) {
      const cached = cachedCards[i];
      if (!cached) continue;
      const { card, inner } = cached;
      if (!card) continue;

      const absOffset = Math.abs(i - progress);
      const transforms = calculateCardTransform(i, progress, totalSlides);
      const isInactive = absOffset > 2;
      const vis = isInactive
        ? 'hidden'
        : transforms.visibility
          ? 'visible'
          : 'hidden';

      // Batch all style updates into single cssText assignment (reduces reflows)
      card.style.cssText = `--tx:${transforms.transform};--z:${transforms.zIndex};visibility:${vis}`;

      if (inner) {
        inner.style.cssText = `--inner-tx:${transforms.innerTransform}`;
      }

      // Toggle class separately (classList operations are efficient)
      if (isInactive) {
        card.classList.add('flipbook-card--inactive');
      } else {
        card.classList.remove('flipbook-card--inactive');
      }
    }

    return true;
  }, [slideCount]);

  // RAF loop - polls scroll position every frame, but pauses when settled
  // This saves CPU when user is not interacting and carousel is settled
  const rafLoop = useCallback(() => {
    if (!isRunning.current || !isVisibleRef.current) return;

    const changed = updateTransforms();

    if (changed) {
      // Reset settle counter when changes are detected
      framesSinceLastChange.current = 0;
      rafId.current = requestAnimationFrame(rafLoop);
    } else {
      // Increment settle counter - keep polling briefly for momentum scrolling
      framesSinceLastChange.current++;
      if (framesSinceLastChange.current < 5) {
        rafId.current = requestAnimationFrame(rafLoop);
      } else {
        // Stop RAF loop - scroll events will restart it
        isRunning.current = false;
      }
    }
  }, [updateTransforms]);

  // Wake RAF loop when scroll/drag events occur
  const wakeRafLoop = useCallback(() => {
    if (!isRunning.current && isVisibleRef.current) {
      isRunning.current = true;
      framesSinceLastChange.current = 0;
      rafId.current = requestAnimationFrame(rafLoop);
    }

    // Detect scroll end for drag state cleanup
    const wrapper = wrapperRef.current;
    if (scrollEndTimer.current) {
      clearTimeout(scrollEndTimer.current);
    }
    scrollEndTimer.current = setTimeout(() => {
      if (wrapper && isDragging.current) {
        isDragging.current = false;
        wrapper.classList.remove('is-dragging');
      }
    }, 150);
  }, [rafLoop]);

  // Apply card transforms - use CSS custom properties for performance
  const applyTransforms = useCallback(
    (progress: number) => {
      scrollProgressRef.current = progress;

      // Use cached refs if available, otherwise query DOM
      const cachedCards = cardRefs.current;
      if (cachedCards.length > 0) {
        for (let i = 0; i < cachedCards.length; i++) {
          const cached = cachedCards[i];
          if (!cached) continue;
          const { card, inner } = cached;
          if (!card) continue;

          const absOffset = Math.abs(i - progress);
          const transforms = calculateCardTransform(i, progress, slideCount);

          // Always set transform to prevent ghost animation
          card.style.setProperty('--tx', transforms.transform);
          card.style.setProperty('--z', transforms.zIndex.toString());

          if (inner) {
            inner.style.setProperty('--inner-tx', transforms.innerTransform);
          }

          // Toggle 3D compositing based on distance
          if (absOffset > 2) {
            card.classList.add('flipbook-card--inactive');
            card.style.visibility = 'hidden';
          } else {
            card.classList.remove('flipbook-card--inactive');
            card.style.visibility = transforms.visibility
              ? 'visible'
              : 'hidden';
          }
        }
      } else if (stackRef.current) {
        // Fallback for initial render before refs are cached
        const cards = stackRef.current.querySelectorAll('.flipbook-card');
        cards.forEach((card, index) => {
          const cardEl = card as HTMLElement;
          const innerEl = cardEl.querySelector(
            '.flipbook-card__inner'
          ) as HTMLElement;
          const absOffset = Math.abs(index - progress);
          const transforms = calculateCardTransform(
            index,
            progress,
            slideCount
          );

          cardEl.style.setProperty('--tx', transforms.transform);
          cardEl.style.setProperty('--z', transforms.zIndex.toString());

          if (innerEl) {
            innerEl.style.setProperty('--inner-tx', transforms.innerTransform);
          }

          if (absOffset > 2) {
            cardEl.classList.add('flipbook-card--inactive');
            cardEl.style.visibility = 'hidden';
          } else {
            cardEl.classList.remove('flipbook-card--inactive');
            cardEl.style.visibility = transforms.visibility
              ? 'visible'
              : 'hidden';
          }
        });
      }
    },
    [slideCount]
  );

  // Single initialization effect: cache DOM refs, apply initial transforms, set up IntersectionObserver
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const stack = stackRef.current;
    if (!wrapper || !stack) return;

    // 1. Cache DOM references
    const cards = stack.querySelectorAll('.flipbook-card');
    cardRefs.current = Array.from(cards).map((card) => ({
      card: card as HTMLElement,
      inner: card.querySelector('.flipbook-card__inner') as HTMLElement | null,
    }));

    // 2. Apply initial transforms synchronously
    applyTransforms(0);

    // 3. Set up IntersectionObserver to manage RAF lifecycle
    intersectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !isRunning.current) {
          // Start RAF when becoming visible
          isRunning.current = true;
          framesSinceLastChange.current = 0;
          rafId.current = requestAnimationFrame(rafLoop);
        } else if (!entry.isIntersecting && isRunning.current) {
          // Stop RAF when leaving viewport
          isRunning.current = false;
          cancelAnimationFrame(rafId.current);
        }
      },
      { threshold: 0.1 }
    );

    intersectionObserverRef.current.observe(wrapper);

    return () => {
      intersectionObserverRef.current?.disconnect();
      isRunning.current = false;
      cancelAnimationFrame(rafId.current);
    };
  }, [applyTransforms, rafLoop]);

  // Global keyboard listener for debug mode
  useEffect(() => {
    if (!ENABLE_DEBUG_CONTROLS) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setDebugMode((prev) => !prev);
        return;
      }

      if (debugMode) {
        if (e.key === ']') {
          e.preventDefault();
          setManualProgress((prev) =>
            Math.min(prev + 0.02, Math.max(slideCount - 1, 0))
          );
        } else if (e.key === '[') {
          e.preventDefault();
          setManualProgress((prev) => Math.max(prev - 0.02, 0));
        } else if (e.key === '}') {
          e.preventDefault();
          setManualProgress((prev) =>
            Math.min(prev + 0.1, Math.max(slideCount - 1, 0))
          );
        } else if (e.key === '{') {
          e.preventDefault();
          setManualProgress((prev) => Math.max(prev - 0.1, 0));
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [debugMode, slideCount, setManualProgress]);

  // Separate RAF for debug panel display - only runs when debug is open
  useEffect(() => {
    if (!ENABLE_DEBUG_CONTROLS) return;
    if (!debugMode) return;

    let debugRafId: number;
    const debugLoop = () => {
      setDebugDisplayProgress(scrollProgressRef.current);
      debugRafId = requestAnimationFrame(debugLoop);
    };
    debugRafId = requestAnimationFrame(debugLoop);

    return () => cancelAnimationFrame(debugRafId);
  }, [debugMode]);

  // When using step buttons in debug mode, apply manual progress
  useEffect(() => {
    if (!ENABLE_DEBUG_CONTROLS) return;

    if (debugMode) {
      applyTransforms(manualProgress);
    }
  }, [manualProgress, debugMode, applyTransforms]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const scrollContainer = scrollDriverRef.current;
      if (!scrollContainer) return;

      if (slideCount <= 0) return;

      const slideWidth = scrollContainer.scrollWidth / slideCount;

      // Debug mode controls
      if (ENABLE_DEBUG_CONTROLS && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        setDebugMode((prev) => !prev);
        return;
      }

      if (ENABLE_DEBUG_CONTROLS && debugMode) {
        // In debug mode, use [ and ] to step through animation
        if (e.key === ']') {
          e.preventDefault();
          setManualProgress((prev) =>
            Math.min(prev + 0.02, Math.max(slideCount - 1, 0))
          );
        } else if (e.key === '[') {
          e.preventDefault();
          setManualProgress((prev) => Math.max(prev - 0.02, 0));
        } else if (e.key === '}') {
          e.preventDefault();
          setManualProgress((prev) =>
            Math.min(prev + 0.1, Math.max(slideCount - 1, 0))
          );
        } else if (e.key === '{') {
          e.preventDefault();
          setManualProgress((prev) => Math.max(prev - 0.1, 0));
        }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        scrollContainer.scrollBy({ left: slideWidth, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        scrollContainer.scrollBy({ left: -slideWidth, behavior: 'smooth' });
      }
    },
    [debugMode, slideCount]
  );

  // Drag-to-scroll handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const scrollContainer = scrollDriverRef.current;
    const wrapper = wrapperRef.current;
    if (!scrollContainer || !wrapper) return;

    isDragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = scrollContainer.scrollLeft;
    scrollContainer.style.scrollSnapType = 'none'; // Disable snap while dragging
    scrollContainer.style.scrollBehavior = 'auto'; // Disable smooth scroll while dragging
    scrollContainer.style.cursor = 'grabbing';
    wrapper.classList.add('is-dragging');
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const scrollContainer = scrollDriverRef.current;
    if (!scrollContainer) return;

    e.preventDefault();
    const deltaX = e.pageX - startX.current;
    scrollContainer.scrollLeft = scrollStart.current - deltaX;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    const scrollContainer = scrollDriverRef.current;
    const wrapper = wrapperRef.current;
    if (!scrollContainer || !wrapper) return;

    isDragging.current = false;
    scrollContainer.style.scrollSnapType = 'x mandatory'; // Re-enable snap
    scrollContainer.style.scrollBehavior = 'smooth'; // Re-enable smooth scroll for snap
    scrollContainer.style.cursor = 'grab';
    wrapper.classList.remove('is-dragging');
  }, []);

  // Touch event handlers for mobile - preserve native inertia
  const handleTouchStart = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    isDragging.current = true;
    wrapper.classList.add('is-dragging');
    // DON'T disable scroll-snap on touch - let native inertia work with snap
  }, []);

  const handleTouchEnd = useCallback(() => {
    // Don't immediately remove is-dragging - let the scroll end detection handle it
    // This allows native inertia to complete before transitions kick back in
  }, []);

  return (
    <div
      className="relative w-full overflow-visible flipbook-wrapper"
      ref={wrapperRef}
    >
      {/* Scroll driver - native scrollable div for reliable scroll detection */}
      <div
        ref={scrollDriverRef}
        className="flipbook-scroll-driver absolute inset-0 z-10 grid grid-flow-col overflow-x-auto overflow-y-hidden scroll-smooth cursor-grab select-none active:cursor-grabbing focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-500/50 focus-visible:outline-offset-4"
        tabIndex={0}
        role="region"
        aria-label="Image carousel"
        onScroll={wakeRafLoop}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flipbook-scroll-slide flex items-end justify-center h-full min-h-full opacity-0 pointer-events-auto snap-center"
          >
            <span className="text-sm font-medium text-transparent">
              {slide.label}
            </span>
          </div>
        ))}
      </div>

      {/* Visible card stack - transforms driven by JS */}
      <div
        className="flipbook-stack absolute top-1/2 left-1/2 z-20 pointer-events-none"
        ref={stackRef}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flipbook-card absolute inset-0 w-full h-full"
          >
            <div className="flipbook-card__inner w-full h-full">
              <div className="flipbook-card__cover w-full h-full">
                <img
                  src={slide.src}
                  alt={slide.label}
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                />
              </div>
            </div>
            <div className="flipbook-card__body absolute -bottom-16 left-0 right-0 flex justify-center px-4 opacity-0 translate-y-2.5 transition-[opacity,transform] duration-200 ease-out">
              <a
                href={`/case-studies/${slide.slug}`}
                className="flipbook-card__cta pointer-events-auto m-0 inline-flex items-center justify-center gap-3 rounded-full bg-pink px-5 py-2 font-sans text-base font-medium leading-snug text-white transition-colors duration-200 hover:bg-pink-dark focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink sm:text-lg"
              >
                <span className="min-w-0 whitespace-normal text-center">
                  {slide.label}
                </span>
                <span
                  className="shrink-0 text-current leading-none"
                  aria-hidden="true"
                >
                  &rsaquo;
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {ENABLE_DEBUG_CONTROLS && (
        <>
          {/* Debug toggle button */}
          <button
            onClick={() => setDebugMode((prev) => !prev)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: debugMode ? '#ff0' : '#333',
              color: debugMode ? '#000' : '#fff',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              zIndex: 1000,
            }}
          >
            {debugMode ? 'EXIT DEBUG' : 'DEBUG'}
          </button>

          {/* Debug panel */}
          {debugMode && (
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: 'rgba(0,0,0,0.9)',
                color: '#fff',
                padding: '1rem',
                borderRadius: '0.5rem',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                zIndex: 1000,
                maxWidth: '320px',
                height: '400px',
              }}
            >
              <div
                style={{
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#ff0',
                }}
              >
                DEBUG MODE
              </div>
              <div style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                Progress: <strong>{debugDisplayProgress.toFixed(3)}</strong>
              </div>

              {/* Step controls */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.25rem',
                  marginBottom: '0.5rem',
                }}
              >
                <button
                  onClick={() =>
                    setManualProgress((prev) => Math.max(prev - 0.1, 0))
                  }
                  style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                >
                  -0.1
                </button>
                <button
                  onClick={() =>
                    setManualProgress((prev) => Math.max(prev - 0.02, 0))
                  }
                  style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                >
                  -0.02
                </button>
                <button
                  onClick={() =>
                    setManualProgress((prev) =>
                      Math.min(prev + 0.02, Math.max(slideCount - 1, 0))
                    )
                  }
                  style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                >
                  +0.02
                </button>
                <button
                  onClick={() =>
                    setManualProgress((prev) =>
                      Math.min(prev + 0.1, Math.max(slideCount - 1, 0))
                    )
                  }
                  style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                >
                  +0.1
                </button>
              </div>

              {/* Jump to crossover points */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.25rem',
                  marginBottom: '0.5rem',
                }}
              >
                <button
                  onClick={() => setManualProgress(0.98)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.65rem',
                  }}
                >
                  0→1 cross
                </button>
                <button
                  onClick={() => setManualProgress(1.98)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.65rem',
                  }}
                >
                  1→2 cross
                </button>
                <button
                  onClick={() => setManualProgress(2.98)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.65rem',
                  }}
                >
                  2→3 cross
                </button>
              </div>

              <div
                style={{ borderTop: '1px solid #444', paddingTop: '0.5rem' }}
              >
                {slides.map((_, i) => {
                  const offset = i - debugDisplayProgress;
                  const absOffset = Math.abs(offset);
                  const isVisible = absOffset <= CONFIG.visibleCards + 1;
                  if (absOffset > 8) return null;

                  let x = 0;
                  let zIndex = 0;
                  if (isVisible) {
                    if (absOffset < 0.5) {
                      const activeT = absOffset * 2;
                      const easedActiveT = easeOutQuad(activeT);
                      x =
                        offset >= 0
                          ? easedActiveT * CONFIG.xOffsetRight
                          : -easedActiveT * CONFIG.xOffsetLeft;
                      zIndex = 100;
                    } else {
                      x =
                        offset >= 0 ? CONFIG.xOffsetRight : -CONFIG.xOffsetLeft;
                      zIndex = Math.round(50 - absOffset * 5);
                    }
                  }

                  return (
                    <div
                      key={i}
                      style={{
                        color: !isVisible
                          ? '#444'
                          : absOffset < 0.5
                            ? '#0f0'
                            : '#888',
                        fontWeight: absOffset < 0.5 ? 'bold' : 'normal',
                      }}
                    >
                      Card {i}: off={offset.toFixed(2)}, x={x.toFixed(0)}%, z-i=
                      {zIndex}{' '}
                      {!isVisible
                        ? '(HIDDEN)'
                        : offset < 0
                          ? '(LEFT)'
                          : offset > 0.5
                            ? '(RIGHT)'
                            : '(CENTER)'}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
