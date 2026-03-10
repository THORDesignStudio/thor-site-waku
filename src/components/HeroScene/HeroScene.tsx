'use client';

import { Suspense, useState, useEffect, lazy } from 'react';
import { HeroText } from '../HeroText';

const HeroCanvas = lazy(() =>
  import('./HeroCanvas').then((mod) => ({ default: mod.HeroCanvas }))
);

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-pink border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export function HeroScene() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-[var(--color-night)]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/THOR_Hammer_Bkgd-purplish.jpg')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          maskImage: 'linear-gradient(to bottom, black 80vh, transparent 100vh)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 80vh, transparent 100vh)',
        }}
      />
      {/* Text - left side */}
      <div className="absolute inset-0 flex items-center z-10 pointer-events-none">
        <div className="max-w-6xl w-full mx-auto px-fluid-6">
          <HeroText />
        </div>
      </div>

      {/* 3D Canvas - right side only */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full">
        {isMounted ? (
          <Suspense fallback={<LoadingFallback />}>
            <HeroCanvas />
          </Suspense>
        ) : (
          <LoadingFallback />
        )}
      </div>
    </section>
  );
}
