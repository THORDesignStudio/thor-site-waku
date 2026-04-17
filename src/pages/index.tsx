import { CapabilitiesHomePageSection } from '../components/CapabilitiesHomePageSection';
import { ProgramsCarousel } from '../components/ProgramsCarousel';
import { CaseStudyCarousel } from '../components/CaseStudyCarousel';
import { HeroBasic } from '../components/HeroBasic';
import { TestimonialCards } from '../components/TestimonialCards';
import { SEO } from '../components/SEO';

export default async function HomePage() {
  return (
    <>
      <SEO
        title="THOR Digital | Discoverers of Elusive Design Solutions"
        description="THOR Digital takes organizational communications to the next level."
        canonicalUrl="https://www.thor-studio.com/"
        ogImage="/images/hero-hammers/THOR_Hammer_OG_1200x630px.jpg"
      />
      <div className="w-full">
        <HeroBasic />
        <CapabilitiesHomePageSection />
        <ProgramsCarousel />
        <CaseStudyCarousel />
        <TestimonialCards />
      </div>
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
