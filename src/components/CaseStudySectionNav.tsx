'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';

export interface CaseStudySection {
  id: 'overview' | 'results' | 'gallery' | 'related';
  label: string;
}

export function CaseStudySectionNav({
  sections,
  url,
}: {
  sections: CaseStudySection[];
  url: string | null;
}) {
  const [active, setActive] = useState(sections[0]?.id);
  const updateActiveSection = useCallback(() => {
    const firstSection = sections[0] && document.getElementById(sections[0].id);
    const threshold =
      (firstSection
        ? parseFloat(getComputedStyle(firstSection).scrollMarginTop)
        : 128) + 16;
    let current = sections[0]?.id;
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element && element.getBoundingClientRect().top <= threshold) {
        current = section.id;
      }
    }
    setActive(current);
  }, [sections]);
  // Subscribe through the shared provider rather than running a second native
  // scroll/RAF loop alongside Lenis's animation frames.
  const lenis = useLenis(updateActiveSection, [updateActiveSection]);

  const scrollToSection = useCallback(
    (id: CaseStudySection['id']) => {
      const target = document.getElementById(id);
      if (!target || !lenis) return;
      const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const destination =
        target.getBoundingClientRect().top + window.scrollY - offset;
      const distance = Math.abs(destination - window.scrollY);

      // Native fragment/focus scrolling can precede this click. Stop the previous
      // animation and synchronize its start without changing the visible position.
      lenis.resize();
      lenis.scrollTo(window.scrollY, { immediate: true });
      lenis.scrollTo(destination, {
        duration: Math.min(2.4, Math.max(1.2, distance / 1800)),
        // Sine in/out: the same easing family as --ease-in-out-sine, with a
        // gentle start as well as a gentle finish on long page movements.
        easing: (progress) => (1 - Math.cos(Math.PI * progress)) / 2,
        immediate: window.matchMedia('(prefers-reduced-motion: reduce)')
          .matches,
        onComplete: () => target.focus({ preventScroll: true }),
      });
    },
    [lenis]
  );

  useEffect(() => {
    updateActiveSection();
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [updateActiveSection]);

  useEffect(() => {
    if (!lenis) return;
    let cancelled = false;
    const hash = window.location.hash.slice(1);
    const section = sections.find((item) => item.id === hash);
    if (!section) return;
    // Reconcile direct fragment URLs after fonts settle, without rewinding to
    // the top or fighting a user who has already started scrolling.
    const cancel = () => {
      cancelled = true;
    };
    document.fonts.ready.then(() => {
      if (!cancelled && window.location.hash === `#${section.id}`)
        scrollToSection(section.id);
    });
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('pointerdown', cancel, { passive: true });
    window.addEventListener('keydown', cancel);
    return () => {
      cancelled = true;
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('pointerdown', cancel);
      window.removeEventListener('keydown', cancel);
    };
  }, [lenis, sections, scrollToSection]);

  return (
    <nav
      id="case-section-nav"
      className="case-section-nav"
      aria-label="On this page"
    >
      <div className="case-page-width flex items-center gap-3 overflow-x-auto py-3">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`chip chip-light shrink-0${active === section.id ? ' chip-active' : ''}`}
            aria-current={active === section.id ? 'location' : undefined}
            onClick={(event) => {
              if (
                !lenis ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              )
                return;
              const target = document.getElementById(section.id);
              if (!target) return;
              event.preventDefault();
              const hash = `#${section.id}`;
              if (window.location.hash !== hash)
                window.history.pushState(window.history.state, '', hash);
              scrollToSection(section.id);
            }}
          >
            {section.label}
          </a>
        ))}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="chip chip-active shrink-0 ml-auto"
          >
            Visit website <span className="sr-only">(opens in a new tab)</span>
            <span aria-hidden="true" className="ml-2">
              ↗
            </span>
          </a>
        )}
      </div>
    </nav>
  );
}
