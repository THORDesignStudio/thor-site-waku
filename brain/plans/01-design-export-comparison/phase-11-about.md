# About body refresh

Back to [[plans/01-design-export-comparison/overview]]

- Completed 2026-11-11; see [[plans/01-design-export-comparison/implementation-11-12]].

## Goal
- Apply editorial/team layout using the current site shell and motion.

## Changes
- Files: src/pages/about.tsx; src/data/staff.ts.
- Adapt approved existing biographies and portraits into the new body composition. Preserve working links and useful current motion; avoid copying export placeholders or changing shell behavior.
- Reuse existing motion and retained header/footer per [[plans/01-design-export-comparison/motion-reuse]].
- Each pilot can ship independently; repeat additional pages in separate bounded slices once content is ready.

## Data structures
- Existing staff records, extended only for approved portrait/role fields.

## Verification
- Static: typecheck with no new diagnostics; format checks; build/route checks where applicable. Follow current Waku conventions; focused behavior tests only when logic changes.
- Runtime: Screenshot long/short biographies at narrow/desktop widths and verify principal/team ordering, image crops, links and reduced-motion readability. No tests for unchanged content rendering.
- Apply shared checks in [[plans/01-design-export-comparison/verification]]; report unresolved baseline failures separately.

