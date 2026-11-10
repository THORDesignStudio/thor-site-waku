'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CaseStudy } from '../data/case-studies';
import {
  getCaseStudyTopics,
  resolveCaseStudyTopic,
} from '../data/case-study-topics';

const ALL = 'All';
const QUERY_KEY = 'topic';

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <a
      href={`/case-studies/${study.slug}`}
      className="case-study-card group flex flex-col"
    >
      <div
        className="aspect-video w-full overflow-hidden rounded-2xl"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <img
          src={study.images.cardHorizontal}
          alt={study.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="pt-fluid-4 flex flex-col gap-fluid-1">
        <p className="type-eyebrow">{getCaseStudyTopics(study)[0]}</p>

        <h3 className="type-card-title text-navy">{study.name}</h3>

        <p className="type-card-summary">{study.dek}</p>
      </div>
    </a>
  );
}

export function CaseStudyFilterGrid({ studies }: { studies: CaseStudy[] }) {
  const topics = useMemo(
    () => [ALL, ...new Set(studies.flatMap(getCaseStudyTopics))],
    [studies]
  );
  const [filter, setFilter] = useState(ALL);

  useEffect(() => {
    const sync = () => {
      const fromUrl = new URLSearchParams(window.location.search).get(
        QUERY_KEY
      );
      setFilter(resolveCaseStudyTopic(fromUrl, topics));
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, [topics]);

  const selectFilter = (topic: string) => {
    setFilter(topic);
    const url = new URL(window.location.href);
    if (topic === ALL) url.searchParams.delete(QUERY_KEY);
    else url.searchParams.set(QUERY_KEY, topic);
    window.history.replaceState(window.history.state, '', url);
  };

  const visible =
    filter === ALL
      ? studies
      : studies.filter((study) => getCaseStudyTopics(study).includes(filter));

  return (
    <section className="bg-white" aria-label="Case studies">
      <div className="case-section-nav">
        <div className="case-page-width flex items-center gap-4 py-3">
          <div
            role="group"
            aria-label="Filter case studies by topic"
            className="flex flex-1 items-center gap-3 overflow-x-auto py-1"
          >
            {topics.map((topic) => {
              const pressed = filter === topic;
              return (
                <button
                  key={topic}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => selectFilter(topic)}
                  className={`chip chip-light shrink-0${pressed ? ' chip-active' : ''}`}
                  aria-controls="case-study-results"
                >
                  {topic}
                </button>
              );
            })}
          </div>
          <p
            className="type-caption shrink-0"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {visible.length} <span className="hidden sm:inline">studies</span>
            <span className="sr-only sm:hidden">studies</span>
          </p>
        </div>
      </div>

      <div className="case-page-width py-fluid-8">
        <div
          id="case-study-results"
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-fluid-6"
        >
          {visible.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
