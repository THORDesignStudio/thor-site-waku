# Design baseline

- Keep the existing Header, Footer, production footer shader, and motion infrastructure; the sibling v2 export is a reference for page bodies.
- `/styleguide` and `/case-studies` are the established implementation baseline, not unfinished screens to replace wholesale.
- Layout tokens in `src/styles.css`: 1600px page canvas, 1350px page hero, 800px article column; existing fluid-6 gutters and fluid-12 section rhythm.
- The detail-page section pill bar must scroll away normally. Anchor clicks use the existing root Lenis instance, clear the fixed header, and jump immediately for reduced motion.
- Resolve Lenis anchor targets from document coordinates (`getBoundingClientRect().top + window.scrollY`); sync its start to the visible scroll position before moving. Coordinate fixes alone do not prevent stale-start jumps.
- Section highlighting subscribes through `useLenis` scroll callbacks. Anchor movement uses sine in/out and a distance-based 1.2–2.4s duration; exponential out moved too far in the first frames on long jumps.
- Direct section fragments reconcile after fonts settle; cancel pending correction when the user interacts. Verify `/case-studies/engineering-inc#related` on desktop and mobile.
- The case-list filter rail scrolls with the page, just like the detail section bar. Topic spelling aliases live in `src/data/case-study-topics.ts` and accept legacy `?topic=` values.
- Case-study slugs and 4/3/2 related-work ranking are stable. Draft status excludes studies from listing, static generation, and related work.
- The related-work FlipbookCarousel was already complete; retain it. The detail wrapper supplies static related links for reduced motion.
- `src/data/case-study-galleries.ts` contains 11 real five-image galleries and six existing composite fallbacks. Never import grey export placeholders as artwork.
- Six studies still need approved individual gallery images: Citiva, Construction Executive, Engineering Inc, MASH, No Kid Hungry, NYSCheck.
- Gallery dialog uses native top-layer/inert behavior, explicit keyboard focus wrapping, shared Escape/body-lock hooks, and the existing Lenis provider.
- `src/config/redirects.ts` remains redirect source of truth; proposed routes stay draft until corresponding pages exist.
- `npm run test:case-studies` verifies publication rules, aliases, asset availability, route collisions and related ranking.
