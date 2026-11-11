import type { Capability } from '../data/capabilities';
import type { CaseStudy } from '../data/case-studies';
import { getPublishedCaseStudies } from '../data/site-content';

export function getCapabilityCaseStudies(
  capability: Pick<Capability, 'slug'>,
  studies: readonly CaseStudy[]
) {
  return getPublishedCaseStudies(studies).filter((study) =>
    study.capabilities.includes(capability.slug)
  );
}
