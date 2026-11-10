# Case detail body pilot

Back to [[plans/01-design-export-comparison/overview]]

- Implemented 2026-11-10; see [[plans/01-design-export-comparison/implementation-01-04]].

## Goal
- Adapt one existing study to the new body layout while retaining current data/related behavior.

## Changes
- Files: src/data/case-studies.ts; src/pages/case-studies/[slug].tsx; src/components/CaseStudySectionNav.tsx (proposed).
- Pilot a complete study with circle hero, overview/results and optional section anchors (the user later specified a non-sticky bar). Preserve every slug, SEO and weighted related work; reuse existing Flipbook behavior. Enable new sections only when populated.
- Reuse existing motion and retained header/footer per [[plans/01-design-export-comparison/motion-reuse]].
- Each pilot can ship independently; repeat additional pages in separate bounded slices once content is ready.

## Data structures
- Optional CaseStudy section/hero metadata; CaseStudySection anchor identifiers.

## Verification
- Static: typecheck with no new diagnostics; format checks; build/route checks where applicable. Follow current Waku conventions; focused behavior tests only when logic changes.
- Runtime: Check all 17 pages still render; screenshot the pilot and one legacy-shaped entry. Test Lenis offsets/active anchors with Lenis and keyboard. Add focused tests only for changed section/ranking logic.
- Apply shared checks in [[plans/01-design-export-comparison/verification]]; report unresolved baseline failures separately.

