# Sector page implementation

Back to [[plans/01-design-export-comparison/overview]]

## Delivered
- Added `/verticals/associations-nonprofits` and `/verticals/construction-engineering` with typed content and ready-only static route generation.
- Preserved the existing Publications page per explicit user direction. Aerospace and its custom showcase also remain unchanged; no path collisions with the new dynamic route.
- Both pages use the shared widened/taller hero, static introductory/service sections, published capability links and existing ChallengePromo/contact overlay.
- Associations uses handoff content and sixteen real organization images. Omitted the unconfirmed WCAG level instead of inventing a certification.
- Wrote Construction body/service copy from existing LTK, Construction Executive, Engineering Inc. and capability content; replaced lorem ipsum and placeholder quotes. Retained the actual handoff cover image.
- Project carousels select published studies from normalized topic tags in source order: five association projects and four construction/engineering projects. No manual lists or classification changes.
- Reused CaseStudyCarousel for work and ContentCarousel for organizations/process. All five process cards link to ready articles.
- Later sections feather in with the existing GSAP/Lenis controller; introductory sections remain static and reduced motion stays supported.
- Connected both footer destinations and case-study topic deep links. Existing Publications footer link is unchanged.

## Verification
- Production build passes with 107 generated static files.
- All 27 focused tests pass, including six new sector tests.
- Browser checks at 375/768/1440/1920px: both routes load, correct SEO, no page overflow, expected services/projects, valid article/capability links, loaded images, arrow and keyboard carousel controls.
- Both topic URLs activate the correct gallery filter and matching project count.
- Normal/reduced-motion visibility, later-section entrances and contact overlay checked. Unknown sector returns HTTP 404; no browser runtime errors.
- Existing Publications carousel and Aerospace tabs pass regression checks; their source files and components have no diff.
- Typecheck has only the four existing unrelated diagnostics: three missing legacy Carousel imports and optional publication texture. Changed files pass formatting and whitespace checks.
- Mobile verification uses browser emulation; physical-device behavior remains unverified.

## Artifacts
- [Associations desktop](../../../artifacts/sectors/associations-nonprofits-1440.png)
- [Associations mobile](../../../artifacts/sectors/associations-nonprofits-375.png)
- [Construction desktop](../../../artifacts/sectors/construction-engineering-1440.png)
- [Construction mobile](../../../artifacts/sectors/construction-engineering-375.png)
