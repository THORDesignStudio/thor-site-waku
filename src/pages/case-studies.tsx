import { SEO } from '../components/SEO';
import { caseStudies } from '../data/case-studies';
import type { CaseStudy } from '../data/case-studies';

interface CaseStudyCardProps {
  study: CaseStudy;
}

function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <a
      href={`/case-studies/${study.slug}`}
      className="group flex flex-col transition-transform duration-300 ease-out hover:-translate-y-2"
    >
      {/* Card Image */}
      <div
        className="aspect-video w-full overflow-hidden rounded-[10px]"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <img
          src={study.images.cardHorizontal}
          alt={study.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Card Content */}
      <div className="pt-fluid-4 flex flex-col gap-fluid-1">
        {/* Vertical Tag */}
        <p className="text-fluid-xs text-night/50 uppercase tracking-widest font-bold">
          {study.verticals[0]}
        </p>

        {/* Title */}
        <h3 className="text-fluid-xl font-extrabold uppercase text-night leading-tight tracking-wide">
          {study.name}
        </h3>

        {/* Dek */}
        <p className="text-fluid-base font-light text-night/80 leading-relaxed">
          {study.dek}
        </p>
      </div>
    </a>
  );
}

export default function CaseStudiesPage() {
  // Sort case studies alphabetically by name
  const sortedStudies = [...caseStudies.caseStudies].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <>
      <SEO
        title="Case Studies | THOR Digital"
        description="See how THOR has delivered for our clients."
        url="/case-studies"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B0F3C]">
        <div className="relative z-10 min-h-[50vh] mx-auto max-w-[1350px] px-fluid-6 py-fluid-24">
          <h1 className="mb-fluid-4 text-fluid-8xl font-display leading-tight tracking-fluid-tight text-white">
            CASE STUDIES
          </h1>
          <div className="max-w-3xl">
            <p className="section-subtitle font-sans font-light text-fluid-2xl text-cream mt-fluid-2 leading-normal">
              See how THOR has delivered for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="bg-cream py-fluid-12 px-fluid-6 lg:px-fluid-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-fluid-6">
            {sortedStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
