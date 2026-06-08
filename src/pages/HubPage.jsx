import React from 'react';
import { TileGrid } from '../components/Tile';
import { SiteFooter, CheckIcon, XIcon, DotIcon } from '../components/Footer';
import { APCAtool } from '../utils/apca';
import { CHECKLIST_DATA } from '../data/checklist-data';

export function HubPage({ setRoute, heroVariant = 'azulejo', accent, theme }) {
  const criteriaCount = CHECKLIST_DATA.length;
  const categoriesCount = new Set(CHECKLIST_DATA.map(item => item.cat)).size;

  const [liveFg, setLiveFg] = React.useState(theme === 'dark' ? '#E8EAF0' : '#111318');
  const [liveBg, setLiveBg] = React.useState(theme === 'dark' ? '#0D0F12' : '#F7F8FA');

  React.useEffect(() => {
    setLiveFg(theme === 'dark' ? '#E8EAF0' : '#111318');
    setLiveBg(theme === 'dark' ? '#0D0F12' : '#F7F8FA');
  }, [theme]);

  const lc = Math.round(APCAtool.apca(liveFg, liveBg) * 10) / 10;
  const wcagR = APCAtool.wcag(liveFg, liveBg);
  const apcaLv = APCAtool.apcaLevel(lc);

  return (
    <div className="hub-page" data-screen-label="Hub">
      {/* ============ HERO ============ */}
      <section className={`hero hero-${heroVariant}`}>
        {heroVariant === 'azulejo' && (
          <div className="hero-bg" aria-hidden="true">
            <TileGrid opacity={0.14} />
          </div>
        )}

        <div className="container hero-inner">
          <div className="hero-meta">
            <span className="badge badge-accent mono">
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <circle cx="5" cy="5" r="3" fill="currentColor" />
              </svg>
              v1.0 · abril 2026
            </span>
            <span className="hero-meta-sep" aria-hidden="true">&nbsp;</span>
            <span className="hero-meta-text mono">LBI · eMAG · WCAG 2.2 · APCA</span>
          </div>

          <h1 className="hero-title">
            Ferramentas de acessibilidade<br />
            pensadas em <span className="gradient-text">português</span>,<br />
            do início ao fim.
          </h1>

          <p className="hero-lede lede">
            Um hub aberto com checklist auditável, verificador de contraste com APCA
            e simulador de visão para times brasileiros que tratam acessibilidade
            como excelência, não como obrigação.
          </p>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => setRoute('ferramentas/checklist')}>
              Explorar o checklist
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="btn btn-outline" onClick={() => setRoute('ferramentas/contraste')}>
              Verificar contraste
            </button>
          </div>

          {/* Live contrast demo — the hero verifies its own contrast */}
          {/* <aside className="hero-demo" aria-label="Demonstração ao vivo">
            <div className="demo-head">
              <span className="eyebrow">Demonstração ao vivo</span>
              <span className="demo-caption">Este hero verifica o próprio contraste em APCA</span>
            </div>

            <div className="demo-body">
              <div className="demo-swatches">
                <label className="swatch">
                  <span className="swatch-label">Texto</span>
                  <span className="swatch-row">
                    <span className="swatch-box" style={{ background: liveFg }}>
                      <input type="color" value={liveFg} onChange={(e) => setLiveFg(e.target.value)} aria-label="Cor do texto" />
                    </span>
                    <span className="mono swatch-hex">{liveFg.toUpperCase()}</span>
                  </span>
                </label>
                <label className="swatch">
                  <span className="swatch-label">Fundo</span>
                  <span className="swatch-row">
                    <span className="swatch-box" style={{ background: liveBg }}>
                      <input type="color" value={liveBg} onChange={(e) => setLiveBg(e.target.value)} aria-label="Cor do fundo" />
                    </span>
                    <span className="mono swatch-hex">{liveBg.toUpperCase()}</span>
                  </span>
                </label>
              </div>

              <div className="demo-result" aria-live="polite">
                <div className="demo-sample" style={{ background: liveBg, color: liveFg }}>
                  <div className="demo-sample-big">Aa</div>
                  <div className="demo-sample-text">
                    Cada pixel deste projeto é uma demonstração do que ele ensina.
                  </div>
                </div>
                <div className="demo-meters">
                  <div className="meter">
                    <div className="meter-label">APCA</div>
                    <div className="meter-value mono">Lc {Math.abs(lc).toFixed(1)}</div>
                    <div className={`meter-tag ${apcaLv.pass === true ? 'is-pass' : apcaLv.pass === 'ui' ? 'is-warn' : 'is-fail'}`}>
                      {apcaLv.pass === true ? (
                        <><CheckIcon /> {apcaLv.grade}</>
                      ) : apcaLv.pass === 'ui' ? (
                        <><DotIcon /> UI only</>
                      ) : (
                        <><XIcon /> Insuficiente</>
                      )}
                    </div>
                  </div>
                  <div className="meter">
                    <div className="meter-label">WCAG 2.2</div>
                    <div className="meter-value mono">{wcagR.toFixed(2)}:1</div>
                    <div className={`meter-tag ${wcagR >= 4.5 ? 'is-pass' : wcagR >= 3 ? 'is-warn' : 'is-fail'}`}>
                      {wcagR >= 7 ? <><CheckIcon /> AAA</> :
                        wcagR >= 4.5 ? <><CheckIcon /> AA</> :
                          wcagR >= 3 ? <><DotIcon /> AA Large</> :
                            <><XIcon /> Falha</>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside> */}
        </div>
      </section>

      {/* ============ TOOL CARDS ============ */}
      <section className="tools container" aria-labelledby="ferramentas-heading">
        <header className="section-head">
          <p className="eyebrow">Quatro ferramentas, um ecossistema</p>
          <h2 id="ferramentas-heading">Use, audite, compartilhe.</h2>
          <p className="lede">
            Cada ferramenta funciona sozinha. Juntas, cobrem o ciclo de trabalho
            de quem projeta e constrói interfaces acessíveis no Brasil.
          </p>
        </header>

        <div className="tool-grid">
          <ToolCard
            num="01"
            title="Checklist"
            tag={`${criteriaCount} critérios · WCAG 2.2 + LBI`}
            status={{ label: 'Disponível', kind: 'success' }}
            desc={`Um checklist auditável organizado em ${categoriesCount} categorias. Filtre por tema, marque o progresso, exporte relatório em PDF ou Markdown. Pensado para ser rodado antes de cada deploy.`}
            stats={[
              { k: 'Critérios', v: String(criteriaCount) },
              { k: 'Categorias', v: String(categoriesCount) },
              { k: 'Nível', v: 'A · AA · AAA' },
            ]}
            onClick={() => setRoute('ferramentas/checklist')}
            accent={accent}
          />
          <ToolCard
            num="02"
            title="Contraste"
            tag="WCAG 2.2 + APCA + sugestor"
            status={{ label: 'Disponível', kind: 'success' }}
            desc="Verificador de contraste que combina WCAG 2.x e APCA. Mostra preview de texto real, sugere a cor mais próxima que passa, e explica por que APCA é mais preciso perceptualmente."
            stats={[
              { k: 'Padrões', v: 'WCAG · APCA' },
              { k: 'Sugestor', v: 'Automático' },
              { k: 'Formato', v: 'Hex · RGB' },
            ]}
            onClick={() => setRoute('ferramentas/contraste')}
            accent={accent}
          />
          <ToolCard
            num="03"
            title="Simulador"
            tag="Visão · motora · cognitiva · áudio"
            status={{ label: 'Disponível', kind: 'success' }}
            desc="Simula em tempo real condições visuais, cognitivas, motoras e de leitura na interface (como daltonismo, catarata, dislexia, tremores musculares e leitor de tela)."
            stats={[
              { k: 'Condições', v: '10' },
              { k: 'Teclado', v: '100%' },
              { k: 'Suportes', v: 'Imagem / URL / Form' },
            ]}
            onClick={() => setRoute('ferramentas/simulador')}
            accent={accent}
          />
          <ToolCard
            num="04"
            title="Avaliador"
            tag="Auditor estrutural de acessibilidade"
            status={{ label: 'Disponível', kind: 'success' }}
            desc="Validador automático de HTML. Analisa marcação, atributos de mídia, acessibilidade de formulários/botões e problemas de zoom. Funciona colando HTML ou digitando uma URL."
            stats={[
              { k: 'Validações', v: '9 tipos' },
              { k: 'Custo', v: 'Zero/Browser' },
              { k: 'Score', v: '0 a 100' },
            ]}
            onClick={() => setRoute('ferramentas/avaliador')}
            accent={accent}
          />
        </div>
      </section>

      {/* ============ PRINCIPLES STRIP ============ */}
      <section className="principles container">
        <div className="principles-grid">
          <div className="principle">
            <div className="principle-num mono">§ 01</div>
            <h3 className="principle-title">Feito aqui, para aqui.</h3>
            <p className="principle-body">
              Fundamentado na LBI, no eMAG e em práticas brasileiras. Não é tradução, é conteúdo técnico escrito para quem trabalha no fuso de Brasília.
            </p>
          </div>
          <div className="principle">
            <div className="principle-num mono">§ 02</div>
            <h3 className="principle-title">Auditável por padrão.</h3>
            <p className="principle-body">
              Cada critério cita a cláusula WCAG 2.2 correspondente. Nada é opinião de blog, é referência normativa, com link e versão.
            </p>
          </div>
          <div className="principle">
            <div className="principle-num mono">§ 03</div>
            <h3 className="principle-title">Demonstra o que ensina.</h3>
            <p className="principle-body">
              Se algum componente deste site falhar em acessibilidade, ele invalida o
              argumento do produto inteiro. Tratamos isso como requisito primário.
            </p>
          </div>
        </div>
      </section>

      {/* ============ MANIFESTO ============ */}
      <section className="manifesto">
        <div className="container">
          <p className="eyebrow">Princípio unificador</p>
          <blockquote className="manifesto-quote">
            <span className="mark" aria-hidden="true">“</span>
            Acessibilidade <strong>é</strong> excelência. Design aqui não decora o argumento, ele <strong>é</strong> o argumento.
          </blockquote>
        </div>
      </section>

      <SiteFooter setRoute={setRoute} />
    </div>
  );
}

