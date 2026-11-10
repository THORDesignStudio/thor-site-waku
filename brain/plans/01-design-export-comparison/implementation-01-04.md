# Phases 1–4 implementation

Back to [[plans/01-design-export-comparison/overview]]

## Scope delivered
- Phase 1: publication/draft contracts, source-slug aliases, normalized topic spelling with old query compatibility. Existing redirects remain in place.
- Phase 2: documented current widths, gutters and rhythm in `/styleguide`; reuse semantic typography and current shell/motion.
- Phase 3: shared body template across all 17 studies, circle artwork, client/services metadata, overview, numbered achievement tiles and section links.
- User correction: detail section pills scroll away; clicks use Lenis with sine in/out over 1.2–2.4 seconds based on distance, preserve URL fragments, clear the fixed header and focus the target. Reduced motion jumps immediately.
- Listing retains its established composition; added sticky horizontal filtering, live count, canonical display labels, semantic summaries and pointer/reduced-motion-aware card interactions.
- Phase 4: accessible project-image lightbox with arrows/buttons, swipe, focus wrapping/restoration, Escape, body/Lenis locking and cleanup.
- Existing related-work carousel and weighted ranking retained; reduced motion uses static project cards.
- Existing case-study SEO optional-dimension typing error fixed in the touched template.

## Gallery findings
- The existing overlapping carousel was related work, not a project-image lightbox.
- Previous detail pages displayed one real project composite each.
- Copied 55 genuine JPEGs (about 15.2MB) from v2 for 11 five-image galleries, with descriptive alt text and dimensions.
- Six studies retain their real composites because v2 supplies placeholders: Citiva, Construction Executive, Engineering Inc, MASH, No Kid Hungry, NYSCheck.
- Existing copy, achievements, canonical slugs and client URLs retained; conflicting draft metrics were not imported.

## Verification
- `npm run test:case-studies`: five contract/behavior tests pass.
- `npm run build`: passes, generating 51 static files; redirect output has no diff.
- All 17 routes, canonical URLs, section IDs and gallery presence checked in Chromium.
- Responsive checks at 375/390/768/1024/1440px; no document overflow. Rift and Proxima Nova faces load.
- Browser checks cover query aliases/reset, lightbox keys/wrapping/focus/scroll release, emulated swipe, reduced-motion related links, and Lenis movement/landing/hash/focus.
- Follow-up: Engineering Inc section highlighting now uses Lenis's scroll callback. Reset stale animation state to the visible position before moving; reconcile initial fragments after fonts settle, unless the user interacts.
- Engineering Inc regression: desktop/mobile clicks move monotonically, cover about 1% of the distance in the first 150ms, and finish within 1px of the 128px/112px header offsets. Direct `#related` URLs and reduced motion also pass.
- All changed source/test files pass Prettier; `git diff --check` passes.
- Whole-repo typecheck retains four existing diagnostics: three missing legacy imports in `Carousel.tsx`, and undefined texture typing in `data/publications.ts`.
- Whole-repo formatting check flags 15 untouched files. No unrelated formatting sweep performed.
- Real phone hardware testing remains outstanding; emulation does not verify physical touch feel, browser bars or the software keyboard.

## Review artifacts
- [Desktop detail](../../../artifacts/case-study-refresh/city-ratings-1440.png)
- [Mobile detail](../../../artifacts/case-study-refresh/city-ratings-390.png)
- [Case-study landing](../../../artifacts/case-study-refresh/landing-1440.png)
- [Styleguide](../../../artifacts/case-study-refresh/styleguide-1440.png)
