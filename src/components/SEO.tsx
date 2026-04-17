/**
 * SEO Component
 *
 * A reusable component for managing document head tags.
 *
 * IMPORTANT: This component renders actual <title>, <meta>, and <link> elements
 * inline so that Waku's static analysis can hoist them to the document head
 * during static generation. This ensures SEO tags are present in the initial
 * HTML for search engines and social media crawlers.
 *
 * Note: Waku can only hoist tags rendered directly in page components, not from
 * deeply nested components. Always use this component at the page level.
 *
 */

import type { SEOProps } from '../types/seo';
import { defaultSEO } from '../types/seo';

export function SEO({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  noindex = false,
  additionalMeta = [],
}: SEOProps) {
  const fullOgImage = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${defaultSEO.baseUrl}${ogImage}`
    : `${defaultSEO.baseUrl}${defaultSEO.defaultOgImage}`;

  // Build full canonical URL
  const fullCanonicalUrl = canonicalUrl || defaultSEO.baseUrl;

  return (
    <>
      {/* Standard meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={defaultSEO.siteName} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Canonical link */}
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Additional custom meta tags */}
      {additionalMeta.map((meta, index) =>
        meta.property ? (
          <meta
            key={`meta-${index}`}
            property={meta.property}
            content={meta.content}
          />
        ) : (
          <meta key={`meta-${index}`} name={meta.name} content={meta.content} />
        )
      )}
    </>
  );
}
