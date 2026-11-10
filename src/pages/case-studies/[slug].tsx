import type { PageProps } from 'waku/router';
import { caseStudies, type CaseStudy } from '../../data/case-studies';
import { capabilities } from '../../data/capabilities';
import { getCaseStudyGallery } from '../../data/case-study-galleries';
import { getCaseStudyTopics } from '../../data/case-study-topics';
import { getPublishedCaseStudies } from '../../data/site-content';
import { getRelatedCaseStudies } from '../../utils/case-studies';
import {
  parseContentBlocks,
  type ContentBlock,
} from '../../utils/contentParser';
import { SEO } from '../../components/SEO';
import { CaseStudyGallery } from '../../components/CaseStudyGallery';
import {
  CaseStudySectionNav,
  type CaseStudySection,
} from '../../components/CaseStudySectionNav';
import { ChallengePromo } from '../../components/ChallengePromo';
import FlipbookCarousel from '../../components/FlipbookCarousel/FlipbookCarousel';

const CASE_STUDY_OG_IMAGE_DIMENSIONS: Record<
  string,
  { width: number; height: number }
> = {
  'aerospace-america-articles': { width: 1600, height: 900 },
  'chemonics-media-site': { width: 1600, height: 900 },
  citiva: { width: 1728, height: 968 },
  'city-ratings': { width: 1600, height: 900 },
  'construction-executive-magazine': { width: 1600, height: 900 },
  'engineering-inc': { width: 1728, height: 968 },
  'hungry-for-batteries': { width: 1728, height: 968 },
  'ibd-drug-guide': { width: 1600, height: 900 },
  'keep-riding': { width: 1727, height: 968 },
  'leon-hotel': { width: 1727, height: 968 },
  'lets-beat-hcm': { width: 1741, height: 976 },
  ltk: { width: 1728, height: 968 },
  'mash-app': { width: 1728, height: 968 },
  mayflower: { width: 1772, height: 993 },
  'niri-investor-relations-rebrand': { width: 1600, height: 900 },
  'no-kid-hungry': { width: 2000, height: 1121 },
  nyscheck: { width: 1772, height: 993 },
};

function ContentBlocks({ text }: { text: string }) {
  return parseContentBlocks(text).map((block: ContentBlock, index) =>
    block.type === 'list' ? (
      <ul key={index} className="list-disc pl-6 space-y-3 mb-6">
        {(block.content as string[]).map((item, itemIndex) => (
          <li key={itemIndex}>{item}</li>
        ))}
      </ul>
    ) : (
      <p key={index} className="mb-6 last:mb-0">
        {block.content as string}
      </p>
    )
  );
}

function CaseStudyHeader({ study }: { study: CaseStudy }) {
  return (
    <header className="case-detail-hero relative overflow-hidden bg-navy text-white">
      <div className="case-page-width relative grid items-center gap-fluid-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="min-w-0">
          <p className="type-eyebrow !text-on-dark mb-5">
            Case study · {getCaseStudyTopics(study)[0]}
          </p>
          <h1 className="type-page-headline case-detail-title">{study.name}</h1>
          <p className="type-page-lede text-on-dark mt-fluid-6 max-w-3xl">
            {study.dek}
          </p>
        </div>
        <div className="case-hero-art">
          <div className="case-hero-circle" />
          <picture>
            <source srcSet={study.images.header.webp} type="image/webp" />
            <img
              src={study.images.header.png}
              alt={`${study.name} project artwork`}
              fetchPriority="high"
            />
          </picture>
        </div>
      </div>
    </header>
  );
}

