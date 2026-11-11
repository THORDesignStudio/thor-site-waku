import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  capabilities,
  getCapabilityBySlug,
  getCapabilityByUrl,
  getPublishedCapabilities,
} from '../src/data/capabilities';
import { caseStudies } from '../src/data/case-studies';
import { redirects } from '../src/config/redirects';
import { getCapabilityCaseStudies } from '../src/utils/capabilities';

test('only ready capability bodies generate public routes', () => {
  const published = getPublishedCapabilities();
  assert.deepEqual(
    published.map((item) => item.slug),
    [
      'web-development',
      'publication-design',
      'event-solutions',
      'e-commerce-solutions',
      'mobile-apps',
      'data-visualization',
      'user-experience',
      'branding',
      'content-strategy',
    ]
  );
  const web = published[0]!;
  assert.deepEqual(
    getPublishedCapabilities([
      { ...web, page: { ...web.page, status: 'draft' } },
    ]),
    []
  );
  for (const item of published) {
    assert.equal(item.url, `/capabilities/${item.slug}`);
    assert.ok(!redirects.some((redirect) => redirect.source === item.url));
  }
});

test('legacy capability lookups remain available independently of page publication', () => {
  assert.equal(capabilities.capabilities.length, 9);
  assert.equal(
    getCapabilityByUrl('/capabilities/event-registration')?.slug,
    'event-solutions'
  );
  assert.equal(
    getCapabilityByUrl('/capabilities/e-commerce')?.slug,
    'e-commerce-solutions'
  );
  assert.equal(
    getCapabilityBySlug('publication-design')?.name,
    'Publication Design'
  );
  assert.equal(getCapabilityBySlug('unknown'), undefined);
  assert.ok(
    getPublishedCapabilities().some(
      (item) => item.slug === 'publication-design'
    )
  );
});

test('capability carousels select exact tags, exclude drafts and include newly tagged studies automatically', () => {
  const base = caseStudies.caseStudies[0]!;
  const tagged = {
    ...base,
    slug: 'tagged',
    featured: false,
    capabilities: ['web-development', 'web-development'],
  };
  const unrelated = {
    ...base,
    slug: 'unrelated',
    capabilities: ['web-development-extra'],
  };
  const draft = { ...tagged, slug: 'draft', status: 'draft' as const };
  const newlyAdded = {
    ...base,
    slug: 'new-project',
    capabilities: ['web-development', 'publication-design'],
  };
  const studies = [tagged, unrelated, draft, newlyAdded];
  assert.deepEqual(
    getCapabilityCaseStudies({ slug: 'web-development' }, studies).map(
      (item) => item.slug
    ),
    ['tagged', 'new-project']
  );
  assert.deepEqual(
    getCapabilityCaseStudies({ slug: 'publication-design' }, studies).map(
      (item) => item.slug
    ),
    ['new-project']
  );
  assert.deepEqual(getCapabilityCaseStudies({ slug: 'unknown' }, studies), []);
});

test('Web work uses existing case-study capability metadata in source order', () => {
  const web = getPublishedCapabilities()[0]!;
  const work = getCapabilityCaseStudies(web, caseStudies.caseStudies);
  const slugs = new Set(work.map((item) => item.slug));
  assert.ok(slugs.has('city-ratings'));
  assert.ok(slugs.has('keep-riding'));
  assert.ok(!slugs.has('chemonics-media-site'));
  assert.ok(!slugs.has('lets-beat-hcm'));
  const positions = work.map((item) => caseStudies.caseStudies.indexOf(item));
  assert.ok(
    positions.every(
      (position, index) =>
        position >= 0 && (index === 0 || position > positions[index - 1]!)
    )
  );
});

test('every published capability has complete, specific copy and tag-based work', () => {
  for (const capability of getPublishedCapabilities()) {
    const content = capability.page;
    assert.ok(
      content.overviewHeading && content.overviewIntro && content.overviewBody
    );
    assert.ok(
      content.platformsLabel &&
        content.platformsHeading.text &&
        content.detailsHeading.text &&
        content.workHeading
    );
    assert.ok(content.platforms.length > 0 && content.details.length > 0);
    assert.ok(
      !/\[(?:placeholder|category|.*case study)\]|lorem ipsum/i.test(
        JSON.stringify(content)
      ),
      capability.slug
    );
    for (const card of [...content.platforms, ...content.details])
      assert.ok(card.title && card.description);
    const work = getCapabilityCaseStudies(capability, caseStudies.caseStudies);
    assert.ok(work.length > 0, `${capability.slug} has no tagged work`);
    assert.ok(
      work.every((study) => study.capabilities.includes(capability.slug))
    );
  }
});

test('legacy capability URLs resolve to published canonical destinations', () => {
  for (const source of [
    '/capabilities/event-registration',
    '/capabilities/e-commerce',
  ]) {
    const capability = getCapabilityByUrl(source)!;
    const redirect = redirects.find((item) => item.source === source)!;
    assert.ok(capability.page?.status === 'ready');
    assert.equal(redirect.destination, capability.url);
    assert.equal(redirect.permanent, true);
  }
});

test('Branding and Content Strategy use the handoff project classifications', () => {
  const brand = getCapabilityCaseStudies(
    { slug: 'branding' },
    caseStudies.caseStudies
  ).map((study) => study.slug);
  const content = getCapabilityCaseStudies(
    { slug: 'content-strategy' },
    caseStudies.caseStudies
  ).map((study) => study.slug);
  assert.ok(
    brand.includes('niri-investor-relations-rebrand') &&
      brand.includes('citiva')
  );
  assert.ok(
    content.includes('nyscheck') && content.includes('chemonics-media-site')
  );
  assert.ok(!brand.includes('ibd-drug-guide'));
});
