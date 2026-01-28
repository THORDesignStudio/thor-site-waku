'use client';

import { useState, useCallback } from 'react';
import { useLenis } from 'lenis/react';
import { capabilities } from '../data/capabilities';

// ============================================================================
// Constants
// ============================================================================

// Fixed angles for each item (degrees from top, 0° = 12 o'clock)
const ITEM_ANGLES = [45, 110, 180, 250, 315];
const ITEM_COUNT = 5;

const RING_RADIUS = 40; // percentage of container

// Card dimensions (fixed to avoid transitioning to 'auto')
const THUMBNAIL_SIZE = 'clamp(100px, 10vmin, 150px)';
const CARD_WIDTH = '380px';
const CARD_HEIGHT = '380px';

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

function SpaceParallaxBackground({ scrollY }: { scrollY: number }) {
  return (
    <div className="space-parallax">
      {/* Gradient background layer */}
      <div className="space-parallax__gradient" />

      {/* Image layers - rendered in array order (back to front) */}
      {PARALLAX_LAYERS.map((layer, i) => (
        <div
          key={layer.src}
          className="space-parallax__layer"
          style={{
            zIndex: i + 1,
            backgroundImage: `url(${layer.src})`,
            transform: `translate3d(0, ${layer.offset + scrollY * layer.speed}px, 0)`,
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

  // Position on circle
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

export function CapabilitiesCarousel() {
  // null means no item is active - all on the outer circle
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for parallax effect
  useLenis(({ scroll }) => {
    setScrollY(scroll);
  });

  const items = capabilities.capabilities;

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

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------

  const containerSize = 'min(90vw, 90vh)';

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Space parallax background */}
      <SpaceParallaxBackground scrollY={scrollY} />

      {/* Main container */}
      <div
        className="relative z-10"
        style={{
          width: containerSize,
          height: containerSize,
        }}
      >
        {/* Circle ring (decorative) */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: `${RING_RADIUS * 2}%`,
            height: `${RING_RADIUS * 2}%`,
            left: `${50 - RING_RADIUS}%`,
            top: `${50 - RING_RADIUS}%`,
            border: '1px dashed rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
          }}
        />

        {/* Orbiting planet - wrapper handles the orbit rotation */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: `${RING_RADIUS * 2}%`,
            height: `${RING_RADIUS * 2}%`,
            left: `${50 - RING_RADIUS}%`,
            top: `${50 - RING_RADIUS}%`,
            animation: 'orbit-rotate 30s linear infinite',
            zIndex: 0,
          }}
        >
          {/* The planet itself - positioned at the top center of the orbit wrapper */}
          <div
            className="absolute rounded-full"
            style={{
              width: '25px',
              height: '25px',
              left: '50%',
              top: '0',
              transform: 'translate(-50%, -50%)',
              background:
                'linear-gradient(135deg, var(--color-pink) 0%, var(--color-spicy-purple) 100%)',
              boxShadow: '0 0 10px rgba(234, 43, 111, 0.4)',
            }}
          />
        </div>

        {/* Thumbnails / Cards */}
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const position = getItemPosition(index);

          return (
            <button
              key={item.name}
              onClick={() => goToIndex(index)}
              className="absolute focus:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 text-left"
              style={{
                left: `${isActive ? 50 : position.x}%`,
                top: `${isActive ? 50 : position.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isActive ? 10 : 1,
                willChange: 'left, top',
                transitionProperty: 'left, top, z-index',
                transitionDuration: 'var(--spring-common-duration)',
                transitionTimingFunction: 'var(--spring-common)',
              }}
              aria-label={`View ${item.name}`}
              aria-current={isActive ? 'true' : undefined}
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
                  className="w-full h-full object-contain p-[15%]"
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
                <div
                  className="absolute inset-0"
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
                    className="w-full h-full object-contain p-[15%]"
                    style={{
                      filter: 'grayscale(0.3)',
                    }}
                  />
                </div>

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
                    <h3 className="text-fluid-xl heading-sm font-semibold text-night leading-tight text-center mt-fluid-3 mb-fluid-2">
                      {item.name}
                    </h3>

                    {/* Dek */}
                    <p className="text-fluid-base text-center text-night/80 body-md mb-fluid-3">
                      {item.dek}
                    </p>

                    {/* Description */}
                    <p className="text-fluid-sm text-night/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation arrows */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
        <button
          onClick={goToPrev}
          className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink"
          aria-label="Previous capability"
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
          className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink"
          aria-label="Next capability"
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
    </section>
  );
}
