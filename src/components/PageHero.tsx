import type { ReactNode } from 'react';

interface PageHeroProps {
  title: string;
  highlight?: string;
  subtitle?: ReactNode;
  eyebrow?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  title,
  highlight,
  subtitle,
  eyebrow,
  children,
  className = '',
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-[var(--color-navy)] ${className}`}
    >
      {/* Top padding clears the fixed nav in Header.tsx */}
      <div className="relative z-10 mx-auto max-w-[var(--layout-hero)] px-fluid-6 pt-32 sm:pt-36 pb-fluid-10">
        {eyebrow && (
          <p className="type-eyebrow !text-on-dark mb-5">{eyebrow}</p>
        )}
        <h1 className="type-page-headline mb-fluid-2 text-white break-words">
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
        {children && <div className="mt-fluid-6">{children}</div>}
      </div>
    </section>
  );
}
