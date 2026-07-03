import React from 'react';
import { Nav } from './components/Nav';
import { HubPage } from './pages/HubPage';
import { ChecklistPage } from './pages/ChecklistPage';
import { ContrastPage } from './pages/ContrastPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ReferencesPage } from './pages/ReferencesPage';
import { EvaluatorPage } from './pages/EvaluatorPage';
import { ToolsPage } from './pages/ToolsPage';
import './styles/main.scss';
import { CookieConsent } from './components/CookieConsent';
import { updateCanonicalUrl } from './utils/seo';

const TWEAK_DEFAULTS = {
  "theme": "auto",
  "accent": "azulejo",
  "radius": "round",
  "density": "compact",
  "heroVariant": "azulejo",
  "displayFont": "syne",
  "textScale": "100",
  "lineSpacing": "normal",
  "dyslexiaFont": false,
  "librasActive": false
};

function readRoute() {
  const p = location.pathname.replace(/^\//, '').replace(/\/$/, '').trim();
  if (!p || p === '/') return 'hub';
  if (['ferramentas', 'sobre', 'privacidade', 'hub', 'referencias'].includes(p)) return p;

  // Match tools as sub-routes: /ferramentas/[tool]
  if (p.startsWith('ferramentas/')) {
    const sub = p.substring('ferramentas/'.length);
    if (['checklist', 'contraste', 'simulador', 'avaliador'].includes(sub)) {
      return p;
    }
  }

  // For backwards compatibility: /checklist -> /ferramentas/checklist
  if (['checklist', 'contraste', 'simulador', 'avaliador'].includes(p)) {
    return 'ferramentas/' + p;
  }

  return 'hub';
}

export default function App() {
  const [route, setRouteState] = React.useState(readRoute());
  const setRoute = (r) => {
    setRouteState(r);
    const path = r === 'hub' ? '/' : ('/' + r);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  React.useEffect(() => {
    updateCanonicalUrl(route);
  }, [route]);

  // Tweaks state
  const [tweaks, setTweaks] = React.useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ac.tweaks') || 'null');
      return { ...TWEAK_DEFAULTS, ...(saved || {}) };
    } catch { return { ...TWEAK_DEFAULTS }; }
  });
  const [tweaksOpen, setTweaksOpen] = React.useState(false);

  // System theme state to react to system changes when in 'auto' mode
  const [systemTheme, setSystemTheme] = React.useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  React.useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    // Support newer and older browser variants of matchMedia listeners
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else if (media.addListener) {
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, []);

  const activeTheme = tweaks.theme === 'auto' ? systemTheme : tweaks.theme;

  React.useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-theme', activeTheme);
    html.setAttribute('data-text-scale', tweaks.textScale || '100');
    html.setAttribute('data-line-spacing', tweaks.lineSpacing || 'normal');
    html.setAttribute('data-dyslexia', tweaks.dyslexiaFont ? 'true' : 'false');
    html.style.setProperty('--font-display',
      tweaks.displayFont === 'manrope'
        ? "'Manrope', system-ui, sans-serif"
        : "'Syne', 'Manrope', system-ui, sans-serif");
    localStorage.setItem('ac.tweaks', JSON.stringify(tweaks));
  }, [tweaks, activeTheme]);

  // VLibras dynamic loading
  React.useEffect(() => {
    // Check if script is already present
    if (document.getElementById('vlibras-script')) return;

    const script = document.createElement('script');
    script.id = 'vlibras-script';
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    };
    document.body.appendChild(script);

    // Create the required HTML structure for VLibras
    const vwDiv = document.createElement('div');
    vwDiv.setAttribute('vw', '');
    vwDiv.className = 'enabled';
    vwDiv.style.display = 'none'; // Hide by default

    const vwBtn = document.createElement('div');
    vwBtn.setAttribute('vw-access-button', '');
    vwBtn.className = 'active';

    const vwWrapper = document.createElement('div');
    vwWrapper.setAttribute('vw-plugin-wrapper', '');

    const vwTop = document.createElement('div');
    vwTop.className = 'vw-plugin-top-wrapper';

    vwWrapper.appendChild(vwTop);
    vwDiv.appendChild(vwBtn);
    vwDiv.appendChild(vwWrapper);
    document.body.appendChild(vwDiv);

    return () => {
      const scriptNode = document.getElementById('vlibras-script');
      if (scriptNode) document.body.removeChild(scriptNode);
      if (vwDiv) document.body.removeChild(vwDiv);
    };
  }, []);

  // Sync VLibras widget visibility with our panel state
  React.useEffect(() => {
    const vw = document.querySelector('[vw]');
    if (vw) {
      if (tweaks.librasActive) {
        vw.style.display = 'block';
        // Auto-open avatar on activation if not already open
        const btn = document.querySelector('[vw-access-button]');
        const active = document.querySelector('.vw-plugin-wrapper.active');
        if (btn && !active) {
          // Add a tiny delay to ensure widget is loaded/rendered before clicking
          setTimeout(() => {
            btn.click();
          }, 300);
        }
      } else {
        vw.style.display = 'none';
        // Close if open
        const active = document.querySelector('.vw-plugin-wrapper.active');
        const btn = document.querySelector('[vw-access-button]');
        if (btn && active) {
          btn.click();
        }
      }
    }
  }, [tweaks.librasActive]);

  // Global Keyboard Shortcuts (Alt + 1, Alt + 2, Alt + 3)
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey) {
        if (e.key === '1') {
          e.preventDefault();
          const skipLink = document.querySelector('.skip-link');
          if (skipLink) skipLink.focus();
        } else if (e.key === '2') {
          e.preventDefault();
          const navBrand = document.querySelector('.nav-brand');
          if (navBrand) navBrand.focus();
        } else if (e.key === '3') {
          e.preventDefault();
          setTweaksOpen(prev => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // History routing
  React.useEffect(() => {
    const onPopState = () => setRouteState(readRoute());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Edit mode protocol
  React.useEffect(() => {
    const onMsg = (e) => {
      const d = e.data;
      if (!d || !d.type) return;
      if (d.type === '__activate_edit_mode') setTweaksOpen(true);
      if (d.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const updateTweak = (k, v) => {
    setTweaks(prev => {
      const next = { ...prev, [k]: v };
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
      return next;
    });
  };

  const setTheme = (t) => updateTweak('theme', t);

  return (
    <>
      <Nav route={route} setRoute={setRoute} theme={activeTheme} setTheme={setTheme} />
      <main id="main" tabIndex="-1">
        {route === 'hub' && <HubPage setRoute={setRoute} heroVariant={tweaks.heroVariant} accent={tweaks.accent} theme={activeTheme} />}
        {route === 'ferramentas/checklist' && <ChecklistPage setRoute={setRoute} />}
        {route === 'ferramentas/contraste' && <ContrastPage setRoute={setRoute} />}
        {route === 'ferramentas/simulador' && <SimulatorPage setRoute={setRoute} />}
        {route === 'sobre' && <AboutPage setRoute={setRoute} />}
        {route === 'privacidade' && <PrivacyPage setRoute={setRoute} />}
        {route === 'referencias' && <ReferencesPage setRoute={setRoute} />}
        {route === 'ferramentas/avaliador' && <EvaluatorPage setRoute={setRoute} />}
        {route === 'ferramentas' && <ToolsPage setRoute={setRoute} accent={tweaks.accent} />}
      </main>
      <CookieConsent />

      <button className="floating-accessibility-btn"
        aria-label="Abrir painel de acessibilidade (Alt + 3)"
        onClick={() => setTweaksOpen(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="4.5" r="2" fill="currentColor" />
          <path d="M4 10.5a3.5 3.5 0 0 1 3.5-3.5h9a3.5 3.5 0 0 1 3.5 3.5" />
          <path d="M12 7v7" />
          <path d="M8 20.5l4-6.5 4 6.5" />
        </svg>
      </button>

      {tweaksOpen && (
        <aside className="tweaks-panel" aria-label="Preferências de acessibilidade">
          <div className="tweaks-head">
            <div className="tweaks-title">Acessibilidade</div>
            <button className="icon-btn" onClick={() => setTweaksOpen(false)} aria-label="Fechar painel">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M3 3 L11 11 M11 3 L3 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="tweaks-body">
            <TweakRow label="Tamanho do Texto" value={tweaks.textScale || '100'} onChange={(v) => updateTweak('textScale', v)}
              options={[['100', '100%'], ['115', '115%'], ['130', '130%'], ['150', '150%']]} />
            <TweakRow label="Espaçamento" value={tweaks.lineSpacing || 'normal'} onChange={(v) => updateTweak('lineSpacing', v)}
              options={[['normal', 'Padrão'], ['relaxed', 'Espaçado'], ['double', 'Amplo']]} />
            <TweakRow label="Fonte Dislexia" value={tweaks.dyslexiaFont} onChange={(v) => updateTweak('dyslexiaFont', v)}
              options={[[false, 'Desativada'], [true, 'Ativada']]} />
            <TweakRow label="Tradutor de Libras" value={tweaks.librasActive} onChange={(v) => updateTweak('librasActive', v)}
              options={[[false, 'Desativado'], [true, 'Ativado']]} />
          </div>
        </aside>
      )}
    </>
  );
}

function TweakRow({ label, value, onChange, options }) {
  return (
    <div className="tweak-row">
      <div className="tweak-label">{label}</div>
      <div className="tweak-group">
        {options.map(([k, l]) => (
          <button key={String(k)}
            className={`tweak-chip ${value === k ? 'is-active' : ''}`}
            onClick={() => onChange(k)}
            aria-pressed={value === k}>{l}</button>
        ))}
      </div>
    </div>
  );
}
