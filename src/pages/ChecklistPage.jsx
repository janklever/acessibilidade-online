import React from 'react';
import { CHECKLIST_DATA } from '../data/checklist-data';
import { SiteFooter, DotIcon, CheckIcon } from '../components/Footer';
import { generateJSON, generateMarkdown, generateHTML, triggerDownload } from '../utils/export-helpers';

export function ChecklistPage({ setRoute }) {
  const data = CHECKLIST_DATA;
  const cats = React.useMemo(() => {
    const map = {};
    data.forEach(item => { map[item.cat] = (map[item.cat] || 0) + 1; });
    return [{ name: 'Tudo', count: data.length }, ...Object.entries(map).map(([name, count]) => ({ name, count }))];
  }, [data]);

  const [filter, setFilter] = React.useState('Tudo');
  const [levelFilter, setLevelFilter] = React.useState('all');
  const [checked, setChecked] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('ac.checklist') || '{}'); }
    catch { return {}; }
  });
  const [expanded, setExpanded] = React.useState({});
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowDownloadMenu(false);
      }
    }
    if (showDownloadMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDownloadMenu]);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setShowDownloadMenu(false);
      }
    }
    if (showDownloadMenu) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showDownloadMenu]);

  React.useEffect(() => {
    localStorage.setItem('ac.checklist', JSON.stringify(checked));
    if (Object.values(checked).filter(Boolean).length === 0) {
      setShowConfirm(false);
    }
  }, [checked]);

  const toggle = (i) => setChecked(prev => ({ ...prev, [i]: !prev[i] }));
  const toggleExp = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }));

  const filtered = data
    .map((item, i) => ({ ...item, idx: i }))
    .filter(it => filter === 'Tudo' || it.cat === filter)
    .filter(it => levelFilter === 'all' || it.level === levelFilter);

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const percent = Math.round((checkedCount / data.length) * 100);

  // Per-category progress
  const catProgress = React.useMemo(() => {
    const m = {};
    data.forEach((it, i) => {
      if (!m[it.cat]) m[it.cat] = { total: 0, done: 0 };
      m[it.cat].total++;
      if (checked[i]) m[it.cat].done++;
    });
    return m;
  }, [data, checked]);

  const resetAll = () => {
    setChecked({});
    setShowConfirm(false);
  };

  return (
    <div className="checklist-page" data-screen-label="Checklist">
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="#/" onClick={(e) => { e.preventDefault(); setRoute('hub'); }}>Início</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Checklist</span>
          </nav>

          <div className="page-hero-grid">
            <div>
              <p className="eyebrow">Ferramenta 01</p>
              <h1 className="page-title">Checklist de acessibilidade</h1>
              <p className="lede">
                {data.length} critérios organizados em {cats.length - 1} categorias, mapeados a cláusulas do
                WCAG 2.2 e da LBI. Marque o progresso, expanda os detalhes para
                entender o <em>porquê</em> de cada item, e exporte relatório ao fim.
              </p>
            </div>

            <div className="progress-panel">
              <div className="progress-head">
                <div>
                  <div className="eyebrow">Progresso</div>
                  <div className="progress-count mono">
                    <span className="progress-count-done">{checkedCount}</span>
                    <span className="progress-count-sep">/</span>
                    <span className="progress-count-total">{data.length}</span>
                  </div>
                </div>
                <div className="progress-percent" aria-live="polite">{percent}%</div>
              </div>
              <div className="progress-bar" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100" aria-label="Progresso do checklist">
                <div className="progress-fill" style={{ width: `${percent}%` }}></div>
              </div>
              <div className="progress-actions">
                {showConfirm ? (
                  <>
                    <button className="btn btn-sm btn-danger" onClick={resetAll}>
                      Limpar tudo?
                    </button>
                    <button className="btn btn-sm btn-outline" onClick={() => setShowConfirm(false)}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button className="btn btn-sm btn-outline" onClick={() => setShowConfirm(true)} disabled={checkedCount === 0}>
                    Limpar progresso
                  </button>
                )}
                <div className="download-dropdown-container" ref={menuRef}>
                  <button
                    className="btn btn-sm btn-primary"
                    disabled={checkedCount === 0}
                    onClick={() => setShowDownloadMenu(prev => !prev)}
                    aria-haspopup="true"
                    aria-expanded={showDownloadMenu}
                    id="download-btn"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M8 2v9M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Baixar relatório
                  </button>
                  {showDownloadMenu && (
                    <ul className="download-dropdown-menu" role="menu" aria-labelledby="download-btn">
                      <li role="none">
                        <button
                          role="menuitem"
                          onClick={() => {
                            const content = generateHTML(checked, data);
                            triggerDownload(content, 'relatorio-acessibilidade.html', 'text/html');
                            setShowDownloadMenu(false);
                          }}
                        >
                          Página (.html)
                        </button>
                      </li>
                      <li role="none">
                        <button
                          role="menuitem"
                          onClick={() => {
                            const content = generateMarkdown(checked, data);
                            triggerDownload(content, 'relatorio-acessibilidade.md', 'text/markdown');
                            setShowDownloadMenu(false);
                          }}
                        >
                          Markdown (.md)
                        </button>
                      </li>
                      <li role="none">
                        <button
                          role="menuitem"
                          onClick={() => {
                            const content = generateJSON(checked, data);
                            triggerDownload(content, 'relatorio-acessibilidade.json', 'application/json');
                            setShowDownloadMenu(false);
                          }}
                        >
                          JSON (.json)
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="checklist-body">
        <div className="container checklist-layout">
          <aside className="checklist-sidebar" aria-label="Filtros">
            <div className="filter-group">
              <h2 className="filter-title">Nível WCAG</h2>
              <div className="filter-chips">
                {[
                  { k: 'all', l: 'Tudo' },
                  { k: 'A', l: 'A' },
                  { k: 'AA', l: 'AA' },
                  { k: 'AAA', l: 'AAA' },
                ].map(l => (
                  <button key={l.k}
                    className={`chip ${levelFilter === l.k ? 'is-active' : ''}`}
                    onClick={() => setLevelFilter(l.k)}
                    aria-pressed={levelFilter === l.k}>
                    {l.l}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h2 className="filter-title">Categorias</h2>
              <ul className="filter-list">
                {cats.map(c => (
                  <li key={c.name}>
                    <button
                      className={`filter-pill ${filter === c.name ? 'is-active' : ''}`}
                      onClick={() => setFilter(c.name)}
                      aria-pressed={filter === c.name}>
                      <span className="filter-pill-name">{c.name}</span>
                      <span className="filter-pill-meta">
                        {c.name !== 'Tudo' && catProgress[c.name] && (
                          <span className="mono">
                            {catProgress[c.name].done}/{catProgress[c.name].total}
                          </span>
                        )}
                        {c.name === 'Tudo' && <span className="mono">{c.count}</span>}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-group hint">
              <h2 className="filter-title">Dica</h2>
              <p className="hint-text">
                Use <kbd>Tab</kbd> para navegar, <kbd>Espaço</kbd> para marcar, e
                <kbd>Enter</kbd> para expandir os detalhes. Todo o checklist é
                100% operável por teclado.
              </p>
            </div>
          </aside>

          <div className="checklist-list-wrap">
            <div className="checklist-list-head">
              <div className="list-count">
                Mostrando <strong>{filtered.length}</strong> {filtered.length === 1 ? 'critério' : 'critérios'}
                {filter !== 'Tudo' && <> em <strong>{filter}</strong></>}
              </div>
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => {
                  const allExp = filtered.length > 0 && filtered.every(it => expanded[it.idx]);
                  const next = {};
                  filtered.forEach(it => { next[it.idx] = !allExp; });
                  setExpanded(prev => ({ ...prev, ...next }));
                }}>
                {filtered.length > 0 && filtered.every(it => expanded[it.idx]) ? 'Recolher tudo' : 'Expandir tudo'}
              </button>
            </div>

            <ul className="checklist-items" role="list">
              {filtered.map(item => (
                <ChecklistItem
                  key={item.idx}
                  item={item}
                  checked={!!checked[item.idx]}
                  expanded={!!expanded[item.idx]}
                  onToggle={() => toggle(item.idx)}
                  onExpand={() => toggleExp(item.idx)}
                />
              ))}
              {filtered.length === 0 && (
                <li className="empty-state">
                  <div className="empty-icon">∅</div>
                  <h3>Nenhum critério neste filtro</h3>
                  <p>Tente combinar outra categoria com outro nível WCAG.</p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter setRoute={setRoute} />
    </div>
  );
}

function renderFormattedText(text) {
  if (!text) return null;
  const cleanText = text.replace(/\\×/g, '×');
  const parts = cleanText.split(/(`[^`]+`|\\<[^>]+\\>|<[a-zA-Z0-9="'.#_:\s\-\/]+>)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={idx} className="code-highlight">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('\\<') && part.endsWith('\\>')) {
      return <code key={idx} className="code-highlight">{part.slice(1)}</code>;
    }
    if (part.startsWith('<') && part.endsWith('>')) {
      return <code key={idx} className="code-highlight">{part}</code>;
    }
    return part;
  });
}

function ChecklistItem({ item, checked, expanded, onToggle, onExpand }) {
  return (
    <li className={`check-item ${checked ? 'is-checked' : ''} ${expanded ? 'is-expanded' : ''}`}>
      <div className="check-row">
        <button
          role="checkbox"
          aria-checked={checked}
          className="check-box"
          onClick={onToggle}
          aria-labelledby={`ci-title-${item.idx}`}>
          {checked && (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3 7.5 L6 10.5 L11 4.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        <div className="check-main">
          <div className="check-meta">
            <span className="check-cat mono">{item.cat}</span>
            <span className="check-wcag mono">WCAG {item.wcag}</span>
            <span className={`check-level mono level-${item.level}`}>{item.level}</span>
          </div>
          <button
            id={`ci-title-${item.idx}`}
            className="check-title"
            onClick={onExpand}
            aria-expanded={expanded}>
            {renderFormattedText(item.title)}
            <svg className="chevron" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3 5 L7 9 L11 5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="check-detail">
          <p>{renderFormattedText(item.detail)}</p>
        </div>
      )}
    </li>
  );
}
