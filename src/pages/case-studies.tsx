import { SEO } from '../components/SEO';

export default function CaseStudiesPage() {
  return (
    <>
      <SEO
        title="Case Studies | THOR Digital"
        description="Explore our portfolio of design solutions and case studies."
        url="/case-studies"
      />
      <div className="w-full">
        {/* Hero Section */}
        <section className="min-h-[var(--spacing-fluid-72)] flex items-end justify-center px-10 py-20">
          <div className="max-w-6xl w-full">
            <h1 className="heading-md">
              Explore Our
              <br />
              <span className="heading-xl">Portfolio</span>
            </h1>
          </div>
        </section>

        <section className="py-20 px-6 bg-linear-to-b from-cream to-cream-dark text-black">
          <div className="max-w-6xl mx-auto"></div>
        </section>
      </div>
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
