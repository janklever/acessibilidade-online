// Hub page — hero + live demos + tool cards + footer
const HubPage = ({ setRoute, heroVariant = 'azulejo', accent, theme }) => {
  const [liveFg, setLiveFg] = React.useState(theme === 'dark' ? '#E8EAF0' : '#111318');
  const [liveBg, setLiveBg] = React.useState(theme === 'dark' ? '#0D0F12' : '#F7F8FA');

  React.useEffect(() => {
    setLiveFg(theme === 'dark' ? '#E8EAF0' : '#111318');
    setLiveBg(theme === 'dark' ? '#0D0F12' : '#F7F8FA');
  }, [theme]);

  const lc = Math.round(window.APCAtool.apca(liveFg, liveBg) * 10) / 10;
  const wcagR = window.APCAtool.wcag(liveFg, liveBg);
  const apcaLv = window.APCAtool.apcaLevel(lc);

  return (
    <div className="hub-page" data-screen-label="Hub">
      {/* ============ HERO ============ */}
      <section className={`hero hero-${heroVariant}`}>
        {heroVariant === 'azulejo' && (
          <div className="hero-bg" aria-hidden="true">
            <AzulejoGrid opacity={0.14}/>
          </div>
        )}

        <div className="container hero-inner">
          <div className="hero-meta">
            <span className="badge badge-accent">
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <circle cx="5" cy="5" r="3" fill="currentColor"/>
              </svg>
              v1.0 · Abril 2026
            </span>
            <span className="hero-meta-sep" aria-hidden="true">—</span>
            <span className="hero-meta-text mono">LBI · eMAG · WCAG 2.2 · APCA</span>
          </div>

          <h1 className="hero-title">
            Ferramentas de acessibilidade<br/>
            pensadas em <span className="gradient-text">português</span>,<br/>
            do início ao fim.
          </h1>

          <p className="hero-lede lede">
            Um hub aberto com checklist auditável, verificador de contraste com APCA
            e simulador de visão — para times brasileiros que tratam acessibilidade
            como excelência, não como obrigação.
          </p>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => setRoute('checklist')}>
              Explorar o Checklist
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn btn-outline" onClick={() => setRoute('contraste')}>
              Verificar Contraste
            </button>
          </div>

          {/* Live contrast demo — the hero verifies its own contrast */}
          <aside className="hero-demo" aria-label="Demonstração ao vivo">
            <div className="demo-head">
              <span className="eyebrow">Demonstração ao vivo</span>
              <span className="demo-caption">Este hero verifica o próprio contraste em APCA</span>
            </div>

            <div className="demo-body">
              <div className="demo-swatches">
                <label className="swatch">
                  <span className="swatch-label">Texto</span>
                  <span className="swatch-row">
                    <input type="color" value={liveFg} onChange={(e) => setLiveFg(e.target.value)}
                           aria-label="Cor do texto"/>
                    <span className="mono swatch-hex">{liveFg.toUpperCase()}</span>
                  </span>
                </label>
                <label className="swatch">
                  <span className="swatch-label">Fundo</span>
                  <span className="swatch-row">
                    <input type="color" value={liveBg} onChange={(e) => setLiveBg(e.target.value)}
                           aria-label="Cor do fundo"/>
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
                        <><CheckIcon/> {apcaLv.grade}</>
                      ) : apcaLv.pass === 'ui' ? (
                        <><DotIcon/> UI only</>
                      ) : (
                        <><XIcon/> Insuficiente</>
                      )}
                    </div>
                  </div>
                  <div className="meter">
                    <div className="meter-label">WCAG 2.2</div>
                    <div className="meter-value mono">{wcagR.toFixed(2)}:1</div>
                    <div className={`meter-tag ${wcagR >= 4.5 ? 'is-pass' : wcagR >= 3 ? 'is-warn' : 'is-fail'}`}>
                      {wcagR >= 7 ? <><CheckIcon/> AAA</> :
                       wcagR >= 4.5 ? <><CheckIcon/> AA</> :
                       wcagR >= 3 ? <><DotIcon/> AA Large</> :
                       <><XIcon/> Fail</>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ============ TOOL CARDS ============ */}
      <section className="tools container" aria-labelledby="ferramentas-heading">
        <header className="section-head">
          <p className="eyebrow">Três ferramentas, um ecossistema</p>
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
            tag="71 critérios · WCAG 2.2 + LBI"
            status={{ label: 'Disponível', kind: 'success' }}
            desc="Um checklist auditável organizado em 16 categorias. Filtre por tema, marque o progresso, exporte relatório em PDF ou Markdown. Pensado para ser rodado antes de cada deploy."
            stats={[
              { k: 'Critérios', v: '71' },
              { k: 'Categorias', v: '16' },
              { k: 'Nível', v: 'A · AA · AAA' },
            ]}
            onClick={() => setRoute('checklist')}
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
            onClick={() => setRoute('contraste')}
            accent={accent}
          />
          <ToolCard
            num="03"
            title="Simulador"
            tag="Daltonismo · baixa visão · foco"
            status={{ label: 'Em breve', kind: 'warning' }}
            desc="Simula como pessoas com diferentes condições veem sua interface: protanopia, deuteranopia, tritanopia, catarata, glaucoma, baixa contraste. Opera 100% por teclado — sem drag."
            stats={[
              { k: 'Condições', v: '8' },
              { k: 'Teclado', v: '100%' },
              { k: 'Launch', v: 'Q3/26' },
            ]}
            disabled
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
              Fundamentado na LBI, no eMAG e em práticas brasileiras. Não é tradução —
              é conteúdo técnico escrito para quem trabalha no fuso de Brasília.
            </p>
          </div>
          <div className="principle">
            <div className="principle-num mono">§ 02</div>
            <h3 className="principle-title">Auditável por padrão.</h3>
            <p className="principle-body">
              Cada critério cita a cláusula WCAG 2.2 correspondente. Nada é opinião de
              blog — é referência normativa, com link e versão.
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
            Acessibilidade <em>é</em> excelência. Design aqui não decora o argumento —
            ele <strong>é</strong> o argumento.
          </blockquote>
          <p className="manifesto-sign mono">— equipe acessibilidade.online</p>
        </div>
      </section>

      <SiteFooter setRoute={setRoute}/>
    </div>
  );
};

