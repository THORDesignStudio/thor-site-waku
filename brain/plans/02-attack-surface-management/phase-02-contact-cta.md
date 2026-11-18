# Phase 2 — Reusable contact CTA labels

Back to [[plans/02-attack-surface-management/overview]]

## Goal
- Use the service-specific CTA through the existing contact flow.

## Changes
- `src/components/ChallengePromo.tsx`: allow `ContactButton` label and optional ChallengePromo heading/body/button text; preserve current defaults for all existing callers.
- Keep the existing contact atom and button styling. The user confirmed the existing contact form as the destination; no scheduler integration is needed.
- Do not add form context, new fields or backend changes as part of the label adjustment.

## Data structures
- Optional presentation props for `ContactButton` and `ChallengePromo`; serialize plain text across the server/client boundary.

## Verification
- Static: type check and formatting; check existing call sites continue to work with defaults.
- Runtime: check the default CTA on an existing page and the custom label in the new page once composed; both open the existing overlay, support Escape and preserve focus behavior.
- Verify phone label wrapping and keyboard access; use the existing mocked contact checks rather than sending live email. No new test for simple label passthrough.
