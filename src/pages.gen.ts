// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as File_About_getConfig } from './pages/about';
// prettier-ignore
import type { getConfig as File_HeroCentex_getConfig } from './pages/hero-centex';
// prettier-ignore
import type { getConfig as File_HeroIntercom_getConfig } from './pages/hero-intercom';
// prettier-ignore
import type { getConfig as File_HeroLandscape_getConfig } from './pages/hero-landscape';
// prettier-ignore
import type { getConfig as File_HeroSpace_getConfig } from './pages/hero-space';
// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as File_Typography_getConfig } from './pages/typography';

// prettier-ignore
type Page =
| ({ path: '/about' } & GetConfigResponse<typeof File_About_getConfig>)
| ({ path: '/hero-centex' } & GetConfigResponse<typeof File_HeroCentex_getConfig>)
| ({ path: '/hero-intercom' } & GetConfigResponse<typeof File_HeroIntercom_getConfig>)
| ({ path: '/hero-landscape' } & GetConfigResponse<typeof File_HeroLandscape_getConfig>)
| ({ path: '/hero-space' } & GetConfigResponse<typeof File_HeroSpace_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>)
| ({ path: '/typography' } & GetConfigResponse<typeof File_Typography_getConfig>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
