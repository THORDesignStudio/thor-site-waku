# Article template and pilot

Back to [[plans/01-design-export-comparison/overview]]

## Goal
- Create a reusable editorial body without publishing unfinished article boards.

## Changes
- Files: src/data/articles.ts (proposed); src/pages/writing/[slug].tsx (proposed); src/config/redirects.ts.
- Pilot a complete article, with existing semantic article type, approved attribution/images and same-series links. Reconcile its exact /writing redirect at publication. Roll out remaining 14 boards as separate content batches.
- Reuse existing motion and retained header/footer per [[plans/01-design-export-comparison/motion-reuse]].
- Each pilot can ship independently; repeat additional pages in separate bounded slices once content is ready.

## Data structures
- Article, ArticleSection and Series references; explicit draft/ready status.

## Verification
- Static: typecheck with no new diagnostics; format checks; build/route checks where applicable. Follow current Waku conventions; focused behavior tests only when logic changes.
- Runtime: Test same-series linking, draft exclusion, missing slug and redirect parity. Screenshot long prose, headings, quotes and media; verify SEO and anchor readability. Block placeholder author/date/body content.
- Apply shared checks in [[plans/01-design-export-comparison/verification]]; report unresolved baseline failures separately.

