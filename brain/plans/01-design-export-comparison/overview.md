# Design export comparison and adoption plan

## Context
- Compared 2026-11-10: this Waku app and sibling `/Users/johnserrao/Sites/thor-site-waku-v2`.
- v2 contains 49 desktop and 12 mobile HTML boards; this repo supplies the application, data, integrations, and motion.
- User direction: reuse existing motion guidance; mostly retain this repo's header/footer; treat the existing case-study landing as the new implementation baseline.
- Initial deliverable was planning only; the user subsequently authorized phases 1–4 across all 17 case studies.
- Phases 1–4 implemented on 2026-11-10; see [[plans/01-design-export-comparison/implementation-01-04]].
- Phases 05–06 homepage completed on 2026-11-12 with all three featured slides and lower sections; see [[plans/01-design-export-comparison/implementation-05-06]].
- Phase 07 Web Development pilot implemented on 2026-11-11; see [[plans/01-design-export-comparison/implementation-07]].
- Phase 07 rollout across all nine capabilities completed on 2026-11-11; see [[plans/01-design-export-comparison/implementation-07-rollout]].
- Capability landing page and global navigation added on 2026-11-11; see [[plans/01-design-export-comparison/implementation-07-landing]].
- Phase 08 How We Work implemented on 2026-11-11; see [[plans/01-design-export-comparison/implementation-08]].
- Phase 09 article template and all fifteen articles completed on 2026-11-11; see [[plans/01-design-export-comparison/implementation-09]].
- Phase 10 Associations and Construction sector pages completed on 2026-11-11; existing Publications/Aerospace retained. See [[plans/01-design-export-comparison/implementation-10]].
- Phases 11–12 About refresh and standalone contact completed on 2026-11-11, including shared form behavior and navigation updates; see [[plans/01-design-export-comparison/implementation-11-12]].
- No existing `brain/index.md`, `brain/principles.md`, or local AGENTS.md found. No project principles invented. TaskCreate/TaskUpdate tools are unavailable.

## Scope
- Extend the established `/styleguide` and `/case-studies` baseline into selected v2 page bodies.
- Preserve working contact/events, existing routes and case-study slugs, SEO, motion infrastructure, and mostly the existing header/footer.
- Exclude v2 header/footer replacement, a framework migration, new animation libraries, wholesale HTML import, and automatic publication of unfinished copy.
- Additional page families below are a proposed roadmap, not a commitment to publish every board.

## Constraints and alternatives
- Chosen: adapt Waku templates around existing PageHero/filter/cards/ChallengePromo and typed TS data. This preserves completed design work and runtime behavior.
- Alternatives: replace the app with static exports (loses integration/component reuse); reproduce every board literally (imports conflicting shells, placeholders, and duplicated responsive markup).
- Existing app baseline wins over incidental export differences. Resolve meaningful changes explicitly; do not treat pixel differences as defects.
- Keep server content server-rendered/static; confine stateful motion/filter/gallery code to client components.
- Shared shell changes should be limited to necessary links/clearance fixes. Add new destinations only when ready.
- Use existing GSAP, Lenis, carousels, drawers, shaders and hooks; see [[plans/01-design-export-comparison/motion-reuse]].

## Applicable skills
- `brain`, `plan`: linked, phased planning.
- `vercel-react-best-practices`: React component/client boundaries; apply Waku equivalents, not Next.js APIs.
- `mobile-native`: touch/viewport/keyboard verification; real-device checks remain required.
- Existing motion guidance: `animate` for necessary new behavior; user-requested reuse takes precedence over generic library choices.

## Evidence and decisions
- [[plans/01-design-export-comparison/comparison]]
- [[plans/01-design-export-comparison/routes-and-content]]
- [[plans/01-design-export-comparison/motion-reuse]]
- [[plans/01-design-export-comparison/verification]]
- [[plans/01-design-export-comparison/implementation-01-04]]

## Phases
- [[plans/01-design-export-comparison/phase-01-contracts]]
- [[plans/01-design-export-comparison/phase-02-baseline]]
- [[plans/01-design-export-comparison/phase-03-case-detail]]
- [[plans/01-design-export-comparison/phase-04-case-gallery]]
- [[plans/01-design-export-comparison/phase-05-home-feature]]
- [[plans/01-design-export-comparison/phase-06-home-sections]]
- [[plans/01-design-export-comparison/phase-07-capabilities]]
- [[plans/01-design-export-comparison/phase-08-how-we-work]]
- [[plans/01-design-export-comparison/phase-09-articles]]
- [[plans/01-design-export-comparison/phase-10-sectors]]
- [[plans/01-design-export-comparison/phase-11-about]]
- [[plans/01-design-export-comparison/phase-12-contact]]

## Verification
- Run `npx tsc --noEmit`, `npm run format:check`, `npm run build`; baseline exceptions and build side effects are documented in the verification note.
- Every phase includes runtime checks and screenshots at reference and intermediate widths; preserve current shell/motion behavior.

