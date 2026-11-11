# How We Work implementation

Back to [[plans/01-design-export-comparison/overview]]

## Delivered
- Added `/how-we-work` with the established hero and retained global header/footer. No blurb below the hero title.
- Four groups with stable anchors: web development, publications, client guidance and branding; fifteen illustrated previews in total.
- First group stays fully static. Later groups and ChallengePromo reuse the existing homepage-style GSAP/Lenis section motion, including reduced-motion handling.
- Extracted `ContentCarousel` from the existing case-study carousel; composed article cards use the same arrows, keyboard and native scrolling. Homepage and capability adapters preserve their data selection and appearance.
- Controls disable when all cards fit. No carousel sidebar.
- Imported thirteen existing handoff images; branding uses existing project imagery and completed copy instead of export placeholders.
- Removed the landing redirect and draft entry; linked the footer How We Work heading to the new page.
- Article previews remain drafts with no dead links. Article routes and removal of `/writing/*` redirects belong to phase 09.

## Verification
- Production build passes: 73 generated static files.
- All 16 focused tests pass: four How We Work, seven capability and five case-study tests.
- Browser checks at 375/768/1440px pass: four groups, fifteen cards, carousel controls, keyboard scrolling, no page overflow, no placeholder links and correct canonical/footer destination.
- Motion checked with normal and reduced preferences: first group static, subsequent sections feather in. All four direct fragment destinations clear the fixed header.
- Shared homepage and Web Development carousels checked after extraction.
- Existing four unrelated TypeScript diagnostics remain: three missing legacy Carousel imports and publication texture optionality.
- Phone checks use browser emulation; physical-device behavior remains unverified.

## Artifacts
- [Desktop](../../../artifacts/how-we-work/landing-1440.png)
- [Mobile](../../../artifacts/how-we-work/landing-375.png)
