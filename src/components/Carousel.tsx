'use client';

import { useState, useCallback } from 'react';
import { SkillsScroll } from './SkillsScroll';
import { SkillDrawer } from './SkillDrawer';
import { skills } from '../data/skills';

interface Skill {
  name: string;
  description: string;
  url: string;
  skills: string[];
}

export function HomeContent() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const handleOpenSkill = useCallback((skill: Skill) => {
    setActiveSkill(skill);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setActiveSkill(null);
  }, []);

  return (
    <div className="w-full">
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        <img
          src="/images/thor-hammer-hero.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="max-w-6xl w-full relative z-10">
          <h1 className="heading-xl mb-8 text-cream">
            Discoverers of
            <br />
            Elusive Solutions
          </h1>
          <div className="mt-12 flex gap-4">
            <button className="px-8 py-4 bg-pink text-white rounded-lg hover:bg-pink-dark transition-colors text-fluid-base font-medium">
              Explore More
            </button>
          </div>
        </div>
      </section>

      {/* Skills Section - Scroll-driven character reveal */}
      <SkillsScroll skills={skills.skills} onOpenSkill={handleOpenSkill} />

      {/* Drawer - controlled via state */}
      {activeSkill && (
        <SkillDrawer skill={activeSkill} onClose={handleCloseDrawer} />
      )}
    </div>
  );
}
