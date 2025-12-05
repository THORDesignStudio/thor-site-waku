'use client';

import { useRef, useLayoutEffect, useCallback } from 'react';
import { gsap } from 'gsap';

interface Skill {
  name: string;
  description: string;
  url: string;
  skills: string[];
}

interface SkillDrawerProps {
  skill: Skill;
  onClose: () => void;
}

export function SkillDrawer({ skill, onClose }: SkillDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  useLayoutEffect(() => {
    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;

    if (!drawer || !backdrop) return;

    // Set initial state
    gsap.set(backdrop, { opacity: 0 });
    gsap.set(drawer, { y: '100%' });

    // Animate in
    const tl = gsap.timeline();

    tl.to(backdrop, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });

    tl.to(
      drawer,
      {
        y: '0%',
        duration: 0.5,
        ease: 'power3.out',
      },
      '-=0.15'
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleClose = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;

    if (!drawer || !backdrop) return;

    // Animate out
    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
      },
    });

    tl.to(drawer, {
      y: '100%',
      duration: 0.4,
      ease: 'power3.in',
    });

    tl.to(
      backdrop,
      {
        opacity: 0,
        duration: 0.25,
      },
      '-=0.2'
    );
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      // Only close if clicking directly on backdrop, not on drawer
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop - night color @ 85% opacity */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-night/85 cursor-pointer"
        onClick={handleBackdropClick}
        aria-label="Close drawer"
      />

      {/* Drawer container - centers the drawer */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none">
        {/* Drawer */}
        <div
          ref={drawerRef}
          className="w-full max-w-6xl bg-cream rounded-t-3xl h-[85vh] overflow-hidden flex flex-col pointer-events-auto"
          style={{
            boxShadow:
              '0 -8px 50px rgba(0, 0, 0, 0.3), 0 -2px 20px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Drag handle indicator */}
          <div className="flex justify-center pt-[var(--spacing-fluid-2)] pb-[var(--spacing-fluid-1)]">
            <div className="w-12 h-1.5 bg-night/20 rounded-full" />
          </div>

          {/* Header with close button */}
          <div className="flex justify-end px-[var(--spacing-fluid-4)] pb-[var(--spacing-fluid-1)]">
            <button
              onClick={handleClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-night/10 hover:bg-night/20 transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5 text-night"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto px-[var(--spacing-fluid-6)] pb-[var(--spacing-fluid-8)]">
            {/* Skill content */}
            <div className="text-night">
              <h1 className="heading-lg mb-4">{skill.name}</h1>
              <p className="body-lg text-night/70 mb-8 max-w-2xl">
                {skill.description}
              </p>

              {/* Skills list */}
              <div className="mb-8">
                <h2 className="heading-sm mb-4 text-night/90">What we do</h2>
                <ul className="grid gap-3">
                  {skill.skills.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 body-md text-night/80"
                    >
                      <span className="w-2 h-2 rounded-full bg-pink flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <button className="px-8 py-4 bg-pink text-white rounded-full hover:bg-pink-dark transition-colors body-md font-medium">
                  Start a Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
