# Capability landing page

Back to [[plans/01-design-export-comparison/overview]]

## Delivered
- Added static `/capabilities` with the shared navy/magenta hero, mirrored background, contact button, short introduction and nine capability cards.
- Grid uses `getPublishedCapabilities()`; titles, summaries and canonical links come from the existing catalog. Draft capabilities remain excluded.
- Three columns from 1024px, two from 640px, one on phones. Rounded white cards on cool background reuse semantic typography and natural content height.
- Entire cards are accessible links, with numbered labels, descriptive text and subtle hover affordances.
- Landing is a static presentation per user correction: hero, description and grid show immediately with no page motion wrapper. Reused `ChallengePromo` for the closing contact band; detail-page motion remains intact.
- Added Capabilities between About Us and Case Studies in both global navigation layouts. Compact spacing below 768px prevents desktop-link wrapping.
- Existing footer Capabilities link now points to the landing page; each detail page’s “What we do” eyebrow links back to it.

## Verification
- `npm run build`: passes; 71 static files generated.
- Existing seven capability tests and five case-study tests pass.
- Browser checks at 375/390/768/1024/1440px: correct 1/2/3-column layout, nine unique links, valid accessible names/descriptions, canonical URL, no forced aspect ratio or horizontal overflow.
- Desktop/mobile navigation order verified, including one-line fit at 640/768px and closing the mobile menu after navigation.
- Keyboard card navigation, detail return link, footer link and contact overlay work. No form submitted.
- Hero and cards are static with either motion preference; capability detail pages retain their existing entrance animations.
- Changed files pass formatting and whitespace checks. The four known unrelated TypeScript diagnostics remain.
- Phone checks use browser emulation; physical-device touch and browser-bar behavior remain unverified.

## Artifacts
- [Desktop](../../../artifacts/capabilities/landing-1440.png)
- [Mobile](../../../artifacts/capabilities/landing-390.png)
