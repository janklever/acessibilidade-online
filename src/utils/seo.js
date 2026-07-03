const DEFAULT_SITE_URL = 'https://acessibilidade.online';

const CANONICAL_PATHS = {
  hub: '/',
  ferramentas: '/ferramentas',
  sobre: '/sobre',
  privacidade: '/privacidade',
  referencias: '/referencias',
  'ferramentas/checklist': '/ferramentas/checklist',
  'ferramentas/contraste': '/ferramentas/contraste',
  'ferramentas/simulador': '/ferramentas/simulador',
  'ferramentas/avaliador': '/ferramentas/avaliador',
};

function getSiteUrl() {
  const configuredUrl = import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL;
  return configuredUrl.replace(/\/$/, '');
}

export function getCanonicalUrl(route) {
  const path = CANONICAL_PATHS[route] || CANONICAL_PATHS.hub;
  return `${getSiteUrl()}${path === '/' ? '/' : path}`;
}

export function updateCanonicalUrl(route) {
  let link = document.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', getCanonicalUrl(route));
}
