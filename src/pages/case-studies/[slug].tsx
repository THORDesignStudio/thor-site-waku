import type { PageProps } from 'waku/router';
import { caseStudies, type CaseStudy } from '../../data/case-studies';
import {
  parseContentBlocks,
  type ContentBlock,
} from '../../utils/contentParser';

interface CaseStudyHeaderProps {
  study: CaseStudy;
}

function CaseStudyHeader({ study }: CaseStudyHeaderProps) {
  return (
    <section className="relative overflow-hide">
      {/* Smoke Background - behind title + dek */}
      <div
        className="absolute top-0 left-0 right-0 h-[50vh] md:h-[500px] bg-top-left bg-no-repeat bg-auto bg-[#0B0F3C]"
        style={{
          backgroundImage: `url(/images/smoke-scene/smoke-bg-combined-titlebar.jpg)`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-[1500px] mx-auto pl-fluid-6 pr-fluid-12">
        <div className="pt-[150px] pb-fluid-4 flex flex-col md:flex-row md:min-h-[500px]">
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
          <div className="w-full md:w-1/2 relative flex items-center justify-center py-fluid-8 md:py-0 md:-mb-fluid-24 md:-ml-[10%]">
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
            className="font-sans font-light text-fluid-2xl text-night leading-normal pl-fluid-2"
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
      className="font-sans font-light text-fluid-2xl text-night mt-fluid-2 leading-normal mb-fluid-6"
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
      <div className="max-w-[1400px] mx-auto p-fluid-8">
        <div className="bg-night rounded-4xl p-fluid-6 md:p-fluid-8">
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

export default async function CaseStudyPage({
  slug,
}: PageProps<'/case-studies/[slug]'>) {
  const study = caseStudies.caseStudies.find((s) => s.slug === slug);

  if (!study) {
    // Return 404-like content if case study not found
    return (
      <>
        <title>Case Study Not Found | THOR Digital</title>
        <meta
          name="description"
          content="The requested case study could not be found."
        />
        <link
          rel="canonical"
          href={`https://www.thor-studio.com/case-studies/${slug}`}
        />
        <meta
          property="og:title"
          content="Case Study Not Found | THOR Digital"
        />
        <meta
          property="og:description"
          content="The requested case study could not be found."
        />
        <meta
          property="og:image"
          content="/images/hero-hammers/THOR_Hammer_OG_1200x630px.jpg"
        />
        <meta
          property="og:url"
          content={`https://www.thor-studio.com/case-studies/${slug}`}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Case Study Not Found | THOR Digital"
        />
        <meta
          name="twitter:description"
          content="The requested case study could not be found."
        />
        <meta
          name="twitter:image"
          content="/images/hero-hammers/THOR_Hammer_OG_1200x630px.jpg"
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
      <title>{`${study.name} - Case Study | THOR Digital`}</title>
      <meta name="description" content={study.dek} />
      <link
        rel="canonical"
        href={`https://www.thor-studio.com/case-studies/${slug}`}
      />
      <meta
        property="og:title"
        content={`${study.name} - Case Study | THOR Digital`}
      />
      <meta property="og:description" content={study.dek} />
      <meta
        property="og:image"
        content={study.images.cardHorizontal}
      />
      <meta
        property="og:url"
        content={`https://www.thor-studio.com/case-studies/${slug}`}
      />
      <meta property="og:type" content="article" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={`${study.name} - Case Study | THOR Digital`}
      />
      <meta name="twitter:description" content={study.dek} />
      <meta
        name="twitter:image"
        content={study.images.cardHorizontal}
      />

      <article>
        <CaseStudyHeader study={study} />
        <ProjectBriefCard study={study} />
        <ProjectImageSection study={study} />
        <MainContentSection study={study} />
        <AchievementsSection study={study} />
        <div className="flex justify-center mb-fluid-12 mx-fluid-6">
          <a
            href="/case-studies"
            className="px-8 py-4 bg-pink text-white text-2xl font-extrabold rounded-full transition-all shadow-lg whitespace-nowrap uppercase cursor-pointer hover:-translate-y-1"
          >
            Read More Case Studies
          </a>
        </div>
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
