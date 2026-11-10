# Repository comparison

## Established implementation baseline
- `src/pages/styleguide.tsx` and `src/styles.css`: licensed Rift/Proxima Nova setup, semantic colors/type, buttons, chips, tags, inputs, focus styles already exist.
- `src/pages/case-studies.tsx`: composes PageHero, alphabetically sorted studies, CaseStudyFilterGrid, ChallengePromo.
- `src/components/PageHero.tsx`: navy/magenta title treatment and clearance for retained fixed header.
- `src/components/CaseStudyFilterGrid.tsx`: real 17-study grid, semantic titles/eyebrows/chips, pressed states, lazy images, and initial/update `?topic=` support.
- This page is intentional work on the new baseline. Extend its patterns instead of rebuilding it from exported HTML.

## Shared shell and motion
- Retain `src/components/Header.tsx`, `Footer.tsx` and `src/pages/_layout.tsx` as the default shell.
- Current header supplies menu/contact UI; footer uses production WebGL background. v2's flat header and sample footer are out of adoption scope.
- Current motion infrastructure and established interaction guidance are assets to reuse; see [[plans/01-design-export-comparison/motion-reuse]].

## Page families
| Area | Existing implementation | v2 contribution |
| --- | --- | --- |
| Home | Hammer hero, capabilities, programs, case carousel, testimonials | Editorial intro, featured project slider, results, discipline groups, sectors, social content |
| Case landing | Already uses new baseline, functional filtering and card links | Reference for optional sticky rail/count, spacing and card crop choices |
| Case detail | Typed text/achievements, hero/project art, weighted related work | Circle cutout, section nav, gallery and lightbox |
| Capabilities | Seven records and working drawers | Eight full pages; Branding/Content Strategy added, Publication Design lacks a dedicated board |
| How We Work | Programs/drawers; no landing/article routes | Four anchored groups and 15 article boards |
| Sectors | Rich publications/aerospace pages | Construction, associations/nonprofits, publications body layouts |
| About | Staff data and current page | New editorial/team composition |
| Contact | Working overlay, Turnstile, Resend, analytics | Optional standalone presentation and richer fields |

## Initial differences, before phases 1–4
- Styleguide layout section still says “Values pending from the design file.”
- PageHero uses 1350px max; grid 1600px. Export generally specifies 1280px, 48px desktop/20px mobile gutters.
- Current grid has wrapping filters, no sticky rail/result count, 10px image corners, 16:9 crops and one column until lg.
- Export uses horizontal filter overflow, 16px corners, desktop three-column cards and mobile 16:10 crops; mobile/desktop are separate files.
- Current card summaries use legacy fluid/light text; semantic `type-card-summary` already exists.
- Current filters derive varied vertical labels; exported category names also differ. Resolve taxonomy before changing labels or links.

## Export reliability
- Reference: sibling README, docs/page-map.md, docs/link-map.csv, docs/developer-notes.md, docs/content-holes.md.
- 61 boards contain no scripts; 1,322 links use `#`. Link map has 1,718 rows, 523 suggested file targets.
- All 171 unique image references resolve; 179 assets total, roughly 64MB. Existence does not establish production quality or completeness.
- Google font stand-ins and sparse tokens.css are less authoritative than current licensed fonts and expanded semantic palette.
- Desktop/mobile references are 1440px/390px; current fluid type starts at 375px. Check both narrow widths.
- Source comparison only; no browser visual parity claim.

