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
      <div className="relative z-10 mx-auto max-w-[var(--layout-hero)] px-fluid-6 pt-32 sm:pt-36 pb-fluid-10">
        <h1 className="type-page-headline mb-fluid-2 text-white">
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
            <p className="type-page-lede text-on-dark mt-fluid-2">{subtitle}</p>
          </div>
        )}
      </div>
    </section>
  );
}
