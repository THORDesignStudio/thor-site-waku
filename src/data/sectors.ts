import type { CaseStudy } from './case-studies';
import {
  getCaseStudyTopics,
  normalizeCaseStudyTopic,
} from './case-study-topics';
import { getPublishedCaseStudies, type PageStatus } from './site-content';

interface SectorImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}
export interface SectorPage {
  slug: string;
  status: PageStatus;
  name: string;
  title: string;
  highlight: string;
  description: string;
  topic: string;
  overview?: {
    heading: string;
    intro: string;
    body: string;
    image: SectorImage;
  };
  servicesHeading: string;
  servicesIntro: string;
  services: { title: string; description: string; capabilitySlug: string }[];
  organizations?: { name: string; image: SectorImage }[];
}

export const sectorPages: SectorPage[] = [
  {
    slug: 'associations-nonprofits',
    status: 'ready',
    organizations: [
      {
        name: 'Associated Builders and Contractors',
        image: {
          src: '/images/verticals/associations-nonprofits/org-abc.jpg',
          alt: 'Associated Builders and Contractors organization artwork',
          width: 1560,
          height: 860,
        },
      },
      {
        name: 'COBAR',
        image: {
          src: '/images/verticals/associations-nonprofits/org-cobar.jpg',
          alt: 'COBAR organization artwork',
          width: 1560,
          height: 860,
        },
      },
      {
        name: 'Economic Growth DC',
        image: {
          src: '/images/verticals/associations-nonprofits/org-egdc.jpg',
          alt: 'Economic Growth DC organization artwork',
          width: 1560,
          height: 860,
        },
      },
      {
        name: 'American College of Osteopathic Family Physicians',
        image: {
          src: '/images/verticals/associations-nonprofits/org-acofp.jpg',
          alt: 'American College of Osteopathic Family Physicians organization artwork',
          width: 1560,
          height: 860,
        },
      },
      {
        name: 'American Gastroenterological Association',
        image: {
          src: '/images/verticals/associations-nonprofits/org-aga.jpg',
          alt: 'American Gastroenterological Association organization artwork',
          width: 1560,
          height: 860,
        },
      },
      {
        name: 'Code4Life',
        image: {
          src: '/images/verticals/associations-nonprofits/org-code4life.jpg',
          alt: 'Code4Life organization artwork',
          width: 1560,
          height: 860,
        },
      },
      {
        name: 'Sports & Fitness Industry Association',
        image: {
          src: '/images/verticals/associations-nonprofits/org-sfia.jpg',
          alt: 'Sports & Fitness Industry Association organization artwork',
          width: 1560,
          height: 860,
        },
      },
      {
        name: 'World Bank and International Monetary Fund',
        image: {
          src: '/images/verticals/associations-nonprofits/org-wbimf.jpg',
          alt: 'World Bank and International Monetary Fund organization artwork',
          width: 1560,
          height: 860,
        },
      },
      {
        name: 'NACUBO',
        image: {
          src: '/images/verticals/associations-nonprofits/org-nacubo.jpg',
          alt: 'NACUBO organization artwork',
          width: 1560,
          height: 860,
        },
      },
      {
        name: 'ICMA',
        image: {
          src: '/images/verticals/associations-nonprofits/org-icma.jpg',
          alt: 'ICMA organization artwork',
          width: 1560,
          height: 860,
        },
      },
      {
        name: 'AGC California',
        image: {
          src: '/images/verticals/associations-nonprofits/org-agcca.jpg',
          alt: 'AGC California organization artwork',
          width: 1560,
          height: 860,
        },
      },
      {
        name: 'ISPE',
        image: {
          src: '/images/verticals/associations-nonprofits/org-ispe.jpg',
          alt: 'ISPE organization artwork',
          width: 1560,
          height: 860,
        },
      },
      {
        name: 'American Society of Civil Engineers',
        image: {
          src: '/images/verticals/associations-nonprofits/org-asce.jpg',
          alt: 'American Society of Civil Engineers organization artwork',
          width: 1560,
          height: 860,
        },
      },
      {
        name: 'NIRI',
        image: {
          src: '/images/verticals/associations-nonprofits/org-niri.jpg',
          alt: 'NIRI organization artwork',
          width: 1560,
          height: 860,
        },
      },
      {
        name: 'PeopleForBikes',
        image: {
          src: '/images/verticals/associations-nonprofits/org-pfb.jpg',
          alt: 'PeopleForBikes organization artwork',
          width: 1560,
          height: 860,
        },
      },
      {
        name: 'AIAA',
        image: {
          src: '/images/verticals/associations-nonprofits/org-aiaa.jpg',
          alt: 'AIAA organization artwork',
          width: 1560,
          height: 860,
        },
      },
    ],
    name: 'Associations & Non-Profits',
    title: 'Association websites',
    highlight: 'built for people',
    description:
      'Members, staff, sponsors, and search engines all need something different from your site. THOR designs for all four.',
    topic: 'Associations & Non-Profits',
    servicesHeading: 'What we build',
    servicesIntro:
      'Five things every association website has to get right, built as one system.',
    services: [
      {
        title: 'Public sites',
        description:
          'Explain who you are to a prospective member in one scroll, with clear calls to join.',
        capabilitySlug: 'web-development',
      },
      {
        title: 'Member experiences',
        description:
          'Single sign-on, gated resources, and directories built around your association management system.',
        capabilitySlug: 'user-experience',
      },
      {
        title: 'Publication hubs',
        description:
          'Your magazine and research as searchable, shareable articles, not just PDFs.',
        capabilitySlug: 'publication-design',
      },
      {
        title: 'Event and payment flows',
        description:
          'Conferences, courses, and dues in the same design system as the site.',
        capabilitySlug: 'event-solutions',
      },
      {
        title: 'Accessible and fast',
        description:
          'Readable content, clear navigation, thoughtful interaction, and performance built into the experience.',
        capabilitySlug: 'web-development',
      },
    ],
  },
  {
    slug: 'construction-engineering',
    status: 'ready',
    name: 'Construction & Engineering',
    title: 'Technology partners for',
    highlight: 'construction',
    description:
      'Web and app development for construction and engineering organizations, turning complex projects and technical expertise into clear digital experiences.',
    topic: 'Construction & Engineering',
    overview: {
      heading: 'Make complex work clear',
      intro:
        'Your audience needs to understand the work before they can act on it. We help construction and engineering organizations present technical ideas, publish useful content, and build websites their teams can maintain.',
      body: 'Our work spans the LTK rail engineering website, the print and digital editions of Construction Executive, and Engineering Inc.’s digital publication. These projects bring content structure, editorial design, and development together around the people who use them.',
      image: {
        src: '/images/verticals/construction-engineering/technology.jpg',
        alt: 'A laptop showing a construction technology website against a magenta and purple background',
        width: 1672,
        height: 941,
      },
    },
    servicesHeading: 'Built around your work',
    servicesIntro:
      'Connect your expertise with the people who need it, from a first visit to an ongoing publishing relationship.',
    services: [
      {
        title: 'Websites and digital platforms',
        description:
          'Content models, clear navigation, and maintainable websites that help audiences find projects, services, and technical resources.',
        capabilitySlug: 'web-development',
      },
      {
        title: 'Publications and editorial design',
        description:
          'Print and digital experiences that give industry reporting, research, and expert perspectives a coherent home.',
        capabilitySlug: 'publication-design',
      },
      {
        title: 'Content strategy and structure',
        description:
          'Turn a large body of knowledge into useful pathways, with a publishing structure that supports your team as the content grows.',
        capabilitySlug: 'content-strategy',
      },
    ],
  },
];

