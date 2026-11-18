# Phase 5 — Homepage discovery and final verification

Back to [[plans/02-attack-surface-management/overview]]

## Goal
- Include the new capability in the current homepage and verify the complete public path.

## Changes
- `src/data/home-sections.ts`: add the new ready slug to the existing Development grouping, keeping the current grouping order and visual treatment.
- `scripts/home.test.ts`: update the fixed-nine expectation and retain the invariant that all published capabilities appear once in homepage capability links.
- Do not edit the older `CapabilitiesHomePageSection` assuming it controls the current homepage; the active composition uses `HomeSections`.
- Retain the full capability landing grid as the central directory; global header/footer already reach it.
- If the owner chooses to exclude this service from the homepage, document that product decision and adjust the homepage coverage invariant deliberately.

## Data structures
- Existing homepage capability slug groups and `getPublishedCapabilities()`; no new grouping schema.

## Verification
- Static: run the complete verification command set in the overview, including home, capability and generated sitemap checks.
- Runtime: follow homepage → capability → contact, and capability directory → detail; check direct canonical loading and the optional drawer link.
- Capture the homepage grouping and new detail page at the reference widths; recheck an existing detail page after shared template changes.
- Record real-phone limitations and unresolved copy decisions. The deliverable is a reviewable local implementation when separately requested; this plan does not authorize deployment.
