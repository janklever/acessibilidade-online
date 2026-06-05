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
import './styles/main.scss';
import { CookieConsent } from './components/CookieConsent';

const TWEAK_DEFAULTS = {
  "theme": "auto",
  "accent": "azulejo",
  "radius": "round",
  "density": "compact",
  "heroVariant": "azulejo",
  "displayFont": "syne"
};

function readRoute() {
  const p = location.pathname.replace(/^\//, '').trim();
  if (!p || p === '/') return 'hub';
  if (['checklist', 'contraste', 'simulador', 'sobre', 'privacidade', 'hub', 'referencias', 'avaliador'].includes(p)) return p;
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
    html.setAttribute('data-accent', tweaks.accent);
    html.setAttribute('data-radius', tweaks.radius);
    html.setAttribute('data-density', tweaks.density);
    html.style.setProperty('--font-display',
      tweaks.displayFont === 'manrope'
        ? "'Manrope', system-ui, sans-serif"
        : "'Syne', 'Manrope', system-ui, sans-serif");
    localStorage.setItem('ac.tweaks', JSON.stringify(tweaks));
  }, [tweaks, activeTheme]);

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
        {route === 'checklist' && <ChecklistPage setRoute={setRoute} />}
        {route === 'contraste' && <ContrastPage setRoute={setRoute} />}
        {route === 'simulador' && <SimulatorPage setRoute={setRoute} />}
        {route === 'sobre' && <AboutPage setRoute={setRoute} />}
        {route === 'privacidade' && <PrivacyPage setRoute={setRoute} />}
        {route === 'referencias' && <ReferencesPage setRoute={setRoute} />}
        {route === 'avaliador' && <EvaluatorPage setRoute={setRoute} />}
      </main>
      <CookieConsent />

      {tweaksOpen && (
        <aside className="tweaks-panel" aria-label="Tweaks">
          <div className="tweaks-head">
            <div className="tweaks-title">Tweaks</div>
            <button className="icon-btn" onClick={() => setTweaksOpen(false)} aria-label="Fechar painel">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M3 3 L11 11 M11 3 L3 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="tweaks-body">
            <TweakRow label="Tema" value={tweaks.theme} onChange={(v) => updateTweak('theme', v)}
              options={[['auto', 'Auto'], ['dark', 'Escuro'], ['light', 'Claro']]} />
            <TweakRow label="Accent" value={tweaks.accent} onChange={(v) => updateTweak('accent', v)}
              options={[['azul', 'Azul'], ['verde', 'Verde'], ['azulejo', 'Azulejo'], ['laranja', 'Laranja']]} />
            <TweakRow label="Hero" value={tweaks.heroVariant} onChange={(v) => updateTweak('heroVariant', v)}
              options={[['azulejo', 'Azulejo'], ['plain', 'Limpo']]} />
            <TweakRow label="Radius" value={tweaks.radius} onChange={(v) => updateTweak('radius', v)}
              options={[['sharp', 'Sharp'], ['med', 'Médio'], ['round', 'Round']]} />
            <TweakRow label="Densidade" value={tweaks.density} onChange={(v) => updateTweak('density', v)}
              options={[['comfy', 'Confortável'], ['compact', 'Compacta']]} />
            <TweakRow label="Fonte display" value={tweaks.displayFont} onChange={(v) => updateTweak('displayFont', v)}
              options={[['syne', 'Syne'], ['manrope', 'Manrope']]} />
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
          <button key={k}
            className={`tweak-chip ${value === k ? 'is-active' : ''}`}
            onClick={() => onChange(k)}
            aria-pressed={value === k}>{l}</button>
        ))}
      </div>
    </div>
  );
}
