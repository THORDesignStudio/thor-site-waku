# AI Cybersecurity implementation

Back to [[plans/02-attack-surface-management/overview]]

## Delivered
- New ready capability at `/capabilities/ai-cybersecurity`, named AI Cybersecurity per final user direction.
- Shared template extensions for the hero, metadata, provider callout, audience, engagement stages, FAQ and closing review CTA.
- Reusable native `Accordion` with interruptible 200ms GSAP height/fade matching existing `power2.out` motion. Keyboard/reduced-motion content activation is immediate; no new dependencies.
- Both “Book a review” buttons open the existing contact overlay.
- Homepage Development grouping, capability directory, sitemap and `llms.txt` include the new page.
- Editorial pass softened broad efficacy/timing claims and preserved owner-confirmed deliverables, staging-only assessments and specialist-service boundaries.
- No case studies fabricated or unrelated studies tagged as security work.
- Fixed the details grid’s narrow-screen wrapping for long headings under fallback fonts.

## Validation
- Production build passed; capability (8), homepage (6), case-study (5), and sitemap (5) tests passed.
- Formatting passed for all changed source/test files; `git diff --check` passed.
- Full-project type check still reports pre-existing missing imports in `Carousel.tsx` and the optional-texture mismatch in `publications.ts`; no diagnostics in changed files.
- Full-source formatting still reports nine pre-existing unformatted files; left unrelated files untouched.
- Browser checks passed: pointer/keyboard/reversal/reduced-motion/no-JavaScript FAQ, both contact CTAs, discovery links, an existing capability and 320/390/768/1024/1440px layouts. Screenshots are in `artifacts/ai-cybersecurity/`. No live inquiry or deployment; real-phone checks remain manual.
- Latest hero direction: Capabilities eyebrow, Security Engineering for the AI Era subtitle, remove the “Shrink the target” sentence and secondary button. Mobile title scales to keep Cybersecurity intact.
