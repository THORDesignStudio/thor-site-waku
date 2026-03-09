export interface CaseStudy {
  name: string;
  slug: string;
  dek: string;
  description: string;
  verticals: string[];
  categories: string[];
  client: string;
  url: string;
  images: {
    card: string;
    header: string;
    project: string;
  };
}

interface CaseStudies {
  title: string;
  caseStudies: CaseStudy[];
}

export const caseStudies: CaseStudies = {
  title: 'Case Studies',
  caseStudies: [
    {
      name: 'IBD Drug Guide',
      slug: 'ibd-drug-guide',
      dek: 'Customizing Drug Recommendations for IBD Patients',
      description:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      verticals: ['Health Care', 'Association & Non-Profit'],
      categories: ['Data / Infographics', 'User Experience Design'],
      client: 'American Gastroenterological Association / Knighten Health',
      url: 'https://ibddrugguide.gastro.org/',
      images: {
        card: '/images/case-studies/cards/mash-app.jpg',
        header: '/images/case-studies/headers/ibd-drug-guide.png',
        project: '/images/case-studies/projects/ibd-drug-guide.png',
      },
    },
    {
      name: 'City Ratings',
      slug: 'city-ratings',
      dek: 'How Bike Friendly is Your City?',
      description:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      verticals: ['Outdoor', 'Associations'],
      categories: ['User Experience Design', 'Data / Infographics'],
      client: 'PeopleForBikes',
      url: 'https://cityratings.peopleforbikes.org/',
      images: {
        card: '/images/case-studies/cards/city-ratings.jpg',
        header: '/images/case-studies/headers/city-ratings.png',
        project: '/images/case-studies/projects/city-ratings.png',
      },
    },
    {
      name: 'Aerospace America Feature+ Articles',
      slug: 'aerospace-america-articles',
      dek: 'Interactive Explorations of Aerospace Topics',
      description:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      verticals: ['Construction / Engineering', 'Media / Publishing'],
      categories: ['Constru', 'Data / Infographics'],
      client: 'American Institute of Aeronautics and Astronautics',
      url: 'https://aerospaceamerica.aiaa.org/features',
      images: {
        card: '/images/case-studies/cards/aerospace-america-articles.jpg',
        header: '/images/case-studies/headers/aerospace-america-articles.png',
        project: '/images/case-studies/projects/aerospace-america-articles.png',
      },
    },
    {
      name: 'MASH App',
      slug: 'mash-app',
      dek: 'An Advanced App to Help Fight a Silent Epidemic',
      description:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      verticals: ['Health Care', 'Association & Non-Profit'],
      categories: ['Mobile App'],
      client: 'American Gastroenterological Association',
      url: 'https://apps.apple.com/us/app/aga-nash-app/id1589270847',
      images: {
        card: '/images/case-studies/cards/mash-app.jpg',
        header: '/images/case-studies/headers/mash-app.png',
        project: '',
      },
    },
    {
      name: 'Chemonics Media Site',
      slug: 'chemonics-media-site',
      dek: "A Showcase of Development 's Impact on Society",
      description:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      verticals: ['Media & Publishing', 'Association & Non-Profit'],
      categories: ['Design', 'Campaign Website'],
      client: 'Chemonics',
      url: 'https://media.chemonics.org/',
      images: {
        card: '/images/case-studies/cards/chemonics-media-site.jpg',
        header: '/images/case-studies/headers/chemonics-media-site.png',
        project: '',
      },
    },
    {
      name: 'Construction Executive Magazine',
      slug: 'construction-executive-magazine',
      dek: 'An Enhanced Experience for Digital and Print Readers',
      description:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      verticals: ['Media & Publishing', 'Construction / Engineering'],
      categories: ['Publication Website'],
      client: 'Associated Builders & Contractors',
      url: 'https://www.constructionexec.com/',
      images: {
        card: '/images/case-studies/cards/construction-executive.jpg',
        header: '/images/case-studies/headers/construction-executive.png',
        project: '/images/case-studies/projects/construction-executive.png',
      },
    },
    {
      name: 'NIRI Investor Relations Rebrand',
      slug: 'niri-investor-relations-rebrand',
      dek: 'A New Look for an Opinion Leader',
      description:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      verticals: ['Finance', 'Association & Non-Profit'],
      categories: ['Design'],
      client: 'National Investor Relations Institute',
      url: 'https://www.niri.org/',
      images: {
        card: '/images/case-studies/cards/niri.jpg',
        header: '',
        project: '',
      },
    },
  ],
};
