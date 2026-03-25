'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { capabilities } from '../data/capabilities';

const CYCLE_INTERVAL = 3000;
const ANIMATION_DURATION = 300;
const shortValues = capabilities.capabilities.map((c) => c.short);

export function HeroText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const prevHeightRef = useRef<number>(0);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cleanupTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimeouts = useCallback(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
    if (cleanupTimeoutRef.current) {
      clearTimeout(cleanupTimeoutRef.current);
      cleanupTimeoutRef.current = null;
    }
  }, []);

  const cycleWord = useCallback(() => {
    if (!spanRef.current) return;

    // Clear any existing timeouts to prevent overlapping animations
    clearTimeouts();

    // Store current height before changing word
    prevHeightRef.current = spanRef.current.getBoundingClientRect().height;

    setIsAnimating(true);

    // Step 1: Wait for fade-out animation, then change word
    animationTimeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % shortValues.length);

      // Step 2: After state update, measure new height and animate
      requestAnimationFrame(() => {
        if (!spanRef.current) return;
        const newHeight = spanRef.current.getBoundingClientRect().height;

        // Only animate if height actually changed
        if (prevHeightRef.current !== newHeight) {
          // Set explicit height to previous value
          spanRef.current.style.height = `${prevHeightRef.current}px`;

          // Force reflow
          void spanRef.current.getBoundingClientRect();

          // Animate to new height
          spanRef.current.style.transition =
            'opacity 300ms ease, transform 300ms ease, height 300ms ease';
          spanRef.current.style.height = `${newHeight}px`;

          // Clean up after animation completes
          cleanupTimeoutRef.current = setTimeout(() => {
            if (spanRef.current) {
              spanRef.current.style.height = '';
              spanRef.current.style.transition =
                'opacity 300ms ease, transform 300ms ease';
            }
          }, ANIMATION_DURATION);
        }

        setIsAnimating(false);
      });
    }, ANIMATION_DURATION);
  }, [clearTimeouts]);

  useEffect(() => {
    const interval = setInterval(cycleWord, CYCLE_INTERVAL);
    return () => {
      clearInterval(interval);
      clearTimeouts();
    };
  }, [cycleWord, clearTimeouts]);

  const currentWord = shortValues[currentIndex];

  return (
    <div>
      <h1
        className="font-sans font-extrabold leading-tight text-cream"
        style={{ fontSize: 'clamp(3rem, 5vw + 1rem, 5rem)' }}
      >
        Your{' '}
        <span
          ref={spanRef}
          className="inline-block max-[900px]:block text-pink"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateY(-20px)' : 'translateY(0)',
            transition: 'opacity 300ms ease, transform 300ms ease',
          }}
        >
          {currentWord}
        </span>
        <span className="min-[900px]:block">is about to get</span>
        <span className="block">a lot better.</span>
      </h1>
      <p className="font-sans font-light text-fluid-2xl text-cream mt-fluid-2 leading-normal">
        Learn how THOR brings our clients to the next level.
      </p>
    </div>
  );
}
