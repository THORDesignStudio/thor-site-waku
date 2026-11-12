import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { test } from 'node:test';
import {
  getPublishedSectors,
  getSectorCaseStudies,
  getSectorCaseStudyUrl,
  sectorProcess,
} from '../src/data/sectors';
import { caseStudies } from '../src/data/case-studies';
import { getCaseStudyTopics } from '../src/data/case-study-topics';
import { getPublishedCapabilities } from '../src/data/capabilities';
import { getArticlePreview } from '../src/data/articles';
import { footerMenu } from '../src/data/menus';
import { redirects } from '../src/config/redirects';

test('only the two ready new sectors generate paths; existing vertical pages stay authoritative', () => {
  const sectors = getPublishedSectors();
  assert.deepEqual(
    sectors.map((sector) => sector.slug),
    ['associations-nonprofits', 'construction-engineering']
  );
  assert.equal(
    getPublishedSectors([{ ...sectors[0]!, status: 'draft' }]).length,
    0
  );
  for (const sector of sectors) {
    assert.ok(!['publications', 'aerospace'].includes(sector.slug));
    assert.ok(
      !redirects.some(
        (redirect) => redirect.source === `/verticals/${sector.slug}`
      )
    );
  }
  assert.ok(existsSync('src/pages/verticals/publications.tsx'));
  assert.ok(existsSync('src/pages/verticals/aerospace.tsx'));
});

test('sector work follows normalized existing topic membership and source order', () => {
  for (const sector of getPublishedSectors()) {
    const work = getSectorCaseStudies(sector, caseStudies.caseStudies);
    assert.ok(work.length > 0);
    assert.deepEqual(
      work.map((study) => study.slug),
      caseStudies.caseStudies
        .filter(
          (study) =>
            study.status !== 'draft' &&
            getCaseStudyTopics(study).includes(sector.topic)
        )
        .map((study) => study.slug)
    );
    const first = work[0]!;
    assert.equal(
      getSectorCaseStudies(sector, [{ ...first, status: 'draft' }]).length,
      0
    );
    assert.equal(
      getSectorCaseStudies(sector, [{ ...first, slug: 'new-matching-work' }])[0]
        ?.slug,
      'new-matching-work'
    );
  }
  assert.deepEqual(
    getSectorCaseStudies(
      { topic: 'Construction / Engineering' },
      caseStudies.caseStudies
    ),
    getSectorCaseStudies(
      { topic: 'Construction & Engineering' },
      caseStudies.caseStudies
    )
  );
  assert.equal(
    getSectorCaseStudies({ topic: 'Missing topic' }, caseStudies.caseStudies)
      .length,
    0
  );
});

test('sector gallery links use canonical topics accepted by the case-study filter', () => {
  for (const sector of getPublishedSectors()) {
    const url = new URL(
      getSectorCaseStudyUrl(sector),
      'https://www.thor-studio.com'
    );
    assert.equal(url.pathname, '/case-studies');
    assert.equal(url.searchParams.get('topic'), sector.topic);
  }
});

test('service and process links point to published capabilities and articles', () => {
  for (const sector of getPublishedSectors()) {
    for (const service of sector.services)
      assert.ok(
        getPublishedCapabilities().some(
          (capability) => capability.slug === service.capabilitySlug
        )
      );
  }
  assert.equal(sectorProcess.length, 5);
  for (const stage of sectorProcess)
    assert.ok(getArticlePreview(stage.articleSlug)?.url);
});

test('sector content and real artwork contain no placeholders or unconfirmed certification claims', () => {
  for (const sector of getPublishedSectors()) {
    assert.ok(
      !/placeholder|lorem ipsum|\[CONFIRM|WCAG\s*2|\bAAA\b|\bAA\b/i.test(
        JSON.stringify(sector)
      )
    );
    const images = [
      ...(sector.organizations?.map((organization) => organization.image) ??
        []),
      ...(sector.overview ? [sector.overview.image] : []),
    ];
    for (const image of images) {
      assert.ok(existsSync(`public${image.src}`));
      assert.ok(image.alt && image.width > 0 && image.height > 0);
    }
  }
  assert.equal(getPublishedSectors()[0]!.organizations?.length, 16);
});

test('footer publishes new sector destinations and retains the existing Publications link', () => {
  const links = footerMenu.sections.find(
    (section) => section.title === 'Where We Work'
  )!.links;
  for (const sector of getPublishedSectors())
    assert.equal(
      links.find((link) => link.name === sector.name)?.url,
      `/verticals/${sector.slug}`
    );
  assert.equal(
    links.find((link) => link.name === 'Publications')?.url,
    '/verticals/publications'
  );
});
