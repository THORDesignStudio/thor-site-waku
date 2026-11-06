'use client';

import { useCallback, useRef, useState } from 'react';
import type {
  PointerEvent as ReactPointerEvent,
  WheelEvent as ReactWheelEvent,
} from 'react';
import {
  aerospaceSpotlightSlides,
  flagshipPublications,
} from '../data/publications';

const SWIPE_THRESHOLD_PX = 50;
const WHEEL_THRESHOLD_PX = 48;
const WHEEL_GESTURE_GAP_MS = 180;
const WHEEL_NAVIGATION_LOCK_MS = 450;

function getCarouselItem<T>(items: readonly T[], index: number): T {
  const item = items[index] ?? items[0];
  if (item === undefined) {
    throw new Error('Carousel requires at least one item');
  }
  return item;
}

function useGestureCarousel(itemCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const wheelDeltaRef = useRef(0);
  const lastWheelInputRef = useRef(0);
  const lastWheelNavigationRef = useRef(0);

  const move = useCallback(
    (direction: -1 | 1) => {
      setActiveIndex(
        (currentIndex) => (currentIndex + direction + itemCount) % itemCount
      );
    },
    [itemCount]
  );

  const goPrevious = useCallback(() => move(-1), [move]);
  const goNext = useCallback(() => move(1), [move]);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!event.isPrimary) return;

      const target = event.target;
      if (
        target instanceof Element &&
        target.closest('button, a, input, textarea, select')
      ) {
        return;
      }

      pointerStartRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    []
  );

  const handlePointerUp = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const start = pointerStartRef.current;
      pointerStartRef.current = null;
      if (!start || !event.isPrimary) return;

      const horizontalDistance = event.clientX - start.x;
      const verticalDistance = event.clientY - start.y;

      if (
        Math.abs(horizontalDistance) < SWIPE_THRESHOLD_PX ||
        Math.abs(horizontalDistance) <= Math.abs(verticalDistance)
      ) {
        return;
      }

      move(horizontalDistance < 0 ? 1 : -1);
    },
    [move]
  );

  const handlePointerCancel = useCallback(() => {
    pointerStartRef.current = null;
  }, []);

  const handleWheel = useCallback(
    (event: ReactWheelEvent<HTMLElement>) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

      if (event.cancelable) event.preventDefault();

      const now = Date.now();
      if (now - lastWheelInputRef.current > WHEEL_GESTURE_GAP_MS) {
        wheelDeltaRef.current = 0;
      }
      lastWheelInputRef.current = now;

      if (now - lastWheelNavigationRef.current < WHEEL_NAVIGATION_LOCK_MS) {
        return;
      }

      wheelDeltaRef.current += event.deltaX;
      if (Math.abs(wheelDeltaRef.current) < WHEEL_THRESHOLD_PX) return;

      move(wheelDeltaRef.current > 0 ? 1 : -1);
      wheelDeltaRef.current = 0;
      lastWheelNavigationRef.current = now;
    },
    [move]
  );

  return {
    activeIndex,
    setActiveIndex,
    goPrevious,
    goNext,
    gestureProps: {
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
      onWheel: handleWheel,
    },
  };
}

