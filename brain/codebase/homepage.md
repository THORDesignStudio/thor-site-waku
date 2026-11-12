# Homepage

- Homepage order: static navy introduction → three featured projects → We Deliver Results → What We Do → Where We Work → Follow THOR → existing testimonials → ChallengePromo.
- `src/data/featured-projects.ts` references published case-study slugs; `getFeaturedProjects()` excludes missing/draft studies and supplies canonical links. Sequence: City Ratings, Aerospace America, IBD Drug Guide.
- `FeaturedProjects` changes artwork, story, metrics and tab state together. Panels share a grid cell and stretch to the tallest slide to prevent layout shifts; inactive panels are inert and hidden from assistive technology.
- Autoplay runs every eight seconds only while in view, document visible, no hover/focus, not explicitly paused, and normal motion. Manual navigation pauses until explicit Play. Reduced motion disables autoplay and transitions; keyboard changes are immediate.
- Use existing CSS easing tokens for the 300ms opacity transition; lower section entrances reuse `CapabilityPageMotion` and the root GSAP/Lenis hook. No added animation library.
- City Ratings is 3,500+ cities, approved by the user on 2026-11-12; its case-study content and public LLM guidance match. Partnership remains since 2020, not an invented ten-year relationship.
- AIAA figures (10+ years, 100+ issues) and IBD’s 58 options come from the user-provided slide PDFs. The unfinished IBD completion-rate placeholder is omitted.
- PDF comps are flattened; featured artwork is extracted above the baked-in CTA, and the page supplies real accessible case-study links. CTA overlays the image on desktop and mobile, following the mobile board refinement.
- We Deliver Results reuses the existing featured `CaseStudyCarousel`, without a sidebar or replacement data list.
- `home-sections.ts` groups all nine ready capabilities under Design/Development/Branding and supplies proof links. Homepage rows link to full capability pages rather than opening drawers.
- Where We Work links to the two new sector pages and the existing Publications page. Aerospace remains available at its existing route but is not a fourth homepage tile.
- Below 768px, `.home-page`-scoped styles follow the mobile board: 20px gutters, 60px hero, 52px section headings, full-width 4:3 feature artwork, navy feature story, 40px metric values, compact 150px vertical tiles and smaller discipline typography. Desktop retains magenta story panels and 4:5 portrait vertical cards.
- Follow THOR is three curated Instagram images and one LinkedIn banner, with profile links. No embeds, feeds, SDKs or social API requests.
- Testimonials retain their data, desktop expanding panels and mobile carousel; heading semantics and reduced-motion readability are corrected. Existing ChallengePromo and global header/footer/shader are retained.
- Mobile testimonial styling follows the light quote layout with 17px text. Remove the 100vh section and 400px card minimums below 768px. ResizeObserver sizes the track to the active card rather than the longest offscreen quote, responds to font/width changes, and refreshes ScrollTrigger after height changes.
- Native testimonial scroll selection uses the nearest card’s viewport position, without the old added index. Clear the explicit track height when returning to desktop. Keep mobile height independent of viewport height.
- Legacy hero/capability/program drawer components remain in the repo but are no longer mounted on the homepage. Do not describe them as current homepage navigation.
- Run `npm run test:home` for project publication, metric/content constraints, artwork, capabilities, verticals and curated socials.
