# Complete the established layout baseline

Back to [[plans/01-design-export-comparison/overview]]

- Implemented 2026-11-10; see [[plans/01-design-export-comparison/implementation-01-04]].

## Goal
- Use the current case landing and styleguide as references for future pages.

## Changes
- Files: src/styles.css; src/pages/styleguide.tsx; src/components/PageHero.tsx.
- Document current widths, gutters, reading measure and rhythm; choose consistent values from current baseline and export evidence. Preserve current case landing composition; optional grid changes require a separate bounded follow-up. Keep retained header clearance.
- Reuse existing motion and retained header/footer per [[plans/01-design-export-comparison/motion-reuse]].
- Each pilot can ship independently; repeat additional pages in separate bounded slices once content is ready.

## Data structures
- Layout tokens; existing PageHeroProps and semantic type classes.

## Verification
- Static: typecheck with no new diagnostics; format checks; build/route checks where applicable. Follow current Waku conventions; focused behavior tests only when logic changes.
- Runtime: Screenshot /styleguide and /case-studies at 375/390/768/1440px; verify actual licensed font loading, long titles and retained header/footer. No layout-only unit tests needed.
- Apply shared checks in [[plans/01-design-export-comparison/verification]]; report unresolved baseline failures separately.

