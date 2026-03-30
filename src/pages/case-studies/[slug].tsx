import type { PageProps } from 'waku/router';
import { caseStudies, type CaseStudy } from '../../data/case-studies';
import { SEO } from '../../components/SEO';

interface CaseStudyHeaderProps {
  study: CaseStudy;
}

function CaseStudyHeader({ study }: CaseStudyHeaderProps) {
  return (
    <section className="relative overflow-hide">
      {/* Smoke Background - behind title + dek */}
      <div
        className="absolute top-0 left-0 right-0 h-[180px] md:h-[500px] bg-top-left bg-no-repeat bg-auto bg-[#0B0F3C]"
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
            <div className="relative w-[85vw] md:w-[45vw] max-w-[600px] md:-mr-fluid-36">
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
    <div
      className="bg-pink-flat rounded-[45px] p-fluid-6 md:p-fluid-8 max-w-xl"
      style={{
        marginBottom: '-60px', // Overlap into next section
      }}
    >
      <h3 className="text-fluid-lg font-bold text-white mb-fluid-3">
        Project Brief
      </h3>
      <div className="font-sans font-light text-fluid-base text-white/90 leading-relaxed whitespace-pre-line">
        {study.projectBrief}
      </div>
    </div>
  );
}

function ProjectImageSection({ study }: CaseStudyHeaderProps) {
  return (
    <section className="bg-cream pt-fluid-24 pb-fluid-8">
      <div className="max-w-[1600px] mx-auto px-fluid-6 lg:px-fluid-12">
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

function MainContentSection({ study }: CaseStudyHeaderProps) {
  // Split mainText by double newlines to render paragraphs
  const paragraphs = study.mainText.split('\n\n');

  return (
    <section className="bg-cream py-fluid-8">
      <div className="max-w-[1600px] mx-auto px-fluid-6 lg:px-fluid-12">
        <div className="max-w-4xl">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="font-sans font-light text-fluid-2xl text-night mt-fluid-2 leading-normal mb-fluid-6"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementsSection({ study }: CaseStudyHeaderProps) {
  return (
    <section className="bg-cream py-fluid-8">
      <div className="max-w-[1600px] mx-auto px-fluid-6 lg:px-fluid-12">
        <div className="bg-pink-flat rounded-[45px] p-fluid-6 md:p-fluid-8">
          <h3 className="heading-lg text-white mb-fluid-6">Key Achievements</h3>
          <ul className="space-y-fluid-3">
            {study.achievements.map((achievement, index) => (
              <li
                key={index}
                className="font-sans font-light text-fluid-lg text-white/90 leading-relaxed flex items-start gap-fluid-3"
              >
                <span className="text-white mt-2">•</span>
                <span>{achievement}</span>
              </li>
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
        <SEO
          title="Case Study Not Found | THOR Digital"
          description="The requested case study could not be found."
          url={`/case-studies/${slug}`}
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
        title={`${study.name} | Case Study | THOR Digital`}
        description={study.dek}
        url={`/case-studies/${slug}`}
      />

      <article>
        <CaseStudyHeader study={study} />
        <ProjectImageSection study={study} />
        <MainContentSection study={study} />
        <AchievementsSection study={study} />
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
