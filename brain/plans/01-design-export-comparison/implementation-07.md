# Phase 07 — capability page pilot

Back to [[plans/01-design-export-comparison/overview]]

- Initial pilot record. All nine pages are now implemented: [[plans/01-design-export-comparison/implementation-07-rollout]].

## Delivered
- `/capabilities/web-development`, using the existing licensed fonts, semantic type/colors, layout baseline, header and footer.
- Hero, editorial overview, three platform cards and details grid based on the desktop/mobile Web Development handoff.
- Web work reuses the current homepage `CaseStudyCarousel`, selecting published studies by their `web-development` capability tag (currently nine). Arrows, native swiping, keyboard controls and GSAP/Lenis motion are preserved. Per user correction, the sidebar is removed from both pages.
- Shared carousel accepts a project list and heading slot; the homepage retains its featured-project defaults. Selection is local to each instance.
- Carousel cards use baseline semantic typography; slide position detection uses actual container coordinates. Reduced motion skips reveals and uses immediate slide movement.
- Existing `ChallengePromo` is reused as requested. Its extracted `ContactButton` also opens the existing contact overlay from the hero.
- Web Development drawer links to the full page; other drawers retain their existing content and lookup behavior.
- Structured `Capability.page` content and draft/ready filtering support additional pages without publishing unfinished material.
- No new images, animation libraries or third-party integrations needed.
- Follow-up motion: all sections use `CapabilityPageMotion` and the existing Lenis–ScrollTrigger controller, matching the homepage's fade/rise timing. Shared carousel header animation remains independent to avoid double animation.
- Platform/detail cards retain individual entrance triggers and natural content height; the user rolled back the oversized mobile portrait ratio. Overview aligns to the hero container and the hero image is mirrored horizontally.

## Verification
- `npm run test:capabilities`: four tests cover publication gating, legacy lookups, exact capability tags, draft exclusion, automatic inclusion and source ordering.
- `npm run test:case-studies`: five existing tests pass.
- `npm run build`: passes; 53 static files generated. Existing redirect output is unchanged.
- Initial browser checks at 375/390/768/1024/1440px: no overflow, one main H1, correct canonical URL, arrows and keyboard navigation. After tag-driven selection, verified nine matching projects, working controls and the homepage's unchanged eight featured projects.
- Verified homepage carousel defaults, drawer page link, Escape closing, independent selection, and both hero/challenge contact triggers. No live form submitted.
- Reduced-motion checks include immediate slide movement, visible headings, preference changes during a reveal and slide alignment on mobile/desktop.
- Unpublished and unknown capability routes are not published. No browser runtime errors found.
- Changed files pass formatting and whitespace checks. Typecheck retains only the four known errors in legacy `Carousel.tsx` imports and `data/publications.ts` texture typing.
- Real phone hardware testing remains outstanding.
- Motion verification: all 13 section/card groups reveal on desktop/mobile; sampled a card mid-fade at opacity 0.46 and 16px vertical offset. Reduced-motion changes restore every target, and source content remains visible without JavaScript.

## Artifacts and next work
- [Desktop](../../../artifacts/capabilities/web-development-1440.png)
- [Mobile](../../../artifacts/capabilities/web-development-390.png)
- Subsequent capability rollout is complete; see the rollout record above.
