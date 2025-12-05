'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { splitTextToSpans } from '../utils/splitText';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  description: string;
  url: string;
  skills: string[];
}

interface SkillsScrollProps {
  skills: Skill[];
  onOpenSkill?: (skill: Skill) => void;
}

export function SkillsScroll({ skills, onOpenSkill }: SkillsScrollProps) {
  const containerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Sync Lenis with GSAP ScrollTrigger
    const lenisScrollHandler = () => ScrollTrigger.update();
    lenis?.on('scroll', lenisScrollHandler);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=800%',
        },
      });

      // For each skill: reveal chars, hold, then fade out
      skills.forEach((_, i) => {
        const isFirst = i === 0;
        const isLast = i === skills.length - 1;

        // Fade in slide
        if (isFirst) {
          tl.to(`.skill-${i}`, { autoAlpha: 1, duration: 0.3 });
        }

        // Animate H2 characters: transparent → white (fill)
        tl.to(`.skill-${i} .title .char`, {
          color: 'white',
          stagger: 0.08,
          duration: 1,
        });

        // Animate description characters: transparent → white
        tl.to(`.skill-${i} .desc .char`, {
          color: 'white',
          stagger: 0.02,
          duration: 1.2,
        });

        // Fade in the button
        tl.to(`.skill-${i} .skill-btn`, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
        });

        // Hold the completed skill in place
        tl.to({}, { duration: 2 });

        // Fade out current, fade in next
        if (!isLast) {
          tl.to(`.skill-${i}`, { autoAlpha: 0, duration: 0.8 });
          tl.to(`.skill-${i + 1}`, { autoAlpha: 1, duration: 0.8 }, '<');
        }
      });
    }, containerRef);

    return () => {
      lenis?.off('scroll', lenisScrollHandler);
      ctx.revert();
    };
  }, [lenis, skills]);

  return (
    <section
      ref={containerRef}
      className="skills-scroll relative h-screen overflow-hidden bg-night"
    >
      {skills.map((skill, index) => (
        <div
          key={skill.name}
          className={`skill-slide skill-${index} absolute inset-0 flex flex-col justify-center px-[var(--spacing-fluid-6)] py-[var(--spacing-fluid-4)]`}
        >
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="title heading-xl">{splitTextToSpans(skill.name)}</h2>
            <p className="desc body-xl font-extrabold mt-[var(--spacing-fluid-3)] max-w-6xl text-cream/70">
              {splitTextToSpans(skill.description)}
            </p>
            <button
              onClick={() => onOpenSkill?.(skill)}
              className="skill-btn inline-flex items-center gap-2 mt-[var(--spacing-fluid-4)] px-[var(--spacing-fluid-4)] py-[var(--spacing-fluid-2)] bg-pink text-white rounded-full hover:bg-pink-dark transition-colors body-md font-medium opacity-0 translate-y-4"
            >
              Learn More
              <svg
                className="w-4 h-4"
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
      ))}
    </section>
  );
}
