import type { PageStatus } from './site-content';

export interface HowWeWorkArticle {
  slug: string;
  title: string;
  summary: string;
  status: PageStatus;
  url?: `/writing/${string}`;
  image: { src: string; alt: string; width: number; height: number };
}

export interface HowWeWorkGroup {
  id: 'hww-web' | 'hww-pubs' | 'hww-guide' | 'hww-brands';
  title: string;
  description: string;
  capabilitySlug: string;
  capabilityLabel: string;
  articles: HowWeWorkArticle[];
}

// Topic previews are visible now. Phase 9 will supply article bodies and mark
// records ready; until then no card links to disabled writing routes.
export const howWeWorkGroups: HowWeWorkGroup[] = [
  {
    id: 'hww-web',
    title: 'How We Build for the Web',
    description:
      'At THOR, we fuse design and development into a cohesive and interdependent process that delivers measurable results. We formulate our strategies based on in-depth discovery processes and manage our projects using agile methods to accelerate delivery. Explore our approach to turning your ambitions into reality.',
    capabilitySlug: 'web-development',
    capabilityLabel: 'Explore web development',
    articles: [
      {
        slug: 'how-a-website-is-built',
        title: 'How a Website is Built',
        summary:
          'A top-level view of our methods and what you can expect in an engagement with THOR.',
        status: 'draft',
        image: {
          src: '/images/how-we-work/hw-hero.jpg',
          alt: 'How a Website is Built',
          width: 1672,
          height: 941,
        },
      },
      {
        slug: 'discovery-process',
        title: 'Discovery Process',
        summary:
          'Starting a web project without first conducting a discovery process is like putting on a blindfold and hiking the Grand Canyon.',
        status: 'draft',
        image: {
          src: '/images/how-we-work/a-blindfolded-hiker-standing-at-the-rim-of-a-974c91.png',
          alt: 'A blindfolded hiker standing at the rim of a canyon at sunset',
          width: 1672,
          height: 941,
        },
      },
      {
        slug: 'architecture',
        title: 'Architecture',
        summary:
          'Poorly functioning website? Backlog of unusable content? Search tools that aren’t working? The issues are almost certainly caused by overlooking the critical phase of Site Architecture.',
        status: 'draft',
        image: {
          src: '/images/how-we-work/ar-hero.jpg',
          alt: 'Architecture',
          width: 1672,
          height: 941,
        },
      },
      {
        slug: 'project-management',
        title: 'Project Management',
        summary:
          'Guiding a technical project to the finish line is an art and a science.',
        status: 'draft',
        image: {
          src: '/images/how-we-work/pm-hero.jpg',
          alt: 'Project Management',
          width: 1672,
          height: 941,
        },
      },
      {
        slug: 'design-and-development',
        title: 'Design and Development',
        summary:
          'Marrying content, design, accessibility and performance into a compelling package while staying on budget requires a seasoned team with deep experience.',
        status: 'draft',
        image: {
          src: '/images/how-we-work/dd-hero.jpg',
          alt: 'Design and Development',
          width: 1672,
          height: 941,
        },
      },
    ],
  },
  {
    id: 'hww-pubs',
    title: 'How We Design Publications',
    description:
      'THOR was founded on publication design and over the course of thousands of issues and dozens of redesigns we’ve seen it all. Our team is ready to take your publication to the next level. We handle redesigns, ongoing print production, print-to-digital evolutions, workflow analysis, and everything in between. We love to play our part in dynamic storytelling. Read on for insight into our philosophy.',
    capabilitySlug: 'publication-design',
    capabilityLabel: 'Explore publication design',
    articles: [
      {
        slug: 'publication-redesign',
        title: 'Publication Redesign',
        summary:
          'The purpose of publication redesign is not only to improve the look of the magazine, but also to make 75% of the design decisions up front.',
        status: 'draft',
        image: {
          src: '/images/how-we-work/pr-hero.jpg',
          alt: 'Publication Redesign',
          width: 1672,
          height: 941,
        },
      },
      {
        slug: 'publication-pacing',
        title: 'Publication Pacing',
        summary:
          'If you like things that are boring, disorganized, and uninspired, then magazines without pacing are right up your alley.',
        status: 'draft',
        image: {
          src: '/images/how-we-work/pp-hero.jpg',
          alt: 'Publication Pacing',
          width: 1672,
          height: 941,
        },
      },
      {
        slug: 'ongoing-publication-design',
        title: 'Ongoing Publication Design',
        summary:
          'At its simplest, our goal in publication design is to strike a balance between stunning visual elements and clear communication.',
        status: 'draft',
        image: {
          src: '/images/how-we-work/op-hero.jpg',
          alt: 'Ongoing Publication Design',
          width: 1672,
          height: 941,
        },
      },
    ],
  },
  {
    id: 'hww-guide',
    title: 'How We Guide Our Clients',
    description:
      'At THOR, we serve as your expert guides through the labyrinth of modern technology solutions. Unbound by allegiance to any specific technology vendor, we prioritize the optimal solutions for you. Learn how our expertise can empower your next project.',
    capabilitySlug: 'web-development',
    capabilityLabel: 'Explore our web capabilities',
    articles: [
      {
        slug: 'the-rapidly-evolving-web',
        title: 'The Rapidly Evolving Web',
        summary:
          'A quick digest of the most common types of sites and how they can meet the needs of your organization.',
        status: 'draft',
        image: {
          src: '/images/how-we-work/re-hero.jpg',
          alt: 'The Rapidly Evolving Web',
          width: 1672,
          height: 941,
        },
      },
      {
        slug: 'no-code-websites',
        title: 'No Code Websites',
        summary:
          'No-code website platforms have finally reached maturity and the results are awesome.',
        status: 'draft',
        image: {
          src: '/images/how-we-work/nc-hero.jpg',
          alt: 'No Code Websites',
          width: 1672,
          height: 941,
        },
      },
      {
        slug: 'custom-websites',
        title: 'Custom Websites',
        summary:
          'Like a perfectly tailored suit, a custom website can be the exact fit for your project.',
        status: 'draft',
        image: {
          src: '/images/how-we-work/cu-hero.jpg',
          alt: 'Custom Websites',
          width: 1672,
          height: 941,
        },
      },
      {
        slug: 'cms-websites',
        title: 'CMS Websites',
        summary:
          'CMS sites are among the most common of present day web platforms.',
        status: 'draft',
        image: {
          src: '/images/how-we-work/cm-hero.jpg',
          alt: 'CMS Websites',
          width: 1672,
          height: 940,
        },
      },
      {
        slug: 'headless-websites',
        title: 'Headless Websites',
        summary:
          'In the world of web development, the Headless CMS reigns supreme and allows developers to create truly cutting-edge sites.',
        status: 'draft',
        image: {
          src: '/images/how-we-work/hl-hero.jpg',
          alt: 'Headless Websites',
          width: 1672,
          height: 941,
        },
      },
    ],
  },
  {
    id: 'hww-brands',
    title: 'How We Create Memorable Brands',
    description:
      'THOR builds brands for organizations that need to be remembered. We connect positioning and visual identity with practical guidelines so your brand stays coherent across print, web and product.',
    capabilitySlug: 'branding',
    capabilityLabel: 'Explore branding',
    articles: [
      {
        slug: 'naming-and-positioning',
        title: 'Naming and Positioning',
        summary:
          'Clarify what makes your organization distinct, who it serves, and the message at the center of your brand.',
        status: 'draft',
        image: {
          src: '/images/case-studies/cards-horizontal/niri.jpg',
          alt: 'NIRI brand identity project artwork',
          width: 1600,
          height: 900,
        },
      },
      {
        slug: 'visual-identity-systems',
        title: 'Visual Identity Systems',
        summary:
          'Bring logos, color, type and motion together in a flexible system your team can use consistently.',
        status: 'draft',
        image: {
          src: '/images/case-studies/cards-horizontal/leon-hotel.jpg',
          alt: 'Leon Hotel brand project artwork',
          width: 1727,
          height: 968,
        },
      },
    ],
  },
];

export function getHowWeWorkArticleUrl(article: HowWeWorkArticle) {
  return article.status === 'ready' ? article.url : undefined;
}
