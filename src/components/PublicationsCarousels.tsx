'use client';

import { useCallback, useRef, useState } from 'react';
import type {
  PointerEvent as ReactPointerEvent,
  WheelEvent as ReactWheelEvent,
} from 'react';
import {
  aerospaceSpotlightImages,
  flagshipPublications,
} from '../data/publications';

const SWIPE_THRESHOLD_PX = 50;
const WHEEL_THRESHOLD_PX = 48;
const WHEEL_GESTURE_GAP_MS = 180;
const WHEEL_NAVIGATION_LOCK_MS = 450;

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

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!event.isPrimary) return;

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
    gestureProps: {
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
      onWheel: handleWheel,
    },
  };
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
          className={`size-3 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink ${
            activeIndex === index
              ? 'scale-110 bg-pink'
              : inverse
                ? 'bg-white/35 hover:bg-white/65'
                : 'bg-night/20 hover:bg-night/40'
          }`}
          aria-label={`Show slide ${index + 1} of ${count}`}
          aria-current={activeIndex === index ? 'true' : undefined}
        />
      ))}
    </div>
  );
}

export function FlagshipPublications() {
  const { activeIndex, setActiveIndex, gestureProps } = useGestureCarousel(
    flagshipPublications.length
  );
  const publication = flagshipPublications[activeIndex];

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
            <p className="mb-fluid-2 text-fluid-sm font-extrabold uppercase tracking-wide text-pink">
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
          <div className="mt-fluid-6">
            <Pagination
              activeIndex={activeIndex}
              count={flagshipPublications.length}
              label="Select a flagship publication"
              onSelect={setActiveIndex}
              inverse
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function AerospaceSpotlight() {
  const { activeIndex, setActiveIndex, gestureProps } = useGestureCarousel(
    aerospaceSpotlightImages.length
  );

  return (
    <section
      className="touch-pan-y overscroll-x-contain bg-white px-fluid-6 py-fluid-10 text-black"
      {...gestureProps}
    >
      <div className="mx-auto grid max-w-[1580px] items-center gap-fluid-8 lg:grid-cols-2">
        <div>
          <div className="aspect-[721/505] w-full overflow-hidden bg-cream-dark">
            <img
              key={aerospaceSpotlightImages[activeIndex]}
              src={aerospaceSpotlightImages[activeIndex]}
              alt={`Aerospace America campaign example ${activeIndex + 1}`}
              className="publication-carousel-frame h-full w-full object-cover"
              width="722"
              height="505"
              loading="lazy"
              draggable="false"
            />
          </div>
          <div className="mt-fluid-3">
            <Pagination
              activeIndex={activeIndex}
              count={aerospaceSpotlightImages.length}
              label="Select an Aerospace America campaign image"
              onSelect={setActiveIndex}
            />
          </div>
        </div>

        <div className="max-w-3xl">
          <p className="mb-fluid-2 text-fluid-sm font-extrabold uppercase tracking-wide text-pink">
            Spotlight
          </p>
          <h2 className="text-fluid-5xl font-normal leading-tight tracking-tight">
            Aerospace America
          </h2>
          <p className="mt-fluid-3 text-fluid-xl font-light leading-relaxed text-black/85">
            A nine-year partnership and counting, with more than 100 issues
            completed. THOR led an EXCEL Award-winning redesign, designed and
            developed the companion digital edition, and created a sophisticated
            visual system extending across web and social media. Our team has
            also produced more than 100 highly technical aerospace
            illustrations, charts, and schematics.
          </p>
        </div>
      </div>
    </section>
  );
}