function CarouselArrow({
  direction,
  label,
  onClick,
  inverse = false,
}: {
  direction: 'left' | 'right';
  label: string;
  onClick: () => void;
  inverse?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex size-12 touch-manipulation shrink-0 cursor-pointer select-none items-center justify-center rounded-full border-2 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta ${
        inverse
          ? 'border-white/60 text-white hover:border-white hover:bg-white hover:text-[#0f1847]'
          : 'border-[#0f1847] text-[#0f1847] hover:bg-[#0f1847] hover:text-white'
      }`}
      aria-label={label}
    >
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 6l6 6-6 6'} />
      </svg>
    </button>
  );
}

function Pagination({
  activeIndex,
  count,
  label,
  onSelect,
  inverse = false,
}: {
  activeIndex: number;
  count: number;
  label: string;
  onSelect: (index: number) => void;
  inverse?: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-2" aria-label={label}>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(index)}
          className={`size-3 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta ${
            activeIndex === index
              ? 'scale-110 bg-magenta'
              : inverse
                ? 'bg-white/35 hover:bg-white/65'
                : 'bg-navy/20 hover:bg-navy/40'
          }`}
          aria-label={`Show slide ${index + 1} of ${count}`}
          aria-current={activeIndex === index ? 'true' : undefined}
        />
      ))}
    </div>
  );
}

export function FlagshipPublications() {
  const { activeIndex, setActiveIndex, goPrevious, goNext, gestureProps } =
    useGestureCarousel(flagshipPublications.length);
  const publication = getCarouselItem(flagshipPublications, activeIndex);

  return (
    <section
      className="touch-pan-y overscroll-x-contain bg-[#0f1847] px-fluid-6 py-fluid-12 text-white"
      {...gestureProps}
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="grid items-center gap-fluid-8 lg:grid-cols-[minmax(240px,340px)_1fr]">
          <div className="mx-auto w-full max-w-[340px]">
            <img
              key={publication.cover}
              src={publication.cover}
              alt={`${publication.name} magazine cover`}
              className="publication-carousel-frame aspect-[459/594] h-auto w-full object-cover shadow-2xl"
              width="459"
              height="594"
              draggable="false"
            />
          </div>

          <div
            key={publication.name}
            className="publication-carousel-frame max-w-3xl"
          >
            <p className="mb-fluid-2 text-fluid-sm font-extrabold uppercase tracking-wide text-magenta">
              {publication.category}
            </p>
            <h2 className="text-fluid-5xl font-normal leading-tight tracking-tight">
              {publication.name}
            </h2>
            <p className="mt-fluid-3 text-fluid-xl font-light leading-relaxed text-white/90">
              {publication.description}
            </p>
          </div>
        </div>

        <div className="mt-fluid-8 border-t border-white/35 pt-fluid-6">
          <div
            key={publication.name}
            className="publication-carousel-frame grid grid-cols-2 gap-fluid-4 text-center"
          >
            {publication.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-fluid-7xl font-extrabold leading-none">
                  {metric.value}
                </p>
                <p className="mt-3 text-fluid-base font-normal uppercase tracking-wide text-white/90">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-fluid-6 flex items-center justify-center gap-4">
            <CarouselArrow
              direction="left"
              label="Show previous flagship publication"
              onClick={goPrevious}
              inverse
            />
            <Pagination
              activeIndex={activeIndex}
              count={flagshipPublications.length}
              label="Select a flagship publication"
              onSelect={setActiveIndex}
              inverse
            />
            <CarouselArrow
              direction="right"
              label="Show next flagship publication"
              onClick={goNext}
              inverse
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function AerospaceSpotlight() {
  const { activeIndex, setActiveIndex, goPrevious, goNext, gestureProps } =
    useGestureCarousel(aerospaceSpotlightSlides.length);
  const slide = getCarouselItem(aerospaceSpotlightSlides, activeIndex);

  return (
    <>
      <section aria-label="Aerospace America environmental campaign">
        <picture>
          <source
            media="(max-width: 1023px)"
            srcSet="/images/verticals/publications-aa-vert.jpg"
            width="1080"
            height="1350"
          />
          <img
            src="/images/verticals/publications-aa.jpg"
            alt="Aerospace America campaign displayed in a public lobby"
            className="h-auto w-full object-cover"
            width="1600"
            height="1066"
            loading="lazy"
          />
        </picture>
      </section>

      <section
        className="touch-pan-y overscroll-x-contain bg-white px-fluid-6 py-fluid-10 text-black"
        {...gestureProps}
      >
        <div className="mx-auto grid max-w-[1580px] items-center gap-fluid-8 lg:grid-cols-2">
          <div>
            <div className="relative aspect-[721/505] w-full overflow-hidden bg-cool">
              {slide.background && (
                <img
                  src={slide.background}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  width="721"
                  height="505"
                  loading="lazy"
                  draggable="false"
                  aria-hidden="true"
                />
              )}
              <img
                key={slide.image}
                src={slide.image}
                alt={slide.alt}
                className={`publication-carousel-frame ${
                  slide.imageClassName
                    ? `absolute max-w-none drop-shadow-[7px_14px_7px_rgba(0,0,0,0.4)] ${slide.imageClassName}`
                    : 'h-full w-full object-cover'
                }`}
                width={slide.imageClassName ? '4096' : '722'}
                height={slide.imageClassName ? '3072' : '505'}
                loading="lazy"
                draggable="false"
              />
            </div>
            <div className="mt-fluid-3 flex items-center justify-center gap-4">
              <CarouselArrow
                direction="left"
                label="Show previous Aerospace America image"
                onClick={goPrevious}
              />
              <Pagination
                activeIndex={activeIndex}
                count={aerospaceSpotlightSlides.length}
                label="Select an Aerospace America campaign image"
                onSelect={setActiveIndex}
              />
              <CarouselArrow
                direction="right"
                label="Show next Aerospace America image"
                onClick={goNext}
              />
            </div>
          </div>

          <div className="max-w-3xl">
            <p className="mb-fluid-2 text-fluid-sm font-extrabold uppercase tracking-wide text-magenta">
              Spotlight
            </p>
            <h2 className="text-fluid-5xl font-normal leading-tight tracking-tight">
              Aerospace America
            </h2>
            <p className="mt-fluid-3 text-fluid-xl font-light leading-relaxed text-black/85">
              A nine-year partnership and counting, with more than 100 issues
              completed. THOR led an EXCEL Award-winning redesign, designed and
              developed the companion digital edition, and created a
              sophisticated visual system extending across web and social media.
              Our team has also produced more than 100 highly technical
              aerospace illustrations, charts, and schematics.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
