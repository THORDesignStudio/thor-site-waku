import { caseStudies, type CaseStudy } from './case-studies';
import { getPublishedCaseStudies } from './site-content';

export interface FeaturedProject {
  slug: string;
  name: string;
  url: string;
  image: { src: string; alt: string; width: number; height: number };
  headline: string;
  highlight: string;
  summary: string;
  tabSummary: string;
  metrics: { value: string; label: string; source: string }[];
}
const definitions: Omit<FeaturedProject, 'name' | 'url'>[] = [
  {
    slug: 'city-ratings',
    image: {
      src: '/images/home/city-ratings.jpg',
      alt: 'City Ratings, a global bikeability ranking site',
      width: 1600,
      height: 897,
    },
    headline: 'From 510 to',
    highlight: '3,500+ cities.',
    summary:
      'We rebuilt the data platform behind the world’s benchmark for bikeability, and have kept it growing since.',
    tabSummary: '3,500+ cities rated',
    metrics: [
      {
        value: '3,500+',
        label: 'Cities rated worldwide',
        source: 'case-studies/city-ratings',
      },
      {
        value: 'Since 2020',
        label: 'An ongoing platform partnership',
        source: 'case-studies/city-ratings',
      },
    ],
  },
  {
    slug: 'aerospace-america-articles',
    image: {
      src: '/images/home/aerospace-america.jpg',
      alt: 'An astronaut working outside a spacecraft',
      width: 1920,
      height: 840,
    },
    headline: 'Award-winning',
    highlight: 'storytelling.',
    summary:
      'We design the custom Feature+ articles that bring AIAA’s aerospace and aeronautics journalism to life on the web.',
    tabSummary: 'A decade of award-winning storytelling',
    metrics: [
      {
        value: '10+ YRS',
        label:
          'Designing Aerospace America’s publication and Feature+ articles',
        source: 'provided-homepage-slide-2-pdf',
      },
      {
        value: '100+',
        label: 'Individual issues designed for print and web',
        source: 'provided-homepage-slide-2-pdf',
      },
    ],
  },
  {
    slug: 'ibd-drug-guide',
    image: {
      src: '/images/home/ibd-drug-guide.jpg',
      alt: 'A medicine bottle, capsules and a search interface',
      width: 1920,
      height: 840,
    },
    headline: 'Interactive',
    highlight: 'clinical guidance.',
    summary:
      'We built a quiz-based site that helps physicians and patients weigh treatment options that help people live their best lives.',
    tabSummary: 'Quiz-based treatment discovery',
    metrics: [
      {
        value: '58',
        label: 'Treatment options available on the site',
        source: 'provided-homepage-slide-3-pdf',
      },
    ],
  },
];

export function getFeaturedProjects(
  studies: readonly CaseStudy[] = caseStudies.caseStudies
): FeaturedProject[] {
  const published = getPublishedCaseStudies([...studies]);
  return definitions.flatMap((definition) => {
    const study = published.find((item) => item.slug === definition.slug);
    return study
      ? [
          {
            ...definition,
            name:
              definition.slug === 'aerospace-america-articles'
                ? 'Aerospace America'
                : study.name,
            url: `/case-studies/${study.slug}`,
          },
        ]
      : [];
  });
}
