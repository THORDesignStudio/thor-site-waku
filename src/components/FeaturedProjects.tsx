'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { FeaturedProject } from '../data/featured-projects';

export const FEATURED_INTERVAL = 8000;
export function FeaturedProjects({
  projects,
}: {
  projects: FeaturedProject[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [inView, setInView] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [instant, setInstant] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const pointerRef = useRef<{
    x: number;
    y: number;
    id: number;
    target: EventTarget | null;
  } | null>(null);
  const suppressClickRef = useRef(false);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    const visibility = () => setDocumentVisible(!document.hidden);
    visibility();
    document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold: 0.1 }
    );
    if (rootRef.current) observer.observe(rootRef.current);
    return () => {
      media.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', visibility);
      observer.disconnect();
    };
  }, []);
  const playing =
    !paused &&
    !hovered &&
    !focused &&
    !reducedMotion &&
    inView &&
    documentVisible &&
    projects.length > 1;
  useEffect(() => {
    if (!inView || !documentVisible || projects.length < 2) return;
    const next = projects[(activeIndex + 1) % projects.length];
    if (next) {
      const image = new Image();
      image.src = next.image.src;
    }
  }, [activeIndex, inView, documentVisible, projects]);
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      setInstant(false);
      setActiveIndex((index) => (index + 1) % projects.length);
    }, FEATURED_INTERVAL);
    return () => clearTimeout(timer);
  }, [playing, activeIndex, projects.length]);
  if (!projects.length) return null;
  const select = (index: number, keyboard = false) => {
    setInstant(keyboard);
    setPaused(true);
    setActiveIndex((index + projects.length) % projects.length);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    let next: number;
    if (event.key === 'ArrowLeft') next = activeIndex - 1;
    else if (event.key === 'ArrowRight') next = activeIndex + 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = projects.length - 1;
    else return;
    event.preventDefault();
    select(next, true);
    if ((event.target as HTMLElement).getAttribute('role') === 'tab')
      tabsRef.current[(next + projects.length) % projects.length]?.focus();
  };
  return (
    <section
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured case studies"
      className="bg-navy text-white"
      onKeyDown={onKeyDown}
      onMouseEnter={() => {
        if (matchMedia('(hover: hover) and (pointer: fine)').matches)
          setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <div
        className="home-feature-stage grid bg-magenta"
        style={{ touchAction: 'pan-y pinch-zoom' }}
        onPointerDown={(event) => {
          if (event.pointerType === 'touch' || event.pointerType === 'pen') {
            pointerRef.current = {
              x: event.clientX,
              y: event.clientY,
              id: event.pointerId,
              target: event.target,
            };
            suppressClickRef.current = false;
          }
        }}
        onPointerUp={(event) => {
          const start = pointerRef.current;
          pointerRef.current = null;
          if (!start || start.id !== event.pointerId) return;
          const dx = event.clientX - start.x,
            dy = event.clientY - start.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            suppressClickRef.current = true;
            select(activeIndex + (dx < 0 ? 1 : -1));
          }
        }}
        onPointerCancel={() => {
          pointerRef.current = null;
        }}
        onClickCapture={(event) => {
          if (suppressClickRef.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClickRef.current = false;
          }
        }}
      >
        {projects.map((project, index) => (
          <article
            key={project.slug}
            id={`featured-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`featured-tab-${index}`}
            aria-hidden={index !== activeIndex}
            inert={index !== activeIndex}
            className="home-feature-panel col-start-1 row-start-1 flex min-w-0 flex-col"
            data-active={index === activeIndex}
            data-instant={instant}
          >
            <div className="home-feature-art bg-[linear-gradient(to_bottom,var(--color-navy)_50%,var(--color-magenta)_50%)]">
              <div className="home-feature-art-inner relative mx-auto max-w-[var(--layout-page)] px-fluid-6">
                <a
                  href={project.url}
                  aria-label={`Read ${project.name} case study`}
                  className="block overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <img
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    fetchPriority={index === 0 ? 'high' : 'low'}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="aspect-[2/1] w-full object-cover"
                    draggable={false}
                  />
                </a>
                <a
                  href={project.url}
                  className="home-feature-cta mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-navy shadow-lg md:absolute md:right-[calc(var(--spacing-fluid-6)+1.5rem)] md:bottom-6 md:mt-0"
                >
                  Read the case study{' '}
                  <span aria-hidden="true" className="ml-3">
                    →
                  </span>
                </a>
              </div>
            </div>
            <div className="home-feature-copy flex-1 bg-magenta">
              <div className="mx-auto max-w-[var(--layout-page)] px-fluid-6 py-fluid-8">
                <p className="home-feature-eyebrow type-eyebrow !text-white mb-4">
                  Featured case study / {project.name}
                </p>
                <h2 className="home-feature-heading type-section-heading text-navy">
                  {project.headline}{' '}
                  <span className="text-white">{project.highlight}</span>
                </h2>
                <div className="home-feature-proof mt-fluid-6 grid items-start gap-fluid-8 border-t border-white/40 pt-fluid-6 lg:grid-cols-2">
                  <p className="home-feature-summary type-page-lede text-white">
                    {project.summary}
                  </p>
                  <dl
                    className={`home-feature-metrics grid gap-fluid-6 md:gap-0 ${project.metrics.length > 1 ? 'grid-cols-2 divide-x divide-white/40' : ''}`}
                  >
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.value}
                        className="min-w-0 md:px-fluid-6 md:text-center"
                      >
                        <dt className="type-feature-name text-white">
                          {metric.value}
                        </dt>
                        <dd className="mt-2 text-base leading-relaxed text-white">
                          {metric.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="home-feature-controls mx-auto grid max-w-[var(--layout-page)] items-start gap-fluid-8 px-fluid-6 py-fluid-8 lg:grid-cols-[1fr_auto]">
        <div
          role="tablist"
          aria-label="Choose a featured case study"
          className="home-feature-tabs grid min-w-0 grid-cols-3 gap-fluid-4"
        >
          {projects.map((project, index) => (
            <button
              key={project.slug}
              ref={(element) => {
                tabsRef.current[index] = element;
              }}
              id={`featured-tab-${index}`}
              role="tab"
              type="button"
              aria-selected={index === activeIndex}
              aria-controls={`featured-panel-${index}`}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => select(index)}
              className={`relative min-w-0 border-t-4 pt-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta ${index === activeIndex ? 'border-magenta text-white' : 'border-indigo text-white/60'}`}
            >
              <span className="block font-[family-name:var(--font-family-display)] text-[clamp(1.125rem,2.4vw,2rem)] font-semibold uppercase leading-tight">
                {project.name}
              </span>
              <span className="mt-2 hidden text-sm leading-snug sm:block">
                {project.tabSummary}
              </span>
            </button>
          ))}
        </div>
        <div className="home-feature-actions flex flex-wrap items-center gap-3">
          <span className="text-sm font-bold" aria-hidden="true">
            {activeIndex + 1} / {projects.length}
          </span>
          <button
            type="button"
            aria-label="Previous featured case study"
            onClick={() => select(activeIndex - 1)}
            className="flex size-11 items-center justify-center rounded-full border-2 border-white text-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next featured case study"
            onClick={() => select(activeIndex + 1)}
            className="flex size-11 items-center justify-center rounded-full border-2 border-white text-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta"
          >
            →
          </button>
          <button
            type="button"
            disabled={reducedMotion}
            onClick={() => setPaused((value) => !value)}
            className="min-h-11 border-b-2 border-magenta text-xs font-extrabold uppercase tracking-wide disabled:opacity-70"
            aria-label={
              reducedMotion
                ? 'Autoplay disabled for reduced motion'
                : paused
                  ? 'Play featured slideshow'
                  : 'Pause featured slideshow'
            }
          >
            {reducedMotion ? 'Autoplay off' : paused ? 'Play' : 'Pause'}
          </button>
          <a
            href="/case-studies"
            className="ml-2 inline-flex min-h-11 items-center text-xs font-extrabold uppercase tracking-wide"
          >
            All case studies{' '}
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </a>
        </div>
      </div>
      <p
        className="sr-only"
        aria-live={playing ? 'off' : 'polite'}
        aria-atomic="true"
      >
        {projects[activeIndex]?.name}, slide {activeIndex + 1} of{' '}
        {projects.length}
      </p>
    </section>
  );
}
