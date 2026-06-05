import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define default SITE_URL, support environment overrides
const siteUrl = process.env.SITE_URL || process.env.URL || 'https://acessibilidadeonline.com.br';

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

function generateSitemap() {
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  const xmlFooter = `\n</urlset>`;

  const urls = routes.map(route => {
    const url = `${siteUrl}${route === '/' ? '' : route}`;
    
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
