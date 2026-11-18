# Phase 4 — Content, discovery and release checks

Back to [[plans/02-attack-surface-management/overview]]

## Goal
- Populate the page and make its canonical destination discoverable when copy is ready.

## Changes
- `src/data/capability-pages.ts`: perform the confirmed editorial pass, then populate content, all FAQ answers, staging boundary, audience and engagement steps; adapt metadata for the AI Cybersecurity capability and its attack surface management service focus through the optional overrides.
- `src/data/capabilities.ts`: add the AI Cybersecurity catalog/drawer entry, concise dek, existing-style list items and `/capabilities/ai-cybersecurity` canonical URL; set ready only after the editorial pass is complete (deliverables are confirmed).
- `scripts/capabilities.test.ts`: verify the new canonical lookup, publication state and meaningful empty-related-work behavior.
- Integration follow-up: run the existing sitemap generation/build pipeline and verify `public/sitemap.xml` and `public/llms.txt` include the ready page. Do not maintain a parallel hardcoded route list.
- Check the capability landing grid and catalog-driven drawer/menu surfaces. The current homepage has a separate explicit slug grouping, addressed in phase 5. Do not add a new top-level navigation item.

## Data structures
- One `Capability` and matching `CapabilityPageContent` entry keyed by `ai-cybersecurity`; existing tag-driven work selection remains authoritative.

## Verification
- Static: run the full command set in the overview, inspecting build-generated changes. Check canonical, meta title/description, social fallback and public route output.
- Runtime: open the page directly, follow the landing-page card and any drawer page link, and verify no blank work section appears.
- Check desktop/tablet/phone screenshots, both CTAs, secondary fragment link, FAQ and reduced motion. Recheck one existing capability for shared-template regressions.
- Finish with a reviewable local diff and a record of pending real-phone checks; deployment is outside this planning request.
