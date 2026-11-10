import { caseStudies } from '../data/case-studies';
import FlipbookCarousel, {
  type FlipbookCarouselSlide,
} from '../components/FlipbookCarousel/FlipbookCarousel';
import { PageHero } from '../components/PageHero';

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
      <PageHero title="TESTER" subtitle="This is a tester page." />

      {/* Case Studies Grid */}
      <section className="bg-white py-fluid-12 px-fluid-6 lg:px-fluid-12">
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
