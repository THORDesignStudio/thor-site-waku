/**
 * SEO Meta Tags Helper
 *
 * Waku hoists <title>, <meta>, and <link> tags to the document head when
 * rendered directly in page components. For proper SSR/SSG with social sharing,
 * define these tags inline in each page rather than using a component.
 *
 * Example usage in a page:
 *
 * export default async function MyPage() {
 *   return (
 *     <>
 *       <title>Page Title | THOR Digital</title>
 *       <meta name="description" content="Page description" />
 *       <link rel="canonical" href="https://www.thor-studio.com/page-path" />
 *       <meta property="og:title" content="Page Title | THOR Digital" />
 *       <meta property="og:description" content="Page description" />
 *       <meta property="og:image" content="https://www.thor-studio.com/images/og-image.jpg" />
 *       <meta property="og:url" content="https://www.thor-studio.com/page-path" />
 *       <meta property="og:type" content="website" />
 *       <meta name="twitter:card" content="summary_large_image" />
 *       <meta name="twitter:title" content="Page Title | THOR Digital" />
 *       <meta name="twitter:description" content="Page description" />
 *       <meta name="twitter:image" content="https://www.thor-studio.com/images/og-image.jpg" />
 *
 *       <div>Page content...</div>
 *     </>
 *   );
 * }
 *
 * Note: Waku's static analysis can only hoist tags that are rendered directly
 * in the page, not tags inside imported components. This is why we use inline
 * tags rather than a <SEO /> component.
 */

export {};
