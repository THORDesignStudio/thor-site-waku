'use client';

import { useEffect, useRef, type MouseEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface AccordionItem {
  question: string;
  answer: string;
}

function Disclosure({ question, answer }: AccordionItem) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef(false);

  useEffect(() => {
    expandedRef.current = detailsRef.current?.open ?? false;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const settle = () => {
      const details = detailsRef.current;
      const panel = panelRef.current;
      if (!details || !panel) return;
      gsap.killTweensOf(panel);
      details.open = expandedRef.current;
      gsap.set(panel, { clearProps: 'height,opacity' });
      ScrollTrigger.refresh();
    };
    preference.addEventListener('change', settle);
    return () => {
      preference.removeEventListener('change', settle);
      if (panelRef.current) gsap.killTweensOf(panelRef.current);
    };
  }, []);

  function toggle(event: MouseEvent<HTMLElement>) {
    const details = detailsRef.current;
    const panel = panelRef.current;
    if (!details || !panel) return;
    event.preventDefault();
    const expanding = !expandedRef.current;
    expandedRef.current = expanding;
    const height = details.open ? panel.getBoundingClientRect().height : 0;
    gsap.killTweensOf(panel);

    // Native keyboard activation stays immediate. Pointer toggles animate from
    // their current height, so reversing a transition never jumps.
    if (
      event.detail === 0 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      details.open = expanding;
      gsap.set(panel, { clearProps: 'height,opacity' });
      ScrollTrigger.refresh();
      return;
    }
    details.open = true;
    gsap.set(panel, { height, ...(height === 0 ? { opacity: 0 } : {}) });
    gsap.to(panel, {
      height: expanding ? panel.scrollHeight : 0,
      opacity: expanding ? 1 : 0,
      duration: 0.2,
      ease: 'power2.out',
      onComplete: () => {
        details.open = expanding;
        gsap.set(panel, { clearProps: 'height,opacity' });
        ScrollTrigger.refresh();
      },
    });
  }

  return (
    <details
      ref={detailsRef}
      className="accordion-item border-b border-divider"
    >
      <summary
        onClick={toggle}
        className="accordion-trigger flex cursor-pointer items-start justify-between gap-6 py-6 text-navy"
      >
        <h3 className="type-card-title">{question}</h3>
        <span
          className="accordion-icon relative mt-1 block h-6 w-6 shrink-0 text-magenta"
          aria-hidden="true"
        >
          <span className="absolute top-1/2 left-0 h-0.5 w-6 bg-current" />
          <span className="accordion-icon-line absolute top-1/2 left-0 h-0.5 w-6 bg-current" />
        </span>
      </summary>
      <div ref={panelRef} className="overflow-hidden">
        <p className="type-article-body max-w-[var(--layout-article)] pb-6 pr-4">
          {answer}
        </p>
      </div>
    </details>
  );
}

export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  return (
    <div className="border-t border-divider">
      {items.map((item) => (
        <Disclosure key={item.question} {...item} />
      ))}
    </div>
  );
}
