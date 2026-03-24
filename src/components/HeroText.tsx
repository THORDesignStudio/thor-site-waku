'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { capabilities } from '../data/capabilities';

const CYCLE_INTERVAL = 3000;
const shortValues = capabilities.capabilities.map((c) => c.short);

export function HeroText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const prevHeightRef = useRef<number>(0);

  const cycleWord = useCallback(() => {
    if (!spanRef.current) return;

    // Store current height before changing word
    prevHeightRef.current = spanRef.current.getBoundingClientRect().height;

    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % shortValues.length);

      // After state update, measure new height and animate
      requestAnimationFrame(() => {
        if (!spanRef.current) return;
        const newHeight = spanRef.current.getBoundingClientRect().height;

        // Only animate if height actually changed
        if (prevHeightRef.current !== newHeight) {
          // Set explicit height to previous value
          spanRef.current.style.height = `${prevHeightRef.current}px`;

          // Force reflow
          spanRef.current.getBoundingClientRect();

          // Animate to new height (add to existing transitions)
          spanRef.current.style.transition =
            'opacity 300ms ease, transform 300ms ease, height 300ms ease';
          spanRef.current.style.height = `${newHeight}px`;

          // Clean up after animation
          setTimeout(() => {
            if (spanRef.current) {
              spanRef.current.style.height = '';
              spanRef.current.style.transition =
                'opacity 300ms ease, transform 300ms ease';
            }
          }, 300);
        }

        setIsAnimating(false);
      });
    }, 300);
  }, []);

  useEffect(() => {
    const interval = setInterval(cycleWord, CYCLE_INTERVAL);
    return () => clearInterval(interval);
  }, [cycleWord]);

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
