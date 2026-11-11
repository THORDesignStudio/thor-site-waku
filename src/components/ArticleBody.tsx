import { getArticlePreview, type ArticleSection } from '../data/articles';
import { ContactButton } from './ChallengePromo';

export function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return sections.map((section, index) => {
    switch (section.type) {
      case 'paragraph':
        return (
          <p
            key={index}
            className={
              section.lead
                ? 'type-page-lede text-navy mb-fluid-6'
                : 'type-article-body mb-fluid-6'
            }
          >
            {section.text}
          </p>
        );
      case 'heading':
        return (
          <h2
            key={section.id}
            id={section.id}
            className="type-section-heading text-navy mt-fluid-12 mb-fluid-6 scroll-mt-[calc(var(--site-header-clearance)+1rem)]"
          >
            {section.text}
          </h2>
        );
      case 'quote':
        return (
          <blockquote
            key={index}
            className="my-fluid-10 border-l-4 border-magenta pl-fluid-6 text-navy text-[clamp(1.5rem,2.5vw,2.125rem)] font-semibold leading-snug"
          >
            {section.text}
          </blockquote>
        );
      case 'subheading':
        return (
          <h3
            key={section.id}
            id={section.id}
            className="type-card-title mt-fluid-8 mb-3 text-navy scroll-mt-[calc(var(--site-header-clearance)+1rem)]"
          >
            {section.text}
          </h3>
        );
      case 'list': {
        const List = section.ordered ? 'ol' : 'ul';
        return (
          <List
            key={index}
            className={`type-article-body mb-fluid-6 pl-6 space-y-3 ${section.ordered ? 'list-decimal' : 'list-disc'}`}
          >
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </List>
        );
      }
      case 'image':
        return (
          <figure key={index} className="my-fluid-10">
            <img
              src={section.src}
              alt={section.alt}
              width={section.width}
              height={section.height}
              loading="lazy"
              className="w-full rounded-2xl"
            />
            {section.caption && (
              <figcaption className="type-card-summary mt-3">
                {section.caption}
              </figcaption>
            )}
          </figure>
        );
      case 'callout':
        return (
          <aside
            key={index}
            className="my-fluid-10 rounded-b-2xl border-t-4 border-magenta bg-cool p-fluid-6"
          >
            <h3 className="type-card-title text-navy mb-3">{section.title}</h3>
            <p className="type-article-body">{section.text}</p>
            {section.link && (
              <a
                href={section.link.href}
                className="link-card mt-5 inline-block"
              >
                {section.link.label} <span aria-hidden="true">→</span>
              </a>
            )}
            {section.contact && (
              <div className="mt-fluid-6">
                <ContactButton />
              </div>
            )}
          </aside>
        );
      case 'phases':
        return (
          <div
            key={index}
            className="divide-y divide-divider border-y border-divider"
          >
            {section.items.map((item) => {
              const preview = item.articleSlug
                ? getArticlePreview(item.articleSlug)
                : undefined;
              return (
                <section key={item.title} className="py-fluid-6">
                  <h3 className="type-card-title text-navy mb-3">
                    {item.title}
                  </h3>
                  <p className="type-article-body">{item.text}</p>
                  {preview?.url && (
                    <a
                      href={preview.url}
                      className="link-card mt-5 inline-block"
                    >
                      Explore {preview.title} <span aria-hidden="true">→</span>
                    </a>
                  )}
                </section>
              );
            })}
          </div>
        );
    }
  });
}
