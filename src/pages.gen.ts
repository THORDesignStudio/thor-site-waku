// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as File_About_getConfig } from './pages/about';
// prettier-ignore
import type { getConfig as File_CaseStudiesSlug_getConfig } from './pages/case-studies/[slug]';
// prettier-ignore
import type { getConfig as File_CaseStudies_getConfig } from './pages/case-studies';
// prettier-ignore
import type { getConfig as File_Events_getConfig } from './pages/events';
// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as File_Styleguide_getConfig } from './pages/styleguide';
// prettier-ignore
import type { getConfig as File_Tester_getConfig } from './pages/tester';
// prettier-ignore
import type { getConfig as File_VerticalsAerospace_getConfig } from './pages/verticals/aerospace';
// prettier-ignore
import type { getConfig as File_VerticalsPublications_getConfig } from './pages/verticals/publications';

// prettier-ignore
type Page =
| ({ path: '/about' } & GetConfigResponse<typeof File_About_getConfig>)
| ({ path: '/case-studies/[slug]' } & GetConfigResponse<typeof File_CaseStudiesSlug_getConfig>)
| ({ path: '/case-studies' } & GetConfigResponse<typeof File_CaseStudies_getConfig>)
| ({ path: '/events' } & GetConfigResponse<typeof File_Events_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>)
| ({ path: '/styleguide' } & GetConfigResponse<typeof File_Styleguide_getConfig>)
| ({ path: '/tester' } & GetConfigResponse<typeof File_Tester_getConfig>)
| ({ path: '/verticals/aerospace' } & GetConfigResponse<typeof File_VerticalsAerospace_getConfig>)
| ({ path: '/verticals/publications' } & GetConfigResponse<typeof File_VerticalsPublications_getConfig>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
