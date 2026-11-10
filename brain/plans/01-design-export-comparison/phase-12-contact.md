# Optional standalone contact presentation

Back to [[plans/01-design-export-comparison/overview]]

## Goal
- Reuse the real contact flow if a standalone page is selected.

## Changes
- Files: src/pages/work-with-us.tsx (proposed); src/components/ContactForm.tsx; src/components/Header.tsx.
- Reuse current form behavior and POST /contact payload; preserve header overlay, mobile Turnstile handling and analytics. Company/capability fields are deferred to a separate API-contract slice rather than silently adding ignored fields. Navigation wiring remains minimal.
- Reuse existing motion and retained header/footer per [[plans/01-design-export-comparison/motion-reuse]].
- Each pilot can ship independently; repeat additional pages in separate bounded slices once content is ready.

## Data structures
- Existing contact FormData and submission state; no payload expansion in this phase.

## Verification
- Static: typecheck with no new diagnostics; format checks; build/route checks where applicable. Follow current Waku conventions; focused behavior tests only when logic changes.
- Runtime: Mock success/error/expired token; verify duplicate submissions, focus, scrolling and input keyboard on phone. Screenshot page and retained overlay. Do not send live email for verification.
- Apply shared checks in [[plans/01-design-export-comparison/verification]]; report unresolved baseline failures separately.

