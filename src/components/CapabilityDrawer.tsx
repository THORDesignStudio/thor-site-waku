'use client';

import { useState } from 'react';
import { Drawer } from './Drawer';
import type { Capability } from '../data/capabilities';
import { caseStudies, type CaseStudy } from '../data/case-studies';

const DRAWER_ANIMATION_MS = 500;
const RELATED_CASE_STUDY_COUNT = 5;

interface CapabilityDrawerProps {
  capability: Capability;
  onClose?: () => void;
}

function scoreCaseStudiesForCapability(capability: Capability) {
  const relatedCapabilityWeights = new Map<string, number>();

  caseStudies.caseStudies.forEach((caseStudy) => {
    if (!caseStudy.capabilities.includes(capability.slug)) return;

    caseStudy.capabilities.forEach((caseStudyCapability) => {
      if (caseStudyCapability === capability.slug) return;

      relatedCapabilityWeights.set(
        caseStudyCapability,
        (relatedCapabilityWeights.get(caseStudyCapability) ?? 0) + 1
      );
    });
  });

  return caseStudies.caseStudies
    .map((caseStudy, index) => {
      const exactMatch = caseStudy.capabilities.includes(capability.slug);
      const relatedScore = caseStudy.capabilities.reduce(
        (score, caseStudyCapability) =>
          score + (relatedCapabilityWeights.get(caseStudyCapability) ?? 0),
        0
      );

      return {
        caseStudy,
        index,
        score: (exactMatch ? 1000 : 0) + relatedScore,
      };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (Boolean(b.caseStudy.featured) !== Boolean(a.caseStudy.featured)) {
        return b.caseStudy.featured ? 1 : -1;
      }
      return a.index - b.index;
    })
    .slice(0, RELATED_CASE_STUDY_COUNT)
    .map(({ caseStudy }) => caseStudy);
}

function toRelatedSlide(caseStudy: CaseStudy) {
  return {
    src: caseStudy.images.cardVertical,
    label: caseStudy.name,
    slug: caseStudy.slug,
  };
}

export function CapabilityDrawer({
  capability,
  onClose,
}: CapabilityDrawerProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && onClose) {
      // Small delay to allow exit animation to complete
      setTimeout(() => onClose(), DRAWER_ANIMATION_MS);
    }
  };

  // Adapt Capability to the Drawer's Item interface
  const item = {
    name: capability.name,
    description: capability.description,
    url: capability.url,
    skills: [], // Capabilities don't have skills - Drawer will hide this section
    relatedSlides:
      scoreCaseStudiesForCapability(capability).map(toRelatedSlide),
  };

  return <Drawer item={item} open={isOpen} onOpenChange={handleOpenChange} />;
}
