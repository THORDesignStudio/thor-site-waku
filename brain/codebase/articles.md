# Writing articles

- `/writing/[slug]` statically generates only `getPublishedArticles()` records. All fifteen How We Work articles are implemented across the four series.
- `src/data/articles.ts` stores typed body sections and lede. `src/data/how-we-work.ts` supplies title, summary, image, series membership and canonical URL.
- Publishing requires a ready body with sections and a matching ready preview with a URL. Update both records and remove only that destination's exact redirect.
- `getArticleContext()` excludes unpublished slugs; previous/next and related items include only ready bodies in the existing group order. Inline phase links also require a ready body.
- `ArticleBody` renders paragraphs, headings/subheadings, lists, quotes, phase descriptions, figures and callouts as React markup; no imported raw HTML. Contact callouts open the existing contact overlay.
- These are evergreen firm-authored series, not dated individual posts: no author, bio, publication date or reading time. Article heroes use solid navy without the capability background overlay; show “Part N of M · Series title” from the published series order.
- Editorial prose stays static and visible. Related/series promotion and ChallengePromo reuse `CapabilityPageMotion`; preserve reduced-motion behavior.
- Shared `PageHero` and navigation use the 1600px desktop container with matching gutters. Article prose stays at the 800px baseline; hero padding is 20% above its original spacing.
- All fifteen previews have matching ready bodies and canonical links. Legacy `/writing/cms-sites` and `/writing/headless-cms-sites` permanently redirect to the matching `*-websites` articles. The unrelated unpublished `/writing/how-is-a-magazine-born` redirect remains.
- Only thirteen previews are currently promoted: the user hid the brand group pending content. Exclude its two links from public LLM guidance until that changes.
- Thirteen bodies use handoff copy. Naming and Positioning and Visual Identity Systems were written from existing branding guidance because those boards contained placeholder bodies. Attribution/date placeholders remain omitted.
- Run `npm run test:articles`, `npm run test:how-we-work` and `npm run build` for publication/link changes.
