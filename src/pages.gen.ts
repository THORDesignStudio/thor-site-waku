// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as File_About_getConfig } from './pages/about';
// prettier-ignore
import type { getConfig as File_CapabilitiesSlug_getConfig } from './pages/capabilities/[slug]';
// prettier-ignore
import type { getConfig as File_Capabilities_getConfig } from './pages/capabilities';
// prettier-ignore
import type { getConfig as File_CaseStudiesSlug_getConfig } from './pages/case-studies/[slug]';
// prettier-ignore
import type { getConfig as File_CaseStudies_getConfig } from './pages/case-studies';
// prettier-ignore
import type { getConfig as File_Events_getConfig } from './pages/events';
// prettier-ignore
import type { getConfig as File_HowWeWork_getConfig } from './pages/how-we-work';
// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as File_Styleguide_getConfig } from './pages/styleguide';
// prettier-ignore
import type { getConfig as File_Tester_getConfig } from './pages/tester';
// prettier-ignore
import type { getConfig as File_VerticalsSlug_getConfig } from './pages/verticals/[slug]';
// prettier-ignore
import type { getConfig as File_VerticalsAerospace_getConfig } from './pages/verticals/aerospace';
// prettier-ignore
import type { getConfig as File_VerticalsPublications_getConfig } from './pages/verticals/publications';
// prettier-ignore
import type { getConfig as File_WorkWithUs_getConfig } from './pages/work-with-us';
// prettier-ignore
import type { getConfig as File_WritingSlug_getConfig } from './pages/writing/[slug]';

// prettier-ignore
type Page =
| ({ path: '/about' } & GetConfigResponse<typeof File_About_getConfig>)
| ({ path: '/capabilities/[slug]' } & GetConfigResponse<typeof File_CapabilitiesSlug_getConfig>)
| ({ path: '/capabilities' } & GetConfigResponse<typeof File_Capabilities_getConfig>)
| ({ path: '/case-studies/[slug]' } & GetConfigResponse<typeof File_CaseStudiesSlug_getConfig>)
| ({ path: '/case-studies' } & GetConfigResponse<typeof File_CaseStudies_getConfig>)
| ({ path: '/events' } & GetConfigResponse<typeof File_Events_getConfig>)
| ({ path: '/how-we-work' } & GetConfigResponse<typeof File_HowWeWork_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>)
| ({ path: '/styleguide' } & GetConfigResponse<typeof File_Styleguide_getConfig>)
| ({ path: '/tester' } & GetConfigResponse<typeof File_Tester_getConfig>)
| ({ path: '/verticals/[slug]' } & GetConfigResponse<typeof File_VerticalsSlug_getConfig>)
| ({ path: '/verticals/aerospace' } & GetConfigResponse<typeof File_VerticalsAerospace_getConfig>)
| ({ path: '/verticals/publications' } & GetConfigResponse<typeof File_VerticalsPublications_getConfig>)
| ({ path: '/work-with-us' } & GetConfigResponse<typeof File_WorkWithUs_getConfig>)
| ({ path: '/writing/[slug]' } & GetConfigResponse<typeof File_WritingSlug_getConfig>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
