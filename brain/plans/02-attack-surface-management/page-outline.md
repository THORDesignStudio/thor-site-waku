# Page outline and copy decisions

Back to [[plans/02-attack-surface-management/overview]]

## Recommended sequence
| Section | Existing treatment / adaptation | Content |
| --- | --- | --- |
| Hero | `PageHero`, mirrored smoke, highlighted title, existing primary button | Use “AI Cybersecurity” as the title, “Capabilities” as the linked eyebrow and “Security Engineering for the AI Era” as the subtitle. Remove “Shrink the target, then attack it yourself” from the introduction. |
| Hero actions | `ContactButton` | “Book a review” opens the existing contact overlay (confirmed). No secondary hero button, per latest user direction. |
| Why now | Existing overview typography and 1350px column | “The economics of hacking just changed” and the supplied explanatory paragraphs, edited for supportable claims. |
| Three moves | Existing three numbered navy cards | Reduce exposure; map data and access; assess a test environment. Retain staging-only scope visibly in the third card. |
| Provider callout | Compact inset text beneath the approach | Keep the practical cloud-provider point; review “security team in all but name” before use. No new illustration required. |
| Hardening retainer | Existing details intro and grid | “White-glove maintenance…” introduction; cards for retiring exposed systems, migrating legacy systems, tightening access and implementing assessment fixes. These are derived from supplied copy; owner accepted deliverables. |
| Who it is for | Compact editorial section using current type/spacing | Target firms and staff range; retain the SOC/compliance boundary and specialist-partner language nearby. |
| How it starts | New ordered three-step section in existing visual language | Fixed-scope review → close priority risks → optional monthly retainer. Anchor id `how-it-starts`. Use a light layout to distinguish engagement stages from the navy approach cards. |
| FAQ | New reusable animated `Accordion` with native `details` / `summary` rows with existing dividers and typography | All seven supplied questions; keyboard-operable, readable without hydration, multiple answers may remain open. Short interruptible GSAP height/fade, matching existing `power2.out` easing; instant keyboard/reduced-motion changes. |
| Closing CTA | Existing `ChallengePromo` visual treatment, optional text props | Repeat the review CTA and a short next-step explanation; avoid introducing pricing or response-time promises. |

## Content and publication decisions
- Preserve the engineering-service positioning, staging-only assessment boundary and distinction from help desk, incident response and compliance services.
- Catalog name is AI Cybersecurity; canonical slug is `ai-cybersecurity`. Keep attack surface management as the specific service proposition, without implying incident response, SOC or compliance coverage.
- Separate catalog name, visible H1 and metadata: review the supplied SEO title/description in the confirmed editorial pass, reflecting AI Cybersecurity and attack surface management appropriately; do not duplicate the SEO component’s brand suffix.
- Scale the long Cybersecurity title on phones so the word remains intact.
- Editorial checks: “remove most of the risk,” most breaches using stale accounts, hours versus weeks, top-five findings in days, assumed existing subscriptions and monthly assessment cadence. Verify or soften before publishing; no external research has been performed for this plan.
- The confirmed CTA label is “Book a review.”
- Add a concise catalog/dek summary rather than using the full hero paragraph in every discovery surface.

## Confirmed decisions
- A new capability called AI Cybersecurity, alongside the existing nine.
- Review CTA opens the existing contact form.
- Include an editorial pass on claims and delivery promises before publication.

## Remaining questions for the owner
- Delivery commitments accepted by the owner: staging support, top-five remediation plan, named engineer and monthly reassessment. Content can be refined after the local preview.
- Are there service-specific projects/testimonials available? Default: omit related work until approved examples exist.
