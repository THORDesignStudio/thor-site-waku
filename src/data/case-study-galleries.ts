// Real gallery art from the design handoff. Existing project composites are
// retained for the six studies whose export galleries are placeholders.
import type { CaseStudy } from './case-studies';

export interface CaseStudyGalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export const caseStudyGalleries: Readonly<
  Record<string, CaseStudyGalleryImage[]>
> = {
  'lets-beat-hcm': [
    {
      src: '/images/case-studies/galleries/lets-beat-hcm/hcm-gallery-1.jpg',
      alt: 'Home page on laptop and mobile',
      width: 2400,
      height: 1029,
    },
    {
      src: '/images/case-studies/galleries/lets-beat-hcm/hcm-gallery-2.jpg',
      alt: 'Trainers and FAQ pages on mobile',
      width: 900,
      height: 1374,
    },
    {
      src: '/images/case-studies/galleries/lets-beat-hcm/hcm-gallery-3.jpg',
      alt: 'Trainers page on laptop and mobile',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/lets-beat-hcm/hcm-gallery-4.jpg',
      alt: 'Curriculum page on laptop',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/lets-beat-hcm/hcm-gallery-5.jpg',
      alt: 'Curriculum and home pages on mobile',
      width: 900,
      height: 1374,
    },
  ],
  'keep-riding': [
    {
      src: '/images/case-studies/galleries/keep-riding/keepriding-gallery-1.jpg',
      alt: 'Ride Spot home, collections and categories on mobile',
      width: 2400,
      height: 1029,
    },
    {
      src: '/images/case-studies/galleries/keep-riding/keepriding-gallery-2.jpg',
      alt: 'Ride Spot electric bicycles and community pages',
      width: 900,
      height: 1374,
    },
    {
      src: '/images/case-studies/galleries/keep-riding/keepriding-gallery-3.jpg',
      alt: 'Ride Spot challenges, bike mechanics and donut ride pages',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/keep-riding/keepriding-gallery-4.jpg',
      alt: 'Ride Spot categories, art and architecture, and ambassador pages',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/keep-riding/keepriding-gallery-5.jpg',
      alt: 'Ride Spot community and collections pages',
      width: 900,
      height: 1374,
    },
  ],
  'leon-hotel': [
    {
      src: '/images/case-studies/galleries/leon-hotel/leon-gallery-1.jpg',
      alt: 'Leon Hotel identity collection: logo versions, business cards, signage and website',
      width: 2400,
      height: 1029,
    },
    {
      src: '/images/case-studies/galleries/leon-hotel/leon-gallery-2.jpg',
      alt: 'Leon Hotel business card and wooden room key',
      width: 900,
      height: 1374,
    },
    {
      src: '/images/case-studies/galleries/leon-hotel/leon-gallery-3.jpg',
      alt: 'Leon Hotel website on desktop',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/leon-hotel/leon-gallery-4.jpg',
      alt: 'Leon Hotel business cards on wood',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/leon-hotel/leon-gallery-5.jpg',
      alt: 'Leon Hotel branded stationery',
      width: 900,
      height: 1374,
    },
  ],
  ltk: [
    {
      src: '/images/case-studies/galleries/ltk/ltk-gallery-1.jpg',
      alt: 'LTK website location and project pages on laptops',
      width: 2400,
      height: 1029,
    },
    {
      src: '/images/case-studies/galleries/ltk/ltk-gallery-2.jpg',
      alt: 'LTK discovery findings presentation and brand materials',
      width: 900,
      height: 1374,
    },
    {
      src: '/images/case-studies/galleries/ltk/ltk-gallery-3.jpg',
      alt: 'LTK homepage and Our Work on desktop',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/ltk/ltk-gallery-4.jpg',
      alt: 'LTK project case study page',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/ltk/ltk-gallery-5.jpg',
      alt: 'LTK Origins and Leadership pages',
      width: 900,
      height: 1374,
    },
  ],
  'mash-app': [
    {
      src: '/images/case-studies/projects/mash-app.webp',
      alt: 'Mash App project overview',
      width: 1600,
      height: 1225,
    },
  ],
  mayflower: [
    {
      src: '/images/case-studies/galleries/mayflower/mayflower-gallery-1.jpg',
      alt: 'Mayflower home and Cannabis 101 pages on desktop',
      width: 2400,
      height: 1029,
    },
    {
      src: '/images/case-studies/galleries/mayflower/mayflower-gallery-2.jpg',
      alt: 'Mayflower products and providers pages',
      width: 900,
      height: 1374,
    },
    {
      src: '/images/case-studies/galleries/mayflower/mayflower-gallery-3.jpg',
      alt: 'Mayflower concentrate section and ordering page',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/mayflower/mayflower-gallery-4.jpg',
      alt: 'Mayflower providers and registration pages',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/mayflower/mayflower-gallery-5.jpg',
      alt: 'Mayflower Cannabis 101 and flower listings',
      width: 900,
      height: 1374,
    },
  ],
  'niri-investor-relations-rebrand': [
    {
      src: '/images/case-studies/galleries/niri-investor-relations-rebrand/niri-gallery-1.jpg',
      alt: 'NIRI logo and brand guidelines',
      width: 2400,
      height: 1029,
    },
    {
      src: '/images/case-studies/galleries/niri-investor-relations-rebrand/niri-gallery-2.jpg',
      alt: 'NIRI branded business cards',
      width: 900,
      height: 1374,
    },
    {
      src: '/images/case-studies/galleries/niri-investor-relations-rebrand/niri-gallery-3.jpg',
      alt: 'NIRI team ringing the Nasdaq bell',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/niri-investor-relations-rebrand/niri-gallery-4.jpg',
      alt: 'NIRI IR Update magazine',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/niri-investor-relations-rebrand/niri-gallery-5.jpg',
      alt: 'NIRI Senior Roundtable bus shelter ad',
      width: 900,
      height: 1374,
    },
  ],
  'no-kid-hungry': [
    {
      src: '/images/case-studies/projects/no-kid-hungry.webp',
      alt: 'No Kid Hungry project overview',
      width: 1600,
      height: 1225,
    },
  ],
  nyscheck: [
    {
      src: '/images/case-studies/projects/nyscheck.webp',
      alt: 'Nyscheck project overview',
      width: 1600,
      height: 1225,
    },
  ],
  'aerospace-america-articles': [
    {
      src: '/images/case-studies/galleries/aerospace-america-articles/aerospace-gallery-1.jpg',
      alt: 'Space Nuclear on laptop with the SR-1 carousel on a second laptop',
      width: 2400,
      height: 1029,
    },
    {
      src: '/images/case-studies/galleries/aerospace-america-articles/aerospace-gallery-2.jpg',
      alt: 'The New Space Race feature pages on mobile',
      width: 900,
      height: 1374,
    },
    {
      src: '/images/case-studies/galleries/aerospace-america-articles/aerospace-gallery-3.jpg',
      alt: 'SpaceX Mars plan on laptop with the Mars Entry feature on mobile',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/aerospace-america-articles/aerospace-gallery-4.jpg',
      alt: 'Boom XB-1 interactive feature on laptop and mobile',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/aerospace-america-articles/aerospace-gallery-5.jpg',
      alt: 'Chronicling Artemis feature pages on mobile',
      width: 900,
      height: 1374,
    },
  ],
  'chemonics-media-site': [
    {
      src: '/images/case-studies/galleries/chemonics-media-site/chemonics-gallery-1.jpg',
      alt: 'Chemonics Media homepage and White Helmets story on laptop',
      width: 2400,
      height: 1029,
    },
    {
      src: '/images/case-studies/galleries/chemonics-media-site/chemonics-gallery-2.jpg',
      alt: 'Chemonics Media homepage and White Helmets on mobile',
      width: 900,
      height: 1374,
    },
    {
      src: '/images/case-studies/galleries/chemonics-media-site/chemonics-gallery-3.jpg',
      alt: 'Travel Tunisia story on laptop and mobile',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/chemonics-media-site/chemonics-gallery-4.jpg',
      alt: 'About Chemonics Media on laptop and mobile',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/chemonics-media-site/chemonics-gallery-5.jpg',
      alt: 'Mavka and story list on mobile',
      width: 900,
      height: 1374,
    },
  ],
  citiva: [
    {
      src: '/images/case-studies/projects/citiva.webp',
      alt: 'Citiva project overview',
      width: 1600,
      height: 1225,
    },
  ],
  'city-ratings': [
    {
      src: '/images/case-studies/galleries/city-ratings/cityratings-gallery-1.jpg',
      alt: 'City Ratings homepage hero and best places to bike on laptop',
      width: 2400,
      height: 1029,
    },
    {
      src: '/images/case-studies/galleries/city-ratings/cityratings-gallery-2.jpg',
      alt: 'City Ratings hero and best places on mobile',
      width: 900,
      height: 1374,
    },
    {
      src: '/images/case-studies/galleries/city-ratings/cityratings-gallery-3.jpg',
      alt: 'Cities to watch and projects on laptop with city card on mobile',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/city-ratings/cityratings-gallery-4.jpg',
      alt: 'Project tracker on laptop with project types on mobile',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/city-ratings/cityratings-gallery-5.jpg',
      alt: 'Cities to watch and project status on mobile',
      width: 900,
      height: 1374,
    },
  ],
  'construction-executive-magazine': [
    {
      src: '/images/case-studies/projects/construction-executive.webp',
      alt: 'Construction Executive Magazine project overview',
      width: 1600,
      height: 1225,
    },
  ],
  'engineering-inc': [
    {
      src: '/images/case-studies/projects/engineering-inc.webp',
      alt: 'Engineering Inc project overview',
      width: 1600,
      height: 1225,
    },
  ],
  'hungry-for-batteries': [
    {
      src: '/images/case-studies/galleries/hungry-for-batteries/batteries-gallery-1.jpg',
      alt: 'Hungry for Batteries homepage hero and rider carousel on laptop',
      width: 2400,
      height: 1029,
    },
    {
      src: '/images/case-studies/galleries/hungry-for-batteries/batteries-gallery-2.jpg',
      alt: 'Hungry for Batteries hero and battery recycling solution on mobile',
      width: 900,
      height: 1374,
    },
    {
      src: '/images/case-studies/galleries/hungry-for-batteries/batteries-gallery-3.jpg',
      alt: 'Battery recycling solution on laptop with drop-off mascot on mobile',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/hungry-for-batteries/batteries-gallery-4.jpg',
      alt: "Don't trash your e-bike battery on laptop with Rey on mobile",
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/hungry-for-batteries/batteries-gallery-5.jpg',
      alt: 'Battery messaging and recycling steps on mobile',
      width: 900,
      height: 1374,
    },
  ],
  'ibd-drug-guide': [
    {
      src: '/images/case-studies/galleries/ibd-drug-guide/ibd-gallery-1.jpg',
      alt: 'IBD Drug Guide treatment explorer and homepage on laptop',
      width: 2400,
      height: 1029,
    },
    {
      src: '/images/case-studies/galleries/ibd-drug-guide/ibd-gallery-2.jpg',
      alt: 'IBD Drug Guide homepage and vaccine section on mobile',
      width: 900,
      height: 1374,
    },
    {
      src: '/images/case-studies/galleries/ibd-drug-guide/ibd-gallery-3.jpg',
      alt: 'About page on laptop with biologics section on mobile',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/ibd-drug-guide/ibd-gallery-4.jpg',
      alt: 'Treatment explorer on laptop and mobile',
      width: 1800,
      height: 1376,
    },
    {
      src: '/images/case-studies/galleries/ibd-drug-guide/ibd-gallery-5.jpg',
      alt: 'About page and treatment list on mobile',
      width: 900,
      height: 1374,
    },
  ],
};

export function getCaseStudyGallery(study: CaseStudy): CaseStudyGalleryImage[] {
  return (
    (Object.hasOwn(caseStudyGalleries, study.slug)
      ? caseStudyGalleries[study.slug]
      : undefined) ?? [
      {
        src: study.images.project.webp,
        alt: `${study.name} project overview`,
      },
    ]
  );
}
