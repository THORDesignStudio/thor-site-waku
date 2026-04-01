/**
 * Central redirect configuration
 * This is the single source of truth for all redirects.
 * Both vercel.json and _redirects are generated from this file.
 *
 * Status codes:
 * - 301: Permanent redirect (SEO-friendly, cached by browsers)
 * - 302: Temporary redirect (not cached)
 * - 307: Temporary redirect (preserves method, modern replacement for 302)
 */

export interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
  statusCode?: 301 | 302 | 307;
  /** Optional comment for documentation */
  comment?: string;
}

// ============================================================================
// REDIRECT CONFIGURATION
// Add your redirects here - they will sync to both Vercel and Cloudflare configs
// ============================================================================

export const redirects: Redirect[] = [
  // ========================================================================
  // PERMANENT REDIRECTS (301)
  // ========================================================================

  // Legacy page migrations
  {
    source: '/our-studio',
    destination: '/about',
    permanent: true,
    comment: 'Studio page consolidated into About',
  },

  // Case study renames and consolidations
  {
    source: '/case-studies/branding',
    destination: '/case-studies/leon-hotel',
    permanent: true,
    comment: 'Renamed case study',
  },
  {
    source: '/case-studies/chemonics-media-showcase',
    destination: '/case-studies/chemonics-media-site',
    permanent: true,
    comment: 'Renamed case study',
  },
  {
    source: '/case-studies/knighten-health-drug-guide',
    destination: '/case-studies/ibd-drug-guide',
    permanent: true,
    comment: 'Renamed case study',
  },
  {
    source: '/case-studies/print-to-digital-transformation',
    destination: '/case-studies/construction-executive-magazine',
    permanent: true,
    comment: 'Renamed case study',
  },
  {
    source: '/case-studies/peopleforbikes-hungry-for-batteries-campaign-site',
    destination: '/case-studies/hungry-for-batteries',
    permanent: true,
    comment: 'Renamed case study',
  },
  {
    source: '/case-studies/peopleforbikes-city-ratings',
    destination: '/case-studies/city-ratings',
    permanent: true,
    comment: 'Renamed case study',
  },
  {
    source: '/case-studies/peopleforbikes-keep-riding',
    destination: '/case-studies/keep-riding',
    permanent: true,
    comment: 'Renamed case study',
  },
  {
    source: '/case-studies/construction-executive-publication-redesign',
    destination: '/case-studies/construction-executive-magazine',
    permanent: true,
    comment: 'Renamed case study',
  },
  {
    source: '/case-studies/clinical-care-app',
    destination: '/case-studies/mash-app',
    permanent: true,
    comment: 'Renamed case study',
  },
  {
    source: '/case-studies/national-investor-relations-institute',
    destination: '/case-studies/niri-investor-relations-rebrand',
    permanent: true,
    comment: 'Renamed case study',
  },

  // ========================================================================
  // TEMPORARY REDIRECTS (307)
  // ========================================================================

  {
    source: '/concept-vault',
    destination: '/',
    permanent: false,
    comment: 'Page temporarily disabled',
  },
  {
    source: '/how-we-work',
    destination: '/',
    permanent: false,
    comment: 'Page temporarily disabled',
  },
  {
    source: '/writing/architecture',
    destination: '/',
    permanent: false,
    comment: 'Writing archive temporarily redirected',
  },
  {
    source: '/writing/how-a-website-is-built',
    destination: '/',
    permanent: false,
    comment: 'Writing archive temporarily redirected',
  },
  {
    source: '/writing/design-and-development',
    destination: '/',
    permanent: false,
    comment: 'Writing archive temporarily redirected',
  },
  {
    source: '/writing/discovery-process',
    destination: '/',
    permanent: false,
    comment: 'Writing archive temporarily redirected',
  },
  {
    source: '/writing/project-management',
    destination: '/',
    permanent: false,
    comment: 'Writing archive temporarily redirected',
  },
  {
    source: '/writing/ongoing-publication-design',
    destination: '/',
    permanent: false,
    comment: 'Writing archive temporarily redirected',
  },
  {
    source: '/writing/how-is-a-magazine-born',
    destination: '/',
    permanent: false,
    comment: 'Writing archive temporarily redirected',
  },
  {
    source: '/writing/publication-pacing',
    destination: '/',
    permanent: false,
    comment: 'Writing archive temporarily redirected',
  },
  {
    source: '/writing/custom-websites',
    destination: '/',
    permanent: false,
    comment: 'Writing archive temporarily redirected',
  },
  {
    source: '/writing/headless-cms-sites',
    destination: '/',
    permanent: false,
    comment: 'Writing archive temporarily redirected',
  },
  {
    source: '/writing/no-code-websites',
    destination: '/',
    permanent: false,
    comment: 'Writing archive temporarily redirected',
  },
  {
    source: '/writing/cms-sites',
    destination: '/',
    permanent: false,
    comment: 'Writing archive temporarily redirected',
  },
  {
    source: '/writing/the-rapidly-evolving-web',
    destination: '/',
    permanent: false,
    comment: 'Writing archive temporarily redirected',
  },
  {
    source: '/case-studies/colorado-lawyer',
    destination: '/case-studies',
    permanent: false,
    comment: 'Case study temporarily redirected to listing',
  },
];

/**
 * Get the HTTP status code for a redirect
 * 301 for permanent, 307 for temporary (modern, preserves HTTP method)
 */
export function getStatusCode(redirect: Redirect): number {
  if (redirect.statusCode) {
    return redirect.statusCode;
  }
  return redirect.permanent ? 301 : 307;
}

/**
 * Wildcard/pattern matching support for paths
 * Converts :param syntax to platform-specific patterns
 */
export function convertPattern(
  path: string,
  format: 'vercel' | 'cloudflare'
): string {
  if (format === 'vercel') {
    // Vercel uses :param syntax natively
    return path;
  }

  // Cloudflare uses :param syntax in _redirects too
  // But splats are different: Vercel uses :path*, Cloudflare uses *
  return path.replace(/:path\*/g, '*').replace(/:([^/]+)/g, ':$1');
}
