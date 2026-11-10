# Homepage body composition

Back to [[plans/01-design-export-comparison/overview]]

## Goal
- Extend the established baseline through the lower home sections.

## Changes
- Files: src/pages/index.tsx; src/components/HomeSections.tsx (proposed); src/data/home-sections.ts (proposed).
- Compose discipline groups, results and sector/social content from approved records. Reuse existing case/testimonial/carousel components and motion where appropriate. Publish sector links only once targets exist; curated social content first.
- Reuse existing motion and retained header/footer per [[plans/01-design-export-comparison/motion-reuse]].
- Each pilot can ship independently; repeat additional pages in separate bounded slices once content is ready.

## Data structures
- HomeSection, proof references and curated SocialLink records.

## Verification
- Static: typecheck with no new diagnostics; format checks; build/route checks where applicable. Follow current Waku conventions; focused behavior tests only when logic changes.
- Runtime: Screenshot section order and spacing at narrow/intermediate/desktop widths; verify every CTA, no draft links or conflicting metrics. Check scroll cleanup/reduced motion for reused animated blocks.
- Apply shared checks in [[plans/01-design-export-comparison/verification]]; report unresolved baseline failures separately.

