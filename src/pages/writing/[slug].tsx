import type { PageProps } from 'waku/router';
import {
  getArticle,
  getArticleContext,
  getPublishedArticles,
} from '../../data/articles';
import { ArticleBody } from '../../components/ArticleBody';
import { PageHero } from '../../components/PageHero';
import { SEO } from '../../components/SEO';
import { ChallengePromo } from '../../components/ChallengePromo';
import { CapabilityPageMotion } from '../../components/CapabilityPageMotion';

export default function ArticlePage({ slug }: PageProps<'/writing/[slug]'>) {
  const article = getArticle(slug);
  const context = getArticleContext(slug);
  if (!article || !context)
    return (
      <>
        <SEO
          title="Article not found | THOR Digital"
          description="Explore our approach to design and development."
          noindex
        />
        <PageHero title="Article not found">
          <a className="link-card" href="/how-we-work">
            Explore How We Work →
          </a>
        </PageHero>
      </>
    );
  const { group, preview, series, position, previous, next } = context;
  const related = series.filter((item) => item.slug !== slug);
  return (
    <>
      <SEO
        title={`${preview.title} | THOR Digital`}
        description={preview.summary}
        canonicalUrl={`https://www.thor-studio.com${preview.url}`}
        ogImage={preview.image.src}
        ogImageAlt={article.imageAlt ?? preview.image.alt}
        ogImageWidth={preview.image.width}
        ogImageHeight={preview.image.height}
        ogType="article"
      />
      <article className="bg-white text-ink">
        <PageHero
          title={preview.title}
          subtitle={article.lede}
          eyebrow={
            <>
              <a href="/how-we-work" className="hover:underline">
                How We Work
              </a>
              <span className="mx-3 text-magenta" aria-hidden="true">
                /
              </span>
              <a href={`/how-we-work#${group.id}`} className="hover:underline">
                {group.title}
              </a>
            </>
          }
        >
          <p className="text-on-dark text-sm">
            Part {position} of {series.length} · {group.title}
          </p>
        </PageHero>
        <div className="bg-[linear-gradient(to_bottom,var(--color-navy)_50%,white_50%)]">
          <div className="mx-auto max-w-[var(--layout-hero)] lg:max-w-[var(--layout-page)] px-fluid-6">
            <img
              src={preview.image.src}
              alt={article.imageAlt ?? preview.image.alt}
              width={preview.image.width}
              height={preview.image.height}
              fetchPriority="high"
              className="aspect-video w-full rounded-2xl object-cover"
            />
          </div>
        </div>
        <div className="mx-auto max-w-[calc(var(--layout-article)+2*var(--layout-gutter))] px-fluid-6 py-fluid-12">
          <ArticleBody sections={article.sections} />
          {(previous || next) && (
            <nav
              aria-label="Article series"
              className="mt-fluid-10 grid gap-fluid-6 sm:grid-cols-2"
            >
              {[previous, next].map((item, index) =>
                item ? (
                  <a
                    key={item.slug}
                    href={item.url}
                    className="rounded-2xl border border-divider p-fluid-6"
                  >
                    <span className="type-eyebrow">
                      {index === 0 ? '← Previous' : 'Next →'}
                    </span>
                    <span className="type-card-title mt-3 block text-navy">
                      {item.title}
                    </span>
                  </a>
                ) : (
                  <div key={index} />
                )
              )}
            </nav>
          )}
        </div>
      </article>
      <CapabilityPageMotion>
        <section data-section-reveal className="bg-cool px-fluid-6 py-fluid-12">
          <div className="mx-auto max-w-[var(--layout-page)]">
            <h2 data-reveal className="type-section-heading text-navy">
              {related.length ? 'More in this series' : group.title}
            </h2>
            {related.length > 0 && (
              <div
                data-reveal
                className="mt-fluid-8 grid gap-fluid-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {related.map((item) => (
                  <a key={item.slug} href={item.url}>
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      loading="lazy"
                      className="aspect-video w-full rounded-2xl object-cover"
                    />
                    <h3 className="type-card-title text-navy mt-5">
                      {item.title}
                    </h3>
                    <p className="type-card-summary mt-3">{item.summary}</p>
                  </a>
                ))}
              </div>
            )}
            <p data-reveal className="type-article-body mt-fluid-6 max-w-3xl">
              {group.description}
            </p>
            <a
              data-reveal
              href={`/how-we-work#${group.id}`}
              className="link-card mt-fluid-6 inline-block"
            >
              Explore our approach <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
        <ChallengePromo />
      </CapabilityPageMotion>
    </>
  );
}

export const getConfig = async () =>
  ({
    render: 'static',
    staticPaths: getPublishedArticles().map((article) => article.slug),
  }) as const;
