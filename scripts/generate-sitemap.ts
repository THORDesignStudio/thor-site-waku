import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defaultSEO } from '../src/types/seo';
import {
  howWeWorkGroups,
  getVisibleHowWeWorkGroups,
} from '../src/data/how-we-work';
import { redirects } from '../src/config/redirects';
import { getSitemapUrls, renderSitemap, type BuiltPage } from './lib/sitemap';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'dist/public');
function readPages(directory: string): BuiltPage[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) return readPages(file);
    if (!entry.name.endsWith('.html')) return [];
    const path =
      '/' +
      relative(output, file)
        .split(sep)
        .join('/')
        .replace(/(?:^|\/)index\.html$/, '');
    return [{ path, html: readFileSync(file, 'utf8') }];
  });
}

// Unpromoted series stay out of discovery until the landing page exposes them.
const visibleGroups = new Set(
  getVisibleHowWeWorkGroups().map((group) => group.id)
);
const excludedPaths = new Set([
  ...redirects.map((redirect) => redirect.source),
  ...howWeWorkGroups
    .filter((group) => !visibleGroups.has(group.id))
    .flatMap((group) =>
      group.articles.flatMap((article) => (article.url ? [article.url] : []))
    ),
]);
const urls = getSitemapUrls(
  readPages(output),
  defaultSEO.baseUrl,
  excludedPaths
);
if (!urls.length)
  throw new Error(
    'Refusing to generate an empty sitemap. Run waku build first.'
  );
const xml = renderSitemap(urls);
// Keep the checked-in/dev copy and the deployment artifact identical.
for (const destination of ['public/sitemap.xml', 'dist/public/sitemap.xml']) {
  writeFileSync(join(root, destination), xml);
}
console.log(`Generated sitemap.xml with ${urls.length} canonical public URLs.`);
