# About and contact implementation

Back to [[plans/01-design-export-comparison/overview]]

## Delivered
- Refreshed `/about` with the shared hero, alternating principal profiles, six-person responsive team grid and existing ChallengePromo.
- Preserved all eight existing biographies, roles, portrait assets and ordering. Added real image dimensions and retained biography paragraph breaks.
- Hero/first principal remain static; later profiles/cards reuse homepage-style GSAP/Lenis entrances with reduced-motion handling.
- Added `/work-with-us` with the shared mirrored smoke background and a light form. About links to it; it links back to the principal profiles.
- Shared contact fields and a request controller across the new page and retained header overlay. Existing POST `/contact` JSON payload and delivery handler remain unchanged.
- Added synchronous duplicate-submit protection, abort cleanup, fresh-widget reset after attempts, preserved error inputs and focused result feedback.
- Widget sizing responds to available container width on the page. Overlay/page widgets hand off without duplicating active challenges; header mobile/desktop forms retain their 640px boundary.
- Shared Turnstile loader now registers removable per-instance load listeners, avoiding stale initialization after unmount or responsive remount. Existing event widget retains its action.
- Added How We Work after About Us in desktop/mobile navigation. Mobile menu now appears below 768px; desktop spacing fits four links from 768px. Hidden navigation/forms are inert.
- Updated public `/llms.txt`, README and linked brain notes for all current routes/content, evergreen series, hidden brand content and contact behavior.
- Deferred company/capability fields as planned; omitted the unconfirmed one-business-day response promise. Header overlay, global footer shader, Publications and API code are unchanged in purpose.

## Verification
- Production build passes with 109 generated static files; all 27 existing focused tests pass.
- Verified all 54 canonical site links in the public LLM guide against actual routes and redirects, including all nine capabilities and thirteen active articles; hidden branding articles are not promoted.
- Browser checks at 375/640/767/768/1024/1440px: eight team profiles, preserved long biographies, loaded portraits, no page overflow, correct navigation order/breakpoint, mobile-menu route closing and desktop fit.
- Standalone canonical, native validation, field focus, compact/flexible challenge fit and ordinary document scrolling checked.
- Mocked contact checks: expired token, server error, fresh-token retry, exact four-field JSON payload, duplicate-submit guard, success field clearing/focus and one conversion event.
- Header overlay tested at 375/640/768/1440px for submission, Escape and page-widget restoration. Mobile overlay scrolls internally while the document remains locked.
- Normal/reduced-motion readability and later profile reveal checked. Event signup challenge still mounts with event_signup action. No browser runtime errors.
- No live contact request, real Turnstile verification or email delivery was performed; submission checks intercept POSTs and use mocked widget callbacks.
- Only the four pre-existing TypeScript diagnostics remain: three missing legacy Carousel imports and optional publication texture. Changed files pass formatting and whitespace checks.
- Mobile checks use emulation; physical-device keyboard/browser behavior remains unverified.

## Artifacts
- [About desktop](../../../artifacts/about/about-1440.png)
- [About mobile](../../../artifacts/about/about-375.png)
- [Contact desktop, mocked widget](../../../artifacts/contact/page-1440.png)
- [Contact mobile, mocked widget](../../../artifacts/contact/page-375.png)
