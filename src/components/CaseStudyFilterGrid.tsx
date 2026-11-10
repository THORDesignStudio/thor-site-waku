'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CaseStudy } from '../data/case-studies';

const ALL = 'All';
const QUERY_KEY = 'topic';

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <a
      href={`/case-studies/${study.slug}`}
      className="group flex flex-col transition-transform duration-300 ease-out hover:-translate-y-2"
    >
      <div
        className="aspect-video w-full overflow-hidden rounded-[10px]"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <img
          src={study.images.cardHorizontal}
          alt={study.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="pt-fluid-4 flex flex-col gap-fluid-1">
        <p className="type-eyebrow">{study.verticals[0]}</p>

        <h3 className="text-fluid-xl font-extrabold uppercase text-navy leading-tight tracking-wide">
          {study.name}
        </h3>

        <p className="text-fluid-base font-light text-navy/80 leading-relaxed">
          {study.dek}
        </p>
      </div>
    </a>
  );
}

export function CaseStudyFilterGrid({ studies }: { studies: CaseStudy[] }) {
  const topics = useMemo(
    () => [ALL, ...new Set(studies.flatMap((study) => study.verticals))],
    [studies]
  );
  const [filter, setFilter] = useState(ALL);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get(QUERY_KEY);
    if (fromUrl && topics.includes(fromUrl)) setFilter(fromUrl);
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
      : studies.filter((study) => study.verticals.includes(filter));

  return (
    <section className="bg-white py-fluid-8 px-fluid-6 lg:px-fluid-12">
      <div className="mx-auto max-w-[1600px]">
        <div
          role="group"
          aria-label="Filter case studies by topic"
          className="mb-fluid-8 flex flex-wrap gap-fluid-2"
        >
          {topics.map((topic) => {
            const pressed = filter === topic;
            return (
              <button
                key={topic}
                type="button"
                aria-pressed={pressed}
                onClick={() => selectFilter(topic)}
                className={`chip chip-light${pressed ? ' chip-active' : ''}`}
              >
                {topic}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-fluid-6">
          {visible.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
