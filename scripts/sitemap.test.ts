import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { getSitemapUrls, renderSitemap } from './lib/sitemap';
import { defaultSEO } from '../src/types/seo';
import { getPublishedCapabilities } from '../src/data/capabilities';
import { getPublishedSectors } from '../src/data/sectors';
import { caseStudies } from '../src/data/case-studies';
import { getPublishedCaseStudies } from '../src/data/site-content';
import { getPublishedArticles } from '../src/data/articles';
import { getVisibleHowWeWorkGroups } from '../src/data/how-we-work';
import { redirects } from '../src/config/redirects';

const origin = defaultSEO.baseUrl;
const page = (path: string, extra = '', canonical = `${origin}${path}`) => ({
  path,
  html: `<html><head>${extra}<link href="${canonical}" rel="canonical"></head><body></body></html>`,
});

test('sitemap uses canonical head tags and omits noindex, redirects and held content', () => {
  assert.deepEqual(
    getSitemapUrls(
      [
        page('/about'),
        page('/'),
        page('/about'),
        page('/styleguide', '<meta content="NOINDEX, nofollow" name="robots">'),
        page('/hidden', '<meta name="googlebot" content="none">'),
        page('/old'),
        page('/writing/held'),
      ],
      origin,
      new Set(['/old', '/writing/held'])
    ),
    [origin + '/', origin + '/about']
  );
});

test('bad or conflicting canonicals fail rather than advertising invalid URLs', () => {
  for (const canonical of [
    'https://example.com/about',
    origin + '/old',
    origin + '/about?q=x',
    origin + '/about#team',
  ]) {
    assert.throws(() =>
      getSitemapUrls([page('/about', '', canonical)], origin)
    );
  }
  assert.throws(() =>
    getSitemapUrls(
      [
        {
          path: '/',
          html:
            '<html><head></head><body><link rel="canonical" href="' +
            origin +
            '/"></body></html>',
        },
      ],
      origin
    )
  );
  assert.throws(() =>
    getSitemapUrls(
      [page('/', `<link rel="canonical" href="${origin}/">`)],
      origin
    )
  );
});

test('XML has the sitemap namespace and escapes special characters without invented dates', () => {
  const xml = renderSitemap([origin + '/example?a=1&b=2']);
  assert.match(xml, /xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9"/);
  assert.ok(xml.includes('/example?a=1&amp;b=2</loc>'));
  assert.doesNotMatch(xml, /lastmod|changefreq|priority/);
});

const sitemap = readFileSync('public/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1]!
);
const visibleArticleSlugs = new Set(
  getVisibleHowWeWorkGroups().flatMap((group) =>
    group.articles.map((article) => article.slug)
  )
);
const publicArticles = getPublishedArticles().filter((article) =>
  visibleArticleSlugs.has(article.slug)
);

test('generated sitemap covers every current public route and excludes held/internal/legacy routes', () => {
  const staticPages = readdirSync('src/pages', { recursive: true })
    .map(String)
    .filter(
      (path) =>
        path.endsWith('.tsx') &&
        !path.includes('[') &&
        !path.startsWith('_') &&
        path !== 'styleguide.tsx'
    )
    .map((path) => '/' + path.replace(/\.tsx$/, '').replace(/^index$/, ''));
  const expected = [
    ...staticPages,
    ...getPublishedCapabilities().map((item) => item.url),
    ...getPublishedSectors().map((item) => `/verticals/${item.slug}`),
    ...getPublishedCaseStudies(caseStudies.caseStudies).map(
      (item) => `/case-studies/${item.slug}`
    ),
    ...publicArticles.map((item) => `/writing/${item.slug}`),
  ]
    .map((path) => origin + path)
    .sort();
  assert.deepEqual(urls, expected);
  assert.equal(new Set(urls).size, urls.length);
  for (const redirect of redirects)
    assert.ok(!urls.includes(origin + redirect.source));
  assert.ok(!urls.some((url) => /\?|#|\/styleguide$|\/tester$/.test(url)));
  const robots = readFileSync('public/robots.txt', 'utf8');
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
});

test('llms.txt lists the same public destinations as the sitemap', () => {
  const text = readFileSync('public/llms.txt', 'utf8');
  const links = [
    ...text.matchAll(/\]\((https:\/\/www\.thor-studio\.com[^)]+)\)/g),
  ].map((match) => new URL(match[1]!));
  const pages = new Set(
    links
      .filter((url) => !['/sitemap.xml', '/robots.txt'].includes(url.pathname))
      .map((url) => url.origin + url.pathname)
  );
  assert.deepEqual([...pages].sort(), urls);
  assert.ok(links.some((url) => url.pathname === '/sitemap.xml'));
  assert.ok(text.includes('The former `/tester` page has been removed.'));
});
