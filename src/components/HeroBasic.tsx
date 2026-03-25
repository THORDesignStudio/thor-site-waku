'use client';

import { HeroText } from './HeroText';

export function HeroBasic() {
  return (
    <section className="relative h-screen overflow-hidden bg-[var(--color-night)]">
      <style>{`
        .hero-mask {
          --gradient-start: 80vh;
        }
        @media (max-width: 899px) {
          .hero-mask {
            --gradient-start: 50vh;
          }
        }
      `}</style>
      <picture className="absolute inset-0">
        <source
          media="(max-width: 900px)"
          srcSet="/images/hero-hammers/THOR_Hammer_purple2_vertical_900px.jpg"
        />
        <source
          media="(max-width: 1200px)"
          srcSet="/images/hero-hammers/THOR_Hammer_purple2_1600px.jpg"
        />
        <img
          src="/images/hero-hammers/THOR_Hammer_purple2_2000px.jpg"
          alt="THOR Hammer"
          fetchPriority="high"
          className="hero-mask absolute inset-0 w-full h-full object-cover"
          style={{
            maskImage:
              'linear-gradient(to bottom, black var(--gradient-start), transparent 100vh)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black var(--gradient-start), transparent 100vh)',
          }}
        />
      </picture>

      {/* Text - left side */}
      <div className="absolute inset-0 flex items-center z-10 pointer-events-none">
        <div className="max-w-6xl w-full mx-auto px-fluid-6">
          <HeroText />
        </div>
      </div>
    </section>
  );
}
