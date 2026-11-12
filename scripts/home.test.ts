import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { test } from 'node:test';
import { getFeaturedProjects } from '../src/data/featured-projects';
import {
  getHomeDisciplines,
  getHomeVerticals,
  homeSocial,
} from '../src/data/home-sections';
import { getPublishedCapabilities } from '../src/data/capabilities';
import { caseStudies } from '../src/data/case-studies';
import { redirects } from '../src/config/redirects';

test('the three featured projects resolve to published case studies and exclude drafts', () => {
  const projects = getFeaturedProjects();
  assert.deepEqual(
    projects.map((p) => p.slug),
    ['city-ratings', 'aerospace-america-articles', 'ibd-drug-guide']
  );
  for (const project of projects) {
    assert.ok(caseStudies.caseStudies.some((s) => s.slug === project.slug));
    assert.equal(project.url, `/case-studies/${project.slug}`);
    assert.ok(!redirects.some((r) => r.source === project.url));
  }
  assert.equal(getFeaturedProjects([]).length, 0);
  const city = caseStudies.caseStudies.find((s) => s.slug === 'city-ratings')!;
  assert.equal(getFeaturedProjects([{ ...city, status: 'draft' }]).length, 0);
});
test('featured figures use confirmed content without placeholders or an invented IBD completion rate', () => {
  const projects = getFeaturedProjects();
  assert.ok(!/placeholder|\[ADD/i.test(JSON.stringify(projects)));
  const city = projects[0]!;
  assert.equal(city.metrics[0]?.value, '3,500+');
  assert.equal(city.metrics[1]?.value, 'Since 2020');
  assert.ok(
    caseStudies.caseStudies
      .find((s) => s.slug === 'city-ratings')!
      .achievements.some((a) => a.includes('3,500+'))
  );
  for (const project of projects)
    for (const metric of project.metrics)
      assert.ok(metric.value && metric.label && metric.source);
  assert.deepEqual(
    projects[2]!.metrics.map((m) => m.value),
    ['58']
  );
});
test('featured artwork exists and has explicit dimensions', () => {
  for (const project of getFeaturedProjects()) {
    assert.ok(existsSync(`public${project.image.src}`));
    assert.ok(
      project.image.alt && project.image.width > 0 && project.image.height > 0
    );
  }
});
test('What We Do links all nine ready capabilities and real proof projects', () => {
  const groups = getHomeDisciplines();
  assert.deepEqual(
    groups.map((g) => g.title),
    ['Design', 'Development', 'Branding']
  );
  const urls = groups.flatMap((g) => g.capabilities.map((c) => c.url));
  assert.equal(new Set(urls).size, 9);
  assert.deepEqual(
    [...urls].sort(),
    getPublishedCapabilities()
      .map((c) => c.url)
      .sort()
  );
  for (const group of groups) {
    assert.ok(group.proof);
    assert.notEqual(group.proof.status, 'draft');
  }
});
test('Where We Work uses the two new sectors and the existing Publications route', () => {
  const verticals = getHomeVerticals();
  assert.deepEqual(
    verticals.map((v) => v.url),
    [
      '/verticals/associations-nonprofits',
      '/verticals/construction-engineering',
      '/verticals/publications',
    ]
  );
  for (const vertical of verticals) {
    assert.ok(existsSync(`public${vertical.image}`));
    assert.ok(!redirects.some((r) => r.source === vertical.url));
  }
});
test('Follow THOR is a curated set of real static images with profile links', () => {
  assert.deepEqual(
    homeSocial.map((s) => s.images.length),
    [3, 1]
  );
  for (const social of homeSocial) {
    assert.ok(social.url.startsWith('https://'));
    for (const image of social.images) {
      assert.ok(existsSync(`public${image.src}`));
      assert.ok(image.alt && image.width > 0 && image.height > 0);
    }
  }
});
