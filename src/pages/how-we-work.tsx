import {
  howWeWorkGroups,
  getHowWeWorkArticleUrl,
  type HowWeWorkArticle,
} from '../data/how-we-work';
import { getPublishedCapabilities } from '../data/capabilities';
import { ContentCarousel } from '../components/CaseStudyCarousel';
import { CapabilityPageMotion as PageSectionMotion } from '../components/CapabilityPageMotion';
import { PageHero } from '../components/PageHero';
import { ChallengePromo } from '../components/ChallengePromo';
import { SEO } from '../components/SEO';

function ArticlePreview({ article }: { article: HowWeWorkArticle }) {
  const url = getHowWeWorkArticleUrl(article);
  const content = (
    <article className="pt-fluid-4">
      <img
        src={article.image.src}
        alt={article.image.alt}
        width={article.image.width}
        height={article.image.height}
        className="aspect-video w-full rounded-2xl object-cover"
        loading="lazy"
      />
      <h3
        id={`article-preview-${article.slug}`}
        className="type-card-title mt-5 text-navy"
      >
        {article.title}
      </h3>
      <p className="type-card-summary mt-3">{article.summary}</p>
      {url && (
        <span className="link-card mt-5 block">
          Read article <span aria-hidden="true">→</span>
        </span>
      )}
    </article>
  );
  return url ? (
    <a href={url} aria-labelledby={`article-preview-${article.slug}`}>
      {content}
    </a>
  ) : (
    content
  );
}

export default function HowWeWorkPage() {
  const capabilities = getPublishedCapabilities();
  return (
    <>
      <SEO
        title="How We Work | THOR Digital"
        description="Explore THOR’s approach to building websites, designing publications, guiding clients and creating memorable brands."
        canonicalUrl="https://www.thor-studio.com/how-we-work"
        ogImage="/images/how-we-work/hw-hero.jpg"
      />
      <PageSectionMotion>
        <PageHero title="How we" highlight="work" className="capability-hero" />
        {howWeWorkGroups.map((group, index) => {
          const capability = capabilities.find(
            (item) => item.slug === group.capabilitySlug
          );
          return (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-heading`}
              className={index % 2 === 0 ? 'bg-white' : 'bg-cool'}
              style={{
                scrollMarginTop: 'calc(var(--site-header-clearance) + 1rem)',
              }}
              {...(index > 0 ? { 'data-section-reveal': true } : {})}
            >
              <div className="mx-auto max-w-[var(--layout-hero)] lg:max-w-[var(--layout-page)]">
                <ContentCarousel
                  label={`${group.title} articles`}
                  itemLabel="article"
                  className="py-fluid-12 px-fluid-6"
                  header={
                    <div
                      data-reveal
                      className="grid items-start gap-fluid-8 lg:grid-cols-[0.9fr_1.1fr]"
                    >
                      <div>
                        <h2
                          id={`${group.id}-heading`}
                          className="type-section-heading text-navy"
                        >
                          {group.title}
                        </h2>
                      </div>
                      <div>
                        <p className="type-article-body">{group.description}</p>
                        {capability && (
                          <a
                            href={capability.url}
                            className="link-card mt-5 inline-flex gap-3"
                          >
                            {group.capabilityLabel}
                            <span aria-hidden="true">→</span>
                          </a>
                        )}
                      </div>
                    </div>
                  }
                  slides={group.articles.map((article) => ({
                    id: article.slug,
                    title: article.title,
                    content: <ArticlePreview article={article} />,
                  }))}
                />
              </div>
            </section>
          );
        })}
        <ChallengePromo />
      </PageSectionMotion>
    </>
  );
}

export const getConfig = async () => ({ render: 'static' }) as const;
