export interface FlagshipPublication {
  name: string;
  category: string;
  description: string;
  cover: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
}

export interface Magazine {
  name: string;
  cover: string;
  texture: string;
}

const publicationImagePath = '/images/verticals/publications';

export const flagshipPublications: FlagshipPublication[] = [
  {
    name: 'Business Officer',
    category: 'Flagship publications',
    description:
      'A 12-year partnership spanning more than 140 issues. THOR completed an EXCEL Award-winning redesign, designed and developed the companion digital edition, and earned more than 10 awards for cover design, feature design, and illustration.',
    cover: `${publicationImagePath}/mag-business-officer.jpg`,
    metrics: [
      { value: '140+', label: 'Issues completed' },
      { value: '10+', label: 'Design awards' },
    ],
  },
  {
    name: 'California Constructor',
    category: 'Flagship publications',
    description:
      'THOR helped California Constructor establish a clear, contemporary editorial system built to handle technical reporting, member stories, and industry news with equal confidence.',
    cover: `${publicationImagePath}/mag-california-constructor.jpg`,
    metrics: [
      { value: '30+', label: 'Issues completed' },
      { value: '5+', label: 'APEX awards' },
    ],
  },
  {
    name: 'Construction Executive',
    category: 'Flagship publications',
    description:
      'An award-winning redesign and ongoing production partnership that gives a leading construction publication a flexible visual system across print and digital channels.',
    cover: `${publicationImagePath}/mag-construction-executive.jpg`,
    metrics: [
      { value: '5+', label: 'Partnership years' },
      { value: '3', label: 'Redesign awards' },
    ],
  },
];

export const aerospaceSpotlightImages = Array.from(
  { length: 6 },
  (_, index) =>
    `${publicationImagePath}/aerospace/spotlight-${String(index + 1).padStart(2, '0')}.png`
);

const textures = [
  `${publicationImagePath}/bg-marble-white.jpg`,
  `${publicationImagePath}/bg-wood-warm.jpg`,
  `${publicationImagePath}/bg-metal-gray.jpg`,
  `${publicationImagePath}/bg-metal-copper.jpg`,
];

const magazineCovers = [
  ['Business Officer', 'mag-business-officer.jpg'],
  ['Aerospace America', 'mag-aerospace-america.jpg'],
  ['Legacy', 'mag-legacy.jpg'],
  ['California Constructor', 'mag-california-constructor.jpg'],
  ['Colorado Lawyer', 'mag-colorado-lawyer.jpg'],
  ['Construction Executive', 'mag-construction-executive.jpg'],
  ['Contract Management', 'mag-contract-management.jpg'],
  ['Directorship', 'mag-directorship.jpg'],
  ['The Docket', 'mag-the-docket.jpg'],
  ['GeoStrata', 'mag-geostrata.jpg'],
  ['Pharmaceutical Engineering', 'mag-pharmaceutical-engineering.jpg'],
] as const;

export const magazines: Magazine[] = magazineCovers.map(
  ([name, filename], index) => ({
    name,
    cover: `${publicationImagePath}/${filename}`,
    texture: textures[index % textures.length],
  })
);

export const awardImages = Array.from(
  { length: 15 },
  (_, index) =>
    `${publicationImagePath}/awards/award-${String(index + 1).padStart(2, '0')}.png`
);
