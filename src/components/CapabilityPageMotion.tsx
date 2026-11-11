'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenisScrollTrigger } from '../hooks/useLenisScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Match the homepage header entrances, using the same root Lenis controller.
export function CapabilityPageMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useLenisScrollTrigger(rootRef);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = gsap.matchMedia(root);

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ownedTargets: HTMLElement[] = [];
      root
        .querySelectorAll<HTMLElement>('[data-section-reveal]')
        .forEach((group) => {
          const marked = Array.from(
            group.querySelectorAll<HTMLElement>('[data-reveal]')
          ).filter(
            (target) => target.closest('[data-section-reveal]') === group
          );
          const targets = group.hasAttribute('data-reveal-self')
            ? [group]
            : marked.length
              ? marked
              : (Array.from(group.children) as HTMLElement[]);
          if (!targets.length) return;
          ownedTargets.push(...targets);
          const entrance = gsap.fromTo(
            targets,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: 'power2.out',
              paused: true,
            }
          );
          ScrollTrigger.create({
            trigger: group,
            start: 'top 80%',
            onEnter: () => {
              entrance.timeScale(1).play();
            },
            onEnterBack: () => {
              entrance.timeScale(1).play();
            },
            onLeaveBack: () => {
              entrance.timeScale(0.8 / 0.5).reverse();
            },
          });
        });

      return () => {
        gsap.killTweensOf(ownedTargets);
        gsap.set(ownedTargets, { clearProps: 'opacity,transform' });
      };
    });

    let mounted = true;
    document.fonts.ready.then(() => {
      if (mounted) ScrollTrigger.refresh();
    });
    return () => {
      mounted = false;
      media.revert();
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
