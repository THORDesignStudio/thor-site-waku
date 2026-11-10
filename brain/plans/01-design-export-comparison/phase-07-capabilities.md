# Capability page template and pilot

Back to [[plans/01-design-export-comparison/overview]]

## Goal
- Offer full pages while preserving useful existing capability drawers.

## Changes
- Files: src/data/capabilities.ts; src/pages/capabilities/[slug].tsx (proposed); src/components/CapabilityDrawer.tsx.
- Build Web Development pilot with current content and new body composition. Preserve drawer behavior and data lookup compatibility. Add Branding/Content Strategy individually after content approval; retain Publication Design.
- Reuse existing motion and retained header/footer per [[plans/01-design-export-comparison/motion-reuse]].
- Each pilot can ship independently; repeat additional pages in separate bounded slices once content is ready.

## Data structures
- Extend Capability with optional approved body/SEO and publication status.

## Verification
- Static: typecheck with no new diagnostics; format checks; build/route checks where applicable. Follow current Waku conventions; focused behavior tests only when logic changes.
- Runtime: Test ready/draft route generation and missing slug handling; verify drawer links and Escape/focus behavior remain intact. Screenshot pilot at mobile/desktop before repeating per capability.
- Apply shared checks in [[plans/01-design-export-comparison/verification]]; report unresolved baseline failures separately.