function ToolCard({ num, title, tag, desc, stats, status, onClick, disabled, accent }) {
  return (
    <article className={`tool-card ${disabled ? 'is-disabled' : ''}`}>
      <div className="tool-head">
        <span className="tool-num mono">{num}</span>
        <span className={`badge ${status.kind === 'success' ? 'badge-success' : 'badge-warning'}`}>
          {status.kind === 'success' ? <CheckIcon /> : <DotIcon />}
          {status.label}
        </span>
      </div>

      {/* <div className="tool-icon" aria-hidden="true">
        <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
          <path d="M30 4 L52 17 L52 43 L30 56 L8 43 L8 17 Z"
            stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M30 16 L42 23 L42 37 L30 44 L18 37 L18 23 Z"
            stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
          {num === '01' && (
            <path d="M24 29 L28 33 L36 25" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {num === '02' && (
            <>
              <circle cx="27" cy="30" r="4" fill="currentColor" />
              <circle cx="33" cy="30" r="4" fill="currentColor" opacity="0.35" />
            </>
          )}
          {num === '03' && (
            <>
              <circle cx="30" cy="30" r="5" stroke="currentColor" strokeWidth="1.6" fill="none" />
              <circle cx="30" cy="30" r="1.8" fill="currentColor" />
            </>
          )}
          {num === '04' && (
            <>
              <rect x="22" y="20" width="16" height="20" rx="1" stroke="currentColor" strokeWidth="1.6" fill="none" />
              <line x1="26" y1="25" x2="34" y2="25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="26" y1="30" x2="34" y2="30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="26" y1="35" x2="30" y2="35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </>
          )}
        </svg>
      </div> */}

      <div className="tool-body">
        <h3 className="tool-title">{title}</h3>
        <p className="tool-tag mono">{tag}</p>
        <p className="tool-desc">{desc}</p>
      </div>

      <div className="tool-stats">
        {stats.map((s, i) => (
          <div className="tool-stat" key={i}>
            <div className="tool-stat-k">{s.k}</div>
            <div className="tool-stat-v mono">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="tool-foot">
        {disabled ? (
          <button className="btn btn-ghost" disabled aria-disabled="true">
            Em desenvolvimento
          </button>
        ) : (
          <button className="btn btn-outline tool-cta" onClick={onClick}>
            Abrir {title.toLowerCase()}
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </article>
  );
}
