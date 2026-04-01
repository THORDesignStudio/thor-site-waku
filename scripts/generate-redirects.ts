#!/usr/bin/env node
/**
 * Generate platform-specific redirect configurations
 * from the central src/config/redirects.ts
 *
 * Usage:
 *   npm run generate:redirects
 *   npx tsx scripts/generate-redirects.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { redirects, getStatusCode, type Redirect } from '../src/config/redirects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

interface VercelRedirect {
  source: string;
  destination: string;
  permanent?: boolean;
  statusCode?: number;
}

interface VercelConfig {
  redirects: VercelRedirect[];
}

/**
 * Generate vercel.json configuration
 */
function generateVercelConfig(): VercelConfig {
  const vercelRedirects: VercelRedirect[] = redirects.map((r) => {
    const redirect: VercelRedirect = {
      source: r.source,
      destination: r.destination,
    };

    // Vercel uses 'permanent' boolean or explicit statusCode
    if (r.statusCode) {
      redirect.statusCode = r.statusCode;
    } else {
      redirect.permanent = r.permanent;
    }

    return redirect;
  });

  return { redirects: vercelRedirects };
}

/**
 * Generate Cloudflare _redirects file content
 * Format: source destination [status]
 */
function generateCloudflareRedirects(): string {
  const lines: string[] = [
    '# Cloudflare Pages Redirects',
    '# Generated from src/config/redirects.ts',
    '# Do not edit directly - run `npm run generate:redirects` instead',
    '',
  ];

  for (const redirect of redirects) {
    const status = getStatusCode(redirect);
    const comment = redirect.comment ? ` # ${redirect.comment}` : '';
    lines.push(`${redirect.source} ${redirect.destination} ${status}${comment}`);
  }

  // Add a catch-all comment if no redirects exist
  if (redirects.length === 0) {
    lines.push('# No redirects configured yet');
    lines.push('# Add redirects in src/config/redirects.ts');
  }

  return lines.join('\n') + '\n';
}

/**
 * Write file with error handling
 */
function writeFile(filePath: string, content: string): void {
  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Generated: ${path.relative(rootDir, filePath)}`);
  } catch (error) {
    console.error(`✗ Failed to write: ${filePath}`);
    console.error(error);
    process.exit(1);
  }
}

/**
 * Main generation function
 */
function main(): void {
  console.log('Generating redirect configurations...\n');

  // Generate vercel.json
  const vercelConfig = generateVercelConfig();
  const vercelPath = path.join(rootDir, 'vercel.json');
  writeFile(vercelPath, JSON.stringify(vercelConfig, null, 2));

  // Generate _redirects for Cloudflare
  const cloudflareContent = generateCloudflareRedirects();
  const cloudflarePath = path.join(rootDir, 'public', '_redirects');

  // Ensure public directory exists
  const publicDir = path.dirname(cloudflarePath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  writeFile(cloudflarePath, cloudflareContent);

  // Summary
  console.log(`\n${redirects.length} redirect(s) configured:`);
  for (const redirect of redirects) {
    const status = getStatusCode(redirect);
    const type = redirect.permanent ? 'permanent' : 'temporary';
    console.log(`  [${status}] ${redirect.source} → ${redirect.destination} (${type})`);
  }

  console.log('\n✅ Done! Files generated:');
  console.log('  - vercel.json (for current Vercel hosting)');
  console.log('  - public/_redirects (for Cloudflare Pages migration)');
  console.log('\nNext steps:');
  console.log('  1. Add your redirects to src/config/redirects.ts');
  console.log('  2. Run npm run generate:redirects to regenerate');
  console.log('  3. Commit both generated files');
}

main();
