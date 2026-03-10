'use client';

import { useState, useEffect, useCallback } from 'react';
import { capabilities } from '../data/capabilities';

const CYCLE_INTERVAL = 3000;
const shortValues = capabilities.capabilities.map((c) => c.short);

export function HeroText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const cycleWord = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % shortValues.length);
      setIsAnimating(false);
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
          className="inline-block text-pink transition-all duration-300"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateY(-20px)' : 'translateY(0)',
          }}
        >
          {currentWord}
        </span>
        <br />
        is about to get
        <span className="block sm:inline">
          <br className="hidden sm:block" />a lot better.
        </span>
      </h1>
    </div>
  );
}
