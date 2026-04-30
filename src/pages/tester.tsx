import { caseStudies } from '../data/case-studies';
import FlipbookCarousel, {
  type FlipbookCarouselSlide,
} from '../components/FlipbookCarousel/FlipbookCarousel';

const flipbookSlides: FlipbookCarouselSlide[] = caseStudies.caseStudies
  .slice(0, 8)
  .map((study) => ({
    src: study.images.cardVertical,
    label: study.name,
    slug: study.slug,
  }));

export default function TesterPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B0F3C]">
        <div className="relative z-10 min-h-[50vh] mx-auto max-w-[1350px] px-fluid-6 py-fluid-24">
          <h1 className="mb-fluid-4 text-fluid-8xl font-display leading-tight tracking-fluid-tight text-white">
            TESTER
          </h1>
          <div className="max-w-3xl">
            <p className="section-subtitle font-sans font-light text-fluid-2xl text-cream mt-fluid-2 leading-normal">
              This is a tester page.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="bg-cream py-fluid-12 px-fluid-6 lg:px-fluid-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-fluid-6">
            <FlipbookCarousel slides={flipbookSlides} />
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
