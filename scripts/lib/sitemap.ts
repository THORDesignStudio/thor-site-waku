export interface BuiltPage {
  path: string;
  html: string;
}

function decodeAttribute(value: string) {
  return value.replace(
    /&(?:amp|quot|apos|lt|gt);/g,
    (entity) =>
      ({
        '&amp;': '&',
        '&quot;': '"',
        '&apos;': "'",
        '&lt;': '<',
        '&gt;': '>',
      })[entity]!
  );
}

// Waku emits quoted attributes in the statically generated document head.
function attributes(tag: string) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(
      ([, name, doubleQuoted, singleQuoted]) => [
        name!.toLowerCase(),
        decodeAttribute(doubleQuoted ?? singleQuoted ?? ''),
      ]
    )
  );
}

export function getSitemapUrls(
  pages: readonly BuiltPage[],
  origin: string,
  excludedPaths: ReadonlySet<string> = new Set()
) {
  const urls = new Set<string>();
  for (const page of pages) {
    if (excludedPaths.has(page.path)) continue;
    const head = page.html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
    if (head === undefined)
      throw new Error(`Missing document head: ${page.path}`);
    const meta = [...head.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) =>
      attributes(tag)
    );
    if (
      meta.some(
        (tag) =>
          ['robots', 'googlebot'].includes(tag.name?.toLowerCase() ?? '') &&
          /(?:^|[,\s])(?:noindex|none)(?:$|[,\s])/i.test(tag.content ?? '')
      )
    )
      continue;
    const canonicals = [...head.matchAll(/<link\b[^>]*>/gi)]
      .map(([tag]) => attributes(tag))
      .filter((tag) =>
        tag.rel?.toLowerCase().split(/\s+/).includes('canonical')
      );
    if (canonicals.length !== 1 || !canonicals[0]!.href) {
      throw new Error(`Expected one canonical URL: ${page.path}`);
    }
    const canonical = new URL(canonicals[0]!.href!);
    if (
      canonical.origin !== origin ||
      canonical.pathname !== page.path ||
      canonical.search ||
      canonical.hash
    ) {
      throw new Error(`Canonical does not match public route: ${page.path}`);
    }
    urls.add(canonical.href);
  }
  return [...urls].sort();
}

export function renderSitemap(urls: readonly string[]) {
  const escapeXml = (value: string) =>
    value.replace(
      /[&<>"']/g,
      (character) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&apos;',
        })[character]!
    );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');
}
