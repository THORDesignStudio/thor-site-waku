import { caseStudies } from '../data/case-studies';
import { SEO } from '../components/SEO';
import { PageHero } from '../components/PageHero';
import { CaseStudyFilterGrid } from '../components/CaseStudyFilterGrid';
import { ChallengePromo } from '../components/ChallengePromo';
import { getPublishedCaseStudies } from '../data/site-content';

export default function CaseStudiesPage() {
  const sortedStudies = getPublishedCaseStudies(caseStudies.caseStudies).sort(
    (a, b) => a.name.localeCompare(b.name)
  );

  return (
    <>
      <SEO
        title="Case Studies | THOR Digital"
        description="See how THOR has delivered for our clients."
        canonicalUrl="https://www.thor-studio.com/case-studies"
        ogImage="/images/case-studies/cards-horizontal/aerospace-america-articles.jpg"
      />

      <PageHero
        title="CASE"
        highlight="STUDIES"
        subtitle="See how THOR has delivered for our clients."
      />

      <CaseStudyFilterGrid studies={sortedStudies} />

      <ChallengePromo />
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
