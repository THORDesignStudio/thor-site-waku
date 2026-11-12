# Sector pages

Back to [[plans/01-design-export-comparison/overview]]

- Completed both new sector pages 2026-11-11; see [[plans/01-design-export-comparison/implementation-10]]. User explicitly retained the existing Publications page.

## Goal
- Adapt sector content without discarding richer existing vertical pages.

## Changes
- Files: src/data/sectors.ts; src/pages/verticals/[slug].tsx; src/data/menus.ts. Case-study taxonomy remains unchanged.
- Implement associations/nonprofits and construction/engineering using normalized topic links. Keep existing publications/aerospace routes authoritative; avoid duplicate static/dynamic paths. Replace construction placeholders with copy grounded in existing work.
- Reuse existing motion and retained header/footer per [[plans/01-design-export-comparison/motion-reuse]].
- Each pilot can ship independently; repeat additional pages in separate bounded slices once content is ready.

## Data structures
- SectorPage with approved copy, proof references and topic alias.

## Verification
- Static: typecheck with no new diagnostics; format checks; build/route checks where applicable. Follow current Waku conventions; focused behavior tests only when logic changes.
- Runtime: Test explicit dynamic path generation against existing vertical routes; check topic deep links, placeholder exclusion and omitted unapproved claims. Screenshot pilot; regression-check publications/aerospace motion.
- Apply shared checks in [[plans/01-design-export-comparison/verification]]; report unresolved baseline failures separately.

