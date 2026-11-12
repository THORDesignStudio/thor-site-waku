# Homepage featured project pilot

Back to [[plans/01-design-export-comparison/overview]]

- All three featured slides completed 2026-11-12 using the HTML and two user-provided PDF comps; see [[plans/01-design-export-comparison/implementation-05-06]].

## Goal
- Introduce the v2 featured composition using existing motion infrastructure.

## Changes
- Files: src/components/FeaturedProjects.tsx (proposed); src/data/featured-projects.ts (proposed); src/pages/index.tsx.
- Pilot one complete static slide first, then enable approved additional slides through existing GSAP/CSS patterns. Use approved metrics; CTA below image on mobile is provisional. Keep current shell.
- Reuse existing motion and retained header/footer per [[plans/01-design-export-comparison/motion-reuse]].
- Each pilot can ship independently; repeat additional pages in separate bounded slices once content is ready.

## Data structures
- FeaturedProject references existing CaseStudy slug and approved metric records.

## Verification
- Static: typecheck with no new diagnostics; format checks; build/route checks where applicable. Follow current Waku conventions; focused behavior tests only when logic changes.
- Runtime: Test slider timer/pause/keyboard/swipe in focused tests once enabled; pause on hover/focus/user control and disable autoplay for reduced motion. Screenshot desktop/mobile with existing header.
- Apply shared checks in [[plans/01-design-export-comparison/verification]]; report unresolved baseline failures separately.

