import type { CaseStudy } from './case-studies';

// Normalize spelling, not meaning: finance, hospitality and philanthropy retain
// their existing memberships rather than being recategorized from a mockup.
const topicAliases: Readonly<Record<string, string>> = {
  Associations: 'Associations & Non-Profits',
  'Association & Non-Profit': 'Associations & Non-Profits',
  'Associations & Non-Profits': 'Associations & Non-Profits',
  'Construction / Engineering': 'Construction & Engineering',
  'Construction + Engineering': 'Construction & Engineering',
  'Media / Publishing': 'Media & Publishing',
  'Media + Publishing': 'Media & Publishing',
};

export function normalizeCaseStudyTopic(topic: string) {
  return Object.hasOwn(topicAliases, topic) ? topicAliases[topic]! : topic;
}

export function getCaseStudyTopics(study: Pick<CaseStudy, 'verticals'>) {
  return [...new Set(study.verticals.map(normalizeCaseStudyTopic))];
}

export function resolveCaseStudyTopic(
  query: string | null,
  topics: readonly string[]
) {
  const normalized = normalizeCaseStudyTopic(query ?? 'All');
  return topics.includes(normalized) ? normalized : 'All';
}
