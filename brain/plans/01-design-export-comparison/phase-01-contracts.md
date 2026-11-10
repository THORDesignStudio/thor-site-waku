# Route, content and taxonomy contract

Back to [[plans/01-design-export-comparison/overview]]

- Implemented 2026-11-10; see [[plans/01-design-export-comparison/implementation-01-04]].

## Goal
- Establish stable destinations and approved data boundaries before new page bodies.

## Changes
- Files: src/data/site-content.ts (proposed); src/data/case-studies.ts; src/config/redirects.ts.
- Define draft/ready page records and explicit export-to-current slug mapping; normalize display topics with legacy query aliases. Record proposed routes without removing redirects until matching pages ship.
- Reuse existing motion and retained header/footer per [[plans/01-design-export-comparison/motion-reuse]].
- Each pilot can ship independently; repeat additional pages in separate bounded slices once content is ready.

## Data structures
- PageStatus, PageRecord, TopicAlias; preserve CaseStudy slug identity.

## Verification
- Static: typecheck with no new diagnostics; format checks; build/route checks where applicable. Follow current Waku conventions; focused behavior tests only when logic changes.
- Runtime: Unit-check alias/slug resolution and draft exclusion when implemented; manually exercise existing ?topic= links and unknown topics. Check redirect conflicts against generated route output.
- Apply shared checks in [[plans/01-design-export-comparison/verification]]; report unresolved baseline failures separately.

