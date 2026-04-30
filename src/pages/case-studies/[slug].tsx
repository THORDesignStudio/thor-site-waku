import type { PageProps } from 'waku/router';
import { caseStudies, type CaseStudy } from '../../data/case-studies';
import {
  parseContentBlocks,
  type ContentBlock,
} from '../../utils/contentParser';
import { SEO } from '../../components/SEO';
import FlipbookCarousel, {
  type FlipbookCarouselSlide,
} from '../../components/FlipbookCarousel/FlipbookCarousel';

interface CaseStudyHeaderProps {
  study: CaseStudy;
}

const RELATED_CASE_STUDY_COUNT = 5;

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

function getWeightedTagSimilarity(
  currentTags: string[],
  candidateTags: string[],
  weight: number
) {
  const current = new Set(currentTags);
  const candidate = new Set(candidateTags);
  const sharedCount = [...current].filter((tag) => candidate.has(tag)).length;
  const unionCount = new Set([...current, ...candidate]).size;

  if (unionCount === 0) return 0;

  return (sharedCount / unionCount) * weight;
}

function getCaseStudySimilarity(current: CaseStudy, candidate: CaseStudy) {
  return (
    getWeightedTagSimilarity(current.verticals, candidate.verticals, 4) +
    getWeightedTagSimilarity(current.programs, candidate.programs, 3) +
    getWeightedTagSimilarity(current.capabilities, candidate.capabilities, 2)
  );
}

function getRelatedCaseStudies(current: CaseStudy) {
  return caseStudies.caseStudies
    .map((candidate, index) => ({
      study: candidate,
      index,
      score:
        candidate.slug === current.slug
          ? Number.NEGATIVE_INFINITY
          : getCaseStudySimilarity(current, candidate),
    }))
    .filter(({ study }) => study.slug !== current.slug)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.study.featured !== b.study.featured)
        return a.study.featured ? -1 : 1;
      return a.index - b.index;
    })
    .slice(0, RELATED_CASE_STUDY_COUNT)
    .map(({ study }) => study);
}

function toFlipbookSlide(study: CaseStudy): FlipbookCarouselSlide {
  return {
    src: study.images.cardVertical,
    label: study.name,
    slug: study.slug,
  };
}

