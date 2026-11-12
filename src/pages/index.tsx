import { CaseStudyCarousel } from '../components/CaseStudyCarousel';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { HomeSections } from '../components/HomeSections';
import { TestimonialCards } from '../components/TestimonialCards';
import { ChallengePromo } from '../components/ChallengePromo';
import { CapabilityPageMotion } from '../components/CapabilityPageMotion';
import { getFeaturedProjects } from '../data/featured-projects';
import { SEO } from '../components/SEO';

export default function HomePage() {
  return (
    <>
      <SEO
        title="THOR Digital | Serious content deserves serious design"
        description="THOR builds data-rich websites, brands and publications that help mission-driven organizations thrive."
        canonicalUrl="https://www.thor-studio.com/"
        ogImage="/images/home/city-ratings.jpg"
        ogImageAlt="A cyclist rides through a city illuminated in orange, pink, and blue"
        ogImageWidth={1600}
        ogImageHeight={897}
      />
      <div className="home-page w-full">
        <section className="home-intro bg-navy text-white">
          <div className="home-intro-content mx-auto max-w-[var(--layout-page)] px-fluid-6 pt-[9.6rem] pb-fluid-8 sm:pt-[10.8rem]">
            <h1 className="type-page-headline">
              Serious content deserves
              <br />
              <span className="text-magenta">
                serious<span className="max-md:block"> design.</span>
              </span>
            </h1>
            <p className="home-intro-lede type-page-lede mt-fluid-6 max-w-4xl text-white">
              THOR builds data-rich websites, brands and publications that help
              mission-driven organizations thrive.
            </p>
            <div className="home-identity mt-fluid-10 flex flex-wrap items-center justify-between gap-fluid-6">
              <p className="home-disciplines-line flex flex-wrap items-center gap-4 font-[family-name:var(--font-family-display)] text-[clamp(1.75rem,3.5vw,3rem)] font-semibold uppercase tracking-wide">
                Design{' '}
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-magenta"
                />{' '}
                Development{' '}
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-magenta"
                />{' '}
                Branding
              </p>
              <p className="home-location flex items-center gap-4 text-xs font-extrabold uppercase tracking-[0.2em]">
                <span aria-hidden="true" className="h-px w-12 bg-magenta" />
                Austin, TX
              </p>
            </div>
          </div>
        </section>
        <FeaturedProjects projects={getFeaturedProjects()} />
        <CapabilityPageMotion>
          <div className="home-results w-full bg-white">
            <div className="mx-auto max-w-[var(--layout-page)]">
              <CaseStudyCarousel
                label="We deliver results"
                header={
                  <div>
                    <h2 className="section-title type-section-heading text-navy">
                      We deliver <span className="text-magenta">results</span>
                    </h2>
                    <p className="section-subtitle type-page-lede mt-fluid-6 max-w-3xl text-ink">
                      Explore what we’ve built for our clients.
                    </p>
                  </div>
                }
              />
            </div>
          </div>
          <HomeSections />
          <TestimonialCards />
          <div className="home-challenge">
            <ChallengePromo />
          </div>
        </CapabilityPageMotion>
      </div>
    </>
  );
}
export const getConfig = async () => ({ render: 'static' }) as const;
