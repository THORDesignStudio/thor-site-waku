# Sector pages

- `/verticals/associations-nonprofits` and `/verticals/construction-engineering` use `src/pages/verticals/[slug].tsx` and typed `SectorPage` data in `src/data/sectors.ts`.
- `getPublishedSectors()` generates only ready paths. Existing `/verticals/publications` and `/verticals/aerospace` retain their own authoritative static pages; exclude their slugs from the dynamic catalog.
- The user explicitly asked to retain the already-built Publications page. Phase 10 leaves its implementation and carousels untouched, as well as Aerospace.
- `getSectorCaseStudies()` filters published case studies through existing normalized topic membership, preserving source order. No manual project lists or sector retagging.
- `getSectorCaseStudyUrl()` encodes the canonical topic for the existing gallery filter; legacy topic spellings still normalize through `case-study-topics.ts`.
- Sector work uses `CaseStudyCarousel`; association organization cards and process stages compose `ContentCarousel`. Keep shared arrows, native scrolling and keyboard behavior; no sidebar.
- Hero, overview and service cards are static. Subsequent client/work/process sections and ChallengePromo use the existing `CapabilityPageMotion` GSAP/Lenis controller.
- Five shared process stages resolve through published article records. Service cards resolve through the ready capability catalog.
- Association content/client artwork comes from the handoff, with sixteen organization slides. No unconfirmed WCAG level or certification claim is published.
- Construction body and services were written from existing LTK, Construction Executive, Engineering Inc. and capability copy, replacing lorem ipsum and fake quotes. Its real handoff cover is retained.
- Footer Where We Work links point to both new routes and retain Publications. No new header navigation item was added.
- Run `npm run test:sectors` for readiness, route separation, tag selection, topic URLs, linked destinations, artwork and footer checks.
