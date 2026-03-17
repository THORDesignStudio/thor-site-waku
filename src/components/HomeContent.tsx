'use client';

import { useState, useCallback } from 'react';
import { SkillsScroll } from './SkillsScroll';
import { Drawer } from './Drawer';
import { ProgramsCarousel } from './ProgramsCarousel';
import { CaseStudyCarousel } from './CaseStudyCarousel';
import { HomeProgramIntro } from './HomeProgramIntro';
import { HeroScene } from './HeroScene';
import { skills } from '../data/skills';

interface Skill {
  name: string;
  description: string;
  url: string;
  skills: string[];
}

export function HomeContent() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenSkill = useCallback((skill: Skill) => {
    setActiveSkill(skill);
    setDrawerOpen(true);
  }, []);

  const handleDrawerOpenChange = useCallback((open: boolean) => {
    setDrawerOpen(open);
    // Clear the active skill after the drawer has fully closed
    if (!open) {
      // Small delay to allow exit animation to complete before clearing content
      setTimeout(() => setActiveSkill(null), 300);
    }
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section - Three.js hammer with scroll-driven animation */}
      <HeroScene />

      {/* Programs Section - Circle carousel */}
      <ProgramsCarousel />

      {/* Case Studies Section - Film strip carousel */}
      <CaseStudyCarousel />

      {/* Skills Section - Scroll-driven character reveal */}
      <SkillsScroll skills={skills.skills} onOpenSkill={handleOpenSkill} />

      {/* Drawer - always rendered, controlled via open prop for proper exit animation */}
      <Drawer
        item={activeSkill}
        open={drawerOpen}
        onOpenChange={handleDrawerOpenChange}
      />
    </div>
  );
}
