import type { PageProps } from 'waku/router';
import {
  getPublishedCapabilities,
  type CapabilityHeading,
} from '../../data/capabilities';
import { CASE_STUDY_OG_IMAGE_DIMENSIONS } from '../../data/social-images';
import { caseStudies } from '../../data/case-studies';
import { getCapabilityCaseStudies } from '../../utils/capabilities';
import { PageHero } from '../../components/PageHero';
import { CaseStudyCarousel } from '../../components/CaseStudyCarousel';
import { ChallengePromo, ContactButton } from '../../components/ChallengePromo';
import { SEO } from '../../components/SEO';
import { CapabilityPageMotion } from '../../components/CapabilityPageMotion';

function Heading({ heading }: { heading: CapabilityHeading }) {
  return (
    <>
      {heading.text}
      {heading.highlight && (
        <>
          {' '}
          <span className="text-magenta">{heading.highlight}</span>
        </>
      )}
      {heading.after && <> {heading.after}</>}
    </>
  );
}

export default async function CapabilityPage({
  slug,
}: PageProps<'/capabilities/[slug]'>) {
  const capability = getPublishedCapabilities().find(
    (item) => item.slug === slug
  );
  if (!capability) {
    return (
      <>
        <SEO
          title="Capability not found | THOR Digital"
          description="The requested capability page is not available."
          noindex
        />
        <PageHero
          title="Capability not found"
          subtitle="Explore our capabilities and recent work."
        >
          <a href="/" className="btn btn-primary">
            Back to home
          </a>
        </PageHero>
      </>
    );
  }
  const content = capability.page;
  const work = getCapabilityCaseStudies(capability, caseStudies.caseStudies);
  const shareStudy = work[0];
  const shareDimensions = shareStudy
    ? CASE_STUDY_OG_IMAGE_DIMENSIONS[shareStudy.slug]
    : undefined;

  return (
    <>
      <SEO
        title={`${capability.name} | THOR Digital`}
        description={capability.dek}
        canonicalUrl={`https://www.thor-studio.com${capability.url}`}
        ogImage={
          shareStudy?.images.cardHorizontal ??
          '/images/hero-hammers/THOR_Hammer_OG_1200x630px.jpg'
        }
        {...(shareStudy
          ? {
              ogImageAlt: `${shareStudy.name} — ${capability.name} work by THOR`,
            }
          : {})}
        {...(shareDimensions
          ? {
              ogImageWidth: shareDimensions.width,
              ogImageHeight: shareDimensions.height,
            }
          : {})}
      />
      <CapabilityPageMotion>
        <article className="bg-white text-ink">
          <PageHero
            title={content.title}
            highlight={content.highlight}
            eyebrow={
              <a
                href="/capabilities"
                className="hover:underline underline-offset-4"
              >
                What we do
              </a>
            }
            subtitle={capability.dek}
            className="capability-hero"
          >
            <ContactButton />
          </PageHero>

          <section
            className="py-[var(--layout-section)]"
            aria-labelledby="capability-overview"
          >
            <div className="mx-auto w-full max-w-[var(--layout-hero)] px-fluid-6 grid items-start gap-fluid-8 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="type-eyebrow mb-5">Overview</p>
                <h2
                  id="capability-overview"
                  className="type-section-heading text-navy"
                >
                  {content.overviewHeading}
                </h2>
              </div>
              <div className="max-w-[var(--layout-article)]">
                <p className="type-article-lede text-navy mb-fluid-6">
                  {content.overviewIntro}
                </p>
                <p className="type-article-body">{content.overviewBody}</p>
              </div>
            </div>
          </section>

          <section
            className="pb-[var(--layout-section)]"
            aria-labelledby="capability-platforms"
          >
            <div className="case-page-width">
              <div className="rounded-[32px] bg-navy p-fluid-6 md:p-fluid-8">
                <p className="type-eyebrow mb-5">{content.platformsLabel}</p>
                <h2
                  id="capability-platforms"
                  className="type-section-heading text-white mb-fluid-8"
                >
                  <Heading heading={content.platformsHeading} />
                </h2>
                <ol className="grid gap-5 lg:grid-cols-3">
                  {content.platforms.map((platform, index) => (
                    <li
                      key={platform.title}
                      className="rounded-2xl border border-divider-dark bg-white/5 p-6 md:p-8"
                    >
                      <span
                        className="type-tile-title block text-magenta mb-4"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="type-card-title text-white">
                        {platform.title}
                      </h3>
                      <p className="type-card-summary !text-on-dark mt-4">
                        {platform.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <section
            className="bg-cool py-[var(--layout-section)]"
            aria-labelledby="capability-details"
          >
            <div
              data-section-reveal
              className="case-page-width grid items-start gap-fluid-8 lg:grid-cols-[0.9fr_1.1fr]"
            >
              <div data-reveal>
                <p className="type-eyebrow mb-5">Details</p>
                <h2
                  id="capability-details"
                  className="type-section-heading text-navy"
                >
                  <Heading heading={content.detailsHeading} />
                </h2>
                <p className="type-article-body mt-fluid-6">
                  {content.detailsIntro}
                </p>
              </div>
              <ul className="grid gap-5 sm:grid-cols-2">
                {content.details.map((detail) => (
                  <li
                    data-section-reveal
                    data-reveal-self
                    key={detail.title}
                    className="rounded-3xl border border-divider bg-white p-6 md:p-8"
                  >
                    <h3 className="type-card-title text-navy">
                      {detail.title}
                    </h3>
                    <p className="type-card-summary mt-3">
                      {detail.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {work.length > 0 && (
            <div
              data-section-reveal
              className="mx-auto max-w-[calc(var(--layout-page)+2*var(--layout-gutter))]"
            >
              <CaseStudyCarousel
                studies={work}
                label={content.workHeading}
                header={
                  <div className="flex flex-wrap items-end justify-between gap-6">
                    <h2 className="section-title type-section-heading text-navy">
                      {content.workHeading}
                    </h2>
                    <a href="/case-studies" className="link-card">
                      All case studies <span aria-hidden="true">→</span>
                    </a>
                  </div>
                }
              />
            </div>
          )}
        </article>
        <ChallengePromo />
      </CapabilityPageMotion>
    </>
  );
}

export const getConfig = async () =>
  ({
    render: 'static',
    staticPaths: getPublishedCapabilities().map(
      (capability) => capability.slug
    ),
  }) as const;
