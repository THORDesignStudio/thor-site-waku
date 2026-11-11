# Phase 07 — all capability pages

Back to [[plans/01-design-export-comparison/overview]]

## Delivered
- All nine canonical routes under `/capabilities/`: web-development, publication-design, event-solutions, e-commerce-solutions, mobile-apps, data-visualization, user-experience, branding, content-strategy.
- Complete exported overview, services/platforms, detail and work headings for the seven remaining export boards; Publication Design uses existing site content.
- Structured copy lives in `src/data/capability-pages.ts`; the shared template now reads page-specific labels and highlighted headings.
- Retained the mirrored hero background, 1350px overview alignment, natural card height, homepage-style Lenis/GSAP entrances, shared carousel without a sidebar, and shared contact/challenge components.
- Branding and Content Strategy added to the homepage catalog and drawers. Every capability drawer now links to its complete page.
- Project selection remains exact capability-tag filtering. Added the export-supported Branding/Content Strategy memberships to `case-studies.ts`; no manual carousel lists or placeholder proof cards.
- Current work counts: Web 9, Publications 4, Events 4, E-commerce 1, Mobile 1, Data 3, UX 10, Branding 6, Content 5.
- Canonicalized Event Solutions/E-Commerce URLs; retained legacy lookups and generated permanent redirects for `/capabilities/event-registration` and `/capabilities/e-commerce`.
- Existing header/footer retained. No additional assets, libraries or external integrations needed.

## Verification
- `npm run test:capabilities`: seven tests pass, covering publication, aliases, copy completeness, tag selection and new project classifications.
- `npm run test:case-studies`: five existing tests pass.
- `npm run build`: passes; 69 static files generated, including the nine capability pages. Redirect artifacts regenerated.
- All nine routes checked in Chromium at 375/768/1440px: HTTP 200, correct canonical URLs, one main H1, page-specific headings and no horizontal overflow or placeholder links.
- Each work carousel renders the matching tagged records. Multi-project arrows work; single-project arrows are disabled. No sidebar or forced portrait ratio remains.
- Verified new and legacy homepage drawers link to canonical pages, and new Branding/Publication pages retain normal-motion fades. No browser runtime errors.
- Changed files pass formatting and whitespace checks. Typecheck retains only the four pre-existing errors in legacy `Carousel.tsx` imports and publications texture typing.
- Real phone hardware checks remain outstanding; browser viewport checks do not establish device touch feel.

## Review artifacts
- [Branding desktop](../../../artifacts/capabilities/branding-1440.png)
- [Publication Design desktop](../../../artifacts/capabilities/publication-design-1440.png)
- [Content Strategy desktop](../../../artifacts/capabilities/content-strategy-1440.png)
- [E-commerce mobile](../../../artifacts/capabilities/e-commerce-solutions-375.png)
- [Mobile Apps mobile](../../../artifacts/capabilities/mobile-apps-375.png)
- [User Experience mobile](../../../artifacts/capabilities/user-experience-375.png)
