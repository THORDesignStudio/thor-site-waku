import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { test } from 'node:test';
import {
  howWeWorkGroups,
  getHowWeWorkArticleUrl,
} from '../src/data/how-we-work';
import { getPublishedCapabilities } from '../src/data/capabilities';
import { redirects } from '../src/config/redirects';
import { footerMenu } from '../src/data/menus';

test('How We Work has four unique stable section anchors and complete previews', () => {
  assert.deepEqual(
    howWeWorkGroups.map((group) => group.id),
    ['hww-web', 'hww-pubs', 'hww-guide', 'hww-brands']
  );
  const slugs = howWeWorkGroups.flatMap((group) =>
    group.articles.map((article) => article.slug)
  );
  assert.equal(new Set(slugs).size, slugs.length);
  for (const group of howWeWorkGroups) {
    assert.ok(group.title && group.description && group.articles.length);
    assert.ok(
      !/\[placeholder|\[16:9|replace with final/i.test(JSON.stringify(group))
    );
    for (const article of group.articles) {
      assert.ok(article.title && article.summary && article.image.alt);
      assert.ok(existsSync(`public${article.image.src}`), article.image.src);
      assert.ok(article.image.width > 0 && article.image.height > 0);
    }
  }
});

test('draft and missing article destinations never produce links', () => {
  const article = howWeWorkGroups[0]!.articles[0]!;
  assert.equal(
    getHowWeWorkArticleUrl({
      ...article,
      status: 'draft',
      url: '/writing/example',
    }),
    undefined
  );
  const withoutUrl = { ...article };
  delete withoutUrl.url;
  assert.equal(
    getHowWeWorkArticleUrl({ ...withoutUrl, status: 'ready' }),
    undefined
  );
  assert.equal(
    getHowWeWorkArticleUrl({
      ...article,
      status: 'ready',
      url: '/writing/example',
    }),
    '/writing/example'
  );
  for (const group of howWeWorkGroups)
    for (const item of group.articles) {
      const url = getHowWeWorkArticleUrl(item);
      if (url)
        assert.ok(
          !redirects.some((redirect) => redirect.source === url),
          `${url} is still redirected`
        );
    }
});

test('related capability destinations are published pages', () => {
  const published = getPublishedCapabilities();
  for (const group of howWeWorkGroups)
    assert.ok(
      published.some((capability) => capability.slug === group.capabilitySlug)
    );
});

test('the landing and linked article routes are enabled', () => {
  assert.ok(!redirects.some((redirect) => redirect.source === '/how-we-work'));
  for (const group of howWeWorkGroups)
    for (const article of group.articles)
      assert.ok(!redirects.some((redirect) => redirect.source === article.url));
  assert.equal(
    footerMenu.sections.find((section) => section.title === 'How We Work')?.url,
    '/how-we-work'
  );
});
