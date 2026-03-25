'use client';

import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ensure GSAP plugin is registered only once
gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to sync Lenis smooth scroll with GSAP ScrollTrigger.
 * This eliminates code duplication across components that need scroll-triggered animations.
 *
 * Usage:
 * ```tsx
 * const sectionRef = useRef<HTMLElement>(null);
 * const ctxRef = useLenisScrollTrigger(sectionRef);
 *
 * useLayoutEffect(() => {
 *   if (!sectionRef.current) return;
 *
 *   const ctx = gsap.context(() => {
 *     // Your ScrollTrigger animations here
 *   }, sectionRef);
 *
 *   ctxRef.current = ctx;
 *   return () => ctx.revert();
 * }, []);
 * ```
 */
export function useLenisScrollTrigger<T extends HTMLElement>(
  containerRef: React.RefObject<T | null>
) {
  const lenis = useLenis();
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Sync Lenis with GSAP ScrollTrigger
    const lenisScrollHandler = () => ScrollTrigger.update();
    lenis?.on('scroll', lenisScrollHandler);

    return () => {
      lenis?.off('scroll', lenisScrollHandler);
    };
  }, [lenis, containerRef]);

  return ctxRef;
}
