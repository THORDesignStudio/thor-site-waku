import type { PageProps } from 'waku/router';
import {
  getPublishedSectors,
  getSectorCaseStudies,
  getSectorCaseStudyUrl,
  sectorProcess,
} from '../../data/sectors';
import { caseStudies } from '../../data/case-studies';
import { getPublishedCapabilities } from '../../data/capabilities';
import { getArticlePreview } from '../../data/articles';
import { PageHero } from '../../components/PageHero';
import { SEO } from '../../components/SEO';
import {
  CaseStudyCarousel,
  ContentCarousel,
} from '../../components/CaseStudyCarousel';
import { CapabilityPageMotion } from '../../components/CapabilityPageMotion';
import { ChallengePromo, ContactButton } from '../../components/ChallengePromo';

export default function SectorPage({ slug }: PageProps<'/verticals/[slug]'>) {
  const sector = getPublishedSectors().find((item) => item.slug === slug);
  if (!sector)
    return (
      <>
        <SEO
          title="Sector not found | THOR Digital"
          description="Explore our design and development work."
          noindex
        />
        <PageHero title="Sector not found">
          <a className="link-card" href="/case-studies">
            Explore our work →
          </a>
        </PageHero>
      </>
    );
  const studies = getSectorCaseStudies(sector, caseStudies.caseStudies);
  const capabilities = getPublishedCapabilities();
  const image = sector.overview?.image ?? sector.organizations?.[0]?.image;
  return (
    <>
      <SEO
        title={`${sector.name} | THOR Digital`}
        description={sector.description}
        canonicalUrl={`https://www.thor-studio.com/verticals/${sector.slug}`}
        {...(image
          ? {
              ogImage: image.src,
              ogImageAlt: image.alt,
              ogImageWidth: image.width,
              ogImageHeight: image.height,
            }
          : {})}
      />
      <CapabilityPageMotion>
        <PageHero
          title={sector.title}
          highlight={sector.highlight}
          subtitle={sector.description}
          className="capability-hero"
          eyebrow={
            <>
              Where we work{' '}
              <span aria-hidden="true" className="mx-3 text-magenta">
                /
              </span>{' '}
              {sector.name}
            </>
          }
        >
          <ContactButton />
        </PageHero>
        {sector.overview && (
          <section aria-labelledby="sector-overview" className="bg-white">
            <div className="mx-auto max-w-[var(--layout-page)] px-fluid-6 py-fluid-12">
              <div className="grid gap-fluid-8 lg:grid-cols-[0.9fr_1.1fr]">
                <h2
                  id="sector-overview"
                  className="type-section-heading text-navy"
                >
                  {sector.overview.heading}
                </h2>
                <div>
                  <p className="type-page-lede text-navy">
                    {sector.overview.intro}
                  </p>
                  <p className="type-article-body mt-fluid-6">
                    {sector.overview.body}
                  </p>
                </div>
              </div>
              <img
                src={sector.overview.image.src}
                alt={sector.overview.image.alt}
                width={sector.overview.image.width}
                height={sector.overview.image.height}
                className="mt-fluid-10 aspect-video w-full rounded-2xl object-cover"
              />
            </div>
          </section>
        )}
        <section aria-labelledby="sector-services" className="bg-cool">
          <div className="mx-auto max-w-[var(--layout-page)] px-fluid-6 py-fluid-12">
            <div className="grid gap-fluid-8 lg:grid-cols-[0.9fr_1.1fr]">
              <h2
                id="sector-services"
                className="type-section-heading text-navy"
              >
                {sector.servicesHeading}
              </h2>
              <p className="type-article-body">{sector.servicesIntro}</p>
            </div>
            <div className="mt-fluid-10 grid gap-fluid-6 sm:grid-cols-2 lg:grid-cols-3">
              {sector.services.map((service) => {
                const capability = capabilities.find(
                  (item) => item.slug === service.capabilitySlug
                );
                return (
                  <article
                    key={service.title}
                    className="rounded-2xl bg-white p-fluid-6"
                  >
                    <h3 className="type-card-title text-navy">
                      {service.title}
                    </h3>
                    <p className="type-card-summary mt-3">
                      {service.description}
                    </p>
                    {capability && (
                      <a
                        href={capability.url}
                        className="link-card mt-5 inline-block"
                      >
                        Explore {capability.name}{' '}
                        <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        {sector.organizations && (
          <section
            data-section-reveal
            aria-label="Association clients"
            className="bg-white"
          >
            <div className="mx-auto max-w-[var(--layout-page)]">
              <ContentCarousel
                label="Associations we work with"
                itemLabel="organization"
                className="px-fluid-6 py-fluid-12"
                header={
                  <div
                    data-reveal
                    className="grid gap-fluid-8 lg:grid-cols-[0.9fr_1.1fr]"
                  >
                    <h2 className="type-section-heading text-navy">
                      Associations we work with
                    </h2>
                    <p className="type-article-body">
                      Builders, engineers, physicians, financiers and fitness
                      professionals. A selection of the member organizations we
                      serve.
                    </p>
                  </div>
                }
                slides={sector.organizations.map((organization) => ({
                  id: organization.image.src,
                  title: organization.name,
                  content: (
                    <figure className="pt-fluid-4">
                      <img
                        src={organization.image.src}
                        alt={organization.image.alt}
                        width={organization.image.width}
                        height={organization.image.height}
                        loading="lazy"
                        className="aspect-video w-full rounded-2xl object-cover"
                      />
                      <figcaption className="type-card-title mt-5 text-navy">
                        {organization.name}
                      </figcaption>
                    </figure>
                  ),
                }))}
              />
            </div>
          </section>
        )}
        {studies.length > 0 && (
          <section
            data-section-reveal
            aria-label="Selected sector work"
            className="bg-white"
          >
            <div className="mx-auto max-w-[var(--layout-page)]">
              <CaseStudyCarousel
                studies={studies}
                label={`${sector.name} work`}
                header={
                  <div
                    data-reveal
                    className="grid gap-fluid-8 lg:grid-cols-[0.9fr_1.1fr]"
                  >
                    <h2 className="type-section-heading text-navy">
                      Work in {sector.name.toLowerCase()}
                    </h2>
                    <div>
                      <p className="type-article-body">
                        Explore projects for the audiences and organizations in
                        this field.
                      </p>
                      <a
                        href={getSectorCaseStudyUrl(sector)}
                        className="link-card mt-5 inline-block"
                      >
                        View all {sector.name.toLowerCase()} work{' '}
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                }
              />
            </div>
          </section>
        )}
        <section
          data-section-reveal
          aria-label="Our process"
          className="bg-cool"
        >
          <div className="mx-auto max-w-[var(--layout-page)]">
            <ContentCarousel
              label="How an engagement works"
              itemLabel="stage"
              className="px-fluid-6 py-fluid-12 [&_[role=group]]:flex"
              header={
                <div data-reveal>
                  <h2 className="type-section-heading text-navy">
                    How an engagement works
                  </h2>
                  <p className="type-article-body mt-fluid-6 max-w-3xl">
                    From understanding your audience to putting useful tools in
                    your team’s hands. Explore the approach behind our work.
                  </p>
                </div>
              }
              slides={sectorProcess.flatMap((stage) => {
                const article = getArticlePreview(stage.articleSlug);
                return article?.url
                  ? [
                      {
                        id: stage.articleSlug,
                        title: stage.title,
                        content: (
                          <a
                            href={article.url}
                            className="mt-fluid-4 flex flex-1 flex-col items-start rounded-2xl bg-white p-fluid-6"
                          >
                            <h3 className="type-card-title text-navy">
                              {stage.title}
                            </h3>
                            <p className="type-card-summary mt-3">
                              {stage.description}
                            </p>
                            <span className="link-card mt-auto block pt-5">
                              Read: {article.title}{' '}
                              <span aria-hidden="true">→</span>
                            </span>
                          </a>
                        ),
                      },
                    ]
                  : [];
              })}
            />
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
    staticPaths: getPublishedSectors().map((sector) => sector.slug),
  }) as const;
