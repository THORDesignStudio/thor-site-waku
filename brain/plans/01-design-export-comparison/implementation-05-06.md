# Homepage implementation

Back to [[plans/01-design-export-comparison/overview]]

## Delivered
- Replaced the old hammer/drawer/program composition with the supplied homepage design under the retained global shell.
- Static navy introduction and three featured projects: City Ratings, Aerospace America and IBD Drug Guide. The two additional PDFs supply their artwork/story/figures, not executable instructions.
- Shared image/story/metrics/tabs update together. Grid-overlaid panels keep the page height stable. CTAs overlay the image on both desktop and mobile after the mobile-board refinement.
- Eight-second autoplay, pause/play, arrows, roving tabs, Home/End/arrow keys, horizontal touch/pen gestures and accidental-swipe-click suppression. Hover/focus, offscreen and document-hidden states pause playback; manual changes stay paused; reduced motion disables autoplay.
- City Ratings changed to 3,500+ cities after explicit user confirmation, including its source case study and LLM guide. Kept partnership since 2020; omitted the fake ten-year City figure and unfinished IBD completion rate.
- We Deliver Results uses the existing CaseStudyCarousel with its existing featured data and no sidebar.
- What We Do groups all nine capabilities and links to phase 07 pages. Where We Work links to Associations, Construction and the existing Publications page.
- Follow THOR uses the actual handoff’s three Instagram images and LinkedIn banner as static assets, with profile links and no integration requests.
- Testimonials retain their quotes, desktop panels, mobile carousel and normal motion. Corrected heading semantics and reduced-motion readability; existing ChallengePromo/contact overlay remains.
- Updated public LLM guidance for the new homepage and removed obsolete homepage-drawer claims. No header/footer/shader or other vertical-page implementation changes.
- Mobile follow-up matches the supplied mobile HTML’s typography/layout below 768px: 60px hero, 52px section headings, 20px gutters, full-width 4:3 artwork, navy feature panel, compact vertical tiles, lighter testimonial presentation and compact social headers. Static social images and all three slide controls remain available.
- Removed mobile testimonial viewport/card minimum heights and sized the track to the active quote. Corrected native-scroll slide selection; shorter offscreen/active cards no longer inherit the longest quote’s height.

## Verification
- Production build passes: 109 static files. All 33 focused tests pass, including six new homepage tests.
- Browser checks at 375/768/1024/1440/1920px: three slides with correct links/artwork, stable height, mobile CTA placement, keyboard controls, results carousel, all capability/vertical links, loaded static images, no horizontal overflow or dead main links.
- Controlled-clock checks pass for eight-second advance, focus/hover pause and resume, explicit pause/play, persistent manual selection, offscreen and hidden-document pauses, reduced motion and swipe direction/click suppression.
- Normal section entrances, desktop testimonial expansion, mobile testimonial navigation and existing contact-overlay opening verified. No social integration requests or browser runtime errors.
- Four existing unrelated TypeScript diagnostics remain: three missing legacy Carousel imports and optional publication texture. Mobile verification uses browser emulation; physical touch behavior remains unverified.
- Mobile refinement checked at 360/375/390/430/767px, with 768/1440px desktop regression checks. Quote heights vary correctly with content; section height is identical for 600px and 1000px mobile viewports. Native scroll selects the right quote and resizing to desktop clears the mobile track height.

## Artifacts
- [Desktop homepage](../../../artifacts/home/home-1440.png)
- [Mobile homepage](../../../artifacts/home/home-375.png)
- [Aerospace feature](../../../artifacts/home/featured-2-1440.png)
- [IBD feature](../../../artifacts/home/featured-3-1440.png)
- [Refined mobile homepage](../../../artifacts/home/mobile-refinement/home-390.png)