function CaseStudyMeta({ study }: { study: CaseStudy }) {
  const labels: Record<string, string> = {
    design: 'Design',
    discovery: 'Discovery',
  };
  const services = study.capabilities.map(
    (slug) =>
      capabilities.capabilities.find((item) => item.slug === slug)?.name ??
      labels[slug] ??
      slug.replaceAll('-', ' ')
  );
  return (
    <div className="bg-cool py-fluid-6 text-navy">
      <dl className="case-page-width grid gap-6 md:grid-cols-3">
        {[
          ['Client', study.client],
          ['Sectors', getCaseStudyTopics(study).join(' · ')],
          ['Services', services.join(' · ')],
        ].map(([label, value]) => (
          <div
            key={label}
            className="min-w-0 md:border-l md:border-divider-cool md:pl-6 first:border-0 first:pl-0"
          >
            <dt className="type-eyebrow !text-navy mb-3">{label}</dt>
            <dd className="type-card-summary !text-navy font-semibold">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default async function CaseStudyPage({
  slug,
}: PageProps<'/case-studies/[slug]'>) {
  const published = getPublishedCaseStudies(caseStudies.caseStudies);
  const study = published.find((item) => item.slug === slug);
  if (!study) {
    return (
      <>
        <SEO
          title="Case Study Not Found | THOR Digital"
          description="The requested case study could not be found."
          canonicalUrl={`https://www.thor-studio.com/case-studies/${slug}`}
          noindex
        />
        <section className="min-h-screen bg-white flex items-center justify-center px-fluid-6">
          <div className="text-center">
            <h1 className="type-section-heading text-navy mb-6">
              Case study not found
            </h1>
            <a href="/case-studies" className="btn btn-primary">
              View all case studies
            </a>
          </div>
        </section>
      </>
    );
  }

  const dimensions = CASE_STUDY_OG_IMAGE_DIMENSIONS[study.slug];
  const gallery = getCaseStudyGallery(study);
  const related = getRelatedCaseStudies(study, published);
  const sections: CaseStudySection[] = [
    { id: 'overview', label: 'Overview' },
    ...(study.achievements.length
      ? [{ id: 'results' as const, label: 'Results' }]
      : []),
    ...(gallery.length ? [{ id: 'gallery' as const, label: 'Gallery' }] : []),
    ...(related.length
      ? [{ id: 'related' as const, label: 'Related work' }]
      : []),
  ];

  return (
    <>
      <SEO
        title={`${study.name} - Case Study | THOR Digital`}
        description={study.dek}
        canonicalUrl={`https://www.thor-studio.com/case-studies/${slug}`}
        ogImage={study.images.cardHorizontal}
        ogImageAlt={`${study.name} case study`}
        {...(dimensions
          ? { ogImageWidth: dimensions.width, ogImageHeight: dimensions.height }
          : {})}
        ogType="article"
      />
      <article className="bg-white text-ink">
        <CaseStudyHeader study={study} />
        <CaseStudyMeta study={study} />
        <CaseStudySectionNav sections={sections} url={study.url} />

        <section id="overview" className="case-section" tabIndex={-1}>
          <div className="case-page-width grid items-start gap-fluid-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="type-eyebrow mb-5">Project brief</p>
              <h2 className="type-section-heading text-navy">
                Project overview
              </h2>
            </div>
            <div className="max-w-[var(--layout-article)]">
              <div className="type-article-lede text-navy mb-fluid-8">
                <ContentBlocks text={study.projectBrief} />
              </div>
              <div className="type-article-body">
                <ContentBlocks text={study.mainText} />
              </div>
            </div>
          </div>
        </section>

        {study.achievements.length > 0 && (
          <section id="results" className="case-section !pt-0" tabIndex={-1}>
            <div className="case-page-width">
              <div className="rounded-[32px] bg-navy p-fluid-6 md:p-fluid-8">
                <h2 className="type-section-heading text-white mb-fluid-8">
                  Key <span className="text-magenta">achievements</span>
                </h2>
                <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {study.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="rounded-2xl border border-divider-dark bg-white/5 p-6"
                    >
                      <span
                        className="type-card-title text-magenta block mb-4"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="type-card-summary !text-on-dark">
                        <ContentBlocks text={achievement} />
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}

        {gallery.length > 0 && (
          <section id="gallery" className="case-section !pt-0" tabIndex={-1}>
            <div className="case-page-width">
              <p className="type-eyebrow mb-5">Gallery</p>
              <h2 className="type-section-heading text-navy mb-fluid-8">
                The work
              </h2>
              <CaseStudyGallery images={gallery} name={study.name} />
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section
            id="related"
            className="case-section !pt-0 overflow-hidden"
            tabIndex={-1}
          >
            <div className="case-page-width">
              <h2 className="type-section-heading text-center text-navy mb-fluid-8">
                Related case studies
              </h2>
              <div className="case-related-motion mx-auto max-w-[1100px]">
                <FlipbookCarousel
                  slides={related.map((item) => ({
                    src: item.images.cardVertical,
                    label: item.name,
                    slug: item.slug,
                  }))}
                />
              </div>
              <div className="case-related-static gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <a
                    key={item.slug}
                    href={`/case-studies/${item.slug}`}
                    className="group"
                  >
                    <img
                      src={item.images.cardHorizontal}
                      alt=""
                      className="w-full aspect-video rounded-2xl object-cover mb-4"
                      loading="lazy"
                    />
                    <h3 className="type-card-title text-navy">{item.name}</h3>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
      <ChallengePromo />
    </>
  );
}

export const getConfig = async () =>
  ({
    render: 'static',
    staticPaths: getPublishedCaseStudies(caseStudies.caseStudies).map(
      (study) => study.slug
    ),
  }) as const;