export const sectorProcess = [
  {
    title: 'Discovery',
    description:
      'Stakeholder interviews, audience research, and a clear view of what your organization needs.',
    articleSlug: 'discovery-process',
  },
  {
    title: 'Architecture',
    description:
      'A sitemap, reusable templates, and a content model your staff can maintain.',
    articleSlug: 'architecture',
  },
  {
    title: 'Design',
    description: 'A visual and interaction system tested with real content.',
    articleSlug: 'design-and-development',
  },
  {
    title: 'Build and migration',
    description: 'Development that connects your content, systems, and design.',
    articleSlug: 'how-a-website-is-built',
  },
  {
    title: 'Launch and training',
    description: 'A coordinated launch and a team ready to keep publishing.',
    articleSlug: 'project-management',
  },
];

export function getPublishedSectors(
  records: readonly SectorPage[] = sectorPages
) {
  return records.filter((sector) => sector.status === 'ready');
}

export function getSectorCaseStudies(
  sector: Pick<SectorPage, 'topic'>,
  studies: readonly CaseStudy[]
) {
  const topic = normalizeCaseStudyTopic(sector.topic);
  return getPublishedCaseStudies([...studies]).filter((study) =>
    getCaseStudyTopics(study).includes(topic)
  );
}

export function getSectorCaseStudyUrl(sector: Pick<SectorPage, 'topic'>) {
  return `/case-studies?topic=${encodeURIComponent(normalizeCaseStudyTopic(sector.topic))}`;
}
