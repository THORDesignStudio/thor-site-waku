# Phase 3 — Service content sections

Back to [[plans/02-attack-surface-management/overview]]

## Goal
- Render the additional service content in the established capability-page style.

## Changes
- `src/pages/capabilities/[slug].tsx`: consume optional SEO/eyebrow/action overrides and add the callout, audience, engagement and FAQ sections in the order specified by the outline.
- Optional new `src/components/CapabilityServiceSections.tsx`: keep additional editorial markup readable and server rendered if the route becomes unwieldy.
- Reuse existing style utilities, three-card and details markup; only touch `src/styles.css` if existing tokens cannot express a required treatment.
- Use the reusable animated `Accordion` component with native FAQ disclosure controls and visible focus states; match existing GSAP easing and reduced-motion behavior. Link the secondary CTA to `#how-it-starts` through the existing anchor mechanism; no new scroll controller.
- Keep the first three sections static; reuse the existing reveal markers only where supported. Do not add a new animation system.

## Data structures
- Read the optional `CapabilityPageContent` records from phase 1; omission means no section, empty wrapper, heading or divider.

## Verification
- Static: type check, formatting and capability tests. Check one H1, sequential headings, unique section IDs and descriptive CTA/link text.
- Runtime: compare original pages before/after; verify the new route with phase 4 content at the specified viewport widths, long headings and all seven FAQs.
- Capture screenshots with motion settled and reduced motion enabled. Test keyboard FAQ toggles, direct fragment loading and header clearance; verify content remains accessible without client hydration.
