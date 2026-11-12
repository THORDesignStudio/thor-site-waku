import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { SEO } from '../src/components/SEO';
import { defaultSEO } from '../src/types/seo';

const page = {
  title: 'A page | THOR Digital',
  description: 'A page-specific description.',
  canonicalUrl: `${defaultSEO.baseUrl}/example`,
};

test('default image dimensions survive omitted, relative and absolute image props', () => {
  for (const props of [
    {},
    { ogImage: defaultSEO.defaultOgImage },
    { ogImage: `${defaultSEO.baseUrl}${defaultSEO.defaultOgImage}` },
  ]) {
    const html = renderToStaticMarkup(
      createElement(SEO, { ...page, ...props })
    );
    assert.match(html, /property="og:image:width" content="1200"/);
    assert.match(html, /property="og:image:height" content="630"/);
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    assert.match(
      html,
      /property="og:url" content="https:\/\/www.thor-studio.com\/example"/
    );
  }
});

test('custom image metadata is shared by Open Graph and Twitter with real dimensions', () => {
  const html = renderToStaticMarkup(
    createElement(SEO, {
      ...page,
      ogImage: '/images/home/city-ratings.jpg',
      ogImageAlt: 'City Ratings website by THOR',
      ogImageWidth: 1600,
      ogImageHeight: 897,
      ogType: 'article',
    })
  );
  for (const property of ['og:image', 'twitter:image']) {
    assert.ok(
      html.includes(
        `${property}" content="${defaultSEO.baseUrl}/images/home/city-ratings.jpg"`
      )
    );
  }
  for (const property of ['og:image:alt', 'twitter:image:alt']) {
    assert.ok(
      html.includes(`${property}" content="City Ratings website by THOR"`)
    );
  }
  assert.match(html, /property="og:image:width" content="1600"/);
  assert.match(html, /property="og:image:height" content="897"/);
  assert.match(html, /property="og:type" content="article"/);
});

test('unknown image dimensions are not fabricated and internal pages can opt out of indexing', () => {
  const html = renderToStaticMarkup(
    createElement(SEO, {
      ...page,
      ogImage: '/custom.jpg',
      noindex: true,
    })
  );
  assert.doesNotMatch(html, /og:image:(width|height)/);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
});
