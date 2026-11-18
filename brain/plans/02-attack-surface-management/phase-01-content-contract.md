# Phase 1 — Optional content contract

Back to [[plans/02-attack-surface-management/overview]]

## Goal
- Let the existing capability model express the supplied service without changing current pages.

## Changes
- `src/data/capabilities.ts`: add optional page-level SEO, hero subtitle, eyebrow, CTA/anchor, callout, audience, engagement steps, FAQ and closing CTA content as needed by the approved outline. Hero subtitle must be separate from the concise catalog dek.
- `scripts/capabilities.test.ts`: replace the fixed-nine assumption with publication/route invariants and an explicit original-capability regression check.
- Permit a published capability without tagged case studies; retain assertions about valid/published studies whenever associations exist.
- Avoid a generalized page-builder or multiple layout variants; the recommended sequence is fixed in the shared template.

## Data structures
- Extend `CapabilityPageContent` with small optional typed records; FAQ items contain question/answer, engagement steps contain title/description, SEO contains title/description overrides.
- Existing `Capability`, card records and draft/ready publication rules remain the catalog foundation.

## Verification
- Static: type check, formatting and capability tests; verify every existing data entry still satisfies the contract without migration.
- Runtime: build and open Web Development and Content Strategy; confirm existing headings, work selection and layouts remain intact.
- Test publication invariants meaningfully: a ready entry with no tagged work remains eligible; draft entries remain excluded and existing aliases resolve correctly.
