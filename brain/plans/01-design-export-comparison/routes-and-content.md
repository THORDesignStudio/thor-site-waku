# Routes and content decisions

## Route map
| Export family | Current route | Proposed action |
| --- | --- | --- |
| Home, About, case listing | /, /about, /case-studies | Preserve; case listing is a baseline |
| 17 case studies | /case-studies/[slug] | Preserve every existing slug and SEO |
| Publications | /verticals/publications | Preserve route; adapt body selectively |
| Aerospace, events | /verticals/aerospace, /events | Preserve; omission from export does not retire them |
| Style guide | /styleguide | Preserve internal/noindex behavior |
| How We Work | Absent; /how-we-work redirects to / | Add landing when ready; remove conflicting redirect |
| Article boards | No article pages; many /writing/* redirect to / | Propose /writing/[slug]; reconcile redirects individually |
| Capability boards | Drawers/data only | Propose /capabilities/[slug]; retain drawer compatibility |
| Construction, associations | Absent | Propose /verticals/construction-engineering and /verticals/associations-nonprofits |
| Work With Us | Current header contact overlay | Optional /work-with-us; retain overlay and existing POST /contact |

## Data and URL constraints
- Actual route source is `src/pages/`; `src/pages.gen.ts` is generated, not manually maintained.
- Redirect source: `src/config/redirects.ts`; generator writes public/Vercel configuration.
- Export filenames are not canonical slugs: `let-s-beat-hcm` maps to `lets-beat-hcm`; Aerospace maps to `aerospace-america-articles`.
- Keep existing case-study data/assets first. Add structured gallery/section/approved-metric fields only where needed.
- Normalize display taxonomy through an explicit mapping; preserve old `?topic=` values via aliases where possible.
- Branding and Content Strategy need content records. Retain Publication Design unless a separate content decision removes it.
- How We Work anchors: hww-web, hww-pubs, hww-guide, hww-brands. Publish links only when their targets exist.
- Use explicit draft/ready status for new pages; unfinished entries must not enter static route generation or navigation.

## Content decisions before publication
- City Ratings: user approved 3,500+ cities on 2026-11-12; homepage, case study and LLM guide now match.
- City Ratings relationship remains since 2020. Its export’s “10+ YRS” placeholder is unused. Aerospace’s separate 10+ years/100+ issues figures come from the user-provided second-slide PDF.
- Construction page contains lorem ipsum; branding articles have substantial missing copy.
- Six galleries contain five placeholder boxes each: Citiva, Construction Executive, Engineering Inc, MASH, No Kid Hungry, NYSCheck.
- Associations board has [CONFIRM WCAG LEVEL]; use approved wording before publication.
- Confirm missing client URLs; current approved links take precedence over exported `#`.
- LTK gallery source quality is documented as soft.
- Feature CTA: developer note says below image on mobile; mobile board overlays it. Prefer below for the first implementation, mark as provisional for visual review.
- Social content: prose says three tiles each; desktop shows three Instagram tiles and one LinkedIn image. Curated approved links/assets are the initial proposal; no feed integration assumed.
- Missing mobile publications design requires adaptation using current app and shared mobile patterns.

