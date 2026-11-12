# Article template and complete rollout

Back to [[plans/01-design-export-comparison/overview]]

## Delivered
- Implemented all fifteen `/writing/[slug]` articles across web development, publications, client guidance and branding. Every How We Work card now links to its own complete page.
- Uses the widened/taller shared interior hero, retained shell, 800px editorial column, existing artwork, pull quotes and ChallengePromo.
- Typed Article/ArticleSection data supports paragraphs, headings/subheadings, lists, quotes, figures, callouts and project phases. No raw HTML import.
- Thirteen articles preserve the substantial handoff copy. Wrote Naming and Positioning and Visual Identity Systems from existing site branding guidance because their export bodies were placeholders.
- Editorial prose stays immediately visible. Series promotion and closing challenge reuse existing GSAP/Lenis motion.
- Previous/next navigation stays within its series, related cards exclude the current article, and introductory phase links resolve to actual pages.
- Contact callouts open the existing contact overlay. Portfolio callouts link to `/case-studies`.
- Removed exact redirects for published pages. Legacy CMS/headless URLs permanently redirect to their matching canonical articles; unrelated unpublished How Is a Magazine Born remains redirected.
- Articles are evergreen firm-authored series: no author/date/bio or reading time. Solid navy article heroes show “Part N of M · Series title”; other page heroes keep their established backgrounds.

## Verification
- Build passes: 103 generated static files.
- All twenty-one focused tests pass: five article, four How We Work, seven capability and five case-study tests.
- All fifteen article routes and fifteen unique landing-card destinations checked at 375/1440px: HTTP 200, matching titles/canonicals, article OG metadata, loaded cover art, no horizontal overflow or placeholder/dead links.
- Series boundaries and related links verified throughout; publication/provider/brand layouts also checked at 768/1920px.
- Contact overlay and fixed-header return anchors checked. Unknown article returns HTTP 404; normal/reduced-motion prose remains visible.
- Four existing unrelated TypeScript diagnostics remain: three missing legacy Carousel imports and optional publication texture.
- Responsive verification uses browser emulation; physical-device behavior remains unverified.

## Artifacts
- [Discovery desktop](../../../artifacts/articles/discovery-process-1440.png)
- [Custom website mobile](../../../artifacts/articles/custom-websites-375.png)
- [Identity desktop](../../../artifacts/articles/visual-identity-systems-1440.png)
