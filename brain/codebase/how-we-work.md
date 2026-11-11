# How We Work

- `/how-we-work` is a static landing route with four groups from `src/data/how-we-work.ts`: `hww-web`, `hww-pubs`, `hww-guide`, `hww-brands`.
- The shared hero has no subtitle. The first group, How We Build for the Web, stays static; subsequent groups and the closing challenge band use the existing `CapabilityPageMotion` GSAP/Lenis controller.
- Each group reuses `ContentCarousel`, extracted from `CaseStudyCarousel`, with composed article cards and group headings. Keep native scrolling, keyboard controls and existing arrows; no sidebar.
- Fifteen previews cover web development, publications, client guidance and branding. Images come from the export and existing case-study artwork.
- Article publication is separate from preview visibility: `getHowWeWorkArticleUrl()` returns a destination only for ready records with a URL. Draft previews have no anchor or Read article CTA.
- All fifteen cards link to ready article pages, with Read article CTAs. See [[codebase/articles]] for publication rules and legacy writing aliases.
- The footer How We Work heading links to this landing. Group capability links resolve through the published capability catalog.
- Stable section anchors use fixed-header scroll clearance. Verify fresh navigation with fragments as well as ordinary page loading.
- Run `npm run test:how-we-work` for content, publication gating, assets and route checks.
