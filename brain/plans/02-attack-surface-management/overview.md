# AI Cybersecurity capability

## Context
- Turn the supplied service copy into a capability page that feels native to the existing THOR site.
- Confirmed: add a tenth capability named AI Cybersecurity at `/capabilities/ai-cybersecurity`. Attack surface management is the service focus within that capability.
- Confirmed: “Book a review” opens the existing contact overlay; include an editorial pass. Deliverables accepted as supplied; the owner will refine the content after seeing it.
- Context: a PR experiment tied to current interest, rather than a claim that THOR has an established specialist cybersecurity practice.
- Confirmed: build a separate reusable FAQ accordion using the existing animation styles.
- Implementation authorized by the user on 2026-11-18; local build and review, with no deployment requested.
- Source: user attachment `Pasted text.txt`, supplied 2026-11-18. Copy decisions and open questions: [[plans/02-attack-surface-management/page-outline]].

## Scope
- One new capability, its catalog/drawer presentation, SEO, contact CTA, and the small optional template extensions its content needs.
- Reuse the current shell, PageHero, numbered navy cards, detail grid, contact overlay and closing ChallengePromo treatment.
- Exclude a new design system, security product UI, pricing table, booking integration, assessment tooling and new contact API fields.
- No case studies unless there is approved evidence of this specific service. Existing empty-work behavior should omit the section.

## Constraints and alternatives
- Recommended: extend the existing typed capability template with optional content slots. Older entries keep their current output.
- Alternative: compress everything into current cards; too much copy and no clear home for process/FAQ.
- Alternative: a separate custom service page; allows flexibility but duplicates the established capability layout and behavior.
- Keep content static/server rendered. Use Waku conventions; do not introduce Next.js APIs or new libraries.
- Preserve smoke imagery, navy/magenta palette, typography tokens, fluid gutters, rounded cards and natural card heights.
- Keep hero/overview/approach immediately visible; reuse existing later-section reveal behavior and reduced-motion support.
- No local AGENTS.md or `brain/principles.md` exists. Use the documented design baseline and capability conventions; do not invent project principles. Task tracking tools are unavailable.

## Applicable skills
- `plan`, `brain`: planning and repository note conventions.
- `vercel-react-best-practices`: small client boundaries; apply the Waku-compatible guidance.
- `mobile-native`: phone verification for the long hero, FAQ and existing contact overlay; no unrelated global CSS changes.
- Existing baseline: [[codebase/design-baseline]], [[codebase/capability-pages]], [[codebase/about-and-contact]].

## Phases
- [[plans/02-attack-surface-management/phase-01-content-contract]]
- [[plans/02-attack-surface-management/phase-02-contact-cta]]
- [[plans/02-attack-surface-management/phase-03-template-sections]]
- [[plans/02-attack-surface-management/phase-04-content-and-discovery]]
- [[plans/02-attack-surface-management/phase-05-homepage-and-verification]]

## Verification
- Run `npx tsc --noEmit`, `npm run format:check`, `npm run test:capabilities`, `npm run test:home`, `npm run test:case-studies`, then `npm run build` and `npm run test:sitemap`.
- There is no lint script; report existing type/format failures separately rather than expanding scope.
- Compare an existing page and the new page at 390, 768, 1024 and 1440px, plus a narrow 320px overflow check; capture screenshots.
- Verify all seven FAQ answers, keyboard interaction, direct `#how-it-starts` navigation, reduced motion and both contact CTAs.
- Test contact behavior with mocked requests; do not send a live inquiry. Record real-phone checks as pending if hardware is unavailable.

## Implementation
- [[plans/02-attack-surface-management/implementation]]
