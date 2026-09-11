'use client';

import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';

export interface TabbedWorkItem {
  id: string;
  name: string;
  logo: string;
  image: string;
  imagePosition?: string;
  eyebrow: string;
  title: string;
  description: string;
  quote: string;
  quoteAttribution: string;
  details: Array<{
    label: string;
    value: string;
  }>;
}

interface TabbedWorkShowcaseProps {
  items: TabbedWorkItem[];
  heading: string;
  eyebrow?: string;
  description?: string;
  tabListLabel?: string;
}

export function TabbedWorkShowcase({
  items,
  heading,
  eyebrow = 'Selected work',
  description,
  tabListLabel = 'Featured work',
}: TabbedWorkShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const idPrefix = useId();
  const activeItem = items[activeIndex];

  if (!activeItem) return null;

  const tabWidth = 100 / items.length;
  const tabLeft = activeIndex * tabWidth;
  const tabRight = tabLeft + tabWidth;
  const clipPath = `polygon(
    0 var(--showcase-tab-height),
    ${tabLeft}% var(--showcase-tab-height),
    ${tabLeft}% 0,
    ${tabRight}% 0,
    ${tabRight}% var(--showcase-tab-height),
    100% var(--showcase-tab-height),
    100% 100%,
    0 100%
  )`;

  const clipStyle = { clipPath } satisfies CSSProperties;

  const selectTab = (index: number, moveFocus = false) => {
    const nextIndex = (index + items.length) % items.length;
    setActiveIndex(nextIndex);

    if (moveFocus) {
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      selectTab(index + 1, true);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      selectTab(index - 1, true);
    } else if (event.key === 'Home') {
      event.preventDefault();
      selectTab(0, true);
    } else if (event.key === 'End') {
      event.preventDefault();
      selectTab(items.length - 1, true);
    }
  };

  return (
    <section className="bg-[#080b24] px-fluid-4 py-fluid-10 text-white sm:px-fluid-6 lg:py-fluid-12">
      <div className="mx-auto max-w-[2000px]">
        <div className="mb-fluid-6 md:flex md:items-end md:justify-between md:gap-fluid-8">
          <div>
            <h2 className="max-w-[980px] text-fluid-4xl font-bold leading-[0.98] tracking-tight sm:text-fluid-5xl lg:text-fluid-6xl">
              {heading}
            </h2>
          </div>
          {description ? (
            <p className="mt-fluid-4 max-w-[390px] text-fluid-sm leading-relaxed text-white/65 md:mt-0">
              {description}
            </p>
          ) : null}
        </div>

        <div className="relative isolate flex min-h-[680px] flex-col overflow-hidden bg-black [--showcase-tab-height:4.5rem] sm:min-h-[640px] md:[--showcase-tab-height:5.5rem] lg:aspect-[16/9] lg:min-h-[700px] xl:min-h-0">
          {items.map((item, index) => (
            <img
              key={item.image}
              src={item.image}
              alt=""
              width="1600"
              height="900"
              loading={index === 0 ? 'eager' : 'lazy'}
              className={`pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover transition-[opacity,clip-path,filter] duration-700 ease-[var(--ease-out-quint)] motion-reduce:transition-none ${
                index === activeIndex
                  ? 'opacity-100 blur-0'
                  : 'opacity-0 blur-sm'
              }`}
              style={{
                ...clipStyle,
                objectPosition: item.imagePosition ?? 'center',
              }}
            />
          ))}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,8,28,0.72)_0%,rgba(6,8,28,0.06)_35%,rgba(6,8,28,0.9)_100%)] transition-[clip-path] duration-700 ease-[var(--ease-out-quint)] motion-reduce:transition-none"
            style={clipStyle}
          />

          <div
            role="tablist"
            aria-label={tabListLabel}
            className="relative z-20 grid h-[var(--showcase-tab-height)] shrink-0 bg-transparent"
            style={{
              gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
            }}
          >
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const tabId = `${idPrefix}-tab-${item.id}`;
              const panelId = `${idPrefix}-panel-${item.id}`;

              return (
                <button
                  key={item.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={tabId}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectTab(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`relative flex min-w-0 cursor-pointer items-center justify-center px-4 transition-colors duration-300 motion-reduce:transition-none ${
                    isActive
                      ? 'border-x border-t border-white/70 bg-transparent'
                      : 'bg-[#080b24] hover:bg-[#11163d]'
                  }`}
                >
                  <img
                    src={item.logo}
                    alt=""
                    className={`pointer-events-none max-h-11 w-auto max-w-[72%] object-contain drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] transition-opacity duration-300 md:max-h-14 md:max-w-[180px] ${
                      isActive ? 'opacity-100' : 'opacity-55'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="sr-only">{item.name}</span>
                </button>
              );
            })}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 z-30 h-px bg-white/70 transition-[width] duration-700 ease-[var(--ease-out-quint)] motion-reduce:transition-none"
            style={{
              top: 'var(--showcase-tab-height)',
              width: `${tabLeft}%`,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 z-30 h-px bg-white/70 transition-[width] duration-700 ease-[var(--ease-out-quint)] motion-reduce:transition-none"
            style={{
              top: 'var(--showcase-tab-height)',
              width: `${100 - tabRight}%`,
            }}
          />

          <div className="relative z-10 flex min-h-0 flex-1">
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const tabId = `${idPrefix}-tab-${item.id}`;
              const panelId = `${idPrefix}-panel-${item.id}`;

              return (
                <div
                  key={item.id}
                  id={panelId}
                  role="tabpanel"
                  aria-labelledby={tabId}
                  tabIndex={0}
                  className={
                    isActive
                      ? 'flex min-h-0 flex-1 flex-col justify-end border-x border-b border-white/70'
                      : 'hidden'
                  }
                >
                  <div className="grid gap-fluid-5 p-fluid-5 sm:p-fluid-6 md:grid-cols-[minmax(0,1.25fr)_minmax(240px,0.75fr)] md:items-end lg:grid-cols-3 lg:gap-0 lg:p-0">
                    <div className="max-w-[640px] lg:p-fluid-6">
                      <p className="mb-3 text-fluid-xs font-bold uppercase tracking-widest text-white/60">
                        {item.eyebrow}
                      </p>
                      <h3 className="text-fluid-3xl font-bold leading-tight tracking-tight lg:text-fluid-4xl">
                        {item.title}
                      </h3>
                      <p className="mt-fluid-3 max-w-[58ch] text-fluid-base font-light leading-relaxed text-white/85">
                        {item.description}
                      </p>
                    </div>

                    <blockquote className="hidden border-white/35 md:block md:border-l md:pl-fluid-5 lg:border-y-0 lg:p-fluid-6">
                      <p className="text-fluid-base leading-relaxed text-white/90">
                        “{item.quote}”
                      </p>
                      <footer className="mt-fluid-3 text-fluid-xs font-bold uppercase tracking-widest text-white/50">
                        {item.quoteAttribution}
                      </footer>
                    </blockquote>

                    <dl className="hidden h-full grid-cols-2 border-white/35 lg:grid lg:border-l">
                      {item.details.map((detail) => (
                        <div
                          key={detail.label}
                          className="flex flex-col justify-end border-l border-white/25 p-fluid-5 first:border-l-0"
                        >
                          <dt className="text-fluid-xs font-bold uppercase tracking-widest text-white/55">
                            {detail.label}
                          </dt>
                          <dd className="mt-fluid-3 text-fluid-xl font-light leading-tight">
                            {detail.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
