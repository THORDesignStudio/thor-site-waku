# Verification strategy

## Planning checks completed
- Read both repos' source and export handoff documentation; inspected the existing case landing directly after user clarification.
- `npx tsc --noEmit` run 2026-11-10: exit 2, five existing diagnostics.
- `src/components/Carousel.tsx`: missing SkillsScroll, SkillDrawer, ../data/skills imports.
- `src/data/publications.ts:117`: possibly undefined texture assigned to required string.
- `src/pages/case-studies/[slug].tsx:384`: optional SEO dimensions passed as explicit undefined under exactOptionalPropertyTypes.
- These are recorded baseline failures, not redesign regressions. No application fixes made.
- No browser/screenshot comparison, live form submission, production build, or full formatting check performed for this documentation task.

## Static checks during implementation
- `npx tsc --noEmit`: pass once baseline issues are separately resolved; until then, report baseline diagnostics and require zero added diagnostics.
- `npm run format:check`: existing available formatting check; no lint or test script exists.
- `npm run build`: validates static routes/build; invokes generate:redirects and mutates generated public/Vercel files. Review the resulting diff.
- Preserve strict types, existing static route conventions and component boundaries.
- Add focused behavior tests for taxonomy/query compatibility, slider timer/pause, gallery keyboard/focus, and contact payload changes when those behaviors change.
- Choose test tooling only if implementation needs it; no test-framework installation is part of this planning task.
- Do not write tests that mirror markup or low-impact style edits. Verify those visually.

## Runtime checks during implementation
- Run `npm run dev`; compare adopted body layouts with v2 at 390px/1440px, and established app baseline at 375px, 768px and 1024px.
- Retained header/footer may intentionally differ from export; compare their behavior and appearance against this app.
- Capture screenshots for each touched page at narrow and desktop widths; verify intermediate wrapping/cropping and fixed header clearance.
- Test menu/contact/drawers, keyboard focus, reduced motion, touch swipes, route revisits and resize/ScrollTrigger cleanup.
- Verify sticky UI under the current floating header with Lenis active; no obscured controls or anchor headings.
- Preserve 17 canonical case-study routes, legacy redirects, query filtering, related-study ranking, canonical/OG metadata, events and aerospace.
- Check drafts and missing content do not surface through route generation, cards or menus.
- Use mocked submission/network responses for form success/error; verify API contract without sending real email.
- Real phone checks: keyboard/input zoom, viewport bars, safe areas, scroll locking and touch behavior. Desktop emulation is insufficient for completion claims.