function CaseStudyHeader({ study }: CaseStudyHeaderProps) {
  return (
    <section className="relative overflow-hide bg-cream">
      {/* iOS-specific top mask via @supports - only fades in from top, not out at bottom */}
      <style>{`
        @supports (-webkit-touch-callout: none) {
          .header-image-ios {
            mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 100%) !important;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 100%) !important;
          }
        }
      `}</style>

      {/* Night background - shows through where mask is transparent at top */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-[#0B0F3C]" />

      {/* Smoke Background - behind title + dek */}
      <div
        className="absolute top-0 left-0 right-0 h-[500px] sm:h-[500px] bg-no-repeat bg-[#0B0F3C] header-image-ios"
        style={{
          backgroundImage: `url(/images/smoke-scene/smoke-bg-combined-titlebar.jpg)`,
          backgroundPosition: 'left top',
          backgroundSize: 'auto 500px',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-[1500px] mx-auto pl-fluid-6 pr-fluid-12 sm:bg-none">
        <div className="pt-fluid-24 sm:pt-[150px] pb-fluid-4 flex flex-col md:flex-row md:min-h-[500px]">
          {/* Left Column - Title + Dek - overflows onto right side */}
          <div className="w-full md:w-[60%] relative z-20">
            <p className="text-fluid-md text-cream uppercase tracking-widest font-bold pb-fluid-1 pl-[0.3rem]">
              Case Study
            </p>
            <h1 className="heading-lg text-white mb-fluid-2">{study.name}</h1>
            <p className="font-sans font-light text-fluid-xl text-cream/90 leading-relaxed">
              {study.dek}
            </p>
          </div>

          {/* Right Column - Gradient Circle + Header Image - pulled left to overlap */}
          <div className="w-full md:w-1/2 relative  flex items-center justify-center py-fluid-8 md:py-0 md:-mb-fluid-24 md:-ml-[10%]">
            {/* Shared container pins circle + image together */}
            <div className="relative w-full md:w-[45vw] max-w-[600px] md:-mr-fluid-36">
              <div
                className="w-[75%] mx-auto aspect-square rounded-full"
                style={{
                  background:
                    'linear-gradient(180deg, var(--color-pink) 0%, var(--color-night) 100%)',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <picture className="w-[115%]">
                  <source srcSet={study.images.header.webp} type="image/webp" />
                  <source srcSet={study.images.header.png} type="image/png" />
                  <img
                    src={study.images.header.png}
                    alt={`${study.name} header`}
                    className="w-full h-auto object-contain"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectBriefCard({ study }: CaseStudyHeaderProps) {
  return (
    <div className="mx-fluid-6">
      <div className="bg-pink-flat rounded-4xl p-fluid-8 max-w-[1300px] mx-auto w-full md:mt-fluid-24">
        <h3 className="text-fluid-lg font-bold text-white mb-fluid-3 uppercase tracking-widest">
          Project Brief
        </h3>
        <div className=" font-sans font-light text-fluid-xl text-white/90 leading-relaxed whitespace-pre-line">
          {study.projectBrief}
        </div>
        {study.url && (
          <div className="flex justify-center pt-fluid-6 mx-fluid-6">
            <a
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-fluid-6 py-4 bg-cream text-night text-center text-xl font-extrabold rounded-full transition-all shadow-lg uppercase cursor-pointer"
              aria-label={`Visit ${study.name} website (opens in new tab)`}
            >
              Visit Website
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectImageSection({ study }: CaseStudyHeaderProps) {
  return (
    <section className="bg-cream pt-fluid-12 ">
      <div className="max-w-[1600px] mx-auto px-fluid-6">
        <picture>
          <source srcSet={study.images.project.webp} type="image/webp" />
          <source srcSet={study.images.project.png} type="image/png" />
          <img
            src={study.images.project.png}
            alt={`${study.name} project mockup`}
            className="w-full h-auto object-contain"
          />
        </picture>
      </div>
    </section>
  );
}

function renderContentBlock(block: ContentBlock, index: number) {
  if (block.type === 'list') {
    const items = block.content as string[];
    return (
      <ul
        key={index}
        className="list-disc list-outside ml-fluid-6 space-y-fluid-2 mb-fluid-6"
      >
        {items.map((item, itemIndex) => (
          <li
            key={itemIndex}
            className="font-sans font-light text-fluid-xl text-night leading-normal pl-fluid-2"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p
      key={index}
      className="font-sans font-light text-fluid-xl text-night mt-fluid-2 leading-normal mb-fluid-6"
    >
      {block.content as string}
    </p>
  );
}

function MainContentSection({ study }: CaseStudyHeaderProps) {
  const contentBlocks = parseContentBlocks(study.mainText);

  return (
    <section className="bg-cream py-fluid-8">
      <div className="max-w-[800px] mx-auto px-fluid-6">
        <h3 className="text-fluid-lg font-bold text-night mb-fluid-3 uppercase tracking-widest">
          Project Overview
        </h3>
        <div className="w-full">
          {contentBlocks.map((block, index) =>
            renderContentBlock(block, index)
          )}
        </div>
      </div>
    </section>
  );
}

function AchievementItem({
  achievement,
  index,
}: {
  achievement: string;
  index: number;
}) {
  const contentBlocks = parseContentBlocks(achievement);
  const firstBlock = contentBlocks[0];

  if (contentBlocks.length === 1 && firstBlock?.type === 'paragraph') {
    // Simple single-paragraph achievement
    return (
      <li className="font-sans font-light text-fluid-lg text-white/90 leading-relaxed pl-fluid-2">
        {firstBlock.content as string}
      </li>
    );
  }

  // Achievement with nested bullets or multiple blocks
  return (
    <li className="font-sans font-light text-fluid-lg text-white/90 leading-relaxed">
      {contentBlocks.map((block, blockIndex) =>
        block.type === 'paragraph' ? (
          <p key={blockIndex} className="mb-fluid-2">
            {block.content as string}
          </p>
        ) : (
          <ul
            key={blockIndex}
            className="list-disc list-outside ml-fluid-6 space-y-fluid-1 mt-fluid-2"
          >
            {(block.content as string[]).map((item, itemIndex) => (
              <li key={itemIndex} className="pl-fluid-2">
                {item}
              </li>
            ))}
          </ul>
        )
      )}
    </li>
  );
}

function AchievementsSection({ study }: CaseStudyHeaderProps) {
  return (
    <section className="bg-cream">
      <div className="max-w-[1400px] mx-auto pb-fluid-8 px-fluid-6">
        <div className="bg-night rounded-4xl px-fluid-6 py-fluid-8 md:px-fluid-6 md:py-fluid-8">
          <h3 className="heading-lg text-white mb-fluid-6">Key Achievements</h3>
          <ul className="list-disc list-outside ml-fluid-6 space-y-fluid-3">
            {study.achievements.map((achievement, index) => (
              <AchievementItem
                key={index}
                achievement={achievement}
                index={index}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function RelatedCaseStudiesSection({ study }: CaseStudyHeaderProps) {
  const relatedSlides = getRelatedCaseStudies(study).map(toFlipbookSlide);

  if (relatedSlides.length === 0) return null;

  return (
    <section className="bg-cream pb-fluid-16 pt-fluid-4 px-fluid-6">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="mb-fluid-6 text-center font-display text-fluid-5xl font-bold leading-tight text-night">
          Related Case Studies
        </h2>
        <FlipbookCarousel slides={relatedSlides} />
      </div>
    </section>
  );
}

export default async function CaseStudyPage({
  slug,
}: PageProps<'/case-studies/[slug]'>) {
  const study = caseStudies.caseStudies.find((s) => s.slug === slug);
  const ogImageDimensions = study
    ? CASE_STUDY_OG_IMAGE_DIMENSIONS[study.slug]
    : undefined;

  if (!study) {
    // Return 404-like content if case study not found
    return (
      <>
        <SEO
          title="Case Study Not Found | THOR Digital"
          description="The requested case study could not be found."
          canonicalUrl={`https://www.thor-studio.com/case-studies/${slug}`}
          ogImage="/images/hero-hammers/THOR_Hammer_OG_1200x630px.jpg"
          ogImageAlt="THOR Studio"
        />
        <section className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg text-night mb-fluid-4">
              Case Study Not Found
            </h1>
            <p className="font-sans font-light text-fluid-xl text-night/70">
              The case study you're looking for doesn't exist.
            </p>
            <a
              href="/case-studies"
              className="inline-block mt-fluid-6 px-fluid-6 py-fluid-3 bg-pink text-white rounded-full font-sans font-medium text-fluid-base hover:opacity-90 transition-opacity"
            >
              View All Case Studies
            </a>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${study.name} - Case Study | THOR Digital`}
        description={study.dek}
        canonicalUrl={`https://www.thor-studio.com/case-studies/${slug}`}
        ogImage={study.images.cardHorizontal}
        ogImageAlt={`${study.name} case study`}
        ogImageWidth={ogImageDimensions?.width}
        ogImageHeight={ogImageDimensions?.height}
        ogType="article"
      />

      <article className="bg-cream">
        <CaseStudyHeader study={study} />
        <ProjectBriefCard study={study} />
        <ProjectImageSection study={study} />
        <MainContentSection study={study} />
        <AchievementsSection study={study} />
        <RelatedCaseStudiesSection study={study} />
      </article>
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
    staticPaths: caseStudies.caseStudies.map((s) => s.slug),
  } as const;
};
