'use client';

import { CapabilitiesHomePageSection } from './CapabilitiesHomePageSection';
import { ProgramsCarousel } from './ProgramsCarousel';
import { CaseStudyCarousel } from './CaseStudyCarousel';
import { HeroScene } from './HeroScene';
import { TestimonialCards } from './TestimonialCards';

export function HomeContent() {
  return (
    <div className="w-full">
      {/* Hero Section - Three.js hammer with scroll-driven animation */}
      <HeroScene />

      {/* Capabilities Section - Scroll-triggered list with smoke parallax */}
      <CapabilitiesHomePageSection />

      {/* Programs Section - Circle carousel */}
      <ProgramsCarousel />

      {/* Case Studies Section - Film strip carousel */}
      <CaseStudyCarousel />

      {/* Testimonials Section - Fold-style accordion cards */}
      <TestimonialCards />
    </div>
  );
}
