import type { CaseStudy } from '../data/case-studies';
import { getPublishedCaseStudies } from '../data/site-content';

function weightedTagSimilarity(
  currentTags: string[],
  candidateTags: string[],
  weight: number
) {
  const current = new Set(currentTags);
  const candidate = new Set(candidateTags);
  const shared = [...current].filter((tag) => candidate.has(tag)).length;
  const union = new Set([...current, ...candidate]).size;
  return union === 0 ? 0 : (shared / union) * weight;
}

// Preserve the existing 4/3/2 weighting and featured/source-order tie breaks.
export function getRelatedCaseStudies(
  current: CaseStudy,
  studies: readonly CaseStudy[],
  count = 5
) {
  return getPublishedCaseStudies(studies)
    .map((study, index) => ({
      study,
      index,
      score:
        weightedTagSimilarity(current.verticals, study.verticals, 4) +
        weightedTagSimilarity(current.programs, study.programs, 3) +
        weightedTagSimilarity(current.capabilities, study.capabilities, 2),
    }))
    .filter(({ study }) => study.slug !== current.slug)
    .sort(
      (a, b) =>
        b.score - a.score ||
        Number(Boolean(b.study.featured)) - Number(Boolean(a.study.featured)) ||
        a.index - b.index
    )
    .slice(0, count)
    .map(({ study }) => study);
}
