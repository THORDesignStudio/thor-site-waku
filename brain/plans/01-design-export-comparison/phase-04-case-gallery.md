# Case gallery and lightbox

Back to [[plans/01-design-export-comparison/overview]]

- Implemented 2026-11-10; see [[plans/01-design-export-comparison/implementation-01-04]].

## Goal
- Add optional galleries without degrading studies lacking approved images.

## Changes
- Files: src/data/case-studies.ts; src/components/CaseStudyGallery.tsx (proposed); src/pages/case-studies/[slug].tsx.
- Use existing original assets before export composites. Reuse shared close/lock/focus hooks for an accessible gallery dialog. Hide absent galleries; schedule remaining content per study rather than batch replacing all pages.
- Reuse existing motion and retained header/footer per [[plans/01-design-export-comparison/motion-reuse]].
- Each pilot can ship independently; repeat additional pages in separate bounded slices once content is ready.

## Data structures
- GalleryImage with source, alt, caption and optional dimensions.

## Verification
- Static: typecheck with no new diagnostics; format checks; build/route checks where applicable. Follow current Waku conventions; focused behavior tests only when logic changes.
- Runtime: Test open/close, Escape, focus containment/restoration and scroll unlock; check touch, reduced motion and route exit. Screenshot mixed portrait/landscape art; reject placeholder boxes.
- Apply shared checks in [[plans/01-design-export-comparison/verification]]; report unresolved baseline failures separately.

