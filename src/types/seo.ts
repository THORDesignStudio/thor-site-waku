/**
 * SEO Types
 *
 * TypeScript interfaces for SEO meta tag configuration.
 */

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  additionalMeta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

/**
 * Default SEO configuration for the site
 */
export const defaultSEO = {
  siteName: 'THOR Studio | THORDigital',
  baseUrl: 'https://www.thor-studio.com',
  defaultOgImage: '/images/hero-hammers/THOR_Hammer_OG_1200x630px.jpg',
  defaultOgImageAlt: 'THOR Studio',
  defaultOgImageWidth: 1200,
  defaultOgImageHeight: 630,
  twitterHandle: '@thorstudio',
} as const;