function ToolCard({ num, title, tag, desc, stats, status, onClick, disabled, accent }) {
  return (
    <article className={`tool-card ${disabled ? 'is-disabled' : ''}`}>
      <div className="tool-head">
        <span className="tool-num mono">{num}</span>
        <span className={`badge ${status.kind === 'success' ? 'badge-success' : 'badge-warning'}`}>
          {status.kind === 'success' ? <CheckIcon/> : <DotIcon/>}
          {status.label}
        </span>
      </div>

      <div className="tool-icon" aria-hidden="true">
        <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
          <path d="M30 4 L52 17 L52 43 L30 56 L8 43 L8 17 Z"
            stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5"/>
          <path d="M30 16 L42 23 L42 37 L30 44 L18 37 L18 23 Z"
            stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08"/>
          {num === '01' && (
            <path d="M24 29 L28 33 L36 25" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          )}
          {num === '02' && (
            <>
              <circle cx="27" cy="30" r="4" fill="currentColor"/>
              <circle cx="33" cy="30" r="4" fill="currentColor" opacity="0.35"/>
            </>
          )}
          {num === '03' && (
            <>
              <circle cx="30" cy="30" r="5" stroke="currentColor" strokeWidth="1.6" fill="none"/>
              <circle cx="30" cy="30" r="1.8" fill="currentColor"/>
            </>
          )}
        </svg>
      </div>

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
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </article>
  );
}

function SiteFooter({ setRoute }) {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden="true"><Logo size={28}/></span>
          <div>
            <div className="footer-wordmark">
              <span className="brand-root">acessibilidade</span>
              <span className="brand-tld">.online</span>
            </div>
            <p className="footer-tag">
              Hub aberto de acessibilidade digital para o Brasil.<br/>
              <span className="mono">v1.0 · abril de 2026 · São Paulo</span>
            </p>
          </div>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h4 className="footer-col-title">Ferramentas</h4>
            <ul>
              <li><a href="#/checklist" onClick={(e) => { e.preventDefault(); setRoute('checklist'); }}>Checklist</a></li>
              <li><a href="#/contraste" onClick={(e) => { e.preventDefault(); setRoute('contraste'); }}>Contraste</a></li>
              <li><a href="#/simulador">Simulador</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Referências</h4>
            <ul>
              <li><a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm">LBI (Lei 13.146/2015)</a></li>
              <li><a href="https://emag.governoeletronico.gov.br/">eMAG 3.1</a></li>
              <li><a href="https://www.w3.org/TR/WCAG22/">WCAG 2.2</a></li>
              <li><a href="https://github.com/Myndex/apca-w3">APCA W3</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Projeto</h4>
            <ul>
              <li><a href="#/sobre" onClick={(e) => { e.preventDefault(); setRoute('sobre'); }}>Sobre</a></li>
              <li><a href="#">Declaração de acessibilidade</a></li>
              <li><a href="#">Reportar barreira</a></li>
              <li><a href="#">Código-fonte</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="footer-statement">
          <span className="badge badge-success">
            <CheckIcon/> Em conformidade com WCAG 2.2 AA
          </span>
          <span className="mono footer-lc">Lc 78 · body · APCA</span>
        </div>
        <p className="footer-legal mono">
          Licença CC-BY-SA 4.0 · Sem rastreamento · Sem cookies
        </p>
      </div>
    </footer>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 6.5 L5 9 L9.5 3.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M2 2 L8 8 M8 2 L2 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
function DotIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
      <circle cx="4" cy="4" r="3" fill="currentColor"/>
    </svg>
  );
}

window.HubPage = HubPage;
window.SiteFooter = SiteFooter;
window.CheckIcon = CheckIcon;
window.XIcon = XIcon;
window.DotIcon = DotIcon;
