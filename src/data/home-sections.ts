import { getPublishedCapabilities } from './capabilities';
import { getPublishedSectors } from './sectors';
import { caseStudies } from './case-studies';
import { getPublishedCaseStudies } from './site-content';

const disciplines = [
  {
    title: 'Design',
    description:
      'Editorial and interface design for dense, high-stakes content — from association magazines produced on deadline to data tools used across thousands of cities.',
    capabilitySlugs: [
      'publication-design',
      'data-visualization',
      'user-experience',
    ],
    proofSlug: 'aerospace-america-articles',
  },
  {
    title: 'Development',
    description:
      'Websites and apps that handle real complexity — large datasets, member logins, editorial workflows — and still load fast and stay accessible.',
    capabilitySlugs: [
      'web-development',
      'mobile-apps',
      'e-commerce-solutions',
      'event-solutions',
    ],
    proofSlug: 'city-ratings',
  },
  {
    title: 'Branding',
    description:
      'Identity systems built to scale and to last — like the NIRI rebrand, maintained through a long-term design partnership.',
    capabilitySlugs: ['branding', 'content-strategy'],
    proofSlug: 'niri-investor-relations-rebrand',
  },
];
export function getHomeDisciplines() {
  const capabilities = getPublishedCapabilities();
  const studies = getPublishedCaseStudies(caseStudies.caseStudies);
  return disciplines.map((discipline) => ({
    ...discipline,
    capabilities: discipline.capabilitySlugs.flatMap((slug) => {
      const capability = capabilities.find((item) => item.slug === slug);
      return capability ? [{ name: capability.name, url: capability.url }] : [];
    }),
    proof: studies.find((item) => item.slug === discipline.proofSlug),
  }));
}
export function getHomeVerticals() {
  const sectors = getPublishedSectors();
  return [
    ...['associations-nonprofits', 'construction-engineering'].flatMap(
      (slug) => {
        const sector = sectors.find((item) => item.slug === slug);
        return sector
          ? [
              {
                name: sector.name,
                url: `/verticals/${sector.slug}`,
                image: `/images/home/${slug === 'associations-nonprofits' ? 'associations' : 'construction'}.jpg`,
              },
            ]
          : [];
      }
    ),
    {
      name: 'Publications',
      url: '/verticals/publications',
      image: '/images/home/publications.jpg',
    },
  ];
}
export const homeSocial = [
  {
    name: 'Instagram',
    description: '@thor_design_studio',
    url: 'https://www.instagram.com/thor_design_studio/',
    images: [
      {
        src: '/images/home/instagram-publication.jpg',
        alt: 'California Constructor cover',
        width: 1080,
        height: 1350,
      },
      {
        src: '/images/home/instagram-illustration.jpg',
        alt: 'Artificial Intelligence: The New Frontier editorial illustration',
        width: 1500,
        height: 1500,
      },
      {
        src: '/images/home/instagram-city-ratings.jpg',
        alt: 'City Ratings website shown on a laptop',
        width: 1080,
        height: 1350,
      },
    ],
  },
  {
    name: 'LinkedIn',
    description: 'THOR Design Studio · News and case studies',
    url: 'https://www.linkedin.com/company/thor-design-studio-inc',
    images: [
      {
        src: '/images/home/linkedin.jpg',
        alt: 'THOR wordmark over a mountain sunrise',
        width: 1400,
        height: 350,
      },
    ],
  },
];
