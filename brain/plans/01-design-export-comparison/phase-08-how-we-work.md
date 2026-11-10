# How We Work landing

Back to [[plans/01-design-export-comparison/overview]]

## Goal
- Introduce the four content groups with stable anchors.

## Changes
- Files: src/data/how-we-work.ts (proposed); src/pages/how-we-work.tsx (proposed); src/config/redirects.ts.
- Create approved group content with hww-web/hww-pubs/hww-guide/hww-brands anchors. Remove /how-we-work redirect only when page is available. Keep unready articles out of link collections.
- Reuse existing motion and retained header/footer per [[plans/01-design-export-comparison/motion-reuse]].
- Each pilot can ship independently; repeat additional pages in separate bounded slices once content is ready.

## Data structures
- HowWeWorkGroup and references to ready Article records.

## Verification
- Static: typecheck with no new diagnostics; format checks; build/route checks where applicable. Follow current Waku conventions; focused behavior tests only when logic changes.
- Runtime: Test anchor targets, route versus redirect, ready-only links, keyboard and fixed-header clearance. Screenshot 390/1440px; verify retained global shell.
- Apply shared checks in [[plans/01-design-export-comparison/verification]]; report unresolved baseline failures separately.

