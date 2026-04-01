import { CapabilitiesHomePageSection } from '../components/CapabilitiesHomePageSection';
import { ProgramsCarousel } from '../components/ProgramsCarousel';
import { CaseStudyCarousel } from '../components/CaseStudyCarousel';
import { HeroBasic } from '../components/HeroBasic';
import { TestimonialCards } from '../components/TestimonialCards';

export default async function HomePage() {
  return (
    <>
      <title>THOR Digital | Discoverers of Elusive Design Solutions</title>
      <meta
        name="description"
        content="THOR Digital takes organizational communications to the next level."
      />
      <link rel="canonical" href="https://www.thor-studio.com/" />
      <meta
        property="og:title"
        content="THOR Digital | Discoverers of Elusive Design Solutions"
      />
      <meta
        property="og:description"
        content="THOR Digital takes organizational communications to the next level."
      />
      <meta
        property="og:image"
        content="/images/hero-hammers/THOR_Hammer_OG_1200x630px.jpg"
      />
      <meta property="og:url" content="https://www.thor-studio.com/" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="THOR Digital | Discoverers of Elusive Design Solutions"
      />
      <meta
        name="twitter:description"
        content="Learn how THOR takes organizational communications to the next level."
      />
      <meta
        name="twitter:image"
        content="/images/hero-hammers/THOR_Hammer_OG_1200x630px.jpg"
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
