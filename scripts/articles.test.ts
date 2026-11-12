import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { test } from 'node:test';
import {
  articles,
  getArticle,
  getArticleContext,
  getPublishedArticles,
  getArticlePreview,
} from '../src/data/articles';
import {
  howWeWorkGroups,
  getHowWeWorkArticleUrl,
} from '../src/data/how-we-work';
import { redirects } from '../src/config/redirects';

test('all fifteen previews resolve to ready bodies and canonical destinations', () => {
  const previews = howWeWorkGroups.flatMap((group) => group.articles);
  assert.equal(previews.length, 15);
  assert.equal(getPublishedArticles().length, 15);
  assert.equal(new Set(articles.map((article) => article.slug)).size, 15);
  for (const preview of previews) {
    assert.equal(getHowWeWorkArticleUrl(preview), `/writing/${preview.slug}`);
    assert.ok(getArticle(preview.slug));
    assert.ok(!redirects.some((redirect) => redirect.source === preview.url));
  }
});

test('draft, empty, and unlisted bodies cannot generate routes', () => {
  const pilot = articles[0]!;
  assert.equal(getPublishedArticles([{ ...pilot, status: 'draft' }]).length, 0);
  assert.equal(getPublishedArticles([{ ...pilot, sections: [] }]).length, 0);
  assert.equal(
    getPublishedArticles([{ ...pilot, slug: 'unfinished' }]).length,
    0
  );
  assert.equal(getArticle('missing'), undefined);
  assert.equal(getArticleContext('missing'), undefined);
  assert.equal(getArticlePreview('missing'), undefined);
});

test('published body and metadata contain no placeholders, duplicate anchors or missing artwork', () => {
  for (const article of getPublishedArticles()) {
    const context = getArticleContext(article.slug)!;
    assert.ok(context.preview.summary && article.lede);
    assert.ok(existsSync(`public${context.preview.image.src}`));
    assert.ok(
      !/\[AUTHOR|\[PUBLISH|\[PHOTO|\[Topic|placeholder|replace with|href="#"/i.test(
        JSON.stringify(article)
      ),
      article.slug
    );
    const ids = article.sections.flatMap((section) =>
      section.type === 'heading' || section.type === 'subheading'
        ? [section.id]
        : []
    );
    assert.equal(new Set(ids).size, ids.length, article.slug);
    for (const section of article.sections) {
      if (section.type === 'image')
        assert.ok(existsSync(`public${section.src}`));
      if (section.type === 'phases')
        for (const item of section.items)
          if (item.articleSlug) assert.ok(getArticlePreview(item.articleSlug));
    }
  }
});

test('series navigation follows each group and stops at its boundaries', () => {
  for (const group of howWeWorkGroups) {
    for (const [index, preview] of group.articles.entries()) {
      const context = getArticleContext(preview.slug)!;
      assert.equal(context.group.id, group.id);
      assert.equal(context.position, index + 1);
      assert.deepEqual(
        context.series.map((item) => item.slug),
        group.articles.map((item) => item.slug)
      );
      assert.equal(context.previous?.slug, group.articles[index - 1]?.slug);
      assert.equal(context.next?.slug, group.articles[index + 1]?.slug);
      assert.ok(
        context.series
          .filter((item) => item.slug !== preview.slug)
          .every((item) => getArticle(item.slug))
      );
    }
  }
});

test('legacy CMS and headless URLs redirect permanently to ready article pages', () => {
  for (const [source, slug] of [
    ['/writing/cms-sites', 'cms-websites'],
    ['/writing/headless-cms-sites', 'headless-websites'],
  ]) {
    const redirect = redirects.find((item) => item.source === source);
    assert.equal(redirect?.destination, `/writing/${slug}`);
    assert.equal(redirect?.permanent, true);
    assert.ok(getArticle(slug!));
  }
});
