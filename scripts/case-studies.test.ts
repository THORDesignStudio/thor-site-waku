import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { test } from 'node:test';
import { caseStudies, type CaseStudy } from '../src/data/case-studies';
import { getCaseStudyGallery } from '../src/data/case-study-galleries';
import {
  getCaseStudyTopics,
  normalizeCaseStudyTopic,
  resolveCaseStudyTopic,
} from '../src/data/case-study-topics';
import {
  getPublishedCaseStudies,
  getReadyPages,
  plannedPages,
  resolveCaseStudySlug,
} from '../src/data/site-content';
import { getRelatedCaseStudies } from '../src/utils/case-studies';
import { redirects } from '../src/config/redirects';

const studies = caseStudies.caseStudies;

test('draft pages and studies cannot enter published collections', () => {
  const draft = {
    ...studies[0]!,
    slug: 'draft-study',
    status: 'draft' as const,
  };
  assert.deepEqual(getReadyPages(plannedPages), []);
  assert.equal(
    getPublishedCaseStudies([...studies, draft]).length,
    studies.length
  );
  assert.deepEqual(
    getReadyPages([{ path: '/ready', status: 'ready' }, ...plannedPages]),
    [{ path: '/ready', status: 'ready' }]
  );
});

test('export names resolve to existing slugs without inventing routes', () => {
  for (const source of [
    'let-s-beat-hcm',
    'aerospace-america-feature-articles',
  ]) {
    assert.ok(
      studies.some((study) => study.slug === resolveCaseStudySlug(source))
    );
  }
  assert.equal(resolveCaseStudySlug('city-ratings'), 'city-ratings');
  assert.equal(resolveCaseStudySlug('toString'), 'toString');
  const destinations = new Set(
    studies.map((study) => `/case-studies/${study.slug}`)
  );
  for (const redirect of redirects)
    assert.ok(
      !destinations.has(redirect.source),
      `${redirect.source} shadows a study`
    );
  assert.equal(new Set(studies.map((study) => study.slug)).size, 17);
});

test('old topic queries retain the same sector membership across spelling variants', () => {
  const topics = ['All', ...new Set(studies.flatMap(getCaseStudyTopics))];
  for (const legacy of [
    'Media / Publishing',
    'Media & Publishing',
    'Media + Publishing',
  ]) {
    assert.equal(resolveCaseStudyTopic(legacy, topics), 'Media & Publishing');
  }
  for (const legacy of ['Associations', 'Association & Non-Profit']) {
    assert.equal(
      resolveCaseStudyTopic(legacy, topics),
      'Associations & Non-Profits'
    );
  }
  assert.equal(normalizeCaseStudyTopic('Finance'), 'Finance');
  assert.equal(resolveCaseStudyTopic('unknown', topics), 'All');
  assert.equal(resolveCaseStudyTopic('toString', topics), 'All');
  assert.equal(resolveCaseStudyTopic(null, topics), 'All');
  assert.equal(
    getCaseStudyTopics({
      verticals: ['Media / Publishing', 'Media & Publishing'],
    }).length,
    1
  );
});

test('all galleries use real local artwork, with six composite fallbacks', () => {
  let composites = 0;
  for (const study of studies) {
    const images = getCaseStudyGallery(study);
    assert.ok(images.length === 1 || images.length === 5);
    if (images.length === 1) composites++;
    for (const image of images) {
      assert.ok(existsSync(`public${image.src}`), image.src);
      assert.ok(image.alt && !image.alt.includes('[Portfolio'));
      assert.ok(
        image.width && image.width > 0 && image.height && image.height > 0
      );
    }
  }
  assert.equal(composites, 6);
});

test('related ranking retains sector/program/capability weights and deterministic ties', () => {
  const current = {
    ...studies[0]!,
    slug: 'current',
    verticals: ['sector'],
    programs: ['program'],
    capabilities: ['capability'],
  };
  const candidate = (slug: string, fields: Partial<CaseStudy>): CaseStudy => ({
    ...current,
    slug,
    verticals: [],
    programs: [],
    capabilities: [],
    featured: false,
    ...fields,
  });
  const sector = candidate('sector', { verticals: ['sector'] });
  const program = candidate('program', { programs: ['program'] });
  const capability = candidate('capability', { capabilities: ['capability'] });
  const featured = candidate('featured', { featured: true });
  const last = candidate('last', {});
  const draft = candidate('draft', {
    verticals: ['sector'],
    programs: ['program'],
    status: 'draft',
  });
  assert.deepEqual(
    getRelatedCaseStudies(current, [
      current,
      last,
      featured,
      capability,
      program,
      sector,
      draft,
    ]).map((study) => study.slug),
    ['sector', 'program', 'capability', 'featured', 'last']
  );
  for (const study of studies) {
    const related = getRelatedCaseStudies(study, studies);
    assert.equal(related.length, 5);
    assert.ok(related.every((item) => item.slug !== study.slug));
  }
});
