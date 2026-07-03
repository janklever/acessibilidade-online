import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define default SITE_URL, support environment overrides
const siteUrl = (process.env.SITE_URL || process.env.URL || 'https://acessibilidade.online').replace(/\/$/, '');

const routes = [
  '/',
  '/sobre',
  '/ferramentas',
  '/referencias',
  '/privacidade',
  '/ferramentas/checklist',
  '/ferramentas/contraste',
  '/ferramentas/simulador',
  '/ferramentas/avaliador',
];

const today = new Date().toISOString().split('T')[0];

function getRouteUrl(route) {
  return `${siteUrl}${route === '/' ? '/' : route}`;
}

function updateCanonicalHref(html, url) {
  const canonicalRegex = /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i;
  const canonicalTag = `<link rel="canonical" href="${url}" />`;

  if (canonicalRegex.test(html)) {
    return html.replace(canonicalRegex, canonicalTag);
  }

  return html.replace(/<\/head>/i, `  ${canonicalTag}\n</head>`);
}

function generateRouteHtmlFiles() {
  const distDir = path.join(__dirname, 'dist');
  const indexPath = path.join(distDir, 'index.html');
  const indexHtml = fs.readFileSync(indexPath, 'utf-8');

  routes.forEach(route => {
    const canonicalUrl = getRouteUrl(route);
    const routeHtml = updateCanonicalHref(indexHtml, canonicalUrl);

    if (route === '/') {
      fs.writeFileSync(indexPath, routeHtml, 'utf-8');
      return;
    }

    const routeDir = path.join(distDir, route.slice(1));
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml, 'utf-8');
  });

  console.log('✓ route HTML files generated with page-specific canonical URLs');
}

function generateSitemap() {
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  const xmlFooter = `\n</urlset>`;

  const urls = routes.map(route => {
    const url = getRouteUrl(route);
    
    // Determine priority
    let priority = '0.5';
    if (route === '/') {
      priority = '1.0';
    } else if (route === '/ferramentas') {
      priority = '0.9';
    } else if (route.startsWith('/ferramentas/')) {
      priority = '0.8';
    } else if (route === '/sobre' || route === '/referencias') {
      priority = '0.7';
    }

    // Determine changefreq
    let changefreq = 'monthly';
    if (route === '/' || route.startsWith('/ferramentas/')) {
      changefreq = 'weekly';
    }

    return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `${xmlHeader}\n${urls}${xmlFooter}`;
}

function generateRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
}

async function main() {
  const distDir = path.join(__dirname, 'dist');
  
  if (!fs.existsSync(distDir)) {
    console.error('Error: "dist" directory does not exist. Please run Vite build first.');
    process.exit(1);
  }

  generateRouteHtmlFiles();

  const sitemapXml = generateSitemap();
  const robotsTxt = generateRobots();

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log('✓ sitemap.xml generated successfully in dist/');

  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf-8');
  console.log('✓ robots.txt generated successfully in dist/');
}

main().catch(err => {
  console.error('Error generating sitemap/robots.txt:', err);
  process.exit(1);
});
