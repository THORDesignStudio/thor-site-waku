import type { CaseStudy } from './case-studies';

export type PageStatus = 'draft' | 'ready';

export interface PageRecord {
  path: string;
  status: PageStatus;
}

// Proposed destinations stay unpublished; their existing redirects remain valid.
export const plannedPages: PageRecord[] = [
  { path: '/how-we-work', status: 'draft' },
  { path: '/writing/[slug]', status: 'draft' },
  { path: '/capabilities/[slug]', status: 'draft' },
  { path: '/verticals/construction-engineering', status: 'draft' },
  { path: '/verticals/associations-nonprofits', status: 'draft' },
  { path: '/work-with-us', status: 'draft' },
];

export function getReadyPages(pages: readonly PageRecord[]) {
  return pages.filter((page) => page.status === 'ready');
}

export function getPublishedCaseStudies(studies: readonly CaseStudy[]) {
  // Existing studies are published; new entries can opt into draft status.
  return studies.filter((study) => study.status !== 'draft');
}

// Only actual spelling differences are aliases. Existing canonical URLs stay put.
export const caseStudySourceAliases: Readonly<Record<string, string>> = {
  'let-s-beat-hcm': 'lets-beat-hcm',
  'aerospace-america-feature-articles': 'aerospace-america-articles',
};

export function resolveCaseStudySlug(sourceSlug: string) {
  return Object.hasOwn(caseStudySourceAliases, sourceSlug)
    ? caseStudySourceAliases[sourceSlug]!
    : sourceSlug;
}
