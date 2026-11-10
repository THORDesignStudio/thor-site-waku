import type { ReactNode } from 'react';

interface PageHeroProps {
  title: string;
  highlight?: string;
  subtitle?: ReactNode;
}

export function PageHero({ title, highlight, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)]">
      {/* Top padding clears the fixed nav in Header.tsx */}
      <div className="relative z-10 mx-auto max-w-[1350px] px-fluid-6 pt-32 sm:pt-36 pb-fluid-10">
        <h1 className="mb-fluid-2 font-sans font-extrabold uppercase leading-none tracking-tight text-fluid-6xl sm:text-fluid-8xl text-white">
          {title}
          {highlight && (
            <>
              {' '}
              <span className="text-magenta">{highlight}</span>
            </>
          )}
        </h1>
        {subtitle && (
          <div className="max-w-3xl">
            <p className="section-subtitle font-sans font-light text-fluid-2xl text-white mt-fluid-2 leading-normal">
              {subtitle}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
